(function () {

  'use strict';

  // we define our player aspect ratio
  var playerRatio = 16 / 9;
  // debug or not
  var debug = true;
  // reference to DOM player container and anchor
  var playerId = 'rmpPlayer';
  var playerContainer = document.getElementById(playerId);
  var playerAnchor = document.getElementById('playerAnchor');
  // our player instance
  var rmp = new RadiantMP(playerId);
  // player framework
  var rmpFW = rmp.getFramework();

  // initial computed width for player anchor in pixels
  var initialAttachedPlayerWidth = 960;

  // we define our player streaming URLs and settings
  var bitrates = {
    hls: 'https://dqwp3xzzbfhtw.cloudfront.net/vod/smil:bbb.smil/playlist.m3u8'
  };
  var settings = {
    licenseKey: 'your-license-key',
    bitrates: bitrates,
    width: initialAttachedPlayerWidth,
    height: initialAttachedPlayerWidth / playerRatio,
    ads: true,
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml',
    poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
  };

  // our local variables
  var playerTop;
  var windowTop;
  var playerAttached = true;

  function getViewportWidth() {
    return window.innerWidth || 0;
  }

  function getWindowTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function getDetachedWidth() {
    // the detachedWidth ratio values are arbitrary for 
    // testing purposes fell free to modify them
    var viewportWidth = getViewportWidth();
    var detachedWidth = 0;
    if (viewportWidth >= 1280) {
      detachedWidth = viewportWidth / 4.5;
    } else if (viewportWidth >= 1024) {
      detachedWidth = viewportWidth / 3.5;
    } else if (viewportWidth >= 768) {
      detachedWidth = viewportWidth / 2.5;
    } else {
      detachedWidth = viewportWidth / 1.5;
    }
    return detachedWidth;
  }

  // function to run when the player should be detached
  function detachPlayer() {
    if (debug) {
      console.log('detachPlayer');
    }
    playerAttached = false;
    // this is an internal player method to add class to an element
    rmpFW.addClass(playerContainer, 'rmp-detach');
    // set player size for detached state e.g. 50% of our current viewport width
    var detachedWidth = getDetachedWidth();
    if (debug) {
      console.log('detachedWidth is: ' + detachedWidth);
    }
    var detachedHeight = detachedWidth / playerRatio;
    rmp.setPlayerSize(detachedWidth, detachedHeight);
  }

  // function to run when the player should be attached to its original location
  function attachPlayer() {
    if (debug) {
      console.log('attachPlayer');
    }
    playerAttached = true;
    // this is an internal player method to remove class to an element
    rmpFW.removeClass(playerContainer, 'rmp-detach');
    // set player size for attached state e.g. playerAnchor computed width which could have changed
    rmp.setPlayerSize(initialAttachedPlayerWidth, initialAttachedPlayerWidth / playerRatio);
    // we call resize to make sure the player fits within its original location
    rmp.resize();
  }

  // function to run when we need to check the scroll position
  function checkScrollPosition() {
    if (debug) {
      console.log('checkScrollPosition');
    }
    windowTop = getWindowTop();
    if (typeof playerTop === 'number' && typeof windowTop === 'number') {
      // when the player starts to be offpage due to scrolling we detach it
      // the + 10 value is an arbitrary padding value. Use your own if needed.
      if (windowTop > playerTop + 10) {
        // we only detach the player if it is currently attached to the anchor
        if (playerAttached) {
          detachPlayer();
        }
      } else {
        // when the player is back onpage we re-attach it
        if (!playerAttached) {
          attachPlayer();
        }
      }
    }
  }

  // when player is ready we get its orignal location on page
  playerContainer.addEventListener('ready', function () {
    if (debug) {
      console.log('ready');
    }
    windowTop = getWindowTop();
    playerTop = playerAnchor.getBoundingClientRect().top + windowTop;
    // on ready refresh the player position
    checkScrollPosition();
    // on scroll/load refresh the player position
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('load', checkScrollPosition);
  });

  // we init the player
  rmp.init(settings);

})();