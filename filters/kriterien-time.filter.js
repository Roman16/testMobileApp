(function() {
    "use strict";

    angular
        .module('filter.kriterienTime', [])
        .filter('kriterienTime', kriterienTime);

    function kriterienTime() {
        return function(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss')
        }
    }


})();