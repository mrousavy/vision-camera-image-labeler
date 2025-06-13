#import <Foundation/Foundation.h>
#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if defined __has_include && __has_include("VisionCameraImageLabeler-Swift.h")
#import "VisionCameraImageLabeler-Swift.h"
#else
#import "VisionCameraImageLabeler/VisionCameraImageLabeler-Swift.h"
#endif

// This macro didn't properly register the frame processor plugin in the registry
// VISION_EXPORT_SWIFT_FRAME_PROCESSOR(VisionCameraImageLabeler, imageLabeler)

@interface VisionCameraImageLabeler (FrameProcessorPluginLoader)
@end

@implementation VisionCameraImageLabeler (FrameProcessorPluginLoader)
+ (void) load {
  [FrameProcessorPluginRegistry addFrameProcessorPlugin:@"imageLabeler"
    withInitializer:^FrameProcessorPlugin*(VisionCameraProxyHolder* proxy, NSDictionary* options) {
    return [[VisionCameraImageLabeler alloc] initWithProxy:proxy withOptions:options];
  }];
}
@end
