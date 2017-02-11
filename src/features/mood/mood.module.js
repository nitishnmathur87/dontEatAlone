(function(angular) {
    'use strict';
    angular
        .module('app.mood', [])
        .config(dashConfig);

    // @ngInject
    function dashConfig($stateProvider) {
        $stateProvider
            .state('app.home.mood', {
                url: '/mood',
                views: {
                    'moodView@app.home': {
                        templateUrl: 'features/mood/mood.html',
                        controller: 'MoodController as mVm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
