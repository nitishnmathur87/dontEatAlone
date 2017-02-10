    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController($window, AuthService, $state, $ionicPush) {
            var loginVm = this;


            loginVm.validateLogin = validateLogin;
            loginVm.registerForPush = registerForPush;

            function registerForPush() {
                $ionicPush.register().then(function(t) {
                    return $ionicPush.saveToken(t);
                }).then(function(t) {
                    console.log('Token saved:', t.token);
                });
            }

            function validateLogin() {
                AuthService.authenticate(loginVm.email, loginVm.password)
                    .then(function(resp) {
                        _setUpPush();
                    }, function() {

                    });
            }

            function _setUpPush() {
                $window.Ionic.Auth.login('basic', {}, {
                    'email': loginVm.email,
                    'password': loginVm.email
                }).then(function (user) {
                    AuthService.registerForPush(user, true);
                }, function() {
                    // or register and then login
                    $window.Ionic.Auth.signup({
                        'email': loginVm.email,
                        'password': loginVm.email
                    }).then(function (res) {
                        $window.Ionic.Auth.login('basic', {}, {
                            'email': loginVm.email,
                            'password': loginVm.email
                        }).then(function (user) {
                            AuthService.registerForPush(user, true);
                        }, function() {

                        });
                    }, function() {

                    });
                });
            }
        }
    }(angular));
