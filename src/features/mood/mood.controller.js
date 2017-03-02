(function(angular) {
    'use strict';
    angular
        .module('app.mood')
        .controller('MoodController', MoodController);

    // @ngInject
    function MoodController($scope, $state, $window, $cordovaDialogs) {
        var mVm = this;
        mVm.preference = {};
        mVm.searchPartners = searchPartners;
        mVm.statusMessage = '';
        mVm.logOut = logOut;

        function searchPartners() {
            var user = firebase.auth().currentUser;

            $window.cordova.plugins.notification.local.on("trigger", function (notification, state) {
                $cordovaDialogs.alert(notification.text, notification.title, 'Okay').
                    then(function() {

                    });
            });
            if (user) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                    .once('value')
                    .then(function (userData) {
                        var user = userData.val();

                        if (user.searchPath) { // if user already had a request before
                            // delete the user entry at searchPath
                            firebase.database().ref(user.searchPath).remove();
                        }

                        // create entry for the user
                        // if preference and and user gender is opposite
                        if ((_.isEqual(user.gender, 'Male') && _.isEqual(mVm.preference.genderPreference, 'Female')) || (_.isEqual(user.gender, 'Female') && _.isEqual(mVm.preference.genderPreference, 'Male'))) {
                            var oppositeChildRef = firebase.database().ref('genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid);

                            oppositeChildRef.set(true);
                            findMatch(firebase.database().ref('genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location));
                            user.searchPath = 'genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid;
                        } else {
                            var genderChildRef = firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid);

                            genderChildRef.set(true);
                            findMatch(firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location));
                            user.searchPath = 'genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + firebase.auth().currentUser.uid;
                        }

                        // update the searchPath in the user object
                        firebase.database().ref('users/' + userData.key).update(user);

                        // navigate to app.home.mood.findingMatch state

                        $state.go('app.home.mood.findingMatch');
                    });
            } else {
                $state.go('app.login');
            }
        }

        function findMatch(ref) {
            ref.once('value')
                .then(function (matchingUsers) {
                    $scope.$watch('matchingUsers', function(oldValue, newValue) {
                        console.log(oldValue, newValue);
                        mVm.statusMessage = '';
                        if (matchingUsers.numChildren() > 1) {
                            mVm.statusMessage = 'match found';
                            cordova.plugins.notification.local.schedule({
                                id         : 2,
                                title      : 'Match Found',
                                text       : 'Please contact your match and enjoy your meal',
                                sound      : null,
                                autoClear  : false,
                                at         : new Date()
                            });
                        } else {
                            mVm.statusMessage = 'Finding you a match. Please be patient...';
                        }
                    });
                });
        }

        function logOut() {
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
