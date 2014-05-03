'use strict';

angular
    .module('Skeleton', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'FractalDragon'
            })
            .when('/dragon', {
                templateUrl: 'components/fractalDragon/fractal-dragon-partial.html',
                controller: 'FractalDragon'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
