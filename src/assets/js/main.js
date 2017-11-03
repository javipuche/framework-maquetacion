/* jshint node: true */
/* jshint esversion: 6 */

// Import/require libraries
// -----------------------------------------------------------------------------

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;


// Functions
// -----------------------------------------------------------------------------

// Example

function example () {
    return 'Example function Initialized';
}


// App
// -----------------------------------------------------------------------------

var app = app || {};
app.commons = app.commons || {};
app.commons.init = (function () {
    var init = function () {

        // Toggle Class with data attributes

        this._toggleClass = function() {
            $('.js-toggle-class').click( function (event) {
                event.preventDefault();
                let _target = $(this).data('target');
                let _class = $(this).data('class');
                $(_target).toggleClass(_class);
            });
        };

    };
    return new init();
})();


// Document ready
// -----------------------------------------------------------------------------

$(document).ready(function() {
    app.commons.init._toggleClass();
});