(function() {
    "use strict";

    angular
        .module('filter.auditDate', [])
        .filter('auditDate', auditDate);

    function auditDate() {
        return function(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYYMMDD')
        }
    }


})();