(function () {

  'use strict';

  // we define our player width/height for the attached and detached states
  // as always those represent maximu values 
  var attachedlWidth = 640;
  var attachedHeight = 360;
  var detachedWidth = 384;
  var detachedHeight = 216;

  var bitrates = {
    mp4: [
      'https://www.radiantmediaplayer.com/media/bbb-360p.mp4'
    ]
    // HLS streaming requires a licenseKey
    //hls: 'https://streamingrmp-1479.kxcdn.com/vod/smil:bbb.smil/playlist.m3u8'
  };

  var settings = {
    //licenseKey: 'your-license-key,
    bitrates: bitrates,
    width: attachedlWidth,
    height: attachedHeight, 
    //debug: true,
    // Video ads requires a licenseKey
    //ads: true,
    //adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline.xml',
    poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
  };
  
  // our reference to the player and player container
  var element = 'rmpPlayer';
  var rmp = new RadiantMP(element);
  var rmpContainer = document.getElementById(element);
   
  // here is our player anchor which we use for accurate positioning
  var playerAnchor = document.getElementById('playerAnchor');
  
  // our local variables
  var playerTop;
  var windowTop;
  var playerAttached = true;

  // function to run when the player should be detach
  // the rmp-detach class is defined in index.html
  function detachPlayer() {
    //console.log('detachPlayer');
    playerAttached = false;
    // this is an internal player method to add class to an element
    rmp.fw.addClass(rmpContainer, 'rmp-detach');
    rmp.setPlayerSize(detachedWidth, detachedHeight);
  }

  // function to run when the player should be re-attach to  its original location
  function attachPlayer() {
    //console.log('attachPlayer');
    playerAttached = true;
    // this is an internal player method to remove class to an element
    rmp.fw.removeClass(rmpContainer, 'rmp-detach');
    rmp.setPlayerSize(attachedlWidth, attachedHeight);
  }

  // function to run when we need to check the scroll position
  function checkScrollPosition() {
    windowTop = window.pageYOffset || document.documentElement.scrollTop;
    // in some instances playerTop is not available here 
    // because player ready event has not fired yet. We assign a value then.
    if (typeof playerTop === 'undefined') {
      playerTop = playerAnchor.getBoundingClientRect().top + windowTop;
    }
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

  // when player is ready we get its position on page
  rmpContainer.addEventListener('ready', function () {
    windowTop = window.pageYOffset || document.documentElement.scrollTop;
    playerTop = playerAnchor.getBoundingClientRect().top + windowTop;
  });

  // on load and scroll we need to refresh the player position
  window.addEventListener('load', checkScrollPosition);
  window.addEventListener('scroll', checkScrollPosition);

  // we init the player
  rmp.init(settings);

})();