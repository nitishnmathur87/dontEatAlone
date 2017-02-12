(function(angular) {
    'use strict';
    angular
        .module('app.mood', [])
        .config(dashConfig);

    // @ngInject
    function dashConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.home.mood', {
                url: '/mood',
                abstract: true,
                views: {
                    'moodView@app.home': {
                        templateUrl: 'features/mood/mood.html',
                        controller: 'MoodController as mVm'
                    }
                },
                data: {
                    authenticate: false,
                    preference: {}
                },
                resolve: {
                    preference: function() {
                        return {};
                    }
                }
            })
            .state('app.home.mood.whatToEat', {
                url: '/what-to-eat',
                views: {
                    'moodChildView': {
                        templateUrl: 'components/partials/what-to-eat.html'
                    }
                },
                data: {
                    authenticate: false
                }
            })
            .state('app.home.mood.locationPreference', {
                url: '/location-preference',
                views: {
                    'moodChildView': {
                        templateUrl: 'components/partials/location-preference.html'
                    }
                },
                data: {
                    authenticate: false
                }
            })
            .state('app.home.mood.genderPreference', {
                url: '/gender-preference',
                views: {
                    'moodChildView': {
                        templateUrl: 'components/partials/gender-preference.html'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
