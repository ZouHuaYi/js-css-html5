/**
 * Created by Administrator on 2017/3/28.
 */
function getBrowser(){
    var  str1 = navigator.userAgent.toLowerCase();
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
//ie�İ汾���жϡ�ie5 ��ie7û���ֿ���
function ieVersion(){
    var  str1 = navigator.userAgent.toLowerCase();
    if(str1.indexOf('msie')!==-1){
        var tes=new RegExp('msie (\\d+\\.\\d+);');
        tes.test(str1);                   //����ͨtest������������ʹ��������������
        var ieV=parseFloat(RegExp["$1"]);  //����һ���������������ĵ�һ����
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