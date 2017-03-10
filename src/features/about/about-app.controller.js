(function(angular) {
    'use strict';
    angular
        .module('app.aboutApp')
        .controller('AboutAppController', AboutAppController);

    // @ngInject
    function AboutAppController($state) {
        var aVm = this;
        aVm.redirectPageMood = redirectPageMood;
        aVm.redirectPageAboutApp = redirectPageAboutApp;
        aVm.redirectPageCurrentPref = redirectPageCurrentPref;
        aVm.logOut = logOut;

        function redirectPageCurrentPref() {
            if (firebase.auth().currentUser) {
                $state.go('app.currentPreference');
            } else {
                $state.go('app.login');
            }
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

        function logOut() {
            if (firebase.auth().currentUser) {
                $state.go('app.aboutApp');
            } else {
                $state.go('app.login');
            }
        }

    }
}(angular));
