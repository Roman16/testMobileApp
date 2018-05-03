(function () {
    "use strict";

    angular
        .module('app')
        .controller('LoaderSignature', LoaderSignature);

    LoaderSignature.$inject = ['user', '$localStorage', '$state', '$scope', '$timeout'];

    function LoaderSignature(user, $localStorage, $state, $scope, $timeout) {

        var vm = this;

        user.disableBackButton();

        init();

        vm.acceptAnswer = acceptAnswer;

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

        function init() {
            vm.audit = $localStorage.audit;
            vm.selectedKriterien = {id: 1, question: 'Verlader: Quittieren des Protokolls', answer: 'Bestätigung', extension: 'png', process_type: 4, start_date: moment().format('YYYY-MM-DD HH:mm:ss')};
            if (vm.selectedKriterien.question != vm.audit.kriterien[vm.audit.kriterien.length - 1].question) {
                vm.audit.kriterien.push(vm.selectedKriterien);
            }
            $localStorage.audit = vm.audit

        }

        function acceptAnswer(answer) {
            vm.selectedKriterien.signature = $sigdiv.jSignature("getData");

            if (answer === 'Ja') {
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = vm.audit;
                $state.go('app.shipper_signature');


            } else {
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = vm.audit;
                $state.go('app.congrats');
            }
        }

        var $tools = $('#loader-tools'),
            $sigdiv = $("#loader-signature").jSignature({'UndoButton': false});

        $("#loader-signature").bind('change', function(e){
            vm.isGetSignature = true;
            $scope.safeApply();
        })

        $('<input type="button" value="Reset">').bind('click', function (e) {
            vm.isGetSignature = false;
            $scope.safeApply();
            $sigdiv.jSignature('reset')
        }).appendTo($tools)


    }
})();
