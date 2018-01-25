(function () {
    "use strict";

    angular
        .module('app')
        .controller('Congrats', Congrats);

    Congrats.$inject = ['$localStorage', '$stateParams', 'audit', 'user', '$state'];

    function Congrats($localStorage, $stateParams, audit, user, $state) {

        var vm = this;



        vm.goToDashboard = goToDashboard;

        function goToDashboard() {
            if($localStorage.audit) {
                delete $localStorage.audit;
            }
            if($localStorage.completedAudit) {
                delete $localStorage.completedAudit;
            }
            $state.go('app.dashboard');
        }
        user.disableBackButton();

        if($localStorage.completedAudit) {
            if(!$localStorage.completedAudit.end_date) {
                $localStorage.completedAudit.end_date = moment().format('YYYY-MM-DD HH:mm:ss');
            }
            vm.audit = $localStorage.completedAudit;

        }
        vm.defeat = $stateParams.defeat;

    }
})();
