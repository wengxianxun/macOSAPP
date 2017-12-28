//
//  IndexWindow.m
//  LearnMacApp
//
//  Created by game just on 2017/12/27.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "IndexWindow.h"
//self.btn = [[NSButton alloc]initWithFrame:NSMakeRect(100, 100, 150, 50)];
//[self.btn setTitle:@"hello world"];
//self.btn.bezelStyle = NSRoundedBezelStyle;
//self.btn.alignment = NSTextAlignmentCenter;
//self.btn.transparent = NO;
//self.btn.highlighted = NO;
//[self.btn setTarget:self];
//[self.btn setAction:@selector(click)];
//[self.view addSubview:self.btn];
@implementation IndexWindow
- (instancetype)initWithContentRect:(NSRect)contentRect styleMask:(NSWindowStyleMask)style backing:(NSBackingStoreType)backingStoreType defer:(BOOL)flag{
    
    self = [super initWithContentRect:contentRect styleMask:style backing:backingStoreType defer:YES];
    if (self) {
        [self initSubView];
    }
    return self;
}

-(void)initSubView{
    self.closeBtn = [[NSButton alloc]initWithFrame:CGRectMake(100, 100, 150, 50)];
    [self.closeBtn setTitle:@"关闭"];
    [self.closeBtn setTarget:self];
    [self.closeBtn setAction:@selector(closeSelf)];
    [self.contentView addSubview:self.closeBtn];
}

-(void)closeSelf{
    [self orderOut:self];
}

@end
