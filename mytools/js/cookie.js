/**
 * Created by Administrator on 2017/3/28.
 */
function setcookie (key,value,day) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = key + "=" + value +";expires=" + oDate ;
}
function getcookie (key) {
    var arr = document.cookie.split("; "); //×¢ÒâÓÐ¿Õ¸ñ
    for (var i = 0 ; i < arr.length ; i++) {
        var arr1 = arr[i].split("=");
        if (arr1[0] == key) {
            return arr1[1];
        }
    }
    return ""
}
function delcookie (key) {
    setcookie (key,"",-1);
}