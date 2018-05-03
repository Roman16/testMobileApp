/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$rootScope', '$state', '$ionicHistory', '$localStorage', 'user', '$sessionStorage'];

    function Dashboard($rootScope, $state, $ionicHistory, $localStorage, user, $sessionStorage) {

        var vm = this;

        vm.user = {
            name: $localStorage.username
        }

       user.disableBackButton();

        vm.logout = logout;

        function logout() {
            delete $sessionStorage.auth_key;
            delete $localStorage.auth_key;
            delete $localStorage.username;
            $state.go('login');
        }
    }
})();
