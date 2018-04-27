# rmp-detachable-player

rmp-detachable-player is an open-source extension for [Radiant Media Player](https://www.radiantmediaplayer.com) 
allowing to attach/detach the player when scrolling into a page (a.k.a. PiP - picture in picture). As such the player can be visible at all time regardless of the page scrolling position. This extension makes use of the new [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Features
- In-page PiP player
- Automatic resizing of player based on attach/detach states 
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

## License
rmp-detachable-player is released under MIT

Radiant Media Player has its own license which can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html)
