---
title: "map"
subtitle: Interactive, thoroughly customizable maps in native Android, iOS.
code: "map"
type: "work"
timeline: "April 2016 - August 2016"
tags: ["mcommerce", "mobile", "design"]
images:
  background: map-background.png
  device: iPhone-X-vertical.png
  showcase:
    - map.gif
weight: 10
draft: true
---

Reach an audience on the move through their mobile devices where you can highlight your nearby locations, promotions, new products, and other reasons stop in for a visit.

## email context

Hi David,

Attached is the mockup for user interactions and flow, let me know what you think.

Yiming, to give you some context, we had a review session on Monday about the working prototype of the map format. One thing that stood out was the lack of clarity on the flow and UX, although all the functionalities were in place. So I took the liberty and made this, should be pretty straightforward. Feel free to provide any feedback.

A couple notes:

1. There is a button that explicitly triggers the map screen, hence a location icon is added for clarity. Our initial thought was to rely on scrolling to switch between screens, however that seems unpleasantly intrusive in many cases and could cause format compatibility issues.

2. Therefore it makes more sense to start from a dedicated format, at least for the first iteration. The code will still be organized in a modular fashion, allowing us to compose formats with map and other modules in the future.

3. There are three controls on the upper left corner, back (to 1st screen) and zoom controls. Although zoom controls could be optional, I think it's better to make it part of the UI for usability reasons.

---

Some notes:

The color of the CTA button is probably going to be whatever the placement CSS tells it to be, so we can't plan to have the brand color in the initial screen.
Definitely agree on optional zoom buttons. They take a lot of space and I believe it'd be better to speed up the move to a real mapping app like Google Maps.
It'd be amazing if the location icon animated based on scrolling. It would call attention to the idea of tapping to see a map. 
Even "Find a Dunkin'" is 14 characters. That's beyond our 13 char limit. We should ensure the 13 char CTA and the location icon is still ok on 280px width layouts.
When you see the map, it might be good to have a location already "selected" by showing the info bar pop-up. Ideally, you'd trigger the info bar immediately after the map is rendered. That way, the user would quickly understand that tapping a marker pulls up an info bar. 
The "directions" icon that you have here now is perfect.
The "back" button you made is great and important. It's good practice to allow people to navigate out of a user experience.
You should find out if you need to show the MapBox text on the bottom of the map. If we need to show it, it may or may not interfere with the transparent png of the brand logo and we' have to move something.
Hope that is helpful! Let me know if you have any questions on these points.

---

Thanks David.

Since first screen CTA is subject to CSS customization, I'll leave the location icon white so it could work well with any color.
The scrolling-based location icon animation is a good idea. I'll play with what type of animation is actually doable.
For CTA character limit, if it looks fine (as the mockup showing) at 14 characters then we should be good with 13 char limit.
Pre-selecting a location makes sense, the trick is to decide which one to select, but I'm sure that could be figured out.
Will do some research about Mapbox attribution, at the worst if we have to, I can imagine the solution to be a "i" toggle icon.


