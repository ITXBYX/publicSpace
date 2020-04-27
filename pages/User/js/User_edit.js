$(document).ready(function(){  	
	$.ajaxSettings.async=false;   		
	$.get("json/Configure_return.json",
	function(data){
	$("#dge2").datagrid({
		columns:[data.columns]
	});
	},"json");
	var Tab_nameR="crm_sys_role";
	var url5=routePath+"/getToGrid";
	$.get(url5,{'tabName':Tab_nameR,'titles':""},
		function(data1){
			$("#dge2").datagrid({data:data1["content"]});
	},"json");	
	var num = sessionStorage.getItem('rows');
	var Tab_nameU="sys_user"
	var Titles = " Where username = '" + num + "'";	
	var url2=routePath+"/getToForm"
	$.get(url2,{'tabName':Tab_nameU,'titles':Titles},
		function(data1){	
			//console.log(data1["content"]);	
			$('#main_info').form('load',data1["content"]);		
	},"json");
	var roleRows =$("#dge2").datagrid("getRows"); 
	var TitlesUR = " Where user_id = '" + num + "'";	
	$.get(url5,{'tabName':"crm_sys_user_role",'titles':TitlesUR},
		function(data0){
			var data1 = data0["content"];
			console.log(data1);
			
			for(var k=0;k<roleRows.length;k++){
				var role = roleRows[k]["id"];
				for(var k2=0;k2<data1.length;k2++){
					var role2=data1[k2]["role_id"];
					if(role == role2){
						$('#dge2').datagrid('selectRow',k);						
					}else{										
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
layui.use(['element', 'layer', 'form', 'layedit', 'laydate'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit;
		laydate = layui.laydate;


		laydate.render({
			elem: '#create_time',
			trigger: 'click',
			format: 'yyyy-MM-dd'
		});

		laydate.render({
			elem: '#birthday',
			trigger: 'click',
			format: 'yyyy-MM-dd'
		});
});


//保存
function Save() {

	var Titles = " Where id = '" +$("#id").val() + "'";
	var Tab_name="crm_sys_role";
	var url1=routePath+"/dataDelete";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){
			
		}, "json");

	var Tab_name ="sys_user";
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
	var userRole = new Array();
	var rowUserRole = $('#dge2').datagrid('getSelections');
	for (var i2 = 0; i2 < rowUserRole.length; i2++) {
		var role1 = new Object();
		var roleId = rowUserRole[i2]["id"];
		role1["role_id"]=roleId;
		role1["user_id"]=$("#username").val();
		userRole.push(role1);
	}
	var datauserRole =JSON.stringify({"tabName":"crm_sys_user_role","dataSet":userRole});
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