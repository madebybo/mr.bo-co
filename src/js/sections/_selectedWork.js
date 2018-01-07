/**
 * encapsulate all logic related to the awesome homepage scroll 
 */

var selectedWork = {
	modules: {
		breakPoints: require('../modules/_breakPoints'),
		detectMobile: require('../modules/_detectMobile')
	},

	ui: {
		summaries: document.querySelectorAll('.summary-work')
	},

	state: {
	},

	props: {
	},

	registerEvents: function() {
		$(window).on('resize', this.adjustSummaryHeaders.bind(this));
	},

	/**
	 * set class for project summary
	 */
	adjustSummaryHeaders: function() {
		var currentWidth = $(window).width();

		if (currentWidth < this.modules.breakPoints.tablet) {
			$(this.ui.summaries).removeClass('large');
		}

		if (currentWidth >= this.modules.breakPoints.tablet) {
			$(this.ui.summaries).addClass('large');
		}

		if (currentWidth >= this.modules.breakPoints.desktopS) {
			$(this.ui.summaries).removeClass('large');
		}

		if (currentWidth >= this.modules.breakPoints.desktopM) {
			// $(this.ui.summaries).removeClass('large');
			// $('.summary-work.zine').addClass('large');
			
			$(this.ui.summaries).addClass('large');
		}		

		// only do this for non-single page, aka list page
		if (!window.single) {
			return false;

			if (currentWidth >= this.modules.breakPoints.desktopS) {
				// reset all project summary header
				$(this.ui.summaries).removeClass('large');

				// handpick the ones to be featured
				$('.summary-work.panorama').addClass('large');
				$('.summary-work.rapt').addClass('large');
				$('.summary-work.spray').addClass('large');
			}

			if (currentWidth >= this.modules.breakPoints.desktopM) {
				// reset all project summary header
				// $(this.ui.summaries).removeClass('large');		
				
				$('.summary-work.windowplay').addClass('large');	
			}
		}
	},

	init: function() {
		this.registerEvents();
		this.adjustSummaryHeaders();
	}
};

module.exports = selectedWork;
