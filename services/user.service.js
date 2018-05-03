/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService', '$ionicPlatform'];

    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService, $ionicPlatform) {

        return {
            login: login,
            logout: logout,
            check_code: check_code,
            checkProfileComplete: checkProfileComplete,
            disableBackButton:disableBackButton
        };


        function disableBackButton() {
            $ionicPlatform.registerBackButtonAction(function (event) {
                event.preventDefault();
            }, 100);
        }

        /**
         * Function for logout user
         */
        function logout() {
            delete $rootScope.user;
            delete $sessionStorage.auth_key;
            delete $localStorage.auth_key;
        }

        function login(data) {

                return http.post(url.user.login, data)
                    .then(function (res) {
                        return res;
                    });


        }
        function check_code(data) {
                return http.post(url.user.check_code, data)
                    .then(function (res) {
                        return res;
                    });


        }


        /**
         * Function for checking user profile complete
         */
        function checkProfileComplete() {
            if (true) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Інформація користувача',
                    template: 'Будь-ласка заповніть інформацію про Вас',
                    cssClass: 'checkProfileComplete',
                    buttons: [{
                        text: 'Відмінити'
                    }, {
                        text: '<b>Профіль</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $state.go('app.profile');
                        }
                    }]
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        return true;
                    } else {
                        return false;
                    }
                });
                IonicClosePopupService.register(confirmPopup);

                return false;
            } else {
                return true;
            }
        }
    }
})();