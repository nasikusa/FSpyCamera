// @ts-nocheck

// https://gist.github.com/thorsten/148812e9cc4fb6a19215ce22afd4e5a8
export function setUserAgent(window, userAgent) {
  // Works on Firefox, Chrome, Opera and IE9+
  if (navigator.__defineGetter__) {
      navigator.__defineGetter__('userAgent', function () {
          return userAgent;
      });
  } else if (Object.defineProperty) {
      Object.defineProperty(navigator, 'userAgent', {
          get: function () {
              return userAgent;
          }
      });
  }
  // Works on Safari
  if (window.navigator.userAgent !== userAgent) {
      var userAgentProp = {
          get: function () {
              return userAgent;
          }
      };
      try {
          Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
      } catch (e) {
          window.navigator = Object.create(navigator, {
              userAgent: userAgentProp
          });
      }
  }
}
