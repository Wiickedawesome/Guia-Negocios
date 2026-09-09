#!/usr/bin/env bash
set -e

TOKEN=$(gcloud auth application-default print-access-token)
SITE="sc-domain:guianegocios.net"
HEADERS="Authorization: Bearer $TOKEN
Content-Type: application/json"

echo "=== GOOGLE SEARCH CONSOLE AUDIT ==="
echo "Site: $SITE"
echo "Date: $(date)"
echo ""

# Get search analytics for last 28 days
echo "📊 SEARCH ANALYTICS (Last 28 days)"
echo "-----------------------------------"

END_DATE=$(date +%Y-%m-%d)
START_DATE=$(date -d "28 days ago" +%Y-%m-%d)

curl -s -X POST "https://searchconsole.googleapis.com/webmasters/v3/sites/$SITE/searchAnalytics/query" \
  -H "$HEADERS" \
  -d "{
    \"startDate\": \"$START_DATE\",
    \"endDate\": \"$END_DATE\",
    \"dimensions\": [\"query\", \"page\"],
    \"rowLimit\": 50
  }" | jq -r '
    .rows[]? | 
    "\(.keys[0])\t\(.keys[1])\t\(.clicks)\t\(.impressions)\t\(.position * 10 | round / 10)"
  ' | sort -t$'\t' -k4 -rn > /tmp/search-data.txt

if [ ! -s /tmp/search-data.txt ]; then
  echo "No search data available for this period"
else
  echo ""
  echo "Top Queries by Impressions:"
  echo ""
  printf "%-40s | %8s | %8s | %8s\n" "Query" "Clicks" "Impr" "Pos"
  echo "----------------------------------------|----------|----------|--------"
  cat /tmp/search-data.txt | awk -F'\t' '
    {
      queries[$1] += $4
      clicks[$1] += $3
      if (!min_pos[$1] || $5 < min_pos[$1]) min_pos[$1] = $5
    }
    END {
      for (q in queries) {
        printf "%-40s | %8d | %8d | %8.1f\n", q, clicks[q], queries[q], min_pos[q]
      }
    }
  ' | sort -t'|' -k3 -rn | head -20
fi

echo ""
echo "📄 TOP PAGES BY IMPRESSIONS"
echo "----------------------------"
printf "%-60s | %8s | %8s | %8s\n" "Page" "Clicks" "Impr" "Pos"
echo "------------------------------------------------------------|----------|----------|--------"
cat /tmp/search-data.txt | awk -F'\t' '
  {
    pages[$2] += $4
    clicks[$2] += $3
    if (!min_pos[$2] || $5 < min_pos[$2]) min_pos[$2] = $5
  }
  END {
    for (p in pages) {
      sub(/^https:\/\/guianegocios\.net/, "", p)
      if (p == "") p = "/"
      printf "%-60s | %8d | %8d | %8.1f\n", p, clicks[p], pages[p], min_pos[p]
    }
  }
' | sort -t'|' -k3 -rn | head -20

echo ""
echo "🔍 INDEX STATUS SAMPLE (Top 10 pages)"
echo "--------------------------------------"

head -10 /tmp/search-data.txt | cut -f2 | sort -u | while read -r page; do
  if [ -n "$page" ]; then
    result=$(curl -s -X POST "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
      -H "$HEADERS" \
      -d "{
        \"siteUrl\": \"$SITE\",
        \"inspectionUrl\": \"$page\"
      }")
    
    verdict=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.verdict // "ERROR"')
    last_crawl=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.lastCrawlTime // "never"' | cut -d'T' -f1)
    
    # Extract short path
    short_path=$(echo "$page" | sed 's|https://guianegocios.net||' | sed 's|^$|/|')
    
    printf "%-50s | %-10s | %s\n" "$short_path" "$verdict" "$last_crawl"
  fi
done

echo ""
echo "=== AUDIT COMPLETE ==="
