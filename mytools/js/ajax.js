/**
 * Created by Administrator on 2017/3/28.
 */
/**
 *
 * */
function ajax(obj)
{
    var parameter={    //�����Ķ���
        url:obj.url,   //��ַ
        success:obj.success,  //�������ĺ���
        method:obj.method || "get",  //��ʽ
        name:obj.name || null,      //����������
        bool:obj.bool|| true,      // booleanֵͬ���첽
        type:obj.type || "",       //��������
        fail:obj.fail || function(){}   //ʧ�ܵĺ���
    }
    var ajax=new XMLHttpRequest();   //�����������
    if(parameter.method=="get"){    //get�����Ĵ�������
        if(parameter.name){
            parameter.url+="?"+encodeURI(parameter.name);//�������ݵ�ʱ��
        }
        ajax.open("get",parameter.url,parameter.bool);  //��ַ����
        ajax.send();     //����
    }else if(parameter.method=="post"){   //����post����
        ajax.open("post",parameter.url,parameter.bool);
        ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');  //�������ݵ�ʱ���и�����ͷ�Ĵ��ڡ�
        ajax.send(parameter.name);   //��������
    }
    ajax.onload?ajax.onload=fn:ajax.onreadystatechange=fn;   //ie�������fireFox��һ������
    function fn(){
        if(ajax.readyState==4){         //״̬��
            if(200<=ajax.status&&ajax.status<=207){
                var str=(parameter.type=="xml")?ajax.responseXML:((parameter.type=="json")?(new Function("","return"+ajax.responseText))():ajax.responseText);     //�ж���������
                parameter.success&&parameter.success(str);
            }else{         //   ����
                parameter.fail&&parameter.fail(ajax.status);
            }
        }
    }
}
