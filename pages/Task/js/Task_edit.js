layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//日期
	laydate.render({
		elem: '#date'
	});
	laydate.render({
		elem: '#date1'
	});

});

layui.use('element', function() {
	var $ = layui.jquery,
		element = layui.element;
});


// onload = function(){
// 	//回显加载数据
// }
function frm_disp(){
		$.ajaxSettings.async=false;
		var row_id1 = sessionStorage.getItem('Trows');
		var Tab_name="t_work_task"
		var values11;
		var url1=routePath+"/getToGrid";
		var Titles = "Where t_id = '" + row_id1 + "'";	
		$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){			
			values11=data1["content"][0];		
			},
		"json");	

		var Vdata1='<td>任务名称：</td><td colspan="3"><input type="text" id="name11" name="name11" autocomplete="off" placeholder="请输入任务名称" class="layui-input" style="width: 480px;" value ='+(values11.t_name)+'></td>';
		var Vdata2='<td>步骤配置</td>';
		
		// $("#name11").val();
		$('#frm01').html(Vdata1);
		$('#frm02').html(Vdata2);
}
$(document).ready(function(){
			frm_disp();
			$.ajaxSettings.async=false;
			var row_id = sessionStorage.getItem('Trows');
			var butt1=new Array();
			//var row11 = document.getElementById("intr2");
			var row11=$("#intr2")[0];
    		var Tab_name1="t_work_task_details";
			var Titles1 =  " Where t_id = '" + row_id + "' order by td_id";		
			var fname;
			var url1=routePath+"/getToGrid";
			$.get(url1,{'tabName':Tab_name1,'titles':Titles1},
			function(data1){			
				fname=data1["content"];
				
				for(var j=0;j<fname.length;j++)
				{
						var table1 = document.getElementById("add_tr1");
						var row = table1.insertRow(-1);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var jj=j+1;
						var titlet="title"+jj;
						var commd="command"+jj;
						cell1.innerHTML = '第 ' + jj + ' 步骤：';
						cell2.innerHTML = 
						'<input type="text" id="'+titlet+'" name="'+titlet+'" readonly="readonl" class="layui-input" placeholder="加载流程中的步骤">';
						cell3.innerHTML =
						'<input type="text" id="'+commd+'" name="'+commd+'" class="layui-input" placeholder="指令参数值">';						
						var ttile="#"+titlet;
						var commod1="#"+commd;
						var c=fname[j].td_command;
						var b=fname[j].i_name;
						$(ttile).val(b);
						$(commod1).val(c);
				}
				
				for(var i=fname.length-1;i>=0;i--)
					{
						butt1[i]=fname[i].i_name;						
						var cell1 = row11.insertCell(1);
						var cell2 = row11.insertCell(2);
						cell1.innerHTML ='<img src="../../images/jiantou.png" style="width: 60px;"></i>';
						cell2.innerHTML = '<button type="button" class="layui-btn layui-btn-primary layui-btn-radius">"'+butt1[i]+'"</button>';
					}
				},
			"json");			
})
//  //开始

 function exexTask(){
	layer.msg("开始普通执行");
	var tId =sessionStorage.getItem('Trows');
	console.log("begin");
	$.get(taskRoutePath+"execTask",{'tId':tId},
		function(data){
		alert(JSON.stringify(data["content"]));
	},"json");	
	console.log("end");
}



function SuduleTask(){
	layer.msg("开始周期执行");
	var tId =sessionStorage.getItem('Trows');
	console.log("begin");
	$.get(taskRoutePath+"startTask",{'tId':tId},
		function(data){
		alert(JSON.stringify(data["content"]));
	},"json");	
	console.log("end");
}

function stopTaskTask(){
	layer.msg("停止周期执行");
	var tId =sessionStorage.getItem('Trows');
	console.log("begin");
	$.get(taskRoutePath+"stopTask",{},
		function(data){
		alert(JSON.stringify(data["content"]));
	},"json");	
	console.log("end");
}