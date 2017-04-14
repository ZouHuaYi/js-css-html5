/**
 * Created by Administrator on 2017/3/28.
 */
/**
 *
 * */
function ajax(obj)
{
    var parameter={    //参数的对象。
        url:obj.url,   //地址
        success:obj.success,  //传回来的函数
        method:obj.method || "get",  //方式
        name:obj.name || null,      //传进的数据
        bool:obj.bool|| true,      // boolean值同步异步
        type:obj.type || "",       //数据类型
        fail:obj.fail || function(){}   //失败的函数
    }
    var ajax=new XMLHttpRequest();   //声明这个函数
    if(parameter.method=="get"){    //get方法的传输数据
        if(parameter.name){
            parameter.url+="?"+encodeURI(parameter.name);//传送数据的时候
        }
        ajax.open("get",parameter.url,parameter.bool);  //地址传输
        ajax.send();     //发送
    }else if(parameter.method=="post"){   //这是post方法
        ajax.open("post",parameter.url,parameter.bool);
        ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');  //传输数据的时候有个请求头的存在。
        ajax.send(parameter.name);   //传输数据
    }
    ajax.onload?ajax.onload=fn:ajax.onreadystatechange=fn;   //ie浏览器跟fireFox第一个函数
    function fn(){
        if(ajax.readyState==4){         //状态码
            if(200<=ajax.status&&ajax.status<=207){
                var str=(parameter.type=="xml")?ajax.responseXML:((parameter.type=="json")?(new Function("","return"+ajax.responseText))():ajax.responseText);     //判断数据类型
                parameter.success&&parameter.success(str);
            }else{         //   出错
                parameter.fail&&parameter.fail(ajax.status);
            }
        }
    }
}
