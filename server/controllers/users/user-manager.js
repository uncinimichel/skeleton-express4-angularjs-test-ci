'use strict';
var UserModel = require('./user-model'),
    q = require('q'),

    CODE = {
        INVALID_PASSWORD: {
            code: 400,
            message: 'Invalid password'
        },
        UNKNOWN_USER: {
            code: 400,
            message: 'Invalid username'
        },
        REGISTERED_USER: {
            code: 400,
            message: 'Username was already created'
        }
    };

var _isSamePassword = function _isSamePassword(user, password) {
        var deferred = q.defer();
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            deferred.resolve(isMatch);
        });
        return deferred.promise;
    },
    _lookupId = function (_id) {
        var deferred = q.defer();
        UserModel.findOne({ _id: _id }, function (err, user) {
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            if (user) {
                deferred.resolve(user);
            } else {
                deferred.reject(CODE.UNKNOWN_USER);
            }
        });
        return deferred.promise;
    };

module.exports = {

    lookupUsername: function (username) {
        var deferred = q.defer();
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            if (user) {
                deferred.resolve(user);
            } else {
                deferred.reject(CODE.UNKNOWN_USER);
            }
        });
        return deferred.promise;
    },
    lookupUsernameAndCreateIfUnknownUser: function (username) {
        var deferred = q.defer(),
            self = this;
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            if (user) {
                deferred.resolve(user);
            } else {
                // if UNKNOWN_USER create the user
                self.create(username, 'facebook')
                    .then(function (user) {
                        deferred.resolve(user);
                    })
                    .fail(function (codeError) {
                        deferred.reject(codeError);
                    })
            }
        });
        return deferred.promise;
    },
    lookupUsernameAndPassword: function (username, password) {
        var deferred = q.defer();
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            if (user) {
                _isSamePassword(user, password)
                    .then(function (isMatch) {
                        if (isMatch) {
                            deferred.resolve(user);
                        } else {
                            deferred.reject(CODE.INVALID_PASSWORD);
                        }
                    })
                    .fail(function (err) {
                        deferred.reject(err);
                    });
            } else {
                deferred.reject(CODE.UNKNOWN_USER);
            }
        });
        return deferred.promise;
    },
    create: function (username, password, firstName, lastName, marketing, about) {
        // create a user a new user
        var newUser = new UserModel({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                marketing: marketing,
                about: about
            }),
            deferred = q.defer();

        UserModel.findOne({ username: username }, function (err, user) {
            console.log('findOne');
            if (err) {
                deferred.reject({code: 500, message: err});
            }
            if (user) {
                deferred.reject(CODE.REGISTERED_USER);
            } else {
                // save user to database and redirect to auth
                newUser.save(function (err, user) {
                    if (err) {
                        deferred.reject({code: 500, message: err.message});
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
