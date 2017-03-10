(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference')
        .controller('CurrentPreferenceController', CurrentPreferenceController);

    // @ngInject
    function CurrentPreferenceController($ionicHistory, $state) {
        var cVm = this;
        cVm.logOut = logOut;
        cVm.locationPref = '';
        cVm.cuisinePref = '';
        cVm.genderPref = '';
        cVm.searchPath = [];
        cVm.redirectPageAboutApp = redirectPageAboutApp;
        cVm.redirectPageMood = redirectPageMood;
        cVm.redirectPageCurrentPref = redirectPageCurrentPref;

        if (firebase.auth().currentUser) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                .once('value')
                .then(function (userData) {
                    var user = userData.val();
                    cVm.searchPathArray = user.searchPath.split('/');
                    console.log(cVm.searchPathArray);
                    cVm.genderPref = cVm.searchPathArray[1];
                    cVm.cuisinePref = cVm.searchPathArray[3];
                    cVm.locationPref = cVm.searchPathArray[5];
                }).catch(function (noPref) {
                    console.log(noPref);
                });
        } else {
            $state.go('app.login');
        }

        function redirectPageMood() {
            if (firebase.auth().currentUser) {
                $state.go('app.home.mood.whatToEat');
            } else {
                $state.go('app.login');
            }
        }

        function redirectPageAboutApp() {
            if (firebase.auth().currentUser) {
                $state.go('app.aboutApp');
            } else {
                $state.go('app.login');
            }
        }

        function redirectPageCurrentPref() {
            if (firebase.auth().currentUser) {
                $state.go('app.currentPreference');
            } else {
                $state.go('app.login');
            }
        }

        function logOut() {
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
