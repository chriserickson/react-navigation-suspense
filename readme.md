# React Navigation Suspense (POC)

This is a proof-of-concept of using React Suspense to pause updates to non-focused screens on React Native when using React Navigation.

## Motivation

React Navigation's screens are always re-rendering, even when they are not focused. This can be really expensive in the case that there is a shared data cache that is frequently updating, for things like realtime data. (Imagine that 2 screens are both using the same data that is updating 30x / second. In this case, the non-visible screen is rendering and being flushed to the DOM even though you can't see it).

While in theory, each non-visible screen could useFocusEffect to stop it's subscription, (which is objectively better, as if no screens are using the data, the subscription itself can be stopped,) this may not always be practical.

This is a proof-of-concept that prevents rendering of non-visible screens by throwing to suspense.

## How to use it:

[withPauseWhenNotVisible](navigation/withPauseWhenNotVisible.tsx) is a HOC that can wrap a screen. Once wrapped, the screen will stop updating when it not focused.

It seems to work fine for a stack navigator (with a slight delay to prevent pausing until the animation is finished). It doesn't work well for the tab navigator, but this could probably be handled by listening to tabPress.

[Video](ios-device-recording.MP4)
