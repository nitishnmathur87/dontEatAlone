(function(angular) {
    'use strict';
    angular
        .module('app.register', [])
        .config(registerConfig);

    // @ngInject
    function registerConfig($stateProvider) {
        $stateProvider
            .state('app.login.register', {
                url: '/register',
                views: {
                    'appView@app': {
                        templateUrl: 'features/register/register.html',
                        controller: 'RegisterController as registerVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
