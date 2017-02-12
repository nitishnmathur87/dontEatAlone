    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController($state, AuthService, $ionicPush, $firebaseObject, $firebaseAuth) {
            var loginVm = this;

            loginVm.rootRef = firebase.database().ref();

            loginVm.firebaseObject = $firebaseObject(loginVm.rootRef);
            loginVm.login = login;
            loginVm.data = {};

            function login() {
                firebase.auth().signInWithEmailAndPassword(loginVm.data.username, loginVm.data.password).then(function(success) {
                    console.log('user logged in');
                    $state.go('app.home');
                    console.log(success);
                }).catch(function(error) {
                    console.log("here");
                    console.log(error.code, error.message);
                });
                registerForPush();
            }

            function registerForPush() {
                $ionicPush.register().then(function(t) {
                    return $ionicPush.saveToken(t);
                }).then(function(t) {
                    console.log('Token saved:', t.token);

                });
            }
        }
    }(angular));
