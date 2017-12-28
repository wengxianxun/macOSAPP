//
//  IndexWindowController.m
//  LearnMacApp
//
//  Created by wengxianxun on 2017/12/27.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "IndexWindowController.h"
#import "IndexWindow.h"
@interface IndexWindowController ()
@property (nonatomic,strong)IndexWindow *indexWindow;
@end

@implementation IndexWindowController

- (void)windowDidLoad {
    [super windowDidLoad];
    
    // Implement this method to handle any initialization after your window controller's window has been loaded from its nib file.
}

-(void)showWindow:(id)sender{
    
    [self initIndexWindow];
}

-(void)initIndexWindow{
    
    NSRect frame = CGRectMake(0, 0, 200, 200);
NSUInteger style =  NSTitledWindowMask | NSClosableWindowMask |NSMiniaturizableWindowMask | NSResizableWindowMask;
    self.indexWindow = [[IndexWindow alloc] initWithContentRect:frame styleMask:style backing:NSBackingStoreBuffered defer:YES];//[NSWindow alloc]initWithContentRect:frame styleMask:style backing:NSBackingStoreBuffered defer:YES];
    self.indexWindow.title = @"New Create Window";
//    window.backgroundColor = [NSColor redColor];
    //窗口显示
    [self.indexWindow makeKeyAndOrderFront:self];
    //窗口居中
    [self.indexWindow center];
//    [self orderout];
//    [[NSApplication sharedApplication]runModalForWindow:self.indexWindow];
}

-(void)orderout{
    
    
}
@end
