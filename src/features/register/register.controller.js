(function(angular) {
    'use strict';
    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    // @ngInject
    function RegisterController($state) {
        var registerVm = this;
        registerVm.gotoHome = gotoHome;

        function gotoHome() {
            console.log('Home page');
            $state.go('app.home.mood.whatToEat');
        }
    }
}(angular));
