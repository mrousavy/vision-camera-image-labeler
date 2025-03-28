package com.visioncameraimagelabeler

import android.media.Image
import android.util.Log
import com.google.android.gms.tasks.Tasks
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.label.ImageLabel
import com.google.mlkit.vision.label.ImageLabeling
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin

private const val TAG = "ImageLabeler"

class VisionCameraImageLabelerPlugin() : FrameProcessorPlugin() {
  private val labeler = ImageLabeling.getClient(ImageLabelerOptions.DEFAULT_OPTIONS)

  override fun callback(frame: Frame, params: Map<String, Any>?): Any? {
    val mediaImage: Image? = frame.image
    if (mediaImage != null) {
      // TODO fix 0 param for proper orientation
      val image = InputImage.fromMediaImage(mediaImage, 0)
      val task = labeler.process(image)
      try {
        val labels: List<ImageLabel> = Tasks.await(task)
        // Use a mutable list of maps instead of WritableNativeArray
        val result = mutableListOf<Map<String, Any>>()
        for (label in labels) {
          result.add(mapOf("label" to label.text, "confidence" to label.confidence.toDouble()))
        }
        return result
      } catch (e: Exception) {
        Log.e(TAG, "Error processing image", e)
      }
    }
    return null
  }
}
