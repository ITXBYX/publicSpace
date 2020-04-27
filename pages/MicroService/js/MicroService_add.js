//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

//初始化弹窗
layui.use(['element', 'layer', 'form', 'layedit','laydate'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit;
		laydate = layui.laydate;
		laydate.render({
			elem: '#i_create_date',
			format: 'yyyy-MM-dd',
			trigger: 'click'
			
		});
});


//保存
function Save() {
	var CurrentDate = currentDate();
	$("#i_create_date").val(CurrentDate);
	var Name = "t_micro_service";
	var value1=$("#main_info").serializeArray();
	//form save
	var data2 =JSON.stringify({"tabName":Name,"dataSet":value1});
	$.ajax({
		type: 'POST',
		processData: false,
		url: routePath+"formSave",
		data: data2,
		headers: {'Content-Type':'application/json'},
		success: function(respMsg){
			parent.layer.closeAll();
			layer.msg("保存成功");
		}
	});
	
}
//返回
function Return(){
	parent.layer.closeAll();
}

$(document).ready(function(){
		
})
