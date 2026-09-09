#!/usr/bin/env bash
# Search Console diagnostics — pulls index coverage and search analytics
set -euo pipefail

TOKEN=$(gcloud auth application-default print-access-token)
SITE="sc-domain:guianegocios.net"
QUOTA="guianegocios-prod"
HEADERS=(-H "Authorization: Bearer $TOKEN" -H "X-Goog-User-Project: $QUOTA" -H "Content-Type: application/json")

echo "========================================="
echo "  GOOGLE SEARCH CONSOLE REPORT"
echo "  Site: $SITE"
echo "  Date: $(date)"
echo "========================================="

# --- URL Inspection for key pages ---
echo ""
echo "📋 INDEX STATUS BY PAGE"
echo "-----------------------------------------"

PAGES=(
  "https://guianegocios.net/"
  "https://guianegocios.net/en/"
  "https://guianegocios.net/es/services/"
  "https://guianegocios.net/en/services/"
  "https://guianegocios.net/es/services/paquete-lanzamiento-completo/"
  "https://guianegocios.net/en/services/complete-launch-bundle/"
  "https://guianegocios.net/es/services/apoyo-creedava/"
  "https://guianegocios.net/en/services/creedava-support/"
  "https://guianegocios.net/es/services/operaciones-crecimiento/"
  "https://guianegocios.net/en/services/operations-growth/"
  "https://guianegocios.net/es/blog/"
  "https://guianegocios.net/en/blog/"
  "https://guianegocios.net/es/blog/como-iniciar-llc-knoxville/"
  "https://guianegocios.net/en/blog/how-to-start-llc-knoxville/"
  "https://guianegocios.net/es/blog/como-hacer-credito-para-negocio/"
  "https://guianegocios.net/en/blog/how-to-build-business-credit/"
  "https://guianegocios.net/es/blog/importancia-de-numero-ein/"
  "https://guianegocios.net/en/blog/importance-of-ein-number/"
  "https://guianegocios.net/es/about/"
  "https://guianegocios.net/en/about/"
  "https://guianegocios.net/es/contact/"
  "https://guianegocios.net/en/contact/"
  "https://guianegocios.net/es/faq/"
  "https://guianegocios.net/en/faq/"
)

for url in "${PAGES[@]}"; do
  result=$(curl -s "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
    "${HEADERS[@]}" \
    -d "{\"siteUrl\":\"$SITE\",\"inspectionUrl\":\"$url\",\"languageCode\":\"en\"}")

  verdict=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.verdict // "ERROR"')
  coverage=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.coverageState // .inspectionResult.indexStatusResult.sitemap.errorDetail.code // "N/A"')
  crawled=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.lastCrawlTime // "never"')
  error=$(echo "$result" | jq -r '.inspectionResult.indexStatusResult.sitemap.errorDetail.code // empty')

  short_url="${url#https://guianegocios.net}"
  [ -z "$short_url" ] && short_url="/"

  if [ "$verdict" = "ERROR" ]; then
    echo "  ✗ $short_url — ERROR: $(echo "$result" | jq -r '.error.message')"
  else
    echo "  ✓ $short_url — $verdict | $coverage | crawled: $crawled"
  fi
done

# --- Search Analytics: last 28 days ---
echo ""
echo "📊 SEARCH ANALYTICS (Last 28 days)"
echo "-----------------------------------------"

END_DATE=$(date +%Y-%m-%d)
START_DATE=$(date -d "28 days ago" +%Y-%m-%d)

analytics=$(curl -s "https://searchconsole.googleapis.com/webmasters/v3/sites/$SITE/searchAnalytics/query" \
  "${HEADERS[@]}" \
  -d "{\"startDate\":\"$START_DATE\",\"endDate\":\"$END_DATE\",\"dimensions\":[\"query\"],\"rowLimit\":30}")

total_clicks=$(echo "$analytics" | jq '[.rows[]?.clicks] | add // 0')
total_impressions=$(echo "$analytics" | jq '[.rows[]?.impressions] | add // 0')
total_rows=$(echo "$analytics" | jq '.rows | length // 0')

echo "  Total clicks:      $total_clicks"
echo "  Total impressions: $total_impressions"
echo "  Queries with data: $total_rows"
echo ""

if [ "$total_rows" -gt 0 ]; then
  echo "  Top queries:"
  echo "  $(printf '%-45s %8s %12s %8s' 'QUERY' 'CLICKS' 'IMPRESSIONS' 'POSITION')"
  echo "  $(printf '%.0s─' {1..80})"
  echo "$analytics" | jq -r '.rows[]? | [(.query | .[0:45]), .clicks, .impressions, (.position | . * 10 | round / 10)] | @tsv' | \
    while IFS=$'\t' read -r query clicks impressions position; do
      printf "  %-45s %8s %12s %8s\n" "$query" "$clicks" "$impressions" "$position"
    done
fi

# --- Search Analytics by page ---
echo ""
echo "📄 TOP PAGES (Last 28 days)"
echo "-----------------------------------------"

page_analytics=$(curl -s "https://searchconsole.googleapis.com/webmasters/v3/sites/$SITE/searchAnalytics/query" \
  "${HEADERS[@]}" \
  -d "{\"startDate\":\"$START_DATE\",\"endDate\":\"$END_DATE\",\"dimensions\":[\"page\"],\"rowLimit\":15}")

page_rows=$(echo "$page_analytics" | jq '.rows | length // 0')

if [ "$page_rows" -gt 0 ]; then
  echo "  $(printf '%-60s %8s %12s %8s' 'PAGE' 'CLICKS' 'IMPRESSIONS' 'POSITION')"
  echo "  $(printf '%.0s─' {1..95})"
  echo "$page_analytics" | jq -r '.rows[]? | [(.keys[0] | gsub("https://guianegocios.net";"") | if . == "" then "/" else . end | .[0:60]), .clicks, .impressions, (.position | . * 10 | round / 10)] | @tsv' | \
    while IFS=$'\t' read -r page clicks impressions position; do
      printf "  %-60s %8s %12s %8s\n" "$page" "$clicks" "$impressions" "$position"
    done
fi

echo ""
echo "========================================="
echo "  Report complete"
echo "========================================="
