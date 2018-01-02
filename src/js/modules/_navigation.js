var	ui = {
	body: document.body,
	navIcon: document.querySelector('#navIcon')
};

// implementation of the module
function navigation(name) {
	var navIconClicked = function(e) {
		$(ui.body).toggleClass('open');
	};

	// register event listeners
	$(ui.navIcon).on('click', navIconClicked);
}

module.exports = navigation;