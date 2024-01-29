<div align="right">
<img align="right" src="https://github.com/mrousavy/react-native-vision-camera/blob/main/docs/static/img/frame-processors.gif?raw=true">
</div>

# vision-camera-image-labeler

A [VisionCamera](https://github.com/mrousavy/react-native-vision-camera) Frame Processor Plugin to label images using [**MLKit Vision** Image Labeling](https://developers.google.com/ml-kit/vision/image-labeling).

## Installation

```sh
npm install vision-camera-image-labeler
cd ios && pod install
```

Add the plugin to your `babel.config.js`:

```js
module.exports = {
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__labelImage'],
      },
    ],

    // ...
```

> Note: You have to restart metro-bundler for changes in the `babel.config.js` file to take effect.

## V2 vs V3

Note: Currently this plugin only works for VisionCamera V2 since I have not dedicated any time to upgrade it to V3 yet.

## Usage

```js
import { labelImage } from "vision-camera-image-labeler";

// ...

const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  const labels = labelImage(frame);
}, []);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
