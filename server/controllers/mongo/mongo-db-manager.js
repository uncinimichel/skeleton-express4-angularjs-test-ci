'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    q = require('q');


var dbManager = function (connString) {
    this.conn = mongoose.connect(connString);
    this._connectedModels = {};

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('Database opened!');
    });

};


exports.dbManager = dbManager;