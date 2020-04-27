//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

//初始化弹窗
layui.use(['element', 'layer', 'form', 'layedit'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit;
});

//选择新增的任务类型
function add_Config() {
	layer.open({
		type: 1,
		title: '新增指令',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		anim: 2,
		scrollbar: false,
		area: ["820px", "500px"],
		content: $('#CONFIG'),
		end: function() {
			// 刷新代码放这里
		}
	});
	$('#dg2').datagrid();
}

//添加
function add_return() {
	var ln = $('#dg2').datagrid('getRows').length;
	
	if(ln < 3){
		$('#dg2').datagrid('appendRow', {});
	}else{
		layer.msg("返回值上限为3个");
	}
}

//删除
function remove(){
	var row = $('#dg2').datagrid('getSelected');
	if (row) {
		var rowIndex = $('#dg2').datagrid('getRowIndex', row);
		$('#dg2').datagrid('deleteRow', rowIndex);
		layer.msg("数据删除完成");
	}else{
		layer.msg("请先选中要删除的行");
	}
}

//保存
function Save() {
	var i_name1 = $("#i_name").val();
	var i_code1 = $("#i_code").val();
	var i_type1 = $("#i_type").val();
	if (i_name1 != '')
	{
		if(i_code1 != '')
		{
			if(i_type1 != '')
			{
				/////------锁定编辑栏
				accept();
				//--------指令代码表
				$.ajaxSettings.async=false;
				var url0=routePath+"/getToGrid";
				var TNmaeC="t_configuration_command";
				var titlesC="";
				var Command=new Array();
				$.get(url0,{'tabName':TNmaeC,'titles':titlesC},
					function(data1){
						for(var c=0;c<data1.length;c++)
						{
							Command[c]=data1[c].command;
						}
					},
					"json");

				var com1=0;
				for(var co=0;co<Command.length;co++)
				{
					if($("#i_code").val()==Command[co])
					{
						com1=1;
						break;
					}
				}
				// if(com1==1)
				// {
				//--------返回值表
				var url1=taskRoutePath+"/newId"
				var bill_no="";
				var bill_noR=new Array();
				$.get(url1,{'tabName':"t_configuration_instruct"},
					function(data1){
						bill_no =data1["content"];
					},
					"json");

				var flag = $("input[name='i_start']:checked").val();//单选框启动状态
				var flag1=0;
				var Name = "t_configuration_instruct_return";
				var dg_data = $('#dg2').datagrid('getRows');
				for(var i=0;i<dg_data.length;i++)
				{
					$.get(url1,{'tabName':Name},
						function(data1){
							bill_noR[i] =data1["content"];
						},
						"json");
				}
				if(dg_data.length!=0)
				{
					dg_data[0].ir_id=bill_noR[0];
					dg_data[0].i_id=bill_no;
					dg_data[0].ir_return="1";

					if(flag=="1")
					{
						dg_data[0].ir_start=1;
						flag1=1;
					}
					else
					{
						dg_data[0].ir_start=1;
						flag1=1;
					}
					console.log(dg_data[0].ir_id);//返回值第一行的行指令id
					console.log(dg_data.length);//返回值的行数
					//遍历表中的所有行
					if(dg_data.length==2||dg_data.length==3)
					{
						for(var j=1;j<dg_data.length;j++)
						{
							if(flag1==1)
							{
								dg_data[j].ir_start=1;
							}
							else
							{
								dg_data[j].ir_start=0;
							}
							dg_data[j].ir_return="1";
							dg_data[j].i_id=bill_no;
							dg_data[j].ir_id=bill_noR[j];
							console.log(dg_data[j].ir_id);
						}
					}

					var data2 =JSON.stringify({"tabName":Name,"dataSet":dg_data});
					$.ajax({
						type: 'POST',
						processData: false,
						url: routePath+"/tableSave",
						data: data2,
						headers: {'Content-Type':'application/json'},
						success: function(respMsg){
							$("#respMsg").html("That,s OK!");
						}
					});

				}

				//-------主表
				var myDate = new Date();
				var owner =sessionStorage.getItem('owner');
				$('#i_owner').val(owner);
				$('#i_id').val(bill_no);
				$('#i_create_user').val("admin");
				$('#i_create_date').val(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds());
				$('#i_update_date').val(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds());

				if(flag1==1)
				{
					$('#i_start').val(1);
					$('#i_preinstall').val(1);
				}
				else
				{
					$('#i_start').val(1);
					$('#i_preinstall').val(1);
				}
				var Name = "t_configuration_instruct";
				var value1=$("#main_info").serializeArray();

				//form save
				var data2 =JSON.stringify({"tabName":Name,"dataSet":value1});
				console.log(1);
				console.log(data2);
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

				parent.layer.alert('新增成功',function(){
					window.parent.location.reload();
					parent.layer.closeAll();
				});
				//layer.msg("保存成功");//保存代码放这里
			}
			else {layer.msg('指令类型不能为空');}
		}
		else {layer.msg('指令代码不能为空');}
	}
	else
		{
			layer.msg('指令名称不能为空');
		}


		}
