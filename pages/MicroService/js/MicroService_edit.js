
 $(document).ready(function(){  	
	$.ajaxSettings.async=false; 
	var num = sessionStorage.getItem('rows');
	var Tab_name="t_micro_service"
	var Titles = " Where i_id = '" + num + "'";	
	var url2=routePath+"/getToForm"
	$.get(url2,{'tabName':Tab_name,'titles':Titles},
	function(data1){	
		$('#main_info').form('load',data1["content"]);		
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
	var Titles = " Where i_id = '" +$("#i_id").val() + "'";
	var Tab_name="t_micro_service";
	var url1=routePath+"/dataDelete";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){
			
		}, "json");

	var Tab_name ="t_micro_service";
	var value1=$("#main_info").serializeArray();
	var data2 =JSON.stringify({"tabName":Tab_name,"dataSet":value1});
	$.ajax({
		type: 'POST',
		processData: false,
		url: routePath+"formSave",          
		data: data2,
		headers: {'Content-Type':'application/json'},
		success: function(respMsg){
			parent.layer.closeAll();
			layer.msg("That,s OK!");
		}
	});
}
//返回
function Return(){
	parent.layer.closeAll();
}

