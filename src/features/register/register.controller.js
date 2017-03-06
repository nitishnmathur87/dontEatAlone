(function(angular) {
    'use strict';
    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    // @ngInject
    function RegisterController($firebaseObject, $firebaseAuth, $state, $ionicPush, $ionicHistory) {
        var registerVm = this;
        registerVm.rootRef = firebase.database().ref();

        registerVm.firebaseObject = $firebaseObject(registerVm.rootRef);

        registerVm.gotoHome = gotoHome;
        registerVm.goBack = goBack;

        function gotoHome() {
            firebase.auth().createUserWithEmailAndPassword(registerVm.data.email, registerVm.data.password)
                .then(function(success) {
                    registerVm.data.uid = success.uid;
                    registerVm.data.password = '';
                    firebase.database().ref('users/' + registerVm.data.uid).set(registerVm.data);
                    registerForPush();
                    $state.go('app.home.mood.whatToEat');
                }).catch(function(error) {
                    alert(error.message);
                });
        }

        function registerForPush() {
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
            });
        }

        function goBack() {
            $state.go('app.login');
        }
    }
}(angular));
