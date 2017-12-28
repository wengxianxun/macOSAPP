//
//  IndexView.m
//  LearnMacApp
//
//  Created by game just on 2017/12/28.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "IndexView.h"

@implementation IndexView

- (instancetype)initWithFrame:(NSRect)frameRect{
    
    self = [super initWithFrame:frameRect];
    if (self) {
        [self initSubView];
    }
    return self;
}

-(void)initSubView{
//    [self.view setWantLayers:YES];
    self.wantsLayer = YES;
    self.layer.backgroundColor = [NSColor redColor].CGColor;
}

- (void)drawRect:(NSRect)dirtyRect {
    [super drawRect:dirtyRect];
    
    // Drawing code here.
}

@end
