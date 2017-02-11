(function(angular) {
    'use strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    // @ngInject
    function HomeController() {
        var hVm = this;
    }
}(angular));
