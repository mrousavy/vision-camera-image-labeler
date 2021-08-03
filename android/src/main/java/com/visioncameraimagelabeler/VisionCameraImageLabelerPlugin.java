package com.visioncameraimagelabeler;

import android.annotation.SuppressLint;
import android.media.Image;

import androidx.camera.core.ImageProxy;

import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.concurrent.ExecutionException;

public class VisionCameraImageLabelerPlugin extends FrameProcessorPlugin {
  private final ImageLabeler labeler = ImageLabeling.getClient(ImageLabelerOptions.DEFAULT_OPTIONS);

  @Override
  public Object callback(ImageProxy frame, @NotNull Object[] params) {
    @SuppressLint("UnsafeOptInUsageError")
    Image mediaImage = frame.getImage();
    if (mediaImage != null) {
      InputImage image = InputImage.fromMediaImage(mediaImage, frame.getImageInfo().getRotationDegrees());
      Task<List<ImageLabel>> task = labeler.process(image);

      try {
        List<ImageLabel> labels = Tasks.await(task);

        WritableNativeArray array = new WritableNativeArray();
        for (ImageLabel label : labels) {
          WritableNativeMap map = new WritableNativeMap();
          map.putString("label", label.getText());
          map.putDouble("confidence", label.getConfidence());
          array.pushMap(map);
        }
        return array;
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return null;
  }

  VisionCameraImageLabelerPlugin() {
    super("labelImage");
  }
}
