(function(angular) {
    'use strict';
    angular
        .module('app.forgotPassword')
        .controller('ForgotPasswordController', ForgotPasswordController);

    // @ngInject
    function ForgotPasswordController($firebaseObject, $firebaseAuth, $state) {
        var forgotVm = this;
        forgotVm.rootRef = firebase.database().ref();

        forgotVm.firebaseObject = $firebaseObject(forgotVm.rootRef);

        forgotVm.resetPasswordEmail = resetPasswordEmail;

        function resetPasswordEmail() {
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(forgotVm.data.email).then(function() {
                $state.go('app.login');
            }, function(error) {
                console.log(error.message);
            });
        }
    }
}(angular));
