/**
 * @license Copyright (c) 2015-2018 Radiant Media Player 
 * rmp-detachable-player 1.3.1 | https://github.com/radiantmediaplayer/rmp-detachable-player
 */

(function () {

  'use strict';

  // debug or not
  var debug = true;
  // reference to containers
  var playerId = 'rmpPlayer';
  var playerContainer = document.getElementById(playerId);
  var attachContainer = document.getElementById('attach-container');
  var detachContainer = document.getElementById('detach-container');
  // our player instance
  var rmp = new RadiantMP(playerId);
  // player framework
  var rmpFW = rmp.getFramework();


  // we define our player streaming URLs and settings
  var bitrates = {
    hls: 'https://dqwp3xzzbfhtw.cloudfront.net/vod/smil:bbb.smil/playlist.m3u8'
  };
  var settings = {
    licenseKey: 'your-license-key',
    bitrates: bitrates,
    autoHeightMode: true,
    ads: true,
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml',
    poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
  };

  // our local variables
  var playerTop;
  var windowTop;
  var playerAttached = true;

  function getWindowTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  // function to run when the player should detach
  function detachPlayer() {
    if (debug) {
      console.log('detachPlayer');
    }
    playerAttached = false;
    rmpFW.addClass(detachContainer, 'rmp-detach');
    rmp.resize();
  }

  // function to run when the player should be attached to its original location
  function attachPlayer() {
    if (debug) {
      console.log('attachPlayer');
    }
    playerAttached = true;
    rmpFW.removeClass(detachContainer, 'rmp-detach');
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
        // when the player is back to its original location we re-attach it
        if (!playerAttached) {
          attachPlayer();
        }
      }
    }
  }

  // when player is ready we get player location on page and check for scroll position
  playerContainer.addEventListener('ready', function () {
    if (debug) {
      console.log('ready');
    }
    windowTop = getWindowTop();
    playerTop = attachContainer.getBoundingClientRect().top + windowTop;
    // on ready refresh the player position
    checkScrollPosition();
    // on scroll/load refresh the player position
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('load', checkScrollPosition);
  });

  // we init the player
  rmp.init(settings);

})();