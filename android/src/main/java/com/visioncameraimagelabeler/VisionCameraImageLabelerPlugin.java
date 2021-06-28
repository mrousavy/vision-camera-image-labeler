package com.visioncameraimagelabeler;

import androidx.camera.core.ImageProxy;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

public class VisionCameraImageLabelerPlugin extends FrameProcessorPlugin {

  @Override
  public Object callback(ImageProxy image, Object[] params) {
    // code goes here
    return null;
  }

  VisionCameraImageLabelerPlugin() {
    super("labelImage");
  }
}
