#!/bin/bash

git_branch=$(git branch | grep \* | cut -d ' ' -f2)

if [ "$git_branch" == "master" ]; then
    current_version=$(cat ./package.json | jq -r ".version")

    echo "Preparing for publication on NPM..."

    read -e -p "Please enter a new version number: "  fresh_version
    read -e -p "Version $fresh_version will replace version $current_version, are you sure this is correct? [y / n]: " confirmation

    if [ "$confirmation" == "y" ]; then
        npm whoami > /dev/null 2>&1
        if [ $? == 1 ]; then 
            echo "Please login to NPM..."
            npm login
        fi

        tmpFile=$(mktemp)
        jq ".version = \"$fresh_version\"" ./package.json > "$tmpFile" && mv "$tmpFile" ./package.json

        echo "Linting the project..."
        tslint ./src/**/*.ts || { echo 'Please address lint errors before publishing.' ; exit 1; }

        echo "Preparing bundled code..."
        webpack && webpack -p || { echo 'Please review code before publishing.' ; exit 1; }

        echo "Generating type definitions..."
        ./generate-types.sh  || { echo 'Could not aggregate types, please review TS configurations before publishing.' ; exit 1; }

        echo "Publishing Imposium JS SDK"
        npm publish --access=public
    fi
else
    echo "Please make sure to publish from the master branch. Currently on branch: $git_branch"
fi
