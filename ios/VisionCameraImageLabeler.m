#import <Foundation/Foundation.h>
#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if defined __has_include && __has_include("VisionCameraImageLabeler-Swift.h")
#import "VisionCameraImageLabeler-Swift.h"
#else
#import "VisionCameraImageLabeler/VisionCameraImageLabeler-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(VisionCameraImageLabeler, imageLabeler)
