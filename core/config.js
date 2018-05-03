(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicLoadingConfig', '$ionicConfigProvider', '$mdGestureProvider'];

    /**
     * Function for configurate angular app
     */
    function mainConfig($stateProvider, $urlRouterProvider, $ionicLoadingConfig, $ionicConfigProvider, $mdGestureProvider) {

        // $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $mdGestureProvider.skipClickHijack();


        /**
         * Configuring ionic loader
         */
        angular.extend($ionicLoadingConfig, {
            noBackdrop: true
        });

        /**
         * Configuring state provider
         */
        $stateProvider
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'views/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/signup',
                cache: false,
                templateUrl: 'views/signup/signup.html',
                controller: 'Signup',
                controllerAs: 'vm'
            })
            .state('password', {
                url: '/password',
                cache: false,
                templateUrl: 'views/reset_password/reset_password.html',
                controller: 'Password',
                controllerAs: 'vm'
            })
            .state('app', {
                url: '/app',
                cache: false,
                abstract: true,
                templateUrl: 'views/menu/menu.html',
                controller: 'AppCtrl',
                controllerAs: 'vm'
            })
            .state('app.main', {
                url: '/main',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/main/main.html',
                        controller: 'Main',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/dashboard/dashboard.html',
                        controller: 'Dashboard',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.referenz_page', {
                url: '/referenz-page/:auditId',

                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/reference_page/reference_page.html',
                        controller: 'ReferenzPage',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.kriterien', {
                url: '/kriterien/:id',
                cache: false,
                params: {
                    id: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/kriterien/kriterien.html',
                        controller: 'Kriterien',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.repeat_kriterien', {
                url: '/repeat-kriterien/:id',
                cache: false,
                params: {
                    id: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/repeat_kriterien/repeat_kriterien.html',
                        controller: 'RepeatKriterien',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.car_number', {
                url: '/car-number',
                cache: false,
                params: {
                    id: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/end_step/car_number/car_number.html',
                        controller: 'CarNumber',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.loader_signature', {
                url: '/loader-signature',
                cache: false,
                params: {
                    id: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/end_step/loader_signature/loader_signature.html',
                        controller: 'LoaderSignature',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.shipper_signature', {
                url: '/shipper-signature',
                cache: false,
                params: {
                    id: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/end_step/shipper_signature/shipper_signature.html',
                        controller: 'ShipperSignature',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.congrats', {
                url: '/congrats/:defeat',
                cache: false,
                params: {
                    defeat: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'views/congrats/congrats.html',
                        controller: 'Congrats',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');
    }


})();

