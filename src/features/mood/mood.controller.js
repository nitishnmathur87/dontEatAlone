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
            firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine)
                .once('value')
                .then(function(snapshot) {
                    var userExists = _.findKey(snapshot.val(), { uid: firebase.auth().currentUser.uid });

                    if (userExists) {
                        firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location' + mVm.preference.location + '/' + userExists ).update(obj)
                    } else {
                        firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location' + mVm.preference.location).push(obj);
                    }
                    firebase.database().ref('genderPref/' + mVm.preference.genderPreference + '/cuisine/' + mVm.preference.cuisine + '/location' + mVm.preference.location)
                        .once('value')
                        .then(function(snapshot) {
                            if (_.size(snapshot.val()) > 1) {
                                console.log('match found');
                            } else {
                                console.log('still looking');
                            }
                        });
                });

            //logic to find a partner
            //findAll with matching criteria and push notification if match found.
        }
    }
}(angular));
