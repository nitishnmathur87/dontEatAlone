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
                    //console.log("Success object: ", success);

                    //we can do this way by adding the unique user id or like below
                    /*
                    var user = firebase.auth().currentUser;
                    var name, email, photoUrl, uid, emailVerified;

                    if (user != null) {
                        name = user.displayName;
                        email = user.email;
                        photoUrl = user.photoURL;
                        emailVerified = user.emailVerified;
                        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                                         // this value to authenticate with your backend server, if
                                         // you have one. Use User.getToken() instead.
                    }
                    */
                    registerVm.data.uid = success.uid;
                    //console.log(registerVm.data);
                    firebase.database().ref('users/').push(registerVm.data);
                    $state.go('app.home.mood.whatToEat');
            }).catch(function(error) {
                    alert(error.message);
            });
        }

        function gotoHome() {
            registerVm.writeUserData();
            console.log('Redirect to what to eat pages');
            //return firebase.database().ref('/users').once('value').then(function(snapshot) {
            //    console.log(snapshot.val());
            //});
        }
    }
}(angular));