// 		else
// 		{
// 			layer.alert("指令代码不符合规定");
// 		}		
// }
//返回
function Return(){
	parent.layer.closeAll();
}

// 以下代码单元格可编辑：dg2  ---------------------------------------------------------------------
$.extend($.fn.datagrid.methods, {
	editCell: function(jq, param) {
		return jq.each(function() {
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field) {
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

var editIndex = undefined;

function endEditing() {
	if (editIndex == undefined) {
		return true
	}
	if ($('#dg2').datagrid('validateRow', editIndex)) {
		$('#dg2').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickCell(index, field) {
	if (endEditing()) {
		$('#dg2').datagrid('selectRow', index)
			.datagrid('editCell', {
				index: index,
				field: field
			});
		editIndex = index;
	}
}
	//锁定编辑栏
	function accept(){				
		if (endEditing()){
			$('#dg2').datagrid('acceptChanges');
			editorid = 0;
		}
		
		var columns=$("#dg2").datagrid("options").columns;
		var rows=$("#dg2").datagrid("getRows");

//		
	}
var testOneDatas = [
	{id:'1',name:'陕西西安'},
	{id:'2',name:'河北秦皇岛'},
	{id:'3',name:'哈尔滨'}
];

$(document).ready(function(){
			frm_disp();
    		$.ajaxSettings.async=false;   		
    		$.get("json/Configure_return.json",
			function(data){
			$("#dg2").datagrid({
				columns:[data.columns]
			});
		},"json");
	
})
function frm_disp(){

		var Vdata1 = '<td><span style="color: red;font-size: 20px">* </span>指令名称：</td><td><input type="text" name="i_name" id="i_name" placeholder="请输入指令名称" class="layui-input" lay-verify="required" autocomplete="off"></td><td><span style="color: red;font-size: 20px">&nbsp;&nbsp;&nbsp;* </span>指令代码：</td><td rowspan="2"><textarea name="i_code" id="i_code" placeholder="请输入指令代码" class="layui-textarea" lay-verify="required"></textarea></td>';
		var Vdata2 = '<td>启动状态：</td><td><div class="layui-input-block" style="margin-left: 0px;"><input type="radio" name="i_start" value="1" title="启用" checked=""><input type="radio" name="i_start" value="0" title="禁用"></div></td>';
		var Vdata3 = '<td>备注：</td><td><input type="text" name="i_remark" autocomplete="off" placeholder="请输入备注" class="layui-input"></td><td><span style="color: red;font-size: 20px">&nbsp;&nbsp;&nbsp;* </span>指令类型：</td><td><select  name="i_type" id="i_type"><option value="">请选择</option><option value="KFTool">KFTool</option><option value="Linux">Linux</option><option value="Java">Java</option><option value="C++">C++</option><option value="MySQL">MySQL</option><option value="R">R</option></select></td>';
		var Vdata4 = '<td><input type="text" name="i_id" id="i_id" class="layui-input none"><input type="text" name="i_owner" id="i_owner" class="layui-input none"><input type="text" name="i_create_user" id="i_create_user" class="layui-input none"><input type="text" name="i_create_date" id="i_create_date" class="layui-input none"><input type="text" name="i_update_user"  class="layui-input none"><input type="text" name="i_update_date" id="i_update_date" class="layui-input none"><input type="text" name="i_preinstall" id="i_preinstall" class="layui-input none"></td>';
		$('#frm01').html(Vdata1);
		$('#frm02').html(Vdata2);
		$('#frm03').html(Vdata3);
		$('#frm04').html(Vdata4);	
}