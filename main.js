// $.fn.greenify = function() {
//     this.css( "color", "green" );
//     return this;
// }
 
// $( "p" ).greenify().addClass( "greenified" );

// (function ( $ ) {
 
//     var shade = "#556b2f";
 
//     $.fn.greenify = function() {
//         this.css( "color", shade );
//         return this;
//     };
 
// }( jQuery ));

// $( "p" ).greenify().addClass( "greenified" );


(function ( $ ) {
    $.fn.greenify = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );
 
        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
    };
}( jQuery ));


// The default value for color of #556b2f gets overridden by $.extend() to be orange.
$( "div" ).greenify({
    color: "orange"
});


// (function( $ ) {
//     $.fn.showLinkLocation = function() {
 
//         this.filter( "a" ).each(function() {
//             var link = $( this );
//             link.append( " (" + link.attr( "href" ) + ")" );
//         });
//         return this;
//     };
// }( jQuery ));

(function( $ ) {
 
    $.fn.showLinkLocation = function() {
 
        this.filter( "a" ).append(function() {
            return " (" + this.href + ")";
        });
 
        return this;
 
    };
 
}( jQuery ));
 
// Usage example:
$( "a" ).showLinkLocation();





$(document).ready(function(){
    $("p").mouseover(function(){
        $(this).addClass("blue");
    });
    
    $("p").click(function(){
    	if ($(this).hasClass("highlighted"))
    	{
    		$(this).removeClass("highlighted");
    	}
    	else
    	{
    		$(this).addClass("highlighted");
    	}
	});

});


