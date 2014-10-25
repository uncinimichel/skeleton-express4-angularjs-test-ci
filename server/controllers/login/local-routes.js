'use strict';

var passport = require('passport'),
    UserManager = require('./../users/user-manager'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = {
    useStrategy: function () {
        //   Use the LocalStrategy within Passport.
        //   Strategies in passport require a `verify` function, which accept
        //   credentials (in this case, a username and password), and invoke a callback
        //   with a user object.  In the real world, this would query a database;
        //   however, in this example we are using a baked-in set of users.
        passport.use(new LocalStrategy(function (username, password, done) {
            UserManager.lookupUsernameAndPassword(username, password)
                .then(function (user) {
                    done(null, user);
                })
                .fail(function (err) {
                    if (err.code == 500) {
                        done(err, false);
                    } else {
                        done(null, false, {message: err.message});
                    }
                });
        }));
    },
    userIsLogged: function (app) {
        app.get('/amIlogged', function (req, res) {
            if (req.isAuthenticated()) {
                res.send(200, req.user.username);
            } else {
                res.send(401);
            }
        });
    },

    login: function (app) {
        app.post('/login', function (req, res, next) {
            //Info can be:
            //{ code: 400, message: 'Invalid username' }
            //{ code: 400, message: 'Invalid password' }
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    console.log(info.message, 'info.messageinfo.message')
                    return res.json(400, info.message);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect(301, '/');
                });
            })(req, res, next);
        });
    },
    logout: function (app) {
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });
    },

    signup: function (app) {
        app.post('/signup', function (req, res) {
            var username = req.body.username || req.body.email,
                password = req.body.password,
                firstName = req.body.firstName,
                lastName = req.body.lastName,
                marketing = req.body.marketing;

            UserManager.create(username, password, firstName, lastName, marketing)
                .then(function (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            res.json(err);
                        }
                        res.redirect('/');
                    });
                })
                .fail(function (err) {
                    res.send(err.code, err.message);
                })
        });
    }

};