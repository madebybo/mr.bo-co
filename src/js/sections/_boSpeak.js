/**
 * encapsulate all logic related to the awesome homepage scroll 
 */

var boSpeak = {
	init: function() {
		$('.hcd a').attr('target', '_blank');
		$('.hcd a').attr('href', 'http://www.canopyu.com/course/studio/id/6');

		$('.hci a').attr('target', '_blank');
		$('.hci a').attr('href', 'http://www.canopyu.com/course/openlecture/id/115');
	}
};

module.exports = boSpeak;
