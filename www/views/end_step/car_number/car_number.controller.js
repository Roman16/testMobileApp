(function () {
    "use strict";

    angular
        .module('app')
        .controller('CarNumber', CarNumber);

    CarNumber.$inject = ['user', '$localStorage', '$state', '$sessionStorage', '$timeout'];

    function CarNumber(user, $localStorage, $state, $sessionStorage, $timeout) {

        var vm = this;
        vm.plateRegExp = '^[a-zA-Z]{1,3}-[a-zA-Z]{1,2} \d{1,4}$';
        user.disableBackButton();

        init();

        vm.acceptAnswer = acceptAnswer;
        vm.changeToUpperCase = changeToUpperCase;

        function changeToUpperCase(string) {
            console.log(string, string.toUpperCase())
            return string.toUpperCase();
        }

        function init() {
            vm.audit = $localStorage.audit;
            vm.selectedKriterien = {
                id: 1,
                question: 'Kennzeichen des Transportmittels eingeben',
                process_type: 1,
                answer: 'Bestätigung',
                start_date: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            if (vm.selectedKriterien.question != vm.audit.kriterien[vm.audit.kriterien.length - 1].question) {
                vm.audit.kriterien.push(vm.selectedKriterien);
            }
            $localStorage.audit = vm.audit

        }

        function acceptAnswer(answer) {
            if (answer === 'Ja') {
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = vm.audit;
                $state.go('app.loader_signature');
            } else {
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = vm.audit;
                $state.go('app.congrats');
            }
        }
    }
})();
