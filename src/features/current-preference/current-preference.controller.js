(function(angular) {
    'use strict';
    angular
        .module('app.currentPreference')
        .controller('CurrentPreferenceController', CurrentPreferenceController);

    // @ngInject
    function CurrentPreferenceController($state) {
        var cVm = this;
        cVm.locationPref = '';
        cVm.cuisinePref = '';
        cVm.genderPref = '';
        cVm.searchPathArray = [];
        //cVm.deletePref = deletePref;

        if (firebase.auth().currentUser) {
            if (firebase.database().ref('users/' + firebase.auth().currentUser.uid) !=null) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                    .once('value')
                    .then(function (userData) {
                        var user = userData.val();
                        cVm.searchPathArray = user.searchPath.split('/');
                        console.log(cVm.searchPathArray);
                        cVm.genderPref = cVm.searchPathArray[1];
                        cVm.cuisinePref = cVm.searchPathArray[3];
                        cVm.locationPref = cVm.searchPathArray[5];
                    }).catch(function () {
                        alert("You currently do not have any preference");
                        $state.go('app.home.mood.whatToEat');
                    });
            }
        } else {
            $state.go('app.login');
        }

        // Need to see why delete is not working
        //function deletePref() {
        //    var user = firebase.auth().currentUser;
        //
        //    if (user) {
        //        firebase.database().ref('users/' + firebase.auth().currentUser.uid)
        //            .once('value')
        //            .then(function (userData) {
        //                var user = userData.val();
        //
        //                if (user.searchPath) { // if user already had a request before
        //                    // delete the user entry at searchPath
        //                    firebase.database().ref(user.searchPath).remove();
        //                }
        //
        //                //// update the searchPath in the user object
        //                //firebase.database().ref('users/' + userData.key).update(user);
        //                $state.go('app.home.mood.whatToEat');
        //            });
        //    }
        //}
    }
}(angular));
