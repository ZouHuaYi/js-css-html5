/**
 * Created by Administrator on 2017/4/12.
 *
 * 不兼容ie浏览器
 * ajax.onprogress在上传的时候使用的
 *ev.loaded已经下载的数据
 * ev.total是所有的数据
 */
function upAjax(obj)
{
    var meters={
        url:obj.url,           //下载的地址
        data:obj.data,         //数据的对象
        name:obj.name,         //后台接收文件的名字
        percent:obj.percent,   //返回来的百分比的数据
        success:obj.success,   //成功函数
        fail:obj.fail          //失败函数
    }
    var file_data=meters.data.files[0];  //获得数据的对象
    var fileD=new FormData();            //使用这个对象的方法
    fileD.append(meters.name,file_data); //转化为二进制的数据的转化同时付给对应的后台接收的文件
    var ajax=new XMLHttpRequest();
    ajax.open("post",meters.url,true);   //传输方式；
    ajax.onload?ajax.onload=fn:ajax.onreadystatechange=fn;   //ie浏览器跟fireFox第一个函数
    function fn(){
        if(ajax.readyState==4){         //状态码
            if(200<=ajax.status&&ajax.status<=207){
                meters.success&&meters.success(ajax.responseText);
            }else{                      //   出错
                meters.fail&&meters.fail(ajax.status);
            }
        }
    }
    ajax.upload.onprogress=function(ev){  //进度条的函数可以获得百分比
        var ev=ev || window.event;
        var percent=Math.round(((ev.loaded/ev.total).toFixed(2))*100)+"%";
        meters.percent&&meters.percent(percent);
    }
    ajax.send(fileD);                   //发送方到upload事件的下面才能获得数据
}
