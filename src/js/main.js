// JS Goes here - ES6 supported
$(function() {
  var mrbo = {
    modules: {
      about: require('./modules/_about'),
      customProperty: require('./modules/_customProperty')
    },

    ui: {
      summaryWork: document.querySelector('.summary-work'),
      mainBlock: document.querySelector('.block-main')
    },

    registerEvents: function() {
      $(document.body).on('click', function() {});
    },

    init: function() {
      var greetings = this.modules.about('mr.bo & co');
      var customProperty = this.modules.customProperty;

      this.registerEvents();

      // Say hello
      console.log(greetings);
    }
  };

  mrbo.init();
});