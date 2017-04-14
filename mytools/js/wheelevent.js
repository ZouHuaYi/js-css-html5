/**
 * Created by Administrator on 2017/3/28.
 */
function addEvent(obj,type,fn,boolean){
    var boo=boolean || false;
    if(obj.addEventListener){
        obj.addEventListener(type,fn,boo);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,function(){
            fn.call(obj)
        });
    }
}

function removeEvent(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn);
    }else if(obj.detachEvent){
        obj.detachEvent("on"+type,fn);
    }
}

function stopDefault(e){
    window.event? window.event.returnValue=false:e.preventDefault();
}

function addWheel(obj,downFn,upFn){
    var user=window.navigator.userAgent.toLocaleLowerCase();
    user.indexOf("firefox")<0? addEvent(obj,"mousewheel",fn): addEvent(obj,"DOMMouseScroll",fn);
    function fn(ev){
        var e=ev || window.event;
        var dis=true;
        e.wheelDelta?(dis=e.wheelDelta<0?true:false):(dis=e.detail>0?true:false);
        dis?(downFn&&downFn()):(upFn&&upFn());
    }
}