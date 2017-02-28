(function () {

  'use strict';

  // we define our player width/height for the attached and detached states
  // as always those represent maximum values 
  var attachedlWidth = 640;
  var attachedHeight = 360;
  var detachedWidth = 384;
  var detachedHeight = 216;

  // we define our player streaming URLs and settings
  var bitrates = {
    hls: 'https://streamingrmp-1479.kxcdn.com/vod/smil:bbb.smil/playlist.m3u8'
  };

  var settings = {
    licenseKey: 'your-license-key',
    bitrates: bitrates,
    width: attachedlWidth,
    height: attachedHeight,
    //ads: true,
    //adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline.xml',
    poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
  };

  // our reference to the player and player container
  var elementID = 'rmpPlayer';
  var rmp = new RadiantMP(elementID);
  var rmpContainer = document.getElementById(elementID);

  // here is our player anchor which we use for accurate positioning
  var playerAnchor = document.getElementById('playerAnchor');

  // our local variables
  var playerTop;
  var windowTop;
  var playerAttached = true;
  var rmpEnv;
  var rmpFW;

  // function to run when the player should be detached
  // the rmp-detach class CSS is defined in index.html
  function detachPlayer() {
    //console.log('detachPlayer');
    playerAttached = false;
    // this is an internal player method to add class to an element
    rmpFW.addClass(rmpContainer, 'rmp-detach');
    // set player size for detached state
    rmp.setPlayerSize(detachedWidth, detachedHeight);
  }

  // function to run when the player should be attached to its original location
  function attachPlayer() {
    //console.log('attachPlayer');
    playerAttached = true;
    // this is an internal player method to remove class to an element
    rmpFW.removeClass(rmpContainer, 'rmp-detach');
    // set player size for attached state
    rmp.setPlayerSize(attachedlWidth, attachedHeight);
  }

  // function to run when we need to check the scroll position
  function checkScrollPosition() {
    windowTop = window.pageYOffset || document.documentElement.scrollTop;
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
  rmpContainer.addEventListener('ready', function () {
    // we get environment data from the player
    // this contains helper functions to know which features are supported 
    // and what type of device are we on
    rmpEnv = rmp.getEnvironment();
    // this is the player internal framework 
    // it has helper functions we need
    rmpFW = rmp.getFramework();
    // on mobile we may want a different width/height for the detached state
    // this is optional 
    if (rmpEnv.isMobile) {
      detachedWidth = 288;
      detachedHeight = 162;
    }
    windowTop = window.pageYOffset || document.documentElement.scrollTop;
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