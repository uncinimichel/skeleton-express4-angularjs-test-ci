'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    passport = require('passport'),
    UserModel = require('../controllers/users/user-model');

passport.serializeUser(function (user, done) {
    console.log('USER MATE: SER ', user);
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log('USER MATE:DES ', id);

    UserModel.findById(id, function (err, user) {
        console.log('DESDES find ', user);
        done(err, user);
    });
});

function _commonConfig(app) {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(express.static(path.join(config.root, 'app')));
    app.use(bodyParser());

    app.set('views', config.root + '/public');
    app.use(session({
            secret: config.session.secret
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

}
function _setProdConfig(app) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
}
function _setDevConfig(app) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
        if (req.url.indexOf('/scripts/') === 0) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
        }
        next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(errorHandler());

}
/**
 * Express configuration
 */
module.exports = function (app) {

    var env = process.env.NODE_ENV;

    _commonConfig(app);
    if (env === 'production') {
        _setProdConfig(app);
    } else {
        _setDevConfig(app);
    }


};