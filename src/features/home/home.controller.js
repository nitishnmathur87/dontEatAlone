(function(angular) {
    'use strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    // @ngInject
    function HomeController($ionicHistory) {
        var hVm = this;
        hVm.goBack = goBack;

        function goBack() {
            $ionicHistory.goBack();
        }
    }
}(angular));
