/**
 * @license Copyright (c) 2015-2019 Radiant Media Player 
 * rmp-detachable-player | https://github.com/radiantmediaplayer/rmp-detachable-player
 */

(function () {

  'use strict';

  // reference to containers
  var playerId = 'rmpPlayer';
  var container = document.getElementById(playerId);
  var attachContainer = document.getElementById('attach-container');
  var detachContainer = document.getElementById('detach-container');
  if (!container || !attachContainer || !detachContainer) {
    return;
  }
  // our player instance
  var rmp = new RadiantMP(playerId);
  // player framework
  var rmpFW = rmp.getFramework();

  // we define our player streaming URLs and settings
  var bitrates = {
    hls: 'https://www.rmp-streaming.com/media/hls/test-vectors/bbb-abr/playlist.m3u8'
  };
  var settings = {
    licenseKey: 'your-license-key',
    bitrates: bitrates,
    autoHeightMode: true,
    // we can include ads as well if wanted
    //ads: true,
    //adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml',
    poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
  };

  // our app variables
  var debug = true;
  var _log = function(data) {
    if (window.console && window.console.log && data) {
      window.console.log(data);
    }
  };
  var playerAttached = true;
  var viewablePreviousRatio = 0.5;
  var firstView = false;

  // function to run when the player should detach
  var _detachPlayer = function () {
    playerAttached = false;
    rmpFW.addClass(detachContainer, 'rmp-detach');
    rmp.resize();
  };

  // function to run when the player should be attached to its original location
  var _attachPlayer = function () {
    playerAttached = true;
    rmpFW.removeClass(detachContainer, 'rmp-detach');
    rmp.resize();
  };

  var _handleIntersect = function (entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > viewablePreviousRatio) {
        if (debug) {
          _log('player comes into view');
        }
        // we do not want to detach player before viewer has scrolled to it at least once
        if (!firstView) {
          firstView = true;
          // if we wanted to start playback automatically when player comes into view the first time
          // we would call play()
          // in such case we should use muted: true in player settings as well
          // rmp.play();
        }
        if (!playerAttached) {
          _attachPlayer();
        }
      } else {
        if (debug) {
          _log('player comes out of view');
        }
        if (playerAttached && firstView) {
          _detachPlayer();
        }
      }
      viewablePreviousRatio = entry.intersectionRatio;
    });
  };

  var _attachViewableObserver = function () {
    container.removeEventListener('ready', _attachViewableObserver);
    if (typeof window.IntersectionObserver !== 'undefined') {
      var options = {
        root: null,
        rootMargin: '0px',
        threshold: [0.5],
      };
      var viewableObserver = new IntersectionObserver(_handleIntersect, options);
      viewableObserver.observe(attachContainer);
    }
  };

  // when player is ready create IntersectionObserver
  container.addEventListener('ready', _attachViewableObserver);

  // we init the player
  rmp.init(settings);

})();
