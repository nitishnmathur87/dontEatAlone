(function(angular) {
    'use strict';
    angular
        .module('app.mood')
        .controller('MoodController', MoodController);

    // @ngInject
    function MoodController($state) {
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
                    console.log('user found ', user);
                    if (user.searchPath) { // if user already had a request before
                        // delete the user entry at searchPath
                        console.log('deleting searchPath entry for the user');
                        firebase.database().ref(user.searchPath).remove();
                    }

                    // create entry for the user
                    // if preference and and user gender is opposite
                    if ((_.isEqual(user.gender, 'Male') && _.isEqual(mVm.preference.genderPreference, 'Female')) || (_.isEqual(user.gender, 'Female') && _.isEqual(mVm.preference.genderPreference, 'Male'))) {
                        var oppositeChildRef = firebase.database().ref('genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid);
                        console.log('creating entry for the user ' + oppositeChildRef);
                        oppositeChildRef.set(true);
                        findMatch(firebase.database().ref('genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location));
                        user.searchPath = 'genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid;
                    } else {
                        var genderChildRef = firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid);
                        console.log('creating entry for the user ' + genderChildRef);
                        genderChildRef.set(true);
                        findMatch(firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location));
                        user.searchPath = 'genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid;
                    }

                    // update the searchPath in the user object
                    console.log('updating the user ' + user);
                    firebase.database().ref('users/' + userData.key).update(user);

                    // navigate to app.home.mood.findingMatch state

                    $state.go('app.home.mood.findingMatch');
                });
        }

        function findMatch(ref) {
            ref.once('value')
                .then(function (matchingUsers) {
                    mVm.statusMessage = '';
                    if (matchingUsers.numChildren() > 1) {
                        mVm.statusMessage = 'match found';
                    } else {
                        mVm.statusMessage = 'Finding you a match. Please be patient...';
                    }
                });
        }
    }
}(angular));
