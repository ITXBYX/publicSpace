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
			elem: '#create_time',
			format: 'yyyy-MM-dd',
			trigger: 'click'
			
		});
});

//保存
function Save() {
	var Tab_name ="crm_sys_menu";
	var CurrentId = currentTime();
	var UUID = generateUUID();
	$("#id").val(UUID);
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
				// parent.layer.closeAll();
				layer.msg("数据保存成功");
			}
		});
		parent.layer.closeAll();
}
//返回
function Return(){
	parent.layer.closeAll();
}
$(document).ready(function(){
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
	
})
