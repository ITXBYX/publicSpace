
//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

//初始化弹窗
layui.use(['element', 'layer', 'form', 'layedit', 'laydate'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit,
		laydate = layui.laydate;

		laydate.render({
			elem: '#create_time',
			format: 'yyyy-MM-dd',
			trigger: 'click'
			
		});

		laydate.render({
			elem: '#birthday',
			trigger: 'click',
			format: 'yyyy-MM-dd'
		});
});


//保存
function Save() {	
	$.ajax({
			type: 'POST',
			processData: false,
			url: oopRoutePath+"register",          
			data: JSON.stringify({
				"password":$("#password").val(),
				"username":$("#username").val(),
				"sex":$("#sex option:selected").val(),
				"email":$("#email").val(),
				"telephone":$("#telephone").val(),
				"head_img_url":"",
				"birthday":$("#birthday").val(),
				"createTime":$("#create_time").val()}),
			headers: {'Content-Type':'application/json'},
			success: function(respMsg){
				parent.layer.closeAll();
				layer.msg("数据保存成功！");
			}
		});
}
//返回
function Return(){
	parent.layer.closeAll();
}
