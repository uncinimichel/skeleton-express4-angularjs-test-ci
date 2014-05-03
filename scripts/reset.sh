cd ..

npm install --loglevel error
bower install -q
bundle install

# this should install selenium for protractor:
node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-managerwebdriver-manager update