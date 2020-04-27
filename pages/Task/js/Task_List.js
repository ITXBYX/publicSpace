//初始化弹窗
layui.use(['element', 'layer', 'form', 'layedit'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit;
});

//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

// 缓冲代码
function closes() {
	$("#Loading").fadeOut("normal", function() {
		$(this).remove();
	});
}
var pc;		
$.parser.onComplete = function() {
	if (pc) clearTimeout(pc);
	pc = setTimeout(closes, 500);
}
function format(value, row, index) {
	return '<button onclick="edit(' + index +
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">编 辑</button><button onclick="see(' + index +
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查 看</button>'
}
//定义任务列表操作列
function format(value, row, index) {
	
	var str = row.t_state;
	var rowId = "'"+row["t_id"]+"'";
	if (str=="3") {
		return '<button onclick="seeTask(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看明细</button><button onclick="seeFile(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看上传</button><button onclick="download(' + index +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">下 载</button>'
	}
	if (str=="2") {
		return '<button onclick="seeTask(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看明细</button><button onclick="seeFile(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看上传</button><button onclick="exexTask(' + index +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs layui-btn-danger">重 试</button>'
	}
	if (str=="4") {
		return '<button onclick="seeTask(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看明细</button><button onclick="seeFile(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看上传</button><button onclick="download(' + index +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">4</button>'
	}
	if (str=="1") {
		return '<button onclick="seeTask(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看明细</button><button onclick="seeFile(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查看上传</button><button onclick="exexTask(' + rowId +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">执 行</button>'
	}
}

function Dchinese(value,row,index)
{
	if(value==1)
	{
		return '未开始';
	}
	else if(value==2)
	{
		return '失败';
	}
	else
	{
		return '已完成';
	}
}

//查看明细
function seeTask(index) {
	$.ajaxSettings.async=false;
    $.get("json/Task_Details.json",
		function(data){
			var values=data.columns;
			values[3].formatter=Dchinese;
			$("#dg2").datagrid({		
				columns:[data.columns]
			});},"json");	
	layer.open({
		type: 1,
		title: '查看任务明细',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		anim: 2,
		scrollbar: true,
		content: $('#seeTask'),
		area: ["90%", "90%"],
		cancel:function(){
			location.reload();
		}
	});
	var num;
	var Name="t_work_task_details";	
	var title="where t_id ='"+index+"'";
	var url1=routePath+"getToGrid";
	$.get(url1,{'tabName':Name,'titles':title},
		function(data1){		
			$("#dg2").datagrid({data:data1["content"]});
			num=data1["content"];	
	},"json");
		var butt1=new Array();
		var row11 = document.getElementById("intr2");
		var row11=$("#intr2")[0];
		row12=$("#intr3")[0];
		var cell0 = row12.insertCell(0);
		cell0.innerHTML='';
		for(var i=num.length-1;i>=0;i--)
		{
			if(num[i].td_state=="3"||num[i].td_state=="成功")
			{
				butt1[i]=num[i].i_name;
				var cell1 = row11.insertCell(1);
				var cell2 = row11.insertCell(2);
				cell1.innerHTML ='<img src="../../images/jiantou.png" style="width: 60px;"></i>';
				cell2.innerHTML = '<button type="button" class="layui-btn layui-btn-radius">"'+butt1[i]+'"</button>';
			}
			if(num[i].td_state=="2"||num[i].td_state=="失败")
			{
				butt1[i]=num[i].i_name;
				var cell1 = row11.insertCell(1);
				var cell2 = row11.insertCell(2);
				cell1.innerHTML ='<img src="../../images/jiantou.png" style="width: 60px;"></i>';
				cell2.innerHTML = '<button type="button" class="layui-btn layui-btn-danger layui-btn-radius">"'+butt1[i]+'"</button>';
			}
			if(num[i].td_state=="1"||num[i].td_state=="未执行")
			{
				butt1[i]=num[i].i_name;
				var cell1 = row11.insertCell(1);
				var cell2 = row11.insertCell(2);
				cell1.innerHTML ='<img src="../../images/jiantou.png" style="width: 60px;"></i>';
				cell2.innerHTML = '<button type="button" class="layui-btn layui-btn-primary layui-btn-radius">"'+butt1[i]+'"</button>';			
			}
		}
		
}


//下载结果
function Upload(index) {
	$.ajaxSettings.async=false;
	$('#dg').datagrid('selectRow', index);
	var row = $('#dg').datagrid('getSelected');
	//console.log(row.t_id);
	var Tab_name="t_work_task_details";
	var title="WHERE t_id = '"+row.t_id+"' order by td_id ";
	var url1=routePath+"/getToGrid";
	var instruct_data;s
	$.get(url1,{'tabName':Tab_name,'titles':title},
			function(data1){				
				instruct_data=data1[data1.length-1];
				console.log(data1.length);				
				},
			"json");		
		var source=instruct_data["td_note"];				
		var url1="http://182.61.10.96:8080/FileDownload/download";
		$.post(url1,{'sources':source},
			function(data){
			alert("1");
		},"json");						
}
//停止
function Stop(index) {
	$('#dg').datagrid('selectRow', index);
	var row = $('#dg').datagrid('getSelected');
}



//执行
function Begin(index) {
	$('#dg').datagrid('selectRow', index);
	var row = $('#dg').datagrid('getSelected');
}

//查看上传
function seeFile(index) {
	sessionStorage.setItem('Trows', index);//传任务列表的t_id
	layer.open({
		title: '查看上传',
		type: 2,
		anim: 2,
		content: 'Task_edit.html',
		area: ['100%', '100%'],
		maxmin: true,
		end: function() {
			layer.closeAll();
		}
	});
}

//定义查看任务明细操作列
function format2(value, row, index) {
	var str = row.td_state;
	if(str=="2")
		{
			return '<button onclick="retry(' + index +
						')" type="button" class="layui-btn layui-btn layui-btn-danger layui-btn-xs">重 试</button>';
		}
	else if(str=="1")
		{
			return '<button onclick="download1(' + index +
					')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">执 行</button>';
		}
	else if(str=="3")
	{
		return '<button onclick="download1(' + index +
			')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">完 成</button>';
	}
}

//重试
function retry(index){
	
	$('#dg2').datagrid('selectRow', index);
	var row = $('#dg2').datagrid('getSelected');
	console.log(row.td_id);
	var url1=routePath+"/Task/reExecTask";
	var tID=row.td_id;
	$.post(url1,{'tId':tID},
			function(data1){
				console.log("retry ok");
				},
			"json");	
}



//停止任务明细中的指令逻辑代码在这里写
function download(index) {
	$('#dg').datagrid('selectRow', index);
	var row = $('#dg').datagrid('getSelected');
	var filePath = row.t_site;
	filePath=(filePath.substring(filePath.length-1)==',')?filePath.substring(0,filePath.length-1):filePath;
	var fileList = filePath.split(",");
	for (var i = 0; i < fileList.length; i++) {
		alert("下载第"+(i+1)+"个文件");
		var sfilePath = fileList[i];
		sfilePath=sfilePath.replace(/\s*/g,"");
		console.log(sfilePath);
		var url = taskRoutePath + "download";
		var form = $("<form>");//定义一个form表单
		form.attr("style", "display:none");
		form.attr("target", "");
		form.attr("method", "get");  //请求类型
		form.attr("action", url);   //请求地址
		$("body").append(form);//将表单放置在web中
		var input1 = $("<input>");
		input1.attr("type", "hidden");
		input1.attr("name", "sources");
		input1.attr("value", sfilePath);
		form.append(input1);
		form.submit();//表单提交
	}
}


//停止任务明细中的指令逻辑代码在这里写
function stoptask(index) {
	$('#dg2').datagrid('selectRow', index);
	var row = $('#dg2').datagrid('getSelected');

}

//重试任务明细中的指令逻辑代码在这里写
function again(index) {
	$('#dg2').datagrid('selectRow', index);
	var row = $('#dg2').datagrid('getSelected');

}

//失败原因
function reason(value, row, index) {
	return '<a href="#" class="reason" onclick="reason_false(' + index + ')">' + value + '</a>';
}

//失败原因弹窗
function reason_false(index) {
	$('#dg2').datagrid('selectRow', index);
	var row = $('#dg2').datagrid('getSelected');
	layer.alert(row.pd_defeated, {//此处返回详细的失败原因,待商榷
	  icon: 0,
	  title:'详细失败原因'
	})
}


//初始化弹窗
layui.use(['element', 'layer'], function() {
	var element = layui.element,
		layer = layui.layer;
});

//执行
function add_Task() {
	var index = layer.open({
		title: '添加顺序流任务',
		type: 2,
		anim: 2,
		content: 'add_Shun.html',
		area: ['100%', '100%'],
		maxmin: true,
		end: function() {
			layer.closeAll();
		}
	});
}

//删除
function remove() {
	if ($('#dg').datagrid('getSelected')) {
		var row = $('#dg').datagrid('getSelections');
		for (var i = 0; i < row.length; i++) {
			var rowIndex = $('#dg').datagrid('getRowIndex', row[i]);
			$('#dg').datagrid('deleteRow', rowIndex);
			
			var Tab_name="t_work_task"
    		var idd=row[i].t_id;
			var Titles = " Where t_id = '" + idd + "'";
			console.log(Titles);
			var url1=routePath+"/dataDelete";
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				//$("#dg2").datagrid({data:data1["content"]});
				},
			"json");	
			
			var Tab_name1="t_work_task_details"
			$.get(url1,{'tabName':Tab_name1,'titles':Titles},
			function(data1){			
				//$("#dg").datagrid({data:data1["content"]});
				},
			"json");	
		}
		layer.msg("数据删除完成");
	} else {
		layer.msg("请先选中要删除的行");
	}
	
}
 //刷新
 function rest() {
	location.reload();
}
//搜索查询
function serach()
{			
			var name=$("#order_search").val();
	    	var Tab_name="t_work_task"
			var Titles = "where t_name like '"+"%"+name+"%"+"' order by t_id desc";
			console.log(Titles)
			var url5=routePath+"/getToGrid";
			$.get(url5,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg").datagrid({data:data1["content"]});
				},
			"json");		
}
function frm_disp(){
	var html1 = '';
	var Vdata1 ='<td ><button type="button" class="layui-btn layui-btn-normal layui-btn-radius" onclick="exexTask()">开 始</button></td><td><img src="../../images/jiantou.png" style="width: 60px;"></td><td><button type="button" class="layui-btn layui-btn-normal layui-btn-radius">结 束</button></td>';
	html1 +=Vdata1;
	$('#intr2').html(html1);
}

