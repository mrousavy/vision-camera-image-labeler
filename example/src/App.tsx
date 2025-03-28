import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useImageLabeler} from 'vision-camera-image-labeler';
import {Label} from './components/Label';
import {Worklets} from 'react-native-worklets-core';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const currentLabel = useSharedValue('');

  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /**
   * Setting the value directly in the frameProcessor would
   * would not seem to rerender
   *  https://github.com/mrousavy/react-native-vision-camera/issues/1767
   */

  const updateLabel = Worklets.createRunOnJS((text: string) => {
    currentLabel.value = text;
  });

  const imageLabeler = useImageLabeler();

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const labels = imageLabeler.labelImage(frame);

    if (labels[0] && labels[0].label) {
      updateLabel(labels[0].label);
    }
  }, []);

  return (
    <View style={styles.container}>
      {device != null && hasPermission ? (
        <>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />
          <Label text={currentLabel} />
        </>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: 48,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
});
