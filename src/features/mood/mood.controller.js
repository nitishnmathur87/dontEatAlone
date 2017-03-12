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
        mVm.logOut = logOut;
        mVm.matchingUsers = [];
        var userBaseReference;

        function searchPartners() {
            var user = firebase.auth().currentUser;


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
                            userBaseReference = 'genderPref/opposite/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location;
                            var oppositeChildRef = firebase.database().ref(userBaseReference + '/' + firebase.auth().currentUser.uid);

                            oppositeChildRef.set(true);
                            findMatch(firebase.database().ref(userBaseReference));
                            user.searchPath = userBaseReference + '/' + firebase.auth().currentUser.uid;
                        } else {
                            userBaseReference = 'genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location;
                            var genderChildRef = firebase.database().ref(userBaseReference + '/' + firebase.auth().currentUser.uid);

                            genderChildRef.set(true);
                            findMatch(firebase.database().ref(userBaseReference));
                            user.searchPath = userBaseReference + '/' + firebase.auth().currentUser.uid;
                        }

                        // update the searchPath in the user object
                        firebase.database().ref('users/' + userData.key).update(user);

                        // navigate to app.home.mood.findingMatch state

                        //$state.go('app.home.mood.findingMatch');
                    });
            } else {
                $state.go('app.login');
            }
        }

        function findMatch(ref) {
            var messageCount = 0;
            ref.on('value', function (matchingUsers) {
                mVm.statusMessage = '';
                mVm.matchingUsers = [];
                if (matchingUsers.numChildren() > 1) {
                    messageCount++;
                    if (messageCount == 1) {
                        var uids = _.difference(_.keysIn(matchingUsers.val()), [firebase.auth().currentUser.uid]);
                        _.forEach(uids, function(uid) {
                            firebase.database().ref('users/' + uid)
                                .once('value')
                                .then(function(user) {
                                    mVm.matchingUsers.push(user.val());
                                    console.log(mVm.matchingUsers);
                                });
                        });
                        mVm.statusMessage = 'match found';
                        cordova.plugins.notification.local.schedule({
                            id         : Math.round(Math.random() * 10000),
                            title      : 'Match Found',
                            text       : 'Please contact your match and enjoy your meal',
                            sound      : null,
                            autoClear  : false,
                            at         : new Date()
                        });
                    }
                } else {
                    mVm.statusMessage = 'Finding you a match. Please be patient...';
                }
            });
        }

        function logOut() {
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
