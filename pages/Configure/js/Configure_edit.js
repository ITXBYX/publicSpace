var testOneDatas = [{
	id: 'string',
	name: 'string'
},
{
	id: 'int',
	name: 'int'
},
{
	id: 'bool',
	name: 'bool'
}
];
 $(document).ready(function(){  	

			$.ajaxSettings.async=false; 
			$.get("json/Configure_return.json",
			function(data){	
				var values = data.columns;
				values[3].editor = {
				type: 'combobox',
				options: {
					valueField: 'id',
					textField: 'name',
					data: testOneDatas,
					prompt: '请选择',
					panelHeight: 'atuo',
					editable: false
				}
			}		
			$("#dg2").datagrid({	
				columns:[data.columns]
			});
		},"json");

		var num = sessionStorage.getItem('rows');
			var Tab_name="t_configuration_instruct"
			var Titles = " Where i_id = '" + num + "'";	
			var url2=routePath+"/getToForm"
			$.get(url2,{'tabName':Tab_name,'titles':Titles},
			function(data1){	
				console.log(data1["content"]);	
				$('#main_info').form('load',data1["content"]);		
				},
			"json");
	
    		var Tab_name="t_configuration_instruct_return"
			
			var url1=routePath+"/getToGrid";
	
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg2").datagrid({data:data1["content"]});
	
			},	
			"json");
			
    		var Tab_name="t_configuration_instruct_return"
			var Titles = "Where i_id = '" + num + "' order by ir_id ";
			var url1=routePath+"/getToGrid";
			var instruct_r;
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg2").datagrid({data:data1["content"]});
				instruct_r=data1;
			},	
			"json");

 })

	function frm_disp(){
		var Vdata1 ='<td>指令名称：</td><td><input type="text" name="i_name" id="i_name" placeholder="请输入指令名称" class="layui-input" autocomplete="off" lay-verify="required"></td><td>&nbsp;&nbsp;&nbsp;&nbsp;指令代码：</td><td rowspan="2"><textarea name="i_code" id="i_code" placeholder="请输入指令代码" class="layui-textarea" lay-verify="required"></textarea></td>';
		var Vdata2 ='<td>启动状态：</td><td><div class="layui-input-block" style="margin-left: 0px;"><input type="radio" name="i_start" value="1" title="启用" checked=""><input type="radio" name="i_start" value="0" title="禁用"></div></td>';
		var Vdata3 ='<td>备注：</td><td><input type="text" name="i_remark" id="i_remark" autocomplete="off" placeholder="请输入备注" class="layui-input"></td><td>&nbsp;&nbsp;&nbsp;&nbsp;指令类型：</td><td><select name="i_type" id="i_type"><!-- <option value="">请选择</option> --><option value="Linux">Linux</option><option value="Java">Java</option><option value="C++">C++</option><option value="MySQL">MySQL</option><option value="R">R</option></select></td>';
		var Vdata4 ='<td><input type="text" id="i_id" name="i_id" class="layui-input none"><!-- 指令ID --><input type="text" id="i_create_user" name="i_create_user" class="layui-input none"><!-- 创建者 --><input type="text" id="i_create_date" name="i_create_date" class="layui-input none"><!-- 创建时间 --><input type="text" id="i_update_user"  name="i_update_user" class="layui-input none"><!-- 修改者 --><input type="text" id="i_update_date" name="i_update_date" class="layui-input none"><!-- 修改时间 --><input type="text" id="i_preinstall" name="i_preinstall" class="layui-input none"><input type="text" id="i_owner" name="i_owner" class="layui-input none"></td>';
		$('#frm01').html(Vdata1);
		$('#frm02').html(Vdata2);
		$('#frm03').html(Vdata3);
		$('#frm04').html(Vdata4);
	}



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
//	var ih_name = $("#ih_name").val();
//	var ih_code = $("#ih_code").val();
//	if (ih_name != '') {
//		if(ih_code != ''){
//			layer.msg("保存成功");//保存代码放这里
//		}else{
//			layer.msg('指令代码不能为空');
//		}
//	} else {
//		layer.msg('指令名称不能为空');
//	}	
			accept();
			$.ajaxSettings.async=false;
			var num = sessionStorage.getItem('rows');			
			var myDate = new Date();
			var flag = $("input[name='i_start']:checked").val();//单选框启动状态
			var flag1=0;
									
		//——————从表，返回值的修改	
			var Tab_name="t_configuration_instruct_return"
			var Title = "Where i_id = '" + num + "' order by ir_id ";
			var url1=routePath+"/Curd/tabQuery"
					
			var Nlength=$('#dg2').datagrid('getRows').length;
			var Nir_id=new Array();
			var url0=taskRoutePath+"/newId/"
				for(var t=0;t<Nlength;t++)
				{																	
					$.get(url0,{'tabName':"t_configuration_instruct_return"},
					function(data1){			
						Nir_id[t]=data1["content"];
					},
					"json");
				}	
			var Title2 = "Where i_id = '" + num + "'";
			var url2=routePath+"/dataDelete";
			$.get(url2,{'tabName':Tab_name,'titles':Title2},
			function(data1){							
				},
			"json");	
			
			var dg_data = $('#dg2').datagrid('getRows');
			if(dg_data=="")
			{
				layer.msg("请添加返回值");
			}
			else
			{
				for(var j=0;j<dg_data.length;j++)
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
					dg_data[j].i_id=num;
					dg_data[j].ir_id=Nir_id[j];
					console.log(dg_data[j].ir_id);
				}		
			}
		
			var data3 =JSON.stringify({"tabName":Tab_name,"dataSet":dg_data});
			$.ajax({
				type: 'POST',
				processData: false,
				url: routePath+"/tableSave",          
				data: data3,
				headers: {'Content-Type':'application/json'},
				success: function(respMsg){
					$("#respMsg").html("That,s OK!");
				}
			});	


				
				
			//——————————主表，表单的修改	
			var Tab_name="t_configuration_instruct"
			var Titles = " Where i_id = '" + num + "'";
			var url4=routePath+"/getToGrid";
			var data11;
			
			//把要删的这一条指令先查出来，把他的无法更改项保存起来
			$.get(url4,{'tabName':Tab_name,'titles':Titles},
			function(data1){									
				data11=data1["content"][0];
				},
			"json");
			var Cuser=data11.i_create_user;
			var Ctime=data11.i_create_date;
			var Cpreinstall=data11.i_preinstall;
			var owner =sessionStorage.getItem('owner');
			var url5=routePath+"/dataDelete";

			//先把指令表上的这一条指令删掉
			$.get(url5,{'tabName':Tab_name,'titles':Titles},
			function(data1){							
				},
			"json");	
		//再重新把这一条新的指令插进去

		$('#i_owner').val(owner);
		$('#i_id').val(num);
		$('#i_create_user').val(Cuser);
		$('#i_create_date').val(Ctime);
		$('#i_preinstall').val(Cpreinstall);
		$('#i_update_user').val(owner);
		$('#i_update_date').val(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds());
		if(flag1==1)
		{
			$('#i_start').val(1);			
		}
		else
		{
			$('#i_start').val(0);			
		}
		var Name = "t_configuration_instruct";
		var Titles = "";
		var value1=$("#main_info").serializeArray();
					
		//form save
		var data2 =JSON.stringify({"tabName":Tab_name,"dataSet":value1});
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
		
		
		
			parent.layer.alert('修改成功',function(){
			window.parent.location.reload();
			parent.layer.closeAll();
			});
}
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
	
	}
