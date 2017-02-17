(function(angular) {
    'use strict';
    angular
        .module('app.forgotPassword')
        .controller('ForgotPasswordController', ForgotPasswordController);

    // @ngInject
    function ForgotPasswordController($firebaseObject, $firebaseAuth, $state, $ionicHistory) {
        var forgotVm = this;
        forgotVm.rootRef = firebase.database().ref();

        forgotVm.firebaseObject = $firebaseObject(forgotVm.rootRef);

        forgotVm.resetPasswordEmail = resetPasswordEmail;
        forgotVm.goBack = goBack;

        function resetPasswordEmail() {
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(forgotVm.data.email).then(function() {
                $state.go('app.login');
            }, function(error) {
                alert(error.message);
            });
        }

        function goBack() {
            $ionicHistory.goBack();
        }
    }
}(angular));
