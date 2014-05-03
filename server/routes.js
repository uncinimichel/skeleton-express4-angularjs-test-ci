'use strict';

var index = require('./controllers'),
    webapi = require('./controllers/api');


/**
 * Application routes
 */
module.exports = function (app) {


    app.get('/partials/*', index.partials);

    app.get('/awesomeThings', webapi.awesomeThings);
};