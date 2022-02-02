#!/bin/bash

set -e

print_checkout_step () {
    echo -e "\n==============================\n$1"
}

current_git_branch=$(git branch | grep \* | cut -d ' ' -f2)

if [ $current_git_branch != "master" ]; then
    echo "Please make sure to publish from the master branch. Currently on branch: $current_git_branch"
    exit 1 
fi

npm whoami > /dev/null 2>&1
if [ $? == 1 ]; then
    echo "Please login to NPM..."
    npm login
fi

gh auth status
if [ $? === 0 ]; then
    echo 'Please login to GitHub...'
    gh auth login
fi

if [ -z "$1" ]; then
    echo "Please specifiy a release type..."
    npm version --help
    exit 1
fi

echo "Publishing a $1 release of the Imposium component library..."

print_checkout_step "Linting the project..."
eslint -c .eslintrc.js  ./src/**/*.ts

print_checkout_step "Preparing bundled code..."
npx webpack --bail && npx webpack --bail --mode=production --env=sentry || { exit 1; }

print_checkout_step "Generating type definitions...\n"
./generate-types.sh

print_checkout_step "Updating NPM version"
npm version $1

print_checkout_step "Creating GitHub release"
gh release create $1

print_checkout_step "Publishing to NPM"
npm publish