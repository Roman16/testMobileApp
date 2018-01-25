/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                // var baseUrl = 'http://myagro/api/web/v1/';
                // var baseUrl = 'http://departure-control.grassbusinesslabs.tk/api/web/v1/';
                var baseUrl = 'http://dc-app.de/api/web/v1/';

                // var baseUrl = 'http://192.168.0.149/api/web/v1/';
                return {

                    user: {
                        login:          baseUrl + 'user/app-login',
                        check_code:     baseUrl + 'user/check'
                    },
                    audit: {
                        all:            baseUrl + 'audit/all',
                        create:         baseUrl + 'user-audit/create'
                    }

                };
            }
        ]);
})();
