'use strict';

angular.module('Skeleton').service('FractalDrawing', function () {

    this.roles = null;

    this.init = function (roles, start) {
        this.roles = roles;
        this.path = start;
    };

    this.iteration = function () {
        var newPaths = _.map(this.path, function (role) {
            return this.roles[role]
        }, this);

        this.path = this.path.concat(newPaths.reverse());
        return this.path;
    }

});


