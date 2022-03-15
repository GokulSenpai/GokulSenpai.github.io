/**
 * Tooltip.js
 * A basic script that applies a mouseover tooltip functionality to all elements of a page that have a data-tooltip attribute
 * Imad Nadkar, http://caliberthemes.com
 *
 * Copyright (C) Imad Nadkar
 * Free to use under the MIT license
 */

var casterToolTips = (function() {
	
	var options = {
		tooltipId: "tooltip",		
		offsetDefault: 15
	};

	return {

		bindToolTips:  function() {

			Array.prototype.forEach.call( document.querySelectorAll( "[data-tooltip]" ), function( elm, idx ) {

				elm.removeEventListener( "mousemove", onElementMouseMove );
				elm.removeEventListener( "mouseout", onElementMouseOut );
				elm.removeEventListener( "mouseover", onElementMouseOver );

				elm.addEventListener("mousemove", onElementMouseMove);
				elm.addEventListener("mouseout", onElementMouseOut);
				elm.addEventListener("mouseover", onElementMouseOver);

			});
			
		}

	}

	function getTooltipElm() {
		return document.querySelector( "#" + options.tooltipId );
	}
	
	function onElementMouseMove( evt ) {

		var tooltipElm = getTooltipElm();

		var offset = options.offsetDefault;
		var scrollY = window.scrollY || window.pageYOffset;
		var scrollX = window.scrollX || window.pageXOffset;
		var tooltipTop = evt.pageY + offset;
		var tooltipLeft = evt.pageX + offset;

		if ( tooltipElm ) {
			tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= window.innerHeight ? (tooltipTop - tooltipElm.offsetHeight - 20) : tooltipTop);
			tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= window.innerWidth ? (tooltipLeft - tooltipElm.offsetWidth - 20) : tooltipLeft);

			tooltipElm.style.top = tooltipTop + "px";
			tooltipElm.style.left = tooltipLeft + "px";
		}
	}

	function onElementMouseOut( evt ) {

		var tooltipElm = getTooltipElm();

		if ( tooltipElm ) {			

			tooltipElm.querySelector( ".entry-desc" ).innerText = '';
			tooltipElm.querySelector( ".entry-title" ).innerText = '';

			tooltipElm.classList.remove( "active" );

			tooltipElm.style.top = "50%";
			tooltipElm.style.left = "50%";

		}
	}

	function onElementMouseOver( evt) {

		var title = this.getAttribute( "data-tooltip-title" );
		var subtitle = this.getAttribute( "data-tooltip-subtitle" );

		var tooltipElm = getTooltipElm();	

		if ( subtitle ) {
			tooltipElm.querySelector( ".entry-desc" ).innerText = subtitle;
		}

		if ( title ) {
			tooltipElm.querySelector( ".entry-title" ).innerText = title;
		}

		tooltipElm.classList.add( "active" );

		gsap.from(tooltipElm, { duration:0.3, width:30, ease:Power2.easeIn, clearProps:"width" });
		
	} 

}());
