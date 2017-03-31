(function(angular) {
    'use strict';
    angular
        .module('app.aboutApp')
        .controller('AboutAppController', AboutAppController);

    // @ngInject
    function AboutAppController($state) {
        var aVm = this;
    }
}(angular));
