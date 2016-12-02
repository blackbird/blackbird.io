#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
gulp build

# Add changes to git.
git add -A

# Commit changes.
msg="Rebuilds site and deploys to gh-pages `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

git subtree add --prefix dist git@github.com:blackbird/blackbirdstudios.io.git master --squash

git subtree push --prefix=dist git@github.com:blackbird/blackbirdstudios.io.git gh-pages
