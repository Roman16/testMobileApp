/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$rootScope', '$state', 'audit', 'user', '$localStorage', '$scope'];

    function Login($rootScope, $state, audit, user, $localStorage, $scope) {

        $rootScope.page = {};

        var vm = this;
        vm.login = login;
        vm.signup = signup;
        vm.use_code = use_code;

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };


        vm.data = {};

        if ($localStorage.activation_code) {
            vm.showLogIn = true;
            if ($localStorage.auth_key) {
                $state.go('app.dashboard');
            }
        } else {
            vm.showLogIn = false;
        }

        function use_code(code) {
            user.check_code({activation_code: code})
                .then(function(res){
                    $localStorage.activation_code = code;
                    vm.showLogIn = true;
                    $scope.safeApply();
                })
        }

        function login(data) {
            vm.data.activation_code = $localStorage.activation_code;
            user.login(data)
                .then(function (res) {
                    if (res[0].auth_key) {
                        $scope.safeApply();

                        $localStorage.auth_key = res[0].auth_key;
                        $localStorage.username = res[0].username;
                        audit.all();
                        $state.go('app.dashboard');
                    }
                });
        }

        function signup() {
            $state.go('signup');
        }

    }
})();
