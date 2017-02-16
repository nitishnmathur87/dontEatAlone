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

        function searchPartners() {
            console.log(mVm.preference);
            var obj = {
                uid: firebase.auth().currentUser.uid
            };
            firebase.database().ref('genderPref/')
                .once('value')
                .then(function(snapshot) {
                    if(snapshot.hasChildren()) {
                        snapshot.forEach(function(childSnapshot) {
                            if (childSnapshot.hasChildren()) {
                                childSnapshot.forEach(function(subChildSnapshot) {
                                    if (subChildSnapshot.hasChildren()) {
                                        subChildSnapshot.forEach(function(subSubChildSnapshot) {
                                            if (subSubChildSnapshot.hasChildren()) {
                                                subSubChildSnapshot.forEach(function(subSubSubChildSnapshot) {
                                                    if (subSubSubChildSnapshot.hasChildren()) {
                                                        subSubSubChildSnapshot.forEach(function(subsSubSubSubChildSnapshot) {
                                                            if (_.has(subsSubSubSubChildSnapshot.val(), { uid: firebase.auth().currentUser.uid })) {
                                                                var key = subsSubSubSubChildSnapshot.key;
                                                                var path = subsSubSubSubChildSnapshot.ref().toString();
                                                                console.log(path);

                                                                firebase.database().ref(path).update(null);
                                                            }
                                                            firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location).push(obj);
                                                        });
                                                    }
                                                });
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location).push(obj);
                    }
                    //
                    //if (userExists) {
                    //    firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location + '/' + userExists ).update(obj)
                    //} else {
                    //    firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location).push(obj);
                    //}
                    //firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location/' + mVm.preference.location)
                    //    .once('value')
                    //    .then(function(snapshot) {
                    //        if (_.size(snapshot.val()) > 1) {
                    //            console.log('match found');
                    //            //send notification
                    //        } else {
                    //            console.log('still looking');
                    //        }
                    //    });
                });
        }
    }
}(angular));
