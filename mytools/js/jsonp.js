/**
 * Created by Administrator on 2017/4/12.
 */

/*
ʹ��ָ��
*jsonp({
 url:'https://api.douban.com/v2/book/search',��ַ
 meter:{  ����
 q:val  �ؼ���
 },
 name:'callback',  �������ݵĺ���
 fnName:'fns',���غ����ĺ�����
 success:function(data){ // �ɹ������ĺ���
        console.log(data)
 }
 })
* */

function jsonp(obj){       //����jsonp�Ļ�ȡ����
    obj.meter[obj.name]=obj.fnName;
    var arr=[];
    for(var attr in obj.meter){
        arr.push(attr+"="+obj.meter[attr]);
    }
    var oS=document.createElement("script");
    oS.src=obj.url+"?"+arr.join("&");
    document.body.appendChild(oS);
    document.body.removeChild(oS);
    window[obj.fnName]=function(data){//����������ֹ���window��������档
        obj.success&&obj.success(data);
    }
}