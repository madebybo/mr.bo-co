function setComponentsHeight() {
	var elements = {
		nav: document.querySelector('#nav'),
		headerContent: document.querySelector('.header-content'),
		exhibit: document.querySelector('#exhibit'),
		exhibitInnerWrapper: document.querySelector('.exhibit-inner-wrapper'),
		frame: document.querySelector('.frame')
	};

	var exhibitParams = window.getComputedStyle(elements.exhibit, ':after').getPropertyValue('content').split(',');

	// todo, use $(window).width() to get tablet sizes
	var keyVariables = {
		cushion: 16,
		navHeight: parseInt($(elements.nav).css('height')),
		exhibitFloorHeight: Number(exhibitParams[0].match(/\d+/)[0]) || 64,
		exhibitElevationHeight: Number(exhibitParams[1].match(/\d+/)[0]) || 96,
		frameBorderWidth: parseInt($(elements.frame).css('borderWidth')),
		framePadding: parseInt($(elements.frame).css('padding'))
	};

	// need to refine this...
	var frameHeight = $(window).height() - 2*keyVariables.navHeight - keyVariables.exhibitElevationHeight - 2*keyVariables.frameBorderWidth;

	$(elements.headerContent).height($(window).height() - keyVariables.exhibitElevationHeight + keyVariables.cushion); // 16 px more room for the human figure
	$(elements.exhibitInnerWrapper).height($(window).height() + keyVariables.exhibitFloorHeight);
	$(elements.exhibit).height($(window).height() + keyVariables.exhibitFloorHeight);
	$(elements.frame).height(frameHeight);
}

module.exports = setComponentsHeight;
