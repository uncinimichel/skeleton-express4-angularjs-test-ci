'use strict';

module.exports = {
    env: 'production',
    port: process.env.VCAP_APP_PORT || 3000,
    session: {
    }
};