(function(angular) {
    'use strict';
    angular
        .module('app.home', [])
        .config(homeConfig);

    // @ngInject
    function homeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                abstract: true,
                views: {
                    'appView': {
                        templateUrl: 'features/home/home.html',
                        controller: 'HomeController as hVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });

        $urlRouterProvider.when('/app/home', '/app/home/mood');
    }
}(angular));
