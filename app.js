/**
 * Function that runs when application start
 * it include services, factories, filters, directives modules
 */
(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'filters.module',
            'factories.module'
        ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$sessionStorage', 'audit', '$rootScope', '$state', '$ionicHistory'];
    function runBlock($ionicPlatform, $localStorage, $sessionStorage, audit, $rootScope, $state, $ionicHistory) {

        /**
         * Function that runs when platform ready
         */

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                document.addEventListener("backbutton", onBackKeyDown, false);
            }

            $ionicPlatform.registerBackButtonAction(function () {
                if (condition) {
                    navigator.app.exitApp();
                } else {
                   alert('back')
                }
            }, 100);

            $ionicPlatform.registerBackButtonAction(function (event) {
                alert('back')

                event.preventDefault();
            }, 100);

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }


            audit.sendAudits()


            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.toState = toState.name;
                });

            /**
             * Check whether the user is authorized
             */


            if ($localStorage.auth_key) {
                // $state.go('app.dashboard');


            } else {
                $state.go('login');
            }

        });

    }
})();
