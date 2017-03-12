(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference', [])
        .config(currentPreferenceConfig);

    // @ngInject
    function currentPreferenceConfig($stateProvider) {
        $stateProvider
            .state('app.currentPreference', {
                url: '/current',
                views: {
                    'homeView@app.home': {
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
