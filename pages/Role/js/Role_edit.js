$(document).ready(function(){  	
	
	$.ajaxSettings.async=false;   		
	$.get("json/Configure_return.json",
	function(data){
	$("#dge2").datagrid({
		columns:[data.columns]
	});
	},"json");
	
	var Tab_nameR="crm_sys_menu";
	var url5=routePath+"/getToGrid";
	$.get(url5,{'tabName':Tab_nameR,'titles':""},
		function(data1){
			$("#dge2").datagrid({data:data1["content"]});
	},"json");

	var num = sessionStorage.getItem('rows');
	var Tab_name="crm_sys_role"
	var Titles = "Where id = '" + num + "'";
	var url1=routePath+"/getToForm";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){	
		console.log(data1);
		$('#main_info').form('load',data1["content"]);	
	},"json");	
	
	var roleRows =$("#dge2").datagrid("getRows"); 
	var TitlesRM = " Where role_id = '" + num + "'";	
	$.get(url5,{'tabName':"crm_sys_role_menu",'titles':TitlesRM},
		function(data0){
			
			var data1 = data0["content"];
			for(var k=0;k<roleRows.length;k++){
				var menu = roleRows[k]["id"];
				for(var k2=0;k2<data1.length;k2++){
					var menu2=data1[k2]["menu_id"];
					if(menu == menu2){	
					//	console.log(menu+"=="+menu2);															
						$('#dge2').datagrid('selectRow',k);						
					}else{		
					//	console.log(menu+"!="+menu2);												
					}
				}
			}
	},"json");	

 })



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

//保存
function Save() {
	var Tab_name ="crm_sys_role";
	var CurrentDate = currentDate();
	$("#create_time").val(CurrentDate);
	var value1=$("#main_info").serializeArray();
	var data2 =JSON.stringify({"tabName":Tab_name,"dataSet":value1});
		$.ajax({
			type: 'POST',
			processData: false,
			url: routePath+"formSave",          
			data: data2,
			headers: {'Content-Type':'application/json'},
			success: function(respMsg){
				
			}
		});
	var url1=routePath+"/dataDelete";
	var Titles = " Where role_id = '" + $("#id").val() + "'";
	$.get(url1,{'tabName':"crm_sys_role_menu",'titles':Titles},
		function(data1){					
	}, "json");

	var roleMenu = new Array();
	var rowMenu = $('#dge2').datagrid('getSelections');
	for (var i2 = 0; i2 < rowMenu.length; i2++) {
		var Menu1 = new Object();
		var MenuId = rowMenu[i2]["id"];
		Menu1["menu_id"]=MenuId;
		Menu1["role_id"]=$("#id").val();
		roleMenu.push(Menu1);
	}
	var datauserRole =JSON.stringify({"tabName":"crm_sys_role_menu","dataSet":roleMenu});
	$.ajax({
		type: 'POST',
		processData: false,
		url: routePath+"/tableSave",
		data: datauserRole,
		headers: {'Content-Type':'application/json'},
		success: function(respMsg){
		
		}
	});

	

	parent.layer.closeAll();
	layer.msg("That,s OK!");

}
//返回
function Return(){
	parent.layer.closeAll();
}