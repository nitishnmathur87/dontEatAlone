(function(angular) {
    'use strict';
    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    // @ngInject
    function RegisterController($firebaseObject, $firebaseAuth, $state) {
        var registerVm = this;
        registerVm.rootRef = firebase.database().ref();

        registerVm.firebaseObject = $firebaseObject(registerVm.rootRef);

        registerVm.gotoHome = gotoHome;
        registerVm.writeUserData = writeUserData;

        function writeUserData() {
            firebase.auth().createUserWithEmailAndPassword(registerVm.data.email, registerVm.data.password)
                .then(function(success) {
                    console.log("Successfully registered");
                    console.log("Success object: ", success);
                    firebase.database().ref('users/').push(registerVm.data);
                    alert("Success");
                    $state.go('app.home');
            }).catch(function(error) {
                    console.log(error.code + " " + error.message);
                    alert(error.code);
            });
        }

        function gotoHome() {
            console.log('Home page');
            $state.go('app.home.mood.whatToEat');
            registerVm.writeUserData();
            return firebase.database().ref('/users').once('value').then(function(snapshot) {
                console.log(snapshot.val());
            });
        }
    }
}(angular));
