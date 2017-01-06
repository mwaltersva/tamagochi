#!/bin/bash
cd dist
git init
git config user.name "MW (Travis)"
git config user.email "mwalters1984@gmail.com"
git add .
git commit -m "deployed to ghpages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
