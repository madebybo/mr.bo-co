var getUIElements = require('./_getUIElements');

// implementation of the module
function navigation(name) {
	var navIconClicked = function(e) {
		$(getUIElements.body).toggleClass('open');
	};

	// register event listeners
	$(getUIElements.navIcon).on('click', navIconClicked);
}

module.exports = navigation;