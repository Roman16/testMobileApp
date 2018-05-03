(function () {
    "use strict";

    angular
        .module('app')
        .controller('Kriterien', Kriterien);

    Kriterien.$inject = ['$stateParams', '$localStorage', '$state', '$sessionStorage', 'user', '$scope'];

    function Kriterien($stateParams, $localStorage, $state, $sessionStorage, user, $scope) {

        var vm = this;
        vm.selected_audit = $localStorage.selected;

        user.disableBackButton();

        vm.images = [];

        $sessionStorage.stepId = $stateParams.id;

        vm.step = +$stateParams.id;
        vm.kriterien = $localStorage.selected.kriteriens;

        init();

        vm.acceptAnswer = acceptAnswer;
        // vm.previewFile = previewFile;
        //
        // function previewFile() {
        //     var preview = document.querySelector('img');
        //     var file    = document.querySelector('input[type=file]').files[0];
        //     var reader  = new FileReader();
        //
        //     reader.addEventListener("load", function () {
        //         preview.src = reader.result;
        //         vm.selectedKriterien.photo = reader.result;
        //         $scope.safeApply();
        //         vm.selectedKriterien.extension = 'jpeg';
        //     }, false);
        //
        //     if (file) {
        //         reader.readAsDataURL(file);
        //
        //     }
        //
        // }

        function init() {
            if ($stateParams.id && +$stateParams.id < vm.kriterien.length) {
                vm.audit = angular.copy($localStorage.audit);
                vm.audit.kriterien.push(vm.kriterien[$stateParams.id]);
                vm.selectedKriterien = angular.copy(vm.kriterien[$stateParams.id]);
                vm.selectedKriterien.start_date = moment().format('YYYY-MM-DD HH:mm:ss');
                // $localStorage.audit = angular.copy(vm.audit);

            } else {
                $state.go('app.car_number');

            }
        }

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        function acceptAnswer(answer, answer_data) {

            vm.selectedKriterien.answer = answer_data;
            vm.selectedKriterien.end_date = moment().format('YYYY-MM-DD HH:mm:ss');
            if (answer === 'Ja') {
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = angular.copy(vm.audit);

                if (vm.kriterien[$sessionStorage.stepId].id != vm.kriterien[vm.kriterien.length - 1].id) {
                    $sessionStorage.stepId++;
                    $state.go('app.kriterien', {id: $sessionStorage.stepId});
                } else {
                    $state.go('app.car_number');
                }


            } else {
                vm.selectedKriterien.no_type = 1;
                vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                $localStorage.audit = vm.audit;
                $state.go('app.repeat_kriterien', {id: 1})
            }
        }


        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
        }

        function onPhotoDataSuccess(imageData) {
            vm.selectedKriterien.photo.push("data:image/jpeg;base64," + imageData);
            $scope.safeApply();
            vm.selectedKriterien.extension = 'jpeg';
        }

        vm.capturePhoto = function () {
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: destinationType.DATA_URL
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }
})();
