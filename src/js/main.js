// JS Goes here - ES6 supported
$(function() {
  var mrbo = {
    modules: {
      navigation: require('./modules/_navigation'),
      detectMobile: require('./modules/_detectMobile')
    },

    sections: {
      bespokeScroll: require('./sections/_bespokeScroll'),
      aboutDisplay: require('./sections/_aboutDisplay'),
      contactPage: require('./sections/_contactPage')
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
        this.sections.bespokeScroll.init();
      }

      if (window.section === 'about') {
        this.sections.aboutDisplay.init();
      }

      if (window.section === 'contact') {
        this.sections.contactPage.init();
      }     
    }
  };

  mrbo.init();
});