/**
 * encapsulate all logic related to the awesome homepage scroll 
 */

var bespokeScroll = {
	modules: {
		detectMobile: require('../modules/_detectMobile'),
		setComponentsHeight: require('../modules/_setComponentsHeight')
	},

	ui: {
		html: document.documentElement,
		body: document.body,
		navBar: document.querySelector('#nav'),
		navStart: document.querySelector('#navStart'),
		navIcon: document.querySelector('#navIcon'),
		header: document.querySelector('#header'),
		exhibit: document.querySelector('#exhibit'),
		featuredContent: document.querySelector('#featuredContent')
	},

	state: {
		scrollStage: 1,
		start: null,
		delta: null,
		pagePulledDown: false,
		exhibitHighlighted: false,
		lastTouchTimestamp: +new Date,
		justHardStoppedAtfeaturedContent:false,
		isConsecutiveFastSwipe: false
	},

	props: {
		headerInitPosY: null,
		exhibitInitPosY: null,
		pullDownMaxMargin: 30,
		swipeTimeThreshold: 150,
		scrollMomentumFactor: 30,
		dragDistanceThreshold: 100,
		swipeDistanceThreshold: 10,
		sectionTransitionTime: 300
	},

	// TODO: use throttle for scroll and touchmove?
	registerEvents: function() {
		$(window).on('scroll', this.onScroll.bind(this));
		$(window).on('touchstart', this.onTouchStart.bind(this));
		$(window).on('touchmove', this.onTouchMove.bind(this));
		$(window).on('touchend', this.onTouchEnd.bind(this));
		// $(window).on('mousewheel DOMMouseScroll', this.onMouseWheel.bind(this));

		$(this.ui.navStart).on('click', this.navStartClicked.bind(this));
	},

	navStartClicked: function(e) {
		// disable redirection on home page, use programmatic scroll instead
		e.preventDefault();

		// takes longer to complete the whole thing, since it'll be a 2 step process
		if (this.state.scrollStage >= 3) {
			this.toSpecialScrollMode(0, function() { this.initScrollStage(); }.bind(this));
		} else {
			this.initScrollStage();
		}
	},

	/**
	 * fortunately, "scroll" event fires for both mobile and desktop, it
	 * is useful to set/update signals that'll be used by both platforms
	 */
	onScroll: function(e) {
		var featuredContentRect;

		if (this.state.scrollStage === 4) {
			featuredContentRect = this.ui.featuredContent.getBoundingClientRect();

			if (featuredContentRect.top >= 0) {
				$('html, body').scrollTop($(this.ui.featuredContent).offset().top);

				this.state.justHardStoppedAtfeaturedContent = true;
			}
		}
	},


	// do this in main.js
	// onMouseWheel: function(e) {
	// 	console.log('wheeling..?');
	// },


	/**
	 * for the initial two stages of uniqe scroll behavior, it's important to
	 * know that exhit only moves at the second stage; here we're storing what
	 * it looks like for first stage since it'll be frequently referenced to
	 */
	exhibitAtHeaderActiveMode: function() {
		this.ui.exhibit.dataset.lastY = this.props.exhibitInitPosY;
		this.scrollElement(this.ui.exhibit, this.props.exhibitInitPosY);
	},

	/**
	 * this snap position won't change since section 2 is always in special scroll mode
	 */
	highlightSection2: function() {
		this.scrollElement(this.ui.header, this.getSnapPositions().exhibit, true);
		this.scrollElement(this.ui.exhibit, this.getSnapPositions().exhibit, true);
		this.scrollElement(this.ui.featuredContent, this.getSnapPositions().exhibit, true);

		this.state.scrollStage = 2;
		this.state.exhibitHighlighted = true;
	},

	/**
	 * dynamically calculate the snap position for first post at the given moment
	 */
	highlightSection3: function() {
		this.scrollElement(this.ui.header, this.getSnapPositions().featuredContent, true);
		this.scrollElement(this.ui.exhibit, this.getSnapPositions().featuredContent, true);
		this.scrollElement(this.ui.featuredContent, this.getSnapPositions().featuredContent, true, this.toDefaultScrollMode.bind(this));

		this.state.scrollStage = 3;
	},

	/**
	 * remove CSS classes that disable default scroll, also scroll the entire 
	 * window to where it's suppose to be
	 */
	toDefaultScrollMode: function() {
		this.ui.html.classList.remove('header-active');
		this.ui.html.classList.remove('exhibit-active');

		this.scrollElement(this.ui.header, 0, true);
		this.scrollElement(this.ui.exhibit, 0, true);
		this.scrollElement(this.ui.featuredContent, 0, true);

		// matching first post
		$('html, body').scrollTop(-1*this.getSnapPositions().featuredContent);

		// a very hacky solution for iOS Chrome which has a delayed toolbar transition
		if (!this.modules.detectMobile().iOSSafari) {
			setTimeout(function() {
				$('html, body').scrollTop(-1*this.getSnapPositions().featuredContent);
			}.bind(this), 0);
		}

		// make sure we're at the correct scroll stage
		this.state.scrollStage = 3;
	},

	toSpecialScrollMode: function(velocity, callback) {
		var delayTime = this.props.sectionTransitionTime/2;
		var exhibitRect = this.ui.exhibit.getBoundingClientRect();
		var momentum = this.props.scrollMomentumFactor*Number(velocity)*Number(velocity);

		// adjust the delay time for iOS safari, which is less sensitive compared to Android
		// we use the velocity as a rough estimate as whether the section will move too far
		// if not, which means velocity is small, then whole thing should be the same direction
		// otherwise the delay in transition will allow time to let momentum run out
		if (this.modules.detectMobile().iOSSafari) {
			// not accurate, just heuristics
			var projection = $(window).height() - exhibitRect.bottom + momentum;

			if (momentum < exhibitRect.bottom || momentum === 0) {
				delayTime = 0;
			}
		}

		$('html, body').delay(delayTime).animate({
    	scrollTop: $(this.ui.exhibit).offset().top + 64 // TODO: change the hard-coded value
    }, this.props.sectionTransitionTime, function() {
    	$('html, body').scrollTop(0);
    	this.highlightSection2();
    	this.ui.html.classList.add('exhibit-active');

    	// only execute if callback exists
    	callback && callback();
    }.bind(this));

		// make sure we're at the correct scroll stage
		this.state.scrollStage = 2;
	},

	/**
	 * this can be called both during "touchmove" and after "touchend", which is
	 * indicated by @withMomentum, we don't want to update lastY during "touchmove"
	 */
	scrollElement: function(element, deltaY, withMomentum, callback) {
		if (!element) return;

		// callback is available when we want to do something after CSS 
		// transition is finished, here we make sure it only fires once
		$(element).css({'transform' : 'translate(0px, ' + deltaY + 'px)'});

		// always update currentY values when element is scrolled
		element.dataset.currentY = deltaY;

		// withMomentum should only be "true" after "touchend"
		if (withMomentum) {
			element.dataset.lastY = deltaY;
		}

		// since this method will be used excessively, only execute this part when there's callback
		if (callback) {
			$(element).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
				callback();
				$(element).off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
			});			
		}
	},

	onTouchStart: function(e) {
		// ignore the follwing swipe if it constitues a fast consecutive swipe
		if ((+new Date - this.state.lastTouchTimestamp) < this.props.sectionTransitionTime) {
			this.state.isConsecutiveFastSwipe = true;
			return; 
		} else {
			this.state.isConsecutiveFastSwipe = false;
		}

		if (this.state.justHardStoppedAtfeaturedContent) {
			this.state.scrollStage = 3;
			this.state.justHardStoppedAtfeaturedContent = false;
		}

		var touches = e.originalEvent.changedTouches[0];

		this.state.start = {
			// get initial touch coords
			x: touches.clientX,
			y: touches.clientY,

			// store time to determine touch duration
			time: +new Date
		};

		// we don't want to box-shadow delineator to show when user is just clicking nav control
		if (!$.contains(this.ui.navBar, e.target)) {
			this.ui.html.classList.add('user-scrolling');
		}
	},

	/**
	 * stage 1: header moves up and exhibit stays fixed
	 * stage 2: exhibit gets active and takes much of the viewport
	 * stage 3: lastest post gets active and aligned at top
	 */
	onTouchMove: function(e) {
		if (this.state.isConsecutiveFastSwipe) {
			e.preventDefault();
			return;
		}

		if (this.state.scrollStage >= 3) return;

		// only do the following when in stage 1 or 2
		e.preventDefault();

		var touches = e.originalEvent.changedTouches[0];
		var headerRect = this.ui.header.getBoundingClientRect();
		var distanceToScroll;

		this.state.delta = {
			x: touches.clientX - this.state.start.x,
			y: touches.clientY - this.state.start.y
		};

		// use all these elements move exactly the same distance as header expcet stage 1
		distanceToScroll = this.state.delta.y + Number(this.ui.header.dataset.lastY);

		this.scrollElement(this.ui.header, distanceToScroll);
		this.scrollElement(this.ui.exhibit, distanceToScroll);
		this.scrollElement(this.ui.featuredContent, distanceToScroll);

		// header is visible during the move
		if (headerRect.bottom >= 0) {
			// header being pulled down
			if (headerRect.top > 0) {
				this.state.pagePulledDown = true;
				distanceToScroll = Math.floor(Math.min(Math.sqrt(distanceToScroll), this.props.pullDownMaxMargin));

				this.scrollElement(this.ui.header, distanceToScroll);
			} else {
				this.state.pagePulledDown = false;
			}

			// keep exhibit fixed when just the header moving 
			this.exhibitAtHeaderActiveMode();

			this.ui.html.classList.add('header-active');
		} else {
			this.ui.html.classList.remove('header-active');
		}
	},

	onTouchEnd: function(e) {
		var duration;
		var velocity;
		var headerRect;
		var exhibitRect;
		var isFastRelease;
		var distanceWithMomentum;
		var headerBottomAfterMomentum;
		var keepScrollingWithMomentum;
		var scrollToSectionActionCode = 0; // by default do nothing

		// we disable "touchmove" handler during stage 3 & 4, this makes
		// sure that we're still getting the correct deltaY in that case
		var touches = e.originalEvent.changedTouches[0];

		// all "-ing" ui states should be cleared once touch is over
		this.ui.html.classList.remove('user-scrolling');

		// get the final delta data for the entire touch gesture
		this.state.delta = {
			x: touches.clientX - this.state.start.x,
			y: touches.clientY - this.state.start.y
		};

		// this is necessary to make sure we pick up where things left off
		this.ui.header.dataset.lastY = this.ui.header.dataset.currentY;
		this.ui.exhibit.dataset.lastY = this.ui.exhibit.dataset.currentY;

		// do nothing if this is just a click or consectutive fast swipe
		if (this.state.delta.y === 0 || this.state.isConsecutiveFastSwipe) { return; }

		// if user pulls down, then gently snap back
		if (this.state.pagePulledDown) {
			this.scrollElement(this.ui.header, 0);
			this.ui.header.dataset.lastY = this.ui.header.dataset.currentY;

			return;
		}

		// use duration and distance to extrapolate how the physics should work
		duration = +new Date - this.state.start.time;
		velocity = (this.state.delta.y / duration).toFixed(2);
		isFastRelease = (duration <= this.props.swipeTimeThreshold) ? true : false;

		// update the last time stamp for touchend, this is to detect consecutive swipe
		this.state.lastTouchTimestamp = +new Date;

		// determine action code: move to previous, stay, or go to next
		if (isFastRelease) {
			if (this.state.delta.y > this.props.swipeDistanceThreshold) {
				scrollToSectionActionCode = -1;
			} else if (this.state.delta.y < -1*this.props.swipeDistanceThreshold) {
				scrollToSectionActionCode = 1;
			}
		} else {
			if (this.state.delta.y > this.props.dragDistanceThreshold) {
				scrollToSectionActionCode= -1;
			} else if (this.state.delta.y < -1*this.props.dragDistanceThreshold) {
				scrollToSectionActionCode = 1;
			}
		}

		// get all position data we need to figure out movement after touch
		headerRect = this.ui.header.getBoundingClientRect();
		exhibitRect = this.ui.exhibit.getBoundingClientRect();

		// this is the updated full distance after momentum is factored in, 
		distanceWithMomentum = Math.max(-1*(headerRect.bottom), Math.ceil(velocity*Math.abs(velocity)*this.props.scrollMomentumFactor));
    // also need to consider the case where users scroll down with great force, header top should never move below top of the viewport
    keepScrollingWithMomentum = Math.min(0, Number(this.ui.header.dataset.currentY) + distanceWithMomentum);
		// this value is used to gauge if the momentum is strong enough to reveal the exhibit
		headerBottomAfterMomentum = headerRect.bottom + distanceWithMomentum;

		// we want to do something different when system state is at stage 3 or stage 4
		if (this.state.scrollStage >= 3) {
			this.strategyInDefaultScrollMode(scrollToSectionActionCode, velocity);

			return;
		}

		// console.log(this.state.scrollStage, scrollToSectionActionCode, headerBottomAfterMomentum);

		// the exhibit section, with momentum factored in, is occupying the entire viewport
		// this also means the header is completely out of view, the else condition is, of
		// course, header is in view, which means that's the only element we want to move
		if (headerBottomAfterMomentum <= 0) {
			var scrollExhibitWithMomentum = Number(this.ui.exhibit.dataset.currentY) + headerBottomAfterMomentum;
			var exhibitFloorThreshold = exhibitRect.bottom - $(window).height();
			var newSectionNumber;
			var toSection;

			// first update ui state, it's definitely exhibit mode now
			this.ui.html.classList.remove('header-active');
			this.ui.html.classList.add('exhibit-active');

			// the momentum is beyond the threshold to show exhibit floor
			if (Math.abs(distanceWithMomentum) > exhibitFloorThreshold) {
				// since floor is revealed, at least we should reach scroll stage #2
				// in the event of no featured content, there will be no stage #3 and beyond
				if (this.ui.featuredContent) {
					newSectionNumber = Math.max(2, Math.min(3, (this.state.scrollStage + scrollToSectionActionCode)));
				} else {
					newSectionNumber = 2;
				}

				toSection = this.state.exhibitHighlighted ? ('highlightSection' + newSectionNumber) : 'highlightSection2';

				this[toSection]();
			} else {
				// exhibit and featuredContent will move exactly the same distance in "exhibit-active" mode
				this.scrollElement(this.ui.exhibit, keepScrollingWithMomentum, true);
				this.scrollElement(this.ui.featuredContent, keepScrollingWithMomentum, true);
			}
		} else {
			// only the header is moving, hence scroll stage is 1
			this.scrollElement(this.ui.header, keepScrollingWithMomentum, true);
			this.state.scrollStage = 1;
		}
	},

	/**
	 * if is evoked when user is at scroll stage 3 or 4
	 */
	strategyInDefaultScrollMode: function(actionCode, velocity) {
		if (this.state.scrollStage === 3) {
			if (actionCode === -1) {
				this.toSpecialScrollMode(velocity); // snap gently to section 2
			} else if (actionCode === 0) {
				$('html, body').animate({
	      	scrollTop: $(this.ui.featuredContent).offset().top
	      }, this.props.sectionTransitionTime);
			} else {
				// here the action code is 1, we're trying to detect if user swipes again before the previous
				// transition even completes, which will nullify the transition callback since there are no
				// different value to transition to, thus the callback won't be executed, here invoke manually
				if (Number(this.ui.featuredContent.dataset.lastY) === Number(this.getSnapPositions().featuredContent)) {
					this.toDefaultScrollMode();
				}
			}

			this.state.scrollStage = this.state.scrollStage + actionCode;
		} else if (this.state.scrollStage === 4) {
			// console.log('stage 4, let the browser handle');
		}
	},

	getSnapPositions: function() {
		// this is to measure how much more to move up when top of exhibit aligns with viewport
		var exhibitBelowFoldWhenTopAlign = this.ui.exhibit.getBoundingClientRect().height - $(window).height();
		var exhibitSnapPosY = -1*exhibitBelowFoldWhenTopAlign + this.props.exhibitInitPosY;
		var featuredContentSnapPosY = -1*($(window).height()) + exhibitSnapPosY;

		return {
			exhibit: exhibitSnapPosY,
			featuredContent: featuredContentSnapPosY
		};
	},

	initScrollStage: function() {
		this.ui.html.classList.add('header-active');

		// init header and exhibit 
		this.ui.header.dataset.lastY = this.props.headerInitPosY;
		this.ui.exhibit.dataset.lastY = this.props.exhibitInitPosY;
		this.scrollElement(this.ui.header, this.props.headerInitPosY);
		this.scrollElement(this.ui.exhibit, this.props.exhibitInitPosY);

		this.state.scrollStage = 1;
	},

	// Force reloading, find an elegant solution later..
	// TODO: try navStartClicked()
	reset: function() {
		location.reload();
	},

	// Kickoff this super awesome module!
	init: function() {
		// need to bind this event anyways
		$(window).on('resize', this.reset.bind(this));

		// only apply module for mobile devices in portrait mode
		if ($(window).width() > $(window).height()) {
			return false;
		}

		// set stateful classes, place this first to get accurate position
		this.ui.html.classList.add('header-active');
		this.modules.setComponentsHeight();

		// initialize some key position value
		this.props.headerInitPosY = 0;
		this.props.exhibitInitPosY = -1*this.ui.exhibit.getBoundingClientRect().top;

		this.initScrollStage();
		this.registerEvents();
	}
};

module.exports = bespokeScroll;
