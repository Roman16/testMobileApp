/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.audit', [])
        .service('audit', audit);

    audit.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService'];

    function audit(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService) {

        return {
            all: all,
            create: create,
            sendAudits: sendAudits

        };


        function all(data) {
            return http.get(url.audit.all, data)
                .then(function(res) {
                    $localStorage.audits = res.models;
                    return res;
                })
        }

        function create(data) {
            return http.post(url.audit.create, data)
                .then(function (res) {
                    return res;
                });
        }

        function removeAudit(start_date, name) {
            angular.forEach($localStorage.completedAudits, function(item, index) {
                if(item.start_date === start_date) {
                    var str = name + ' has been saved';
                    alert(str)

                    $localStorage.completedAudits.splice(index, 1);
                }

            })

        }

        function sendAudits() {
            console.log($localStorage.completedAudits)
            // var i = 0;
            // var audits = angular.copy($localStorage.completedAudits);
            // if (audits && audits.length ) {
                // angular.forEach(audits, function(item) {
                    create($localStorage.completedAudits)
                        .then(function(res) {
                            $localStorage.completedAudits = [];
                            // removeAudit(res[0].start_date, res[0].name)
                        })
                // })
            // }


        }


    }
})();