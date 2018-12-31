(function ( $ ) {
    $.fn.greenify = function( size ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            // color: "#556b2f",
            // backgroundColor: "white"
        }, size );
 
        // Greenify the collection based on the settings variable.
        return this.css({
            // color: settings.color,
            // backgroundColor: settings.backgroundColor
        });
    };
}( jQuery ));


// The default value for color of #556b2f gets overridden by $.extend() to be orange.
// $( "div" ).greenify({
//     color: "orange"
// });