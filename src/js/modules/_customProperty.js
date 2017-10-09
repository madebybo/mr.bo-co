/**
 * customProperty.set(self.ui.summaryWork, '--column-num', 1);
 * customProperty.get(self.ui.summaryWork, '--column-num');
 */

var customProperty = {
  get: function(element, property) {
    var styles;

    element = element || document.documentElement;
    styles = getComputedStyle(element);

    return String(styles.getPropertyValue(property)).trim();
  },

  set: function(element, property, value) {
    element.style.setProperty(property, value);
  }
};

module.exports = customProperty;