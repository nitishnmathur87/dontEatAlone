(function(angular) {
    'use strict';
    angular
        .module('app.mood')
        .controller('MoodController', MoodController);

    // @ngInject
    function MoodController() {
        var mVm = this;
        mVm.preference = {};
        mVm.searchPartners = searchPartners;
        mVm.statusMessage = '';

        function searchPartners() {
            console.log(mVm.preference);
            var obj = {
                uid: firebase.auth().currentUser.uid
            };
            firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                .once('value')
                .then(function (userData) {
                    var user = userData.val();
                    if (user.searchPath) { // if user already had a request before
                        // delete the user entry at searchPath
                        firebase.database().ref(user.searchPath).remove();
                    }

                    // create entry for the user
                    firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid).set(true);
                    firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location)
                        .once('value')
                        .then(function (matchingUsers) {
                            if (matchingUsers.numChildren() > 1) {
                                mVm.statusMessage = 'match found';
                            } else {
                                mVm.statusMessage = 'Finding you a match. Please be patient...';
                            }
                        });

                    // update the searchPath in the user object
                    user.searchPath = 'genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/'+ firebase.auth().currentUser.uid;
                    firebase.database().ref('users/' + userData.key).update(user);
                });
        }
    }
}(angular));
