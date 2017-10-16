function setComponentsHeight() {
	var elements = {
		nav: document.querySelector('#nav'),
		headerContent: document.querySelector('.header-content'),
		exhibit: document.querySelector('#exhibit'),
		exhibitInnerWrapper: document.querySelector('.exhibit-inner-wrapper'),
		frame: document.querySelector('.frame'),
		floor: document.querySelector('.floor'),
		ceiling: document.querySelector('.ceiling')
	};

	// todo, use $(window).width() to get tablet sizes
	var params = {
		cushion: parseInt($(elements.exhibit).css('fontSize')),
		ceilingHeight: parseInt($(elements.ceiling).css('height')),
		floorHeight: parseInt($(elements.floor).css('height')),
		frameBorderWidth: parseInt($(elements.frame).css('borderWidth')),
		frameMarginTopHeight: parseInt($(elements.frame).css('marginTop')),
		frameMarginBottomHeight: parseInt($(elements.frame).css('marginBottom'))
	};

	// frome height = viewport height - ceiling height - margin heights
	var frameHeight = $(window).height() 
		- params.ceilingHeight - params.frameMarginTopHeight - params.frameMarginBottomHeight - 2*params.frameBorderWidth;

	$(elements.headerContent).height($(window).height() - params.frameMarginBottomHeight + params.cushion); // 16 px more room for the human figure
	$(elements.exhibitInnerWrapper).height($(window).height() + params.floorHeight);
	$(elements.exhibit).height($(window).height() + params.floorHeight);
	$(elements.frame).height(frameHeight);
}

module.exports = setComponentsHeight;
