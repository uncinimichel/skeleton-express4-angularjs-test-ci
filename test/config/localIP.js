/* Helper to get the local ip address
 */

var _ = require('lodash'),
    ifaces = require('os').networkInterfaces();

var invalidPrefixes = ['lo', 'vboxnet'],
    addresses = [];

_.each(ifaces, function (details, dev) {
    var hasInvalidPrefix = _.any(invalidPrefixes, function (invalidPrefix) {
        return dev.indexOf(invalidPrefix) === 0;
    });

    if (!hasInvalidPrefix) {
        _.each(details, function (detail) {
            if (detail.family == 'IPv4') {
                addresses.push(detail.address);
            }
        });
    }
});

module.exports = _.first(addresses);