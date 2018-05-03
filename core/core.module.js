/**
 * Module for connect all core modules
 */
(function () {
    'use strict';
    angular
        .module('app.core', [
            /*
             * Angular modules
             */
            'ngStorage',
            'ngMessages',
            'ngMaterial',
            'webcam',
            'ngFileUpload',
            'ngCordova',
            'toastr',
            'ui.mask',
            /*
             * Our reusable cross app code modules
             */

            /*
             * 3rd Party modules
             */
            'ionic.closePopup',
            'ionic'
        ])
})();
