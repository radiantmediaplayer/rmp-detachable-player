/**
 * @license Copyright (c) 2015-2021 Radiant Media Player 
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

  // we define our player streaming URLs and settings
  var settings = {
    licenseKey: 'your-license-key',
    autoHeightMode: true,
    ads: true,
    adOutStream: true,
    skin: 'outstream',
    // we will autoplay our outstream ad unit when first in view so muted we must use
    muted: true,
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml',
    // we use client-side waterfalling in this case (optional)
    adTagWaterfall: [
      'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml'
    ],
    contentMetadata: {
      poster: [
        'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
      ]
    }
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
    detachContainer.classList.add('rmp-detach');
    rmp.resize();
  };

  // function to run when the player should be attached to its original location
  var _attachPlayer = function () {
    playerAttached = true;
    detachContainer.classList.remove('rmp-detach');
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
          // here we automatically play our outstream ad when player first comes into view
          rmp.play();
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
    if (typeof IntersectionObserver !== 'undefined') {
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
