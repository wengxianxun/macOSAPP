//
//  main.m
//  LearnMacApp
//
//  Created by wengxianxun on 2017/12/27.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "AppDelegate.h"
int main(int argc, const char * argv[]) {
    
    [NSApplication sharedApplication].delegate = [AppDelegate new];
    return NSApplicationMain(argc, argv);
//    return NSApplicationMain(argc, argv);
}
