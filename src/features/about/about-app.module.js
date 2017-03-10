(function(angular) {
    'use strict';
    angular
        .module('app.aboutApp', [])
        .config(aboutConfig);

    // @ngInject
    function aboutConfig($stateProvider) {
        $stateProvider
            .state('app.aboutApp', {
                url: '/about-app',
                views: {
                    'appView': {
                        templateUrl: 'features/about/about-app.html',
                        controller: 'AboutAppController as aVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
