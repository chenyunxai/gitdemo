(function ($) {
    $.fn.slide = function (obj) {
        var options = {
            arrImg: [],//图片路径
            timeOut: {
                auto: true,//是否自动滚动
                timer: null,
                interval: 2000//时间间隔
            },
            mode: 'HERIZONTAL_MODE',
            current: 0,//当前显示第几张
            isNav: true//是否显示箭头
            // count: 0//一共多少张图片
        };
        this.options = $.extend(true, options, obj);
        // console.log(this.options);//插件自定义的参数

        // console.log(this);//表示当前正在调用插件的元素

        var $this = $(this);

        // init html
        this.init = function () {
            var opts = this.options;
            var arr = opts.arrImg;
            opts.count = arr.length;
            var panel = $('<ul class="list"></ul>');//图片list
            var dirPanel = $('<div class="slide-arrow">'
                + '<i class="ico-left" title="上一张"></i>'
                + '<i class="ico-right" title="下一张"></i>'
                + '</div>');//箭头，方向控制
            var navPanel = $('<div class="slide-nav"></div>');//nav导航

            for (var i = 0; i < arr.length; i++) {
                var $li = $('<li><img src="' + arr[i] + '" alt=""></li>');
             
                panel.append($li);
                navPanel.append('<span></span>');

            }

            $this.append(panel).append(dirPanel).append(navPanel);

            // 不显示左右箭头
            if(!opts.isNav){
                dirPanel.hide();
            }

            this.panel = panel;
            this.navPanel = navPanel;
            this.dirPanel = dirPanel;
            this.arr = arr;
            
        };
        this.init();

        var options = this.options;
        var $panel = this.panel;
        var $navPanel = this.navPanel;
        var $dirPanel = this.dirPanel;
        var arr = this.arr;//图片
        var itemWidth = $panel.children('li').width();
        var itemHeight = $panel.children('li').height();
        var total = arr.length;

        // 模式选择
        var DISPLAY_MODE = {
            HERIZONTAL_MODE: {
                layout: function(){

                    $panel.css({
                        'width': (itemWidth * total + 'px'),
                        'transform': 'translate3d(0px, 0px, 0px)'
                    });

                    $navPanel.find('span').removeClass('active').eq(0).addClass('active');

                },
                next: function(){

                    options.current++;
                    if(options.current >= total) {
                        options.current = 0;
                    }

                    $panel.css(
                        'transform', 'translate3d(' + (-itemWidth * options.current) + 'px, 0px, 0px)'
                    );
                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');

                },
                prev: function(){
                    options.current--;
                    if(options.current < 0) {
                        options.current = total - 1;
                    }
                    $panel.css(
                        'transform', 'translate3d(' + (-itemWidth * options.current) + 'px, 0px, 0px)'
                    );
                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');
                }
            },
            VERTICAL_MODE: {
                layout: function (){
                    $panel.css('width', (itemWidth + 'px'));
                    
                    $panel.addClass('slide-vertical');   
                    $navPanel.addClass('nav-vertical'); 
                    $dirPanel.removeClass('slide-arrow').addClass('arrow-vertical');
                                             
                    $panel.find('li').css('top', itemHeight + 'px').first().css('top','0');

                    $navPanel.find('span').removeClass('active').eq(0).addClass('active');
                    
                },
                prev: function (){
                    options.current--;
                    if(options.current < 0) {
                        options.current = total - 1;
                    }

                    $panel.find('li').css('top', -itemHeight + 'px').eq(options.current).css( 'top','0');

                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');
                },
                next: function (){
                    options.current++;
                    if(options.current >= total) {
                        options.current = 0;
                    }

                    $panel.find('li').css('top', itemHeight + 'px').eq(options.current).css('top','0');

                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');
                }
            },
            FADE_MODE: {
                layout: function (){
                    $panel.css('width', (itemWidth + 'px'));
                    
                    $panel.addClass('slide-vertical');   
                    $navPanel.addClass('nav-vertical');  
                    $dirPanel.removeClass('slide-arrow').addClass('arrow-vertical');

                    $panel.find('li').css('opacity', '0').first().css('opacity', '1');
                    
                    $navPanel.find('span').removeClass('active').eq(0).addClass('active');
                },
                prev: function (){
                    options.current--;
                    if(options.current < 0) {
                        options.current = total - 1;
                    }

                    $panel.find('li').css('opacity', '0').eq(options.current).css( 'opacity','1');

                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');
                },
                next: function (){
                    options.current++;
                    if(options.current >= total) {
                        options.current = 0;
                    }

                    $panel.find('li').css('opacity', '0').eq(options.current).css('opacity','1');

                    $navPanel.find('span').removeClass('active').eq(options.current).addClass('active');
                }
            }
        }

        var _currentMode = DISPLAY_MODE[options.mode];

        // 初始化style
        _currentMode.layout();

        this.initSlideEvents = function (){
            slideBox.autoScroll();

            // 图片垂直居中
            $panel.find('img').on("load",function(){

                for(var i=0;i<arr.length;i++){

                    // console.log(itemHeight)

                    var imgHeight = $(this).height();
                    // console.log(imgHeight)

                    if(imgHeight < itemHeight){
                        
                        var diffHeight = (itemHeight-imgHeight)/2 + 'px';

                        $(this).css('margin-top', diffHeight);

                    }
                }
            });
        }

        var slideBox = {

            // 自动滚动定时器
            autoScroll: function () {

                // 如果隐藏的箭头，则强制自动滚动
                if(options.isNav == false){
                    options.timeOut.auto = true;
                }

                if(options.timeOut.auto){
                    options.timeOut.timer = setInterval(function () {
                        // slideBox.setAnimation[modelSelect]();
                        _currentMode.next();
                        // setAnimation.model();
                    }, options.timeOut.interval);
                }
            },
            pause: function (){
                clearInterval(options.timeOut.timer);
            }
        }

        // left
        $dirPanel.find('i').first().on('click', function () {

            slideBox.pause();
            _currentMode.prev();
         
            options.timeOut.timer = setTimeout(function () {
                slideBox.autoScroll();
            }, options.timeOut.interval);
            
        });

        // right
        $dirPanel.find('i').last().on('click', function () {

            slideBox.pause();
            _currentMode.next();

            options.timeOut.timer = setTimeout(function () {
                slideBox.autoScroll();
            }, options.timeOut.interval);
            
        });

        // mouseover
        $panel.on('mouseover', function (){
            slideBox.pause();
        });

        // mouseout
        $panel.on('mouseout', function (){
            slideBox.autoScroll();
        })

        this.initSlideEvents();
       
    };
})(jQuery);
  
