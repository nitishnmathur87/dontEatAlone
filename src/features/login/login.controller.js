    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController($state, AuthService, $firebaseObject, $firebaseAuth) {
            var loginVm = this;

            loginVm.rootRef = firebase.database().ref();

            loginVm.firebaseObject = $firebaseObject(loginVm.rootRef);
            loginVm.login = login;
            loginVm.data = {};

            function login() {
                firebase.auth().signInWithEmailAndPassword(loginVm.data.username, loginVm.data.password).then(function(success) {
                    $state.go('app.home.mood.whatToEat');
                }).catch(function(error) {
                    alert(error.message);
                });
            }
        }
    }(angular));
