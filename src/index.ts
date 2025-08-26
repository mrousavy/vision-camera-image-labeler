import { useMemo } from 'react'
import { type Frame, VisionCameraProxy} from 'react-native-vision-camera';

interface ImageLabel {
  /**
   * A label describing the image, in english.
   */
  label: string;
  /**
   * A floating point number from 0 to 1, describing the confidence (percentage).
   */
  confidence: number;
}

type ImageLabelerPlugin = {
  /**
   * Generates labels for an image
   *
   * @param {Frame} frame Frame to generate labels
   */
  labelImage: ( frame: Frame ) => ImageLabel[]
}

/**
 * Create a new instance of image labeler plugin
 *
 * @returns {ImageLabelerPlugin} Plugin instance
 */
function createImageLabelerPlugin(): ImageLabelerPlugin {
  const plugin = VisionCameraProxy.initFrameProcessorPlugin('imageLabeler', {} )

  if ( !plugin ) {
    throw new Error( 'Failed to load Frame Processor Plugin "imageLabeler"!' )
  }

  return {
    labelImage: (
      frame: Frame
    ): ImageLabel[] => {
      'worklet'
      // @ts-ignore
      return plugin.call( frame ) as Face[]
    }
  }
}
/**
 * Use an instance of image labeler plugin.
 *
 * @returns {ImageLabelerPlugin} Memoized plugin instance that will be
 * destroyed once the component using `useFaceDetector()` unmounts.
 */
export function useImageLabeler(): ImageLabelerPlugin {
  return useMemo( () => (
    createImageLabelerPlugin( )
  ), [ ] )
}
