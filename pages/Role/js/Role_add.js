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
	var UUID = generateUUID();
	$("#id").val(UUID);
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
			    
			}
		});
}
//返回
function Return(){
	parent.layer.closeAll();
}


$(document).ready(function(){
	
	
})
