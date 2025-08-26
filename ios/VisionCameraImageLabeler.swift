import Foundation
import MLKitImageLabeling
import MLKitVision
import MLKitCommon
import VisionCamera

@objc(VisionCameraImageLabeler)
public class VisionCameraImageLabeler: FrameProcessorPlugin {

  private static var labeler: ImageLabeler = {
    let options = ImageLabelerOptions()
    return ImageLabeler.imageLabeler(options: options)
  }()

  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
      super.init(proxy: proxy, options: options)

      print("VisionCameraImageLabeler initialized with options: \(String(describing: options))")
    }

  public override func callback(
    _ frame: Frame,
    withArguments arguments: [AnyHashable: Any]?
  ) -> Any? {
    let visionImage = VisionImage(buffer: frame.buffer)
    visionImage.orientation = frame.orientation // <-- TODO: is mirrored?

    do {
      let labels = try VisionCameraImageLabeler.labeler.results(in: visionImage)
      let result = labels.map { label in
        return [
          "label": label.text,
          "confidence": label.confidence
        ]
      }
      return result
    } catch {
      print("Error processing image labeling: \(error)")
      return nil
    }
  }
}

