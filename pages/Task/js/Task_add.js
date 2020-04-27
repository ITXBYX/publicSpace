
var TASKID = "";

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

function Save(){
	layer.msg("保存成功");
}


function frm_disp1(){
	
	var html1= '<td>任务名称：</td><td colspan="3"><input type="text" id="t_name" name="t_name" autocomplete="off" placeholder="请输入任务名称" class="layui-input" style="width: 480px;"></td><!-- 不需要显示的隐藏部分字段 --><td hidden="hidden"><input type="text" id="t_id" name="t_id" ></td><td hidden="hidden"><input type="text" id="t_owner" name="t_owner" ></td><td hidden="hidden"><input type="text" id="f_id" name="f_id" ></td><td hidden="hidden"><input type="text" id="t_state" name="t_state" ></td><td hidden="hidden"><input type="text" id="t_ok_date" name="t_ok_date" ></td><td hidden="hidden"><input type="text" id="t_begin_date" name="t_begin_date" ></td><td hidden="hidden"><input type="text" id="t_create_user" name="t_create_user" ></td><td hidden="hidden"><input type="text" id="t_create_date" name="t_create_date" ></td>';
	var html2= '<td>步骤配置</td>';
	var html3='<!-- 不需要显示的隐藏部分字段 --><td hidden="hidden"><input type="text" id="td_id" name="td_id" ></td><td hidden="hidden"><input type="text" id="i_name" name="i_name" ></td><td hidden="hidden"><input type="text" id="t_id" name="t_id" ></td><td hidden="hidden"><input type="text" id="td_state" name="td_state" ></td><td hidden="hidden"><input type="text" id="td_defeated" name="td_defeated" ></td><td hidden="hidden"><input type="text" id="td_create_user" name="td_create_user" ></td><td hidden="hidden"><input type="text" id="td_ok_date" name="td_ok_date" ></td><td hidden="hidden"><input type="text" id="td_begin_date" name="td_begin_date" ></td><td hidden="hidden"><input type="text" id="td_create_date" name="td_create_date" ></td><td hidden="hidden"><input type="text" id="td_command" name="td_command" ></td><td hidden="hidden"><input type="text" id="i_id" name="i_id" ></td><td hidden="hidden"><input type="text" id="st_id" name="st_id" ></td>';

	$('#frm01').html(html1);
	$('#frm02').html(html2);
	$('#frm03').html(html3);
}
 $(document).ready(function(){	
 			var x=document.cookie;
 			frm_disp1();
    		$.ajaxSettings.async=false;
    		var row_id = sessionStorage.getItem('rows2');
    		var butt1=new Array();
    		var row11=$("#intr2")[0];
    		var Tab_name1="t_configuration_flow_step";
			var Titles1 =  " Where f_id = '" + row_id + "' order by fs_id";		
			var url1=routePath+"/getToGrid";
			$.get(url1,{'tabName':Tab_name1,'titles':Titles1},
			function(data1){			
				var	fname=data1["content"];		
				console.log(fname);
						
				for(var j=0;j<fname.length;j++)
				{
						var table1 = document.getElementById("add_tr");
						var row = table1.insertRow(-1);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var cell4= row.insertCell(3);
						var jj=j+1;
						var titlet="title"+jj;
						var commd="command"+jj;
						var iid1="iid"+jj;
						cell1.innerHTML = '第 ' + jj + ' 步骤：';
						cell2.innerHTML = 
						'<input type="text" id="'+titlet+'" name="'+titlet+'" readonly="readonl" class="layui-input" placeholder="加载流程中的步骤">';
						cell3.innerHTML =
						'<input type="text" id="'+commd+'" name="'+commd+'" class="layui-input" placeholder="指令路径">';
						cell4.innerHTML =
						'<input type="hidden" id="'+iid1+'" name="'+iid1+'"  class="layui-input" placeholder="指令路径">';
						var ttile="#"+titlet;
						var i_id="#"+iid1;
						var b=fname[j].i_name;
						var iid=fname[j].i_id;
						$(i_id).val(iid);
						$(ttile).val(b);

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
			var num1;
			var url2=taskRoutePath+"newId";
		$.get(url2,{'tabName':"t_work_task"},
			function(data1){		
				TASKID = data1["content"];	
			},
			"json");			

			
			
			
			
	
 });

	
	
	//触发执行上传
	function saveTask() {
//		if (this.uploadFile && this.uploadFile.id) {
//			this.uploader.upload(this.uploadFile.id);
//		} else {
//			alert("请选择文件");
//		}
		//alert(1);
		var t_name1 = $("#t_name").val();
		if(t_name1!="")
		{
			$.ajaxSettings.async=false;
			var bill_no1= TASKID;
			var bill_no2 = new Array();
			var owner=sessionStorage.getItem('owner');
			var t_name=$('#t_name').val();
			var row_id2 = sessionStorage.getItem('rows2');
			var myDate = new Date();
			var DateTime=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
			$('#t_owner').val(owner);
			$('#t_id').val(bill_no1);
			$('#f_id').val(row_id2);
			$('#t_state').val("1");
			$('#t_ok_date').val(DateTime);
			$('#t_begin_date').val(DateTime);
			$('#t_create_user').val("admin");
			$('#t_create_date').val(DateTime);
			$('#t_name').val(t_name);

			var tab_name1="t_work_task"
			var value1=$("#main_info").serializeArray();
			// var url1=routePath+"formSave";
			//保存jiyin_tast主表
			var data2 =JSON.stringify({"tabName":tab_name1,"dataSet":value1});
			$.ajax({
				type: 'POST',
				processData: false,
				url: routePath+"formSave",
				data: data2,
				headers: {'Content-Type':'application/json'},
				success: function(respMsg){
					$("#respMsg").html("That,s OK!");
				}
			});

			//查找条件表
			var url1=routePath+"getToGrid";
			console.log(row_id2);
			var titleR="where f_id='"+row_id2+"'"
			var valuesIR;
			$.get(url1,{'tabName':"t_configuration_flow_step",'titles':titleR},
				function(data1){
					valuesIR=data1["content"];
				},
				"json");
			var fs_id=new Array();
			var ValuesSid;
			var AValuesSid=new Array();
			var titleS="";
			var strtid=new Array();
			$.get(url1,{'tabName':"t_configuration_step_title",'titles':titleS},
				function(data1){
					ValuesSid=data1["content"];
				},
				"json");
			for(var z=0;z<valuesIR.length;z++)
			{
				fs_id[z]=valuesIR[z].fs_id;//流程详情的步骤fls
			}
			for(var x=0;x<fs_id.length;x++)
			{
				for(var c=0;c<ValuesSid.length;c++)
				{
					if(fs_id[x]==ValuesSid[c].sid)
					{
						AValuesSid[x]=ValuesSid[c].tid;
						strtid[x]+=","+AValuesSid[x];
					}
				}
				//console.log(AValuesSid[x]);
			}
			console.log(strtid.length);
			var spt=strtid[strtid.length-1];
			//var spt1=AValuesSid[AValuesSid.length-1];

			var strtid2=new Array();
			var strid3=new Array();
			//console.log(strid3)
			console.log(spt);
			//strtid2=spt.split(",");
			var count2=0;
			// for(var q=0;q<strtid2.length;q++)
			// {
			// 	if(strtid2[q]=="undefined")
			// 	{
			// 		strtid2[q]=="";
			// 	}
			// }
			var strid4="";
			//console.log(strtid2);
			for(var h=0;h<strtid2.length;h++)
			{

				if(strtid2[count2]=="undefined")
				{
					//strtid2[count2]+=","+strtid2[h];
					strid3[count2]=strtid2[h];
					count2++;
				}
				else
				{
					strid4+=strtid2[h]+",";
					//console.log(strid4);
					strid3[count2]=strid4;
				}
			}

			var mytable = document.getElementById("add_tr");
			var iname=new Array();
			var commd1=new Array();
			var iid2=new Array();
			$.ajaxSettings.async=false;

			var url2=taskRoutePath+"newId";
			for(var td=0;td<mytable.rows.length-1;td++)
			{
				//把inut的值拿到存到iname中
				var aws=td+1;
				iname[td]=$("#title"+aws).val()
				commd1[td]=$("#command"+aws).val();
				iid2[td]=$("#iid"+aws).val();
				console.log(iid2[td]);
				//先生成从表的id存到bill_no2中
				$.get(url2,{'tabName':"t_work_task_details"},
					function(data1){
						bill_no2[td] =data1["content"];
					},
					"json");



				//保存jiyin_tast_Detail副表

				var tab_name123="t_work_task_details"
				$('#i_name').val(iname[td]);
				$('#t_id').val(bill_no1);
				if(strid3[td]=="undefined")
				{
					$('#st_id').val();
				}
				else
				{
					$('#st_id').val(strid3[td]);
				}


				$('#td_id').val(bill_no2[td]);
				console.log(iname[td]);
				if(iname[td]=="文件上传")
				{
					$('#td_state').val("3");
					$('#td_begin_date').val(DateTime);
					$('#td_ok_date').val(DateTime);
				}
				else
				{
					$('#td_begin_date').val("");
					$('#td_ok_date').val("");

					$('#td_state').val("1");
				}
				$('#td_create_user').val("admin");
				$('#td_create_date').val(DateTime);
				$('#td_update_date').val(DateTime);
				$('#td_command').val(commd1[td]);
				$('#i_id').val(iid2[td]);
				var value2=$("#main_info112").serializeArray();
				console.log(value2);
				var numss=value2[2];
				numss.value=bill_no1;
				//form save
				var data3 =JSON.stringify({"tabName":tab_name123,"dataSet":value2});
				// console.log(data3);
				$.ajax({
					type: 'POST',
					processData: false,
					url: routePath+"formSave",
					data: data3,
					headers: {'Content-Type':'application/json'},
					success: function(respMsg){
						$("#respMsg").html("That,s OK!");
					}
				});
			}
			layer.msg("任务保存成功");
			//location.href="Task_List.html";
		}
		else {
			layer.msg("请输入任务名称");
		}


	}

	
	function reTask()
	{	
		location.href="../process/Process_List.html";
		
	}


	

