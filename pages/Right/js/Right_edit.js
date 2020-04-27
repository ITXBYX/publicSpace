$(document).ready(function(){  	
	
	$.ajaxSettings.async=false;
	var Tab_name="crm_sys_menu"
	var url1=routePath+"/getToGrid";
	var row;
	$.get(url1,{'tabName':Tab_name,'titles':""},
		function(data1){		
		for(var i=0;i<data1["content"].length;i++){
			row=data1["content"][i];
			$("#parent_id").append("<option value="+row.id+">"+row.name+"</option>");
			layui.use('form', function(){
				var form = layui.form;
				form.render();
			});
		}},"json");
	var num = sessionStorage.getItem('rows');	
	var Titles = "Where id = '" + num + "'";
	var url1=routePath+"/getToForm";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){			
			$('#main_info').form('load',data1["content"]);
			// console.log(data1["content"]["parent_id"]);
			// $("#parent_id option[value='"+data1["content"]["parent_id"]+"']").attr("selected", true);	
		
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

	var Titles = " Where id = '" +$("#id").val() + "'";
	var Tab_name="crm_sys_menu";
	var url1=routePath+"/dataDelete";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){	
		}, "json");
	var CurrentId = currentTime();
	$("#create_time").val(CurrentId);
	var value1=$("#main_info").serializeArray();
	var data2 =JSON.stringify({"tabName":Tab_name,"dataSet":value1});
	$.ajax({
		type: 'POST',
		processData: false,
		url: routePath+"formSave",          
		data: data2,
		headers: {'Content-Type':'application/json'},
		success: function(respMsg){
			layer.msg("That,s OK!");
		}
	});
	parent.layer.closeAll();
}
//返回
function Return(){
	parent.layer.closeAll();
}
