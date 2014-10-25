'use strict';
var DBmanager = require('../../controllers/mongo/mongo-db-manager').dbManager;

var uriDB = "An uri",
    dbManager = new DBmanager(uriDB);

module.exports = {
    env: 'development',
    session: {
    },
    DBmanager: dbManager
};