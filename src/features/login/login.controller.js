    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController($state, AuthService, $ionicPush) {
            var loginVm = this;


            loginVm.login = login;
            loginVm.data = {};

            function login() {
                console.log('user logged in');
                console.log(loginVm.data.username, loginVm.data.password);
                registerForPush();
            }

            function registerForPush() {
                $ionicPush.register().then(function(t) {
                    return $ionicPush.saveToken(t);
                }).then(function(t) {
                    console.log('Token saved:', t.token);
                    $state.go('app.home');
                });
            }
        }
    }(angular));
