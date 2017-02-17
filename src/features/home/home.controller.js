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

        function goBack() {
            $ionicHistory.goBack();
        }

        function logout() {
            console.log('loggin out');
            firebase.auth().signOut().then(function() {
                $state.go('app.login');
            })
        }
    }
}(angular));
