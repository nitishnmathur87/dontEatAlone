(function(angular) {
    'use strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    // @ngInject
    function HomeController($ionicHistory, $state) {
        var hVm = this;
        hVm.goBack = goBack;
        hVm.logout = logout;
        hVm.checkPage = checkPage;

        function checkPage() {
            if ($state.current.name == 'app.home.mood.whatToEat') {
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

        function logout() {
            console.log('loggin out');
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
