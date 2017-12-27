//
//  AppDelegate.m
//  LearnMacApp
//
//  Created by wengxianxun on 2017/12/27.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender
{
    return YES;
}

- (void)applicationWillFinishLaunching:(NSNotification *)notification
{
    //    [self initMainMenu];
}

//- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
//    [self initMainMenu];
//    self.myAge = 1;
//    //自定义后工程里不能有window.xib文件了，不然会被当做默认window启动
//    //崩溃解决方法一：必须持有第一个Window的引用，不然关闭App时会崩溃
//    _window = [[NSWindow alloc] initWithContentRect:NSMakeRect(0, 100, 600, 600) styleMask:NSTitledWindowMask | NSClosableWindowMask |NSMiniaturizableWindowMask | NSResizableWindowMask backing:NSBackingStoreBuffered defer:YES];
//    //    _window.delegate = self;//崩溃解决方法二
//    [_window makeKeyAndOrderFront:nil];
//}
- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
    indexWindow = [[IndexWindowController alloc]init];
     [indexWindow.window setContentSize:NSMakeSize(1000, 800)];
    [indexWindow.window makeKeyAndOrderFront:self];
    [indexWindow showWindow:self];
    
}


- (void)applicationWillTerminate:(NSNotification *)aNotification {
    // Insert code here to tear down your application
}


@end
