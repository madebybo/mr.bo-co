function setComponentsHeight() {
	var elements = {
		headerContent: document.querySelector('.header-content'),
		exhibit: document.querySelector('#exhibit'),
		exhibitInnerWrapper: document.querySelector('.exhibit-inner-wrapper'),
		frame: document.querySelector('.frame')
	};

	// todo, use $(window).width() to get tablet sizes
	var keyVariables = {
		exhibitFloorHeight: 64,
		exhibitToFloorHeight: 96,
		frameBorderWidth: parseInt($(elements.frame).css('borderWidth')),
		framePadding: parseInt($(elements.frame).css('padding'))
	};


	var frameHeight = $(window).height() - 2*keyVariables.exhibitFloorHeight - keyVariables.exhibitToFloorHeight - 2*keyVariables.frameBorderWidth - 2*keyVariables.framePadding;

	$(elements.headerContent).height($(window).height() - keyVariables.exhibitFloorHeight - 16); // 16 px more room for the human figure
	$(elements.exhibitInnerWrapper).height($(window).height() + keyVariables.exhibitFloorHeight);
	$(elements.exhibit).height($(window).height() + keyVariables.exhibitFloorHeight);
	$(elements.frame).height(frameHeight);
}

module.exports = setComponentsHeight;
