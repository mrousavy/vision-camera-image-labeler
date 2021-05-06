import { NativeModules } from 'react-native';

type VisionCameraImageLabellerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { VisionCameraImageLabeller } = NativeModules;

export default VisionCameraImageLabeller as VisionCameraImageLabellerType;
