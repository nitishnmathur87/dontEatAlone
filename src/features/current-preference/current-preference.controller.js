(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference')
        .controller('CurrentPreferenceController', CurrentPreferenceController);

    // @ngInject
    function CurrentPreferenceController($ionicHistory, $state) {
        var cVm = this;
        cVm.goBack = goBack;
        cVm.logOut = logOut;
        cVm.currentPref = currentPref;
        cVm.locationPref = '';
        cVm.cuisine = '';
        cVm.genderPref = '';

        function currentPref() {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                    .once('value')
                    .then(function (userData) {
                        var user = userData.val();
                        console.log(user);
                    });
            } else {
                $state.go('app.login');
            }
        }

        function goBack() {
            $ionicHistory.goBack();
            //var user = firebase.auth().currentUser;
            //if (user) {
            //    $ionicHistory.goBack();
            //} else {
            //    $state.go('app.login');
            //}
        }

        function logOut() {
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
