(function(angular) {
    'use strict';
    angular
        .module('app.mood')
        .controller('MoodController', MoodController);

    // @ngInject
    function MoodController() {
        var mVm = this;
        mVm.preference = {};
        mVm.searchPartners = searchPartners;

        function searchPartners() {
            console.log(mVm.preference);
        }
    }
}(angular));
