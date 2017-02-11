(function(angular) {
    'use strict';
    angular
        .module('app.forgotPassword')
        .controller('ForgotPasswordController', ForgotPasswordController);

    // @ngInject
    function ForgotPasswordController() {
        var forgotVm = this;
    }
}(angular));
