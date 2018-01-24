var	ui = {
	body: document.body,
	navIcon: document.querySelector('#navIcon')
};

// make an entrance!
setTimeout(function() {
	$('.signature').addClass('init');
}, 1000);


// implementation of the module
function navigation(name) {
	var navIconClicked = function(e) {
		$(ui.body).toggleClass('open');
	};

	// register event listeners
	$(ui.navIcon).on('click', navIconClicked);
}

module.exports = navigation;