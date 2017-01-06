#!/bin/bash

rm -rf dist || exit 0;
gulp build
( cd dist
git init
git config user.name "MW (Travis)"
git config user.email "mwalters1984@gmail.com"
git add .
git commit -m "deployed to ghpages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
)
