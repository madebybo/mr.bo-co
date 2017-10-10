/**
 * See https://developer.chrome.com/multidevice/user-agent#chrome_for_ios_user_agent - the user agent strings for Safari on iOS and for Chrome on iOS are inconveniently similar:
 * 
 * Chrome
 * 
 * Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3
 * 
 * Safari
 * 
 * Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3
 * 
 * Looks like the best approach here is to first of all check for iOS as other answers have suggested and then filter on the 
 * stuff that makes the Safari UA unique, which I would suggest is best accomplished with "is AppleWebKit and is not CriOS":
 * 
 * Source: https://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari/29696509#29696509
 */

function detectMobile() {
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return {
    iOS: iOS,
    iOSSafari: iOSSafari,
    isMobile: isMobile
  };
}

module.exports = detectMobile;
