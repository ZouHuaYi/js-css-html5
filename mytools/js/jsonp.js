/**
 * Created by Administrator on 2017/4/12.
 */

/*
使用指南
*jsonp({
 url:'https://api.douban.com/v2/book/search',地址
 meter:{  参数
 q:val  关键字
 },
 name:'callback',  接收数据的函数
 fnName:'fns',返回函数的函数名
 success:function(data){ // 成功函数的函数
        console.log(data)
 }
 })
* */

function jsonp(obj){       //跨域jsonp的获取数据
    obj.meter[obj.name]=obj.fnName;
    var arr=[];
    for(var attr in obj.meter){
        arr.push(attr+"="+obj.meter[attr]);
    }
    var oS=document.createElement("script");
    oS.src=obj.url+"?"+arr.join("&");
    document.body.appendChild(oS);
    document.body.removeChild(oS);
    window[obj.fnName]=function(data){//这个函数名字挂在window对象的下面。
        obj.success&&obj.success(data);
    }
}