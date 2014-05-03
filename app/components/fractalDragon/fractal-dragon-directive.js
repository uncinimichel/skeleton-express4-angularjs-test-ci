'use strict';

angular.module('Skeleton').directive('fractalDragon', function () {
    return {
        restrict: 'EA',

        link: function (scope, element, attrs) {
            console.log('dasddas');

            var paper = new Raphael(document.getElementById('canvas-dragon'), 1000, 1000),
                pathString = 'M 500 500';

            //This one is going to draw the canvas

            scope.$on('draw', function (event, paths) {

                _.each(paths, function (direction) {
                    switch (direction) {
                        case 'UP':
                            pathString += ' l 0 -5 ';
                            break;
                        case 'RIGHT':
                            pathString += ' l 5 0 ';
                            break;
                        case 'DOWN':
                            pathString += ' l 0 5 ';
                            break;
                        case 'LEFT':
                            pathString += ' l -5 0 ';
                            break;
                    }
                });
                //TODO do it progressivily...
                paper.clear();
                paper.path(pathString);

            })
        }
    };

});
