(function () {
    "use strict";

    angular
        .module('app')
        .controller('ShipperSignature', ShipperSignature);

    ShipperSignature.$inject = ['$scope', '$localStorage', '$state', 'user', 'audit'];

    function ShipperSignature($scope, $localStorage, $state, user, audit) {

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
            vm.selectedKriterien = {id: 2, question: 'Frachtführer: Quittieren des Protokolls', extension: 'png', answer: 'Bestätigung', process_type: 4, start_date: moment().format('YYYY-MM-DD HH:mm:ss')};
            if (vm.selectedKriterien.question != vm.audit.kriterien[vm.audit.kriterien.length - 1].question) {
                vm.audit.kriterien.push(vm.selectedKriterien);
            }
            $localStorage.audit = vm.audit
        }

        function acceptAnswer(answer) {
            vm.selectedKriterien.signature = $sigdiv_shipper.jSignature("getData")

            if(answer === 'Ja') {

            } else {
                vm.selectedKriterien.answer = 'Nein';
                // vm.selectedKriterien.signature = false;
            }

            vm.selectedKriterien.end_date = moment().format('YYYY-MM-DD HH:mm:ss');
            vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
            $localStorage.audit = vm.audit;
            $localStorage.completedAudit = vm.audit;

            if($localStorage.completedAudits) {
                if($localStorage.audit) {
                    if(!$localStorage.audit.end_date) $localStorage.audit.end_date =  moment().format('YYYY-MM-DD HH:mm:ss');
                    $localStorage.completedAudits.push(vm.audit);
                    delete $localStorage.audit;

                }
            } else {
                if($localStorage.audit) {
                    if(!$localStorage.audit.end_date) $localStorage.audit.end_date =  moment().format('YYYY-MM-DD HH:mm:ss');
                    $localStorage.completedAudits = [vm.audit];
                    delete $localStorage.audit;
                }
            }
            audit.sendAudits();
            $state.go('app.congrats');
        }

        var $tools_shipper = $('#shipper-tools'),
            $sigdiv_shipper = $("#shipper-signature").jSignature({'UndoButton': false});
        $("#shipper-signature").bind('change', function(e){
            vm.isGetSignature = true;
            $scope.safeApply();
        })
        $('<input type="button" value="Reset">').bind('click', function (e) {
            vm.isGetSignature = false;
            $scope.safeApply();

            $sigdiv_shipper.jSignature('reset')
        }).appendTo($tools_shipper)


    }
})();
