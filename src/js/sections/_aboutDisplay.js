/**
 * encapsulate all logic related to the awesome homepage scroll 
 */

var aboutDisplay = {
	modules: {
		detectMobile: require('../modules/_detectMobile'),
		setComponentsHeight: require('../modules/_setComponentsHeight')
	},

	ui: {
		navBar: document.querySelector('#nav'),
		bio: document.querySelector('.bio'),
		greeting: document.querySelector('.greeting'),
		paragraphs: document.querySelectorAll('.bio p')
	},

	state: {
		activeSection: 0
	},

	props: {
		greetingTitles: [],
		disappearThreshold: null
	},

	// TODO: use throttle for scroll and touchmove?
	registerEvents: function() {
		$(window).on('scroll', this.onScroll.bind(this));
		// $(window).on('touchstart', this.onTouchStart.bind(this));
		// $(window).on('touchmove', this.onTouchMove.bind(this));
		// $(window).on('touchend', this.onTouchEnd.bind(this));
	},


	setInitValues: function() {
		this.props.greetingTitles = this.ui.greeting.dataset.keywords.split('@');
		this.props.disappearThreshold = $(this.ui.greeting).outerHeight() + $(this.ui.navBar).outerHeight();
	},


	setBioDimensions: function() {
		var bioPaddingTop;
		var bioPaddingBottom;
		var paragraphHeight;

		var firstParagraphNativeHeight = $('.bio p:first-child').height();
		var lastParagraphNativeHeight = $('.bio p:last-child').height();

		// make sure we start and end right at the center point
		bioPaddingTop = parseInt($(window).height()/2 - $(this.ui.navBar).outerHeight()/2) - parseInt(firstParagraphNativeHeight/2);
		bioPaddingBottom = parseInt($(window).height()/2 - $(this.ui.navBar).outerHeight()/2)  - parseInt(lastParagraphNativeHeight/2);

		paragraphHeight = (window.screen.height - this.props.disappearThreshold);

		$(this.ui.bio).css('padding', bioPaddingTop + 'px' + ' 0 ' + bioPaddingBottom + 'px 0');
		$(this.ui.paragraphs).css('height', paragraphHeight + 'px');
	},


	easeTitleToIndex: function(index) {
		var greetingTitles = this.props.greetingTitles;

		$(this.ui.greeting).fadeOut(300, function() {
			$(this).text(greetingTitles[index]);
		}).fadeIn(300);
	},


	/**
	 * fortunately, "scroll" event fires for both mobile and desktop, it
	 * is useful to set/update signals that'll be used by both platforms
	 */
	onScroll: function(e) {
		var opacity;

		for (var i=this.ui.paragraphs.length-1; i>=0; i--) {
			var topPos = this.ui.paragraphs[i].getBoundingClientRect().top;

			if (topPos < window.innerHeight && topPos > 0) {
				// getting the opacity value based on active paragraph position
				opacity = (topPos - this.props.disappearThreshold)/60;

				// disable opacity whatsoever when it comes to the last paragraph
				if (this.state.activeSection < this.ui.paragraphs.length - 1) {
					$(this.ui.paragraphs[i]).css('opacity', opacity);
				}

				if (this.state.activeSection !== i) {
					// update greeting title
					this.easeTitleToIndex(i);

					// set current active section
					this.state.activeSection = i;
				}

				break;
			}
		}
	},


	init: function() {
		this.setInitValues();
		this.registerEvents();
		this.setBioDimensions();

		// trigger init animation
		document.body.classList.remove('init');
	}
};

module.exports = aboutDisplay;
