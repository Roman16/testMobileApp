;(function () {
    angular.module('directive.signature', [])
        .directive('signature', signature)
        .controller('signature', signatureController)

    signatureController.$inject = ['$scope'];

    function signatureController($scope) {
        var vm = this;

        var $tools = $('#tools'),
            $sigdiv = $('#signature').jSignature({'UndoButton': false});
        $('<input type="button" value="Reset">').bind('click', function (e) {
            $sigdiv.jSignature('reset')
        }).appendTo($tools)
    }

    signature.$inject = ['$filter'];
    function signature($filter) {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'signature as vm',
            scope: {
                signatureId: '='
            },
            template: '<div id="tools"></div><div id="signature"></div>'

        };
    }
})();
