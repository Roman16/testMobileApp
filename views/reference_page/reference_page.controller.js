(function () {
    "use strict";

    angular
        .module('app')
        .controller('ReferenzPage', ReferenzPage);

    ReferenzPage.$inject = ['$localStorage', '$state', 'user', '$ionicPlatform'];

    function ReferenzPage($localStorage, $state, user, $ionicPlatform) {

        var vm = this;
        vm.selected_audit = $localStorage.selected;
        vm.audit = {
            audit_id: $localStorage.selected.id,
            type: $localStorage.selected.type,
            kriterien: [],
            name: ''
        };

        // user.disableBackButton();

        vm.goToKriterien = goToKriterien;

        function goToKriterien() {
            if(vm.form.$invalid) {
                return false;
            }
            vm.audit.kriterien.push({
                question: 'WBP-Rfz. Eingeben. Beginn der Kontrolle?',
                answer: 'Ja',
                process_type: 1,
                data: vm.audit.name,
                start_date:moment().format('YYYY-MM-DD HH:mm:ss')
            });

            vm.audit.start_date = moment().format('YYYY-MM-DD HH:mm:ss');
            $localStorage.audit = vm.audit;
            $state.go('app.kriterien', {id: 0});
        }

    }
})();
