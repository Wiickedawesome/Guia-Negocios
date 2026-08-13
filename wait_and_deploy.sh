#!/bin/bash
echo "Waiting for App Check unenforcement to propagate..."
for i in {1..20}; do
  echo "Attempt $i..."
  if npm run build; then
    echo "Build succeeded! Deploying..."
    npx -y firebase-tools@latest deploy --only hosting
    echo "Deployment complete."
    exit 0
  fi
  echo "Build failed. Retrying in 30 seconds..."
  sleep 30
done
echo "Timeout reached."
exit 1
