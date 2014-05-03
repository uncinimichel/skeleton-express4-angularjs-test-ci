'use strict';

angular.module('Skeleton').controller('FractalDragon', function ($scope, FractalDrawing) {
    var roles = {
        UP: 'LEFT',
        RIGHT: 'UP',
        DOWN: 'RIGHT',
        LEFT: 'DOWN'
    }, paths = [];

    FractalDrawing.init(roles, ['LEFT']);

    $scope.iteration = function () {
        var paths = FractalDrawing.iteration();

        $scope.$broadcast('draw', paths);
    }

});
