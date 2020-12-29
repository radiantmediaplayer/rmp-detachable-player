# rmp-detachable-player

# DEPRECATED - this extension should work but is no longer maintained

rmp-detachable-player is an open-source extension for [Radiant Media Player](https://www.radiantmediaplayer.com) to allow automatic detachment of the player when scrolling into page (a.k.a. automatic PiP - picture in picture). As such the player can be visible at all time regardless of the page scrolling position. This extension makes use of the new [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Features
- Automatic in-page PiP player
- Resizing of player based on attach/detach states 
- Mobile-ready
- Works with in-stream and out-stream video ads
- Easily extended with JavaScript and CSS

## Usage
Download latest release from the releases tab. See index.html and js/rmp-detach.js files for a better understanding of the attach/detach logic. 
For outstream video ad see outstream-video-ad.html and js/rmp-detach-outstream-video-ad.js files.
Adapt those examples with your player settings and to fit your page layout.

## Example
An example of implementation can be viewed here: [https://www.radiantmediaplayer.com/docs/latest/rmp-detachable-player/](https://www.radiantmediaplayer.com/docs/latest/rmp-detachable-player/)

Another example of implementation showing how to use outstream video ads can be viewed here: [https://www.radiantmediaplayer.com/docs/latest/rmp-detachable-player/outstream-video-ad.html](https://www.radiantmediaplayer.com/docs/latest/rmp-detachable-player/outstream-video-ad.html)

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License for rmp-detachable-player
rmp-detachable-player is released under MIT

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: [https://www.radiantmediaplayer.com/free-trial.html](https://www.radiantmediaplayer.com/free-trial.html).
