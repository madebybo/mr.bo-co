/**
 * encapsulate all logic related to the awesome homepage scroll 
 */

var contactPage = {
	modules: {
		detectMobile: require('../modules/_detectMobile')
	},

	ui: {
		navBar: document.querySelector('#nav')
	},

	state: {
	},

	props: {
	},

	registerEvents: function() {
		// $(window).on('scroll', this.onScroll.bind(this));
	},

	/**
	 * fortunately, "scroll" event fires for both mobile and desktop, it
	 * is useful to set/update signals that'll be used by both platforms
	 */
	onScroll: function(e) {
	},

	enableFormAnimation: function() {
		// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input .input__field' ) ).forEach( function( inputEl ) {
			// in case the input is already filled..
			if( inputEl.value.trim() !== '' ) {
				$(inputEl.parentNode).addClass('input--filled');
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			$(ev.target.parentNode).addClass('input--filled');
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				$(ev.target.parentNode).removeClass('input--filled');
			}
		}
	},


	init: function() {
		this.registerEvents();
		this.enableFormAnimation();
	}
};

module.exports = contactPage;
