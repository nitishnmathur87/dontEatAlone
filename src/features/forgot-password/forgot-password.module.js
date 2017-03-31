(function(angular) {
    'use strict';
    angular
        .module('app.forgotPassword', [])
        .config(registerConfig);

    // @ngInject
    function registerConfig($stateProvider) {
        $stateProvider
            .state('app.login.forgotPassword', {
                url: '/forgot-password',
                views: {
                    'appView@app': {
                        templateUrl: 'features/forgot-password/forgot-password.html',
                        controller: 'ForgotPasswordController as forgotVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
