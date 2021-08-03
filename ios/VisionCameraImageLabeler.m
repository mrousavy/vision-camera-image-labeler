//
//  VisionCameraImageLabeler.m
//  VisionCameraExample
//
//  Created by Marc Rousavy on 06.05.21.
//

#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/Frame.h>
#import <MLKit.h>

// Example for an Objective-C Frame Processor plugin

@interface QRCodeFrameProcessorPluginObjC : NSObject

+ (MLKImageLabeler*) labeler;

@end

@implementation QRCodeFrameProcessorPluginObjC

+ (MLKImageLabeler*) labeler {
  static MLKImageLabeler* labeler = nil;
  if (labeler == nil) {
    MLKImageLabelerOptions* options = [[MLKImageLabelerOptions alloc] init];
    labeler = [MLKImageLabeler imageLabelerWithOptions:options];
  }
  return labeler;
}

static inline id labelImage(Frame* frame, NSArray* arguments) {
  MLKVisionImage *image = [[MLKVisionImage alloc] initWithBuffer:frame.buffer];
  image.orientation = frame.orientation; // <-- TODO: is mirrored?

  NSError* error;
  NSArray<MLKImageLabel*>* labels = [[QRCodeFrameProcessorPluginObjC labeler] resultsInImage:image error:&error];

  NSMutableArray* results = [NSMutableArray arrayWithCapacity:labels.count];
  for (MLKImageLabel* label in labels) {
    [results addObject:@{
      @"label": label.text,
      @"confidence": [NSNumber numberWithFloat:label.confidence]
    }];
  }

  return results;
}

VISION_EXPORT_FRAME_PROCESSOR(labelImage)

@end
