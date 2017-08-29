/* jshint node: true */
/* jshint esversion: 6 */

// Import/require libraries
// -----------------------------------------------------------------------------

import $ from 'jquery';


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

        // Example
        this.example = function() {
            console.log(example());
        };

    };
    return new init();
})();


// Document ready
// -----------------------------------------------------------------------------

$(document).ready(function() {
    app.commons.init.example();
});