(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference', [])
        .config(dashConfig);

    // @ngInject
    function dashConfig($stateProvider) {
        $stateProvider
            .state('app.currentPreference', {
                url: '/current',
                views: {
                    'appView': {
                        templateUrl: 'features/current-preference/current-preference.html',
                        controller: 'CurrentPreferenceController as cVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
