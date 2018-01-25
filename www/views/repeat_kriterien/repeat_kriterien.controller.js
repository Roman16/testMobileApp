(function () {
    "use strict";

    angular
        .module('app')
        .controller('RepeatKriterien', RepeatKriterien);

    RepeatKriterien.$inject = ['$stateParams', '$localStorage', '$state', '$sessionStorage', 'user', '$scope'];

    function RepeatKriterien($stateParams, $localStorage, $state, $sessionStorage, user, $scope) {

        var vm = this;
        user.disableBackButton();

        vm.images = [];

        $sessionStorage.repeatStepId = $stateParams.id;

        vm.kriterien = [
            {id: 1, question: 'Notizen und Foto', answer: 'Bestätigung', process_type: 3, photo: []},
            {
                id: 2,
                question: 'Wurde das Problem behoben?',
                name: 'Wurde das Problem behoben?',
                check: true,
                process_type: $localStorage.selected.kriteriens[$sessionStorage.stepId].process_type
            },
            {
                id: 3,
                question: 'Das Problem wurde nicht behoben. Bitte bestätigen Sie den Abbruch der Kontrolle',
                name: 'Prüfungen',
                process_type: 5
            }
        ];

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
            $sessionStorage.repeatStepId = $stateParams.id;
            vm.audit = angular.copy($localStorage.audit);
            if ($stateParams.id) {
                angular.forEach(vm.kriterien, function (item) {
                    if (item.id == $stateParams.id) {
                        vm.selectedKriterien = angular.copy(item);
                        vm.selectedKriterien.start_date = moment().format('YYYY-MM-DD HH:mm:ss');
                    }
                })
            }
        }

        function acceptAnswer(answer, confirmation_page, answer_data) {
            $sessionStorage.repeatStepId = $stateParams.id;
            if ($stateParams.id && +$stateParams.id != 3 && !vm.audit.kriterien[vm.audit.kriterien.length - 1].check) {
                // angular.forEach(vm.kriterien, function (item) {
                //     if (item.id == $stateParams.id) {
                        vm.audit.kriterien.push(vm.selectedKriterien);
                    // }
                // })
            }

            if (answer === 'Ja') {

                vm.selectedKriterien.answer = answer_data;
                vm.selectedKriterien.end_date =  moment().format('YYYY-MM-DD HH:mm:ss');
                if (+$sessionStorage.repeatStepId == 1) {
                    vm.audit.kriterien[vm.audit.kriterien.length - 1] = vm.selectedKriterien;
                    $localStorage.audit = vm.audit;

                    $sessionStorage.repeatStepId++;
                    $state.go('app.repeat_kriterien', {id: $sessionStorage.repeatStepId});
                } else {
                    $localStorage.audit = vm.audit;
                    $sessionStorage.stepId++;
                    $state.go('app.kriterien', {id: $sessionStorage.stepId});
                }


            } else {

                if (confirmation_page) {
                    if (confirmation_page === 'confirm') {
                        if(answer_data) {
                            vm.selectedKriterien.answer = answer_data;
                        }
                        $sessionStorage.repeatStepId++;

                        $state.go('app.repeat_kriterien', {id: $sessionStorage.repeatStepId});
                    }
                    if (confirmation_page === 'back') {
                        $sessionStorage.repeatStepId--;
                        $state.go('app.repeat_kriterien', {id: $sessionStorage.repeatStepId});
                    }
                    if (confirmation_page === 'end') {
                        vm.audit.kriterien.push({
                            id: 3,
                            no_type: 2,
                            question: 'Abgebrochen',
                            name: 'Bestätigung',
                            answer: 'Bestätigung',
                            start_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                            process_type: 5
                        });
                        $localStorage.audit = vm.audit;
                        $state.go('app.car_number');
                    }
                }
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
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }
})();
