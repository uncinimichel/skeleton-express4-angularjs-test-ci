#!/bin/sh
CWD=$(pwd)
REPO=$(git rev-parse --show-toplevel)

cd "$REPO";

npm install -g bower grunt-cli
bower install
bundle install

# this should install selenium for protractor:
node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

cd "$CWD"