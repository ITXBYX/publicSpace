var routePath="http://127.0.0.1:8889/pop-web/";
var taskRoutePath="http://127.0.0.1:8889/task-web/";
//var secPath ="http://localhost:6081/sec/";
var oopRoutePath ="http://localhost:8889/oop-web/";

function currentTime(){
	var myDate = new Date();            
	var year=myDate.getFullYear();        //获取当前年
	var month=myDate.getMonth()+1;   //获取当前月
	var date=myDate.getDate();            //获取当前日
	var h=myDate.getHours();              //获取当前小时数(0-23)
	var m=myDate.getMinutes();          //获取当前分钟数(0-59)
	var s=myDate.getSeconds();
	var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
	return now;
}

function currentDate(){
	var myDate = new Date();            
	var year=myDate.getFullYear();        //获取当前年
	var month=myDate.getMonth()+1;   //获取当前月
	var date=myDate.getDate();            //获取当前日
	var h=myDate.getHours();              //获取当前小时数(0-23)
	var m=myDate.getMinutes();          //获取当前分钟数(0-59)
	var s=myDate.getSeconds();
	var now=year+'-'+month+"-"+date;
	return now;
}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = (d + Math.random()*16)%16 | 0;
	  d = Math.floor(d/16);
	  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
}