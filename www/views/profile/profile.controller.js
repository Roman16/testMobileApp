(function () {
    "use strict";

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['$rootScope', '$state', 'user', '$sessionStorage'];

    function Profile($rootScope, $state, user, $sessionStorage) {

        var vm = this;

        vm.saveProfile = saveProfile;
        vm.getPhoto = getPhoto;

            user.self({
                id: $sessionStorage.id
            })
                .then(function (res) {
                    vm.data = res;
                });

        function saveProfile() {
                user.update({
                    first_name: vm.data.first_name,
                    last_name: vm.data.last_name,
                    phone: vm.data.phone,
                    file: vm.data.photo
                })
                    .then(function (res) {
                        console.log(res);
                        //vm.data.photo = null;
                    });
        }

        function getPhoto(data) {
            console.log({
                file: data[0]
            });
        }
    }
})();
