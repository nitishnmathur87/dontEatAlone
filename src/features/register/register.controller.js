(function(angular) {
    'use strict';
    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    // @ngInject
    function RegisterController() {
        var registerVm = this;
        registerVm.gotoHome = gotoHome;

        function gotoHome() {
            console.log('Home page');
        }
    }
}(angular));
