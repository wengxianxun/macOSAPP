//
//  ViewController.m
//  webDemo
//
//  Created by wengxianxun on 2017/12/29.
//  Copyright © 2017年 wengxianxun. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
@property (nonatomic,strong)UIWebView *webView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.webView = [[UIWebView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
    
    NSURL * url = [NSURL URLWithString:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@""]];
    
    NSURLRequest * request = [NSURLRequest requestWithURL:url];
    
    [self.webView loadRequest:request];
    
    
    [self.view addSubview:self.webView];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
