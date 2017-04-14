/**
 * Created by Administrator on 2017/4/12.
 */
function getCss(obj,attr){
    var num  =0;
    if(obj.currentStyle){
        //ie浏览器
        num =parseFloat(obj.currentStyle[attr]);
    }else{
        num =parseFloat(getComputedStyle(obj)[attr]);
    }
    if(attr == "opacity"){
        return  Math.floor(num*100);
    }
    return num;
}

var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){   //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){   //减速
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){   //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){    //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){   //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){   //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){   //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){   //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};
/*
 *move 函数的扩展可以同时输入多个目标对象
 * 可以实现三维轮的目的
 */
function mTween(init){
    var obj = init["element"];//对象
    var type = init["type"] ;//类型
    var time = init["time"] ;//时间
    var target = init["target"] ;//元素
    var callBack = init["callBack"];//回调函数
    var t = 0;
    var b = {};
    var c = {};
    var d = time / 20;
    for(var s in target){
        b[s] = parseFloat(getCss(obj,s));//获得的初始状态的值
        c[s] = target[s] - b[s];//距离的差值
    }
    clearInterval(obj.timer);
    obj.timer = setInterval(
        function (){
            t++;
            for(var s in b){
                var nub = Tween[type](t,b[s],c[s],d);
                if(s == "opacity"){
                    obj.style[s] = nub/100;
                    obj.style.filter ="alpha(opacity="+ nub +")";
                } else {
                    obj.style[s] = nub + "px";
                }
            }
            if(t >= d){
                clearInterval(obj.timer);
                if(callBack){
                    callBack();
                }
            }
        },
        50
    );
}
//move 跟animate函数相识
function move(obj,attr,target,time,type,callback,fn,fn1){
    var t = 0;//开始执行的判断值
    var b = parseFloat(getCss(obj,attr));//初始值
    var c = target - b ;//运动距离
    var d = time/50;//运动的时间
    var timer = null;
    timer = setInterval(function(){
        t++;
        var nub = Tween[type](t, b, c, d);// c*t/d + b
        if(attr == "opacity"){
            obj.style[attr] = nub/100;
            obj.style[attr] = 'alpha(opacity='+nub+');';//兼容ie
        }else{
            obj.style[attr] = nub +'px';
        }
        (typeof fn=="function")&&fn(obj);
        (typeof fn1=="function")&&fn1(obj);
        if(t>=d){
            (typeof callback == 'function')&&callback();
            clearInterval(timer);
        }
    },50)
}
//定速，定目标的运动
function runMove(obj,attr,target,t,callback,fn){
    var a=getCss(obj,attr);
    var b=0;
    var n=target-a;
    if(n>=0){
        var timer=setInterval(function(){
            if(n<=b){
                clearTimeout(timer);
                (typeof callback=="function")&&callback();
            }
            b+=10;
            var x=a+b;
            obj.style[attr]=x+"px";
            (typeof fn=="function")&&fn(obj);
        },t)
    }else{
        var timer=setInterval(function(){
            if(-n<=b){
                clearTimeout(timer);
                (typeof callback=="function")&&callback();
            }
            b+=10;
            var x=a-b;
            (typeof fn=="function")&&fn(obj);
            obj.style[attr]=x+"px";
        },t)
    }
}
//输入函数的例子allCircleMove({});
//dir是方向+—，（x0,y0）是圆心；a0当前的夹角 a圈数；num清除计时器；r运动半径
//圆形运动跟三维运动的函数
function allCircleMove(json,callback,fn){
    var obj = json.obj;
    var dir = json.dir;
    dir = dir || '+';
    var move=json.move || "";
    var tim=json.tim || 20;
    var max = json.max;
    max = Number(max) || 'all';
    var r = json.r;
    r = Number(r) || 100;
    var x0 = json.x0 || parseFloat(getCss(obj,'left'));
    var y0 = json.y0 ||  parseFloat(getCss(obj,'top')) - r;
    var offsetHeight = obj.offsetHeight;
    var offsetWidth = obj.offsetWidth;
    var height,width;
    var a0 = json.a0;
    a0 = Number(a) || 90;
    var a = json.a ||a0;
    var de=(json.de+a) || 'Q';
    var num = json.num || 0;
    if(obj.timer){return;}
    obj.timer = setInterval(function(){
        if(num == max){
            clearInterval(obj.timer);
            (typeof callback=="function")&&callback();
        }
        if(a == de){
            clearInterval(obj.timer);
            (typeof callback=="function")&&callback();
        }
        if(dir == '+'){
            a++;
            if(a == a0 + 360){
                a = a0;
                num++;
            }
        }else{
            a--;
            if(a == a0 - 360){
                a = a0;
                num++;
            }
        }
        var x = x0 + r*Math.cos(a*Math.PI/180);
        var y = y0 + r*Math.sin(a*Math.PI/180);
        if(move){
            width = (offsetWidth/2) + offsetWidth/2*Math.sin((90 + a*Math.PI)/180);
            height = (offsetHeight/2) + offsetWidth/2*Math.sin((90 + a*Math.PI)/180);
            obj.style.left = x + 'px';
            obj.style.width = width + 'px';
            obj.style.height = height + 'px';
            (typeof fn=="function")&&fn(obj);
        }else{
            obj.style.left = x + 'px';
            obj.style.top = y + 'px';
            (typeof fn=="function")&&fn(obj);
        }
    },tim);
}
//钟摆运动
function pendulMove(json){
    var obj = json.obj;
    var dir = json.dir;
    dir = dir || '+';
    var max = json.max;
    max = Number(max) || 'all';
    var r = json.r;
    r = Number(r) || 100;
    var x0 = json.x0 || parseFloat(getCSS(obj,'left'));
    var y0 = json.y0 ||  parseFloat(getCSS(obj,'top')) - r;
    var a0 = json.a0;
    a0 = Number(a) || 0;
    var a = json.a ||0;
    var num = 0;
    if(obj.timer){return;}
    obj.timer = setInterval(function(){
        if(num == max){
            clearInterval(obj.timer);
        }
        if(dir == '+'){
            a++;
            if(a == 60){
                dir = '-';
            }
        }else{
            a--;
            if(a == -60){
                dir = '+';
            }
        }
        cur.left = parseFloat(getCSS(obj,'left'));
        cur.top = parseFloat(getCSS(obj,'top'));
        var x = x0 + r*Math.sin(a*Math.PI/180);
        var y = y0 + r*Math.cos(a*Math.PI/180);
        obj.style.left = x + 'px';
        obj.style.top = y + 'px';
    },20);
}
/*
 *碰撞及重力
 *obj：目标元素par：obj的父级speedX：x轴的变化速度
 *speedY：y轴的变化速度g:是否添加重力，true有重力，false没有重力
 */
function knockMove(json,callback,fn){
    var obj=json.obj;
    var par=json.par;
    clearInterval(obj.timeId);
    var w =  par.clientWidth - obj.offsetWidth;
    var h =  par.clientHeight - obj.offsetHeight;
    var speedX = json.x || 2;
    var speedY = json.y || 2;
    var ts=json.ts || 30;
    var isG=json.g || false;
    obj.timeId = setInterval(function(){
        if(isG){
            speedY += 9;
        }
        var l = obj.offsetLeft + speedX;
        var t = obj.offsetTop + speedY;
        (typeof fn=="function") && fn(l,t);
        if(l <= 0){
            speedX *= -1;
            l = '0';
        }else if(l >= w) {
            speedX *= -1;
            l = w;
        }
        if(t <= 0){
            speedY *= -1;
            t = '0';
        }else if(t >= h) {
            speedY *= -1;
            t = h;
        }
        if(obj.offsetTop === t){
            clearInterval(obj.timeId);
            (typeof callback=="function") && callback();
        }
        obj.style.left = l + 'px';
        obj.style.top = t + 'px';
    },ts)
}