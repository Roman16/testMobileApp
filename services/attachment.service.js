/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.attachment', [])
        .service('attachment', attachment);

    attachment.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService'];

    function attachment(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService) {

        return {
            all: all

        };


        function all(data) {
            return http.get(url.attachment.all, data)
                .then(function(res) {
                    return res;
                })
        }

    }
})();