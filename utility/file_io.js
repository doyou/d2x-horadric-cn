<!--
function importFile(input){
	console.log(window.FileReader,typeof window.ActiveXObject,document.implementation,document.implementation.createDocument);
	//ֱ�Ӷ�ȡ.d2s�ļ������������֧��VBS���ĳ�JSʵ��
	//chrome��IE10/11��FFҲ��
	if (window.FileReader){
		var file = input.files[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			//�첽����������¼�����
			bin = new Uint8Array(this.result);
			hexStr = "";
			for (var i=0;i<bin.length;i++) {	//for...ofΪES6��׼
				var s = '0' + parseInt(bin[i]).toString(16);
				//ȷ������λ����HEX
				s = s.substr(s.length - 2, 2);
				hexStr += s.toUpperCase();
			}
			document.import_sheet.hex_data.value = hexStr;	//δ���У���Ӱ�쵼��
			importing();
		}
		reader.readAsArrayBuffer(file);
	}
	//��IE��֧��H5����δд
	/*/https://www.cnblogs.com/vicky-li/p/10030832.html
	http://c.biancheng.net/view/5995.html
	https://www.cnblogs.com/xiaocaiyuxiaoniao/p/8324543.html
	https://www.cnblogs.com/yaotome/p/9002172.html
	*/
	else if (typeof window.ActiveXObject != 'undefined') {
		alert('IE8/9��δ֧�֣����ø�������������е���HEX���ݣ�');
		//IE8û��Ȩ��, input.value = fakepath\file����û��H5��FileReader...
		//alert(document.selection.createRange().text);
		//https://cloud.tencent.com/developer/article/1691670�������ܵõ���ʵ·��
		var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		input.select();
		xmlhttp.open("GET", document.selection.createRange().text, false);	//��ûȨ�ޡ���
		//xmlhttp.open("GET", input.value, false);	//trueΪ�첽��Ӧ
		xmlhttp.send(); //	load()?
		var bin = xmlhttp.responseBody;	//�������Ϊ�޷�����������
		//alert(bin[0]);
		hexStr = "";
		for (var i=0;i<bin.length;i++) {
			var s = '0' + parseInt(bin[i]).toString(16);
			//ȷ������λ����HEX
			s = s.substr(s.length - 2, 2);
			hexStr += s.toUpperCase();
		}
		document.import_sheet.hex_data.value = hexStr;		//	*/
	}
	//֧��FFδд��ò��ǰ��Chrome����Ҳ�ܹ���
	else if (document.implementation && document.implementation.createDocument) {
		alert('FireFox������δ��ɣ�');
	} else {
		alert('�������֧�֣������е���HEX���ݣ�');
	}

}

//��Uint8Array�������M�u�ļ�, https://code-examples.net/zh-TW/q/182e049
function saveD2s(hex_dum,fileName){
	var bin = new Uint8Array(hex_dum.length/2);
	for (var i=0;i<hex_dum.length;i+=2){
		bin[i/2]=parseInt('0x'+hex_dum.substr(i,2));
	}
	//console.log(bin);
	blob = new Blob([bin]);			//,{type: 'application/octet-stream'});
	var url=URL.createObjectURL(blob);
	downloadURL(url, fileName);		//Ϊʲôblob�������10�������ַ���������д[bin]����
	setTimeout(function(){return URL.revokeObjectURL(url);}, 1000);
}
 function downloadURL(data,fileName){
	var a;
	a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};
//-->