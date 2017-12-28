//
//  IndexWindow.m
//  LearnMacApp
//
//  Created by game just on 2017/12/27.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "IndexWindow.h"
#import "IndexView.h"
#import "IndexPanel.h"
@interface IndexWindow()
@property (nonatomic,strong)IndexView *indexView;
@property (nonatomic,strong)IndexPanel *indexPanel;
@end

@implementation IndexWindow
- (instancetype)initWithContentRect:(NSRect)contentRect styleMask:(NSWindowStyleMask)style backing:(NSBackingStoreType)backingStoreType defer:(BOOL)flag{
    
    self = [super initWithContentRect:contentRect styleMask:style backing:backingStoreType defer:YES];
    if (self) {
        [self initSubView];
    }
    return self;
}

-(void)initSubView{
    
//    self.indexView = [[IndexView alloc]initWithFrame:CGRectMake(10, 10, 200, 200)];
//    [self.contentView addSubview:self.indexView];
    
    self.closeBtn = [[NSButton alloc]initWithFrame:CGRectMake(100, 100, 150, 50)];
    [self.closeBtn setTitle:@"关闭"];
    [self.closeBtn setTarget:self];
    [self.closeBtn setAction:@selector(closeSelf)];
    [self.contentView addSubview:self.closeBtn];
    
    self.panelBtn = [[NSButton alloc]initWithFrame:CGRectMake(100, 0, 150, 50)];
    [self.panelBtn setTitle:@"panel"];
    [self.panelBtn setTarget:self];
    [self.panelBtn setAction:@selector(showPanel)];
    [self.contentView addSubview:self.panelBtn];
}

//展示panel
-(void)showPanel{
    NSUInteger style =  NSTitledWindowMask | NSClosableWindowMask |NSMiniaturizableWindowMask | NSResizableWindowMask;
    self.indexPanel = [[IndexPanel alloc]initWithContentRect:CGRectMake(0, 0, 200, 200) styleMask:style backing:NSBackingStoreBuffered defer:YES];
    [ self beginSheet:self.indexPanel completionHandler:^(NSModalResponse returnCode) {
        
    }];
}

-(void)closeSelf{
    [self orderOut:self];
}

@end
