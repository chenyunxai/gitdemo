# slide-plugin
jQuery轮播图插件 

1.插件的初始化
  //'#slidebox'为初始化插件的dom元素id
  $('#slidebox').slide({
		arrImg:['images/bg1.jpg','images/bg2.jpg','images/bg3.jpg','images/bg4.jpg','images/1.png'],//图片路径
		timeOut: {
			auto: true,//是否自动滚动
			interval: 3000//图片滚动之间的间隔
		},
		mode: 'VERTICAL_MODE',//滚动方式的选择，可选择：VERTICAL_MODE、HERIZONTAL_MODE、FADE_MODE
		isNav: true,//是否显示左右箭头
});
