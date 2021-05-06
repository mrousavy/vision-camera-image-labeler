# vision-camera-image-labeller

VisionCamera Frame Processor Plugin to label images using [**MLKit Vision** Image Labeling](https://developers.google.com/ml-kit/vision/image-labeling).

## Installation

```sh
npm install vision-camera-image-labeller
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

> Note: You have to restart metro-bundler for changes in the babel.config.js file to take effect.

## Usage

```js
import { labelImage } from "vision-camera-image-labeller";

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
