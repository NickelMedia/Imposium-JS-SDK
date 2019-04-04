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

current_npm_version=$(cat ./package.json | jq -r ".version")

echo -e "Preparing for publication on NPM...\n"

read -e -p "Please enter a new version number: "  fresh_npm_version
read -e -p "Version $fresh_npm_version will replace version $current_npm_version, are you sure this is correct? [y / n]: " confirmation

if [ "$confirmation" == "y" ]; then
    echo "Process will exit on errors."

    npm whoami > /dev/null 2>&1
    if [ $? == 1 ]; then
        echo "Please login to NPM..."
        npm login
    fi

    tmpFile=$(mktemp)
    jq ".version = \"$fresh_npm_version\"" ./package.json > "$tmpFile" && mv "$tmpFile" ./package.json

    print_checkout_step "Linting the project..."
    tslint ./src/**/*.ts

    print_checkout_step "Preparing bundled code..."
    webpack --bail && webpack --bail -p --env=sentry || { exit 1; }

    print_checkout_step "Generating type definitions...\n"
    ./generate-types.sh

    print_checkout_step "Publishing Imposium JS SDK"
    npm publish --access=public
fi
