/**
 * Created by Administrator on 2017/3/27.
 */
function getBrowser(){
    var  str1 = navigator.userAgent.toLowerCase();//用户代理信息
    if(str1.indexOf('msie')!==-1){
        return "ie";
    }else if (str1.indexOf('chrome')!==-1) {
        return "chrome";
    }else if(str1.indexOf('safari')!==-1){
        return "safari";
    }else if(str1.indexOf('firefox')!==-1){
        return "firefox";
    }else{
        return "other";
    }
}
//ie的版本的判断。ie5 和ie7没法分开。
function ieVersion(){
    var  str1 = navigator.userAgent.toLowerCase(); //判断是不是ie的版本
    if(str1.indexOf('msie')!==-1){
        var tes=new RegExp('msie (\\d+\\.\\d+);');
        tes.test(str1);                   //这是通test方法得来才能使用子项的这个功能
        var ieV=parseFloat(RegExp["$1"]);  //这是一个子项的括号里面的第一个。
        if(ieV==7){
            return 7;
        }
        else if(ieV==8){
            return 8;
        }
        else if(ieV==9){
            return 9;
        }
        else if(ieV==10){
            return 10;
        }else if(ieV==11){
            return 11;
        }else {
            return 0;
        }
    }
}
//获取元素的函数，兼容各种浏览器但是只能是父级选择子级没有达到直接子级这样的地步
//没有使用
function s$(obj){
    var context=[], arr1 , arr, ar, aE, r, k, ele,l, c,j,m, i=0;
    context[0]=document;
    arr=obj.split(" ");
    r=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;//正则表达式判断标签还有的class,id
    for(;i<arr.length;i++) {
        ar=[];
        match= r.exec(arr[i]);//获得的class id tag
        if((m=match[1])) {
            ar.push(document.getElementById(m));
        }
        if((m=match[2])) {
            for(k=0;k<context.length;k++) {
                if(context[k].getElementsByTagName(m).length!=0) {
                    ele=context[k].getElementsByTagName(m);
                    for(j=0;j< ele.length;j++) {
                        ar.push(ele[j]);
                    }
                }
            }
        }
        if((m=match[3])) {
            if(ieVersion()<9){
                for(c=0;c<context.length;c++){
                    aE=context[c].getElementsByTagName("*");
                    for(k=0;k<aE.length;k++) {
                        if(aE[k].className) {
                            arr1 = aE[k].className.split(" ");
                            for(j=0;j<arr1.length;j++) {
                                if(arr1[j] == m) {
                                    ar.push(aE[k]);
                                }
                            }
                        }
                    }
                }
            }else{
                for(k=0;k<context.length;k++) {
                    if((context[k].getElementsByClassName(m)).length!=0) {
                        ele= context[k].getElementsByClassName(m);

                        for(j=0;j< ele.length;j++) {
                            ar.push(ele[j]);

                        }
                    }
                }
            }

        }
        context=[];
        for(l=0;l<ar.length;l++) {
            context.push(ar[l]);
        }
    }
    return ar;
}