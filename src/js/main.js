// JS Goes here - ES6 supported
$(function() {
  var mrbo = {
    modules: {
      navigation: require('./modules/_navigation'),
      detectMobile: require('./modules/_detectMobile'),
      bespokeScroll: require('./modules/_bespokeScroll'),
      aboutDisplay: require('./modules/_aboutDisplay'),
      contactPage: require('./modules/_contactPage')
    },

    // TODO: use throttle for scroll and touchmove?
    registerEvents: function() {
      $(window).on('mousewheel DOMMouseScroll', this.onMouseWheel.bind(this));
    },

    // https://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery
    onMouseWheel: function(e) {
      // console.log('keep it wheeling..?');
    },

    init: function() {
      // initialize navigation
      this.modules.navigation();

      // register events
      this.registerEvents();

      // only implement bespokeScroll for home page mobile version
      if (window.section === 'home' && this.modules.detectMobile().isMobile) {
        this.modules.bespokeScroll.init();
      }

      if (window.section === 'about') {
        this.modules.aboutDisplay.init();
      }

      if (window.section === 'contact') {
        this.modules.contactPage.init();
      }     
    }
  };

  mrbo.init();
});