//----转中文
function Qchinese(value,row,index)
{
	if(value==1)
	{
		return '<span><i class="layui-icon no">&#xe702;</i></span> 未执行';
	}
	if(value==2)
	{
		return '<span><i class="layui-icon no">&#xe69c;</i></span> 失败';
	}
	if(value==3)
	{
		return '<span><i class="layui-icon yes">&#xe6af;</i></span> 已完成';
	}
}

//----时分秒毫秒
function Time(value,row,index)
{
	if(value<1000 && value>0)
	{
		return value + "毫秒";
	}
	if(value/1000 >= 1 && value/1000 < 60)
	{
		var time = parseInt(value/1000);
		return time + " 秒 ";
	}
	if(value/1000 >= 60 && value/1000 < 3600)
	{
		var time = parseInt(value/1000/60);
		return time + " 分钟 ";
	}
	if(value/1000 >= 3600 && value/1000 < 86400)
	{
		var time = parseInt(value/1000/60/24);
		return time + " 小时 ";
	}
}




 $(document).ready(function(){  	  
 	frm_disp();
    $.ajaxSettings.async=false;   		
    $.get("json/Task_List.json",
	function(data){
		var values=data.columns;
		values[3].formatter=Qchinese;
		values[4].formatter=Time;
		values[7].formatter=format;				
		$("#dg").datagrid({	
			columns:[data.columns]
		});
	},"json");	
	var Tab_name="t_work_task";
	var Titles = "";
	var url1=routePath+"/getToGrid";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){
			$("#dg").datagrid({data:data1["content"]});
		},"json");
 })

//  //开始
function exexTask(rowId){
	layer.msg("点击开始执行");
	// var tId =sessionStorage.getItem('Trows');
	// console.log(tId);
	console.log("begin");
	$.get(taskRoutePath+"execTask",{'tId':rowId},
		function(data){
			alert(JSON.stringify(data["content"]));
		},"json");
	console.log("end");
}
