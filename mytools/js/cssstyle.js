/**
 * Created by Administrator on 2017/3/28.
 */
function getCss(obj,attr){
    var num  =0;
    if(obj.currentStyle){ //ie�����
        num =parseFloat(obj.currentStyle[attr]);
    }else{
        num =parseFloat(getComputedStyle(obj)[attr]);
    }
    if(attr == "opacity"){
        return  Math.floor(num*100);
    }
    return num;
}