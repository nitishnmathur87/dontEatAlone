(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference')
        .controller('CurrentPreferenceController', CurrentPreferenceController);

    // @ngInject
    function CurrentPreferenceController($ionicHistory, $state) {
        console.log('in current pref controller');
        var cVm = this;
        cVm.locationPref = '';
        cVm.cuisinePref = '';
        cVm.genderPref = '';
        cVm.searchPath = [];

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
    }
}(angular));
