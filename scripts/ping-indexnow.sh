#!/usr/bin/env bash
# Ping IndexNow (Bing + Yandex + Seznam + Naver) with all site URLs.
# Runs after every production deploy so new/changed pages are indexed in days,
# not weeks. Key file is served at /<key>.txt for verification.
set -euo pipefail

KEY_FILE=".indexnow-key"
if [ ! -f "$KEY_FILE" ]; then
  echo "No .indexnow-key found, skipping IndexNow ping"
  exit 0
fi
KEY=$(cat "$KEY_FILE")
HOST="guianegocios.net"

# Collect URLs from the built sitemap
URLS=$(grep -oE '<loc>https://guianegocios\.net[^<]*</loc>' dist/sitemap-0.xml 2>/dev/null \
  | sed -E 's#</?loc>##g' || true)

if [ -z "$URLS" ]; then
  echo "No URLs found in sitemap, skipping"
  exit 0
fi

# IndexNow accepts up to 10k URLs per POST; send as JSON batch
JSON=$(python3 - "$URLS" << 'EOF'
import json, sys
urls = sys.argv[1].split()
payload = {
    "host": "guianegocios.net",
    "key": sys.stdin.readline() if False else None,
}
EOF
)

# Build payload properly (key from file, urls from sitemap)
python3 - "$KEY" "$URLS" > /tmp/indexnow-payload.json << 'PYEOF'
import json, sys
key = sys.argv[1]
urls = [u for u in sys.argv[2].split() if u]
print(json.dumps({
    "host": "guianegocios.net",
    "key": key,
    "keyLocation": f"https://guianegocios.net/{key}.txt",
    "urlList": urls,
}))
PYEOF

COUNT=$(python3 -c "import json; print(len(json.load(open('/tmp/indexnow-payload.json'))['urlList']))")
echo "Pinging IndexNow with $COUNT URLs..."

HTTP=$(curl -s -o /tmp/indexnow-response.txt -w "%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @/tmp/indexnow-payload.json || echo "000")

echo "IndexNow response: HTTP $HTTP"
case "$HTTP" in
  200|202) echo "OK: URLs accepted for indexing" ;;
  400) echo "WARN: Bad request - check payload format"; cat /tmp/indexnow-response.txt ;;
  403) echo "WARN: Key not valid yet (propagation can take a few minutes)" ;;
  422) echo "WARN: URLs don't belong to host or key mismatch" ;;
  429) echo "WARN: Rate limited - will retry next deploy" ;;
  *) echo "Note: response saved to /tmp/indexnow-response.txt" ;;
esac
rm -f /tmp/indexnow-payload.json
