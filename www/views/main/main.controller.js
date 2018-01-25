(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$localStorage', 'audit', '$state',  '$ionicPlatform'];

    function Main($localStorage, audit, $state, $ionicPlatform) {


        // user.disableBackButton();

        var vm = this;
        vm.audits = $localStorage.audits;

        vm.toReferenz = toReferenz;
        vm.refreshList = refreshList;


        function refreshList() {
            audit.all();
            audit.sendAudits();
            vm.audits = $localStorage.audits;
        }

        function toReferenz(audit) {
            $localStorage.selected = audit;
            if($localStorage.audit) delete $localStorage.audit;

            $state.go("app.referenz_page");
        }

      

    }
})();
