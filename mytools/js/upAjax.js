/**
 * Created by Administrator on 2017/4/12.
 *
 * ������ie�����
 * ajax.onprogress���ϴ���ʱ��ʹ�õ�
 *ev.loaded�Ѿ����ص�����
 * ev.total�����е�����
 */
function upAjax(obj)
{
    var meters={
        url:obj.url,           //���صĵ�ַ
        data:obj.data,         //���ݵĶ���
        name:obj.name,         //��̨�����ļ�������
        percent:obj.percent,   //�������İٷֱȵ�����
        success:obj.success,   //�ɹ�����
        fail:obj.fail          //ʧ�ܺ���
    }
    var file_data=meters.data.files[0];  //������ݵĶ���
    var fileD=new FormData();            //ʹ���������ķ���
    fileD.append(meters.name,file_data); //ת��Ϊ�����Ƶ����ݵ�ת��ͬʱ������Ӧ�ĺ�̨���յ��ļ�
    var ajax=new XMLHttpRequest();
    ajax.open("post",meters.url,true);   //���䷽ʽ��
    ajax.onload?ajax.onload=fn:ajax.onreadystatechange=fn;   //ie�������fireFox��һ������
    function fn(){
        if(ajax.readyState==4){         //״̬��
            if(200<=ajax.status&&ajax.status<=207){
                meters.success&&meters.success(ajax.responseText);
            }else{                      //   ����
                meters.fail&&meters.fail(ajax.status);
            }
        }
    }
    ajax.upload.onprogress=function(ev){  //�������ĺ������Ի�ðٷֱ�
        var ev=ev || window.event;
        var percent=Math.round(((ev.loaded/ev.total).toFixed(2))*100)+"%";
        meters.percent&&meters.percent(percent);
    }
    ajax.send(fileD);                   //���ͷ���upload�¼���������ܻ������
}
