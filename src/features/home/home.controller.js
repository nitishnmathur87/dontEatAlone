(function(angular) {
    'use strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    // @ngInject
    function HomeController($ionicHistory, $state, $window, $cordovaDialogs) {
        var hVm = this;
        hVm.goBack = goBack;
        hVm.logOut = logOut;
        hVm.checkPage = checkPage;
        hVm.redirectPageCurrentPref = redirectPageCurrentPref;
        hVm.redirectPageAboutApp = redirectPageAboutApp;
        hVm.redirectPageMood = redirectPageMood;

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

        function checkPage() {
            if ($state.current.name == 'app.home.mood.whatToEat' ||
                $state.current.name == 'app.currentPreference' ||
                $state.current.name == 'app.aboutApp' ||
                $state.current.name == 'app.home.mood.match' ||
                $state.current.name == 'app.home.mood.findingMatch') {
                return true;
            }
        }

        function goBack() {
            var user = firebase.auth().currentUser;

            if (user) {
                $ionicHistory.goBack();
            } else {
                $state.go('app.login');
            }
        }

        function logOut() {
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }

        $window.cordova.plugins.notification.local.on("trigger", function (notification, state) {
            $cordovaDialogs.alert(notification.text, notification.title, 'Okay')
                .then(function() {
                    $state.go('app.home.mood.match');
                });
        });
    }
}(angular));
