/**
 * Created by Administrator on 2017/3/28.
 */
// �¼��󶨡�
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
//�¼����
function removeEvent(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn);
    }else if(obj.detachEvent){
        obj.detachEvent("on"+type,fn);
    }
}
//�¼�ð��
function cancelBu(e){//��ֹð���¼��ĺ���
    window.event? window.event.cancelBubble = true : e.stopPropagation();
}
//��ֹĬ���¼��ĺ���
function stopDefault(e){
    window.event? window.event.returnValue=false:e.preventDefault();
}

//д�ļ��������ռ�
var EventUtil = {
    addHandler : function (element , type, handler ){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if ( element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }else {
            element["on" + type] = handler;
        }
    },
    getEvent : function (event){
        return event ? event : window.event;
    },
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    removeHandsler : function (element , type , handler){
        if(element.removeEventListener){
            element.removeEventListener(type , handler , false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type , handler);
        }else{
            element["on" + type] = handler;
        }
    },
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    },
    getRelatedTarget : function(event){
        if(event.relatedTarget){   //������¼��� mouseover�����ĸ�Ŀ������� mouseout�ӳ����ĸ�Ŀ��
            return event.relatedTarget;
        }else if (event.toElement){  //ie  mouseover
            return event.toElement;
        }else if(event.fromElement){  //ie  mouseout
            return event.fromElement;
        }else {
            return null;
        }
    },
    getButton : function (event){
        if(document.implementation.hasFeature("MouseEvents" , "2.0")){
                return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }
} ;