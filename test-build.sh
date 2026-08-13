#!/bin/bash
sed -i 's/@source.*/@source "src";/' src/styles/global.css
npm run build > /dev/null
if grep -qi "bg-brand-dark" dist/_astro/*.css; then
  echo "SUCCESS: @source 'src' worked"
  exit 0
fi

sed -i 's/@source.*/@source "\.\/src";/' src/styles/global.css
npm run build > /dev/null
if grep -qi "bg-brand-dark" dist/_astro/*.css; then
  echo "SUCCESS: @source './src' worked"
  exit 0
fi

sed -i 's/@source.*/@source "\.\.\/\.\.\/src";/' src/styles/global.css
npm run build > /dev/null
if grep -qi "bg-brand-dark" dist/_astro/*.css; then
  echo "SUCCESS: @source '../../src' worked"
  exit 0
fi

sed -i 's/@source.*/@source "\.\.\/\*\*\/\*\.astro";/' src/styles/global.css
npm run build > /dev/null
if grep -qi "bg-brand-dark" dist/_astro/*.css; then
  echo "SUCCESS: @source '../**/*.astro' worked"
  exit 0
fi

echo "FAILED: No path worked"
