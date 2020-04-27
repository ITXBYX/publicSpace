//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

// 缓冲代码
function closes() {
	$("#Loading").fadeOut("normal", function() {
		$(this).remove();
	});
}
var pc;
$.parser.onComplete = function() {
	if (pc) clearTimeout(pc);
	pc = setTimeout(closes, 500);
}

//定义任务列表操作列
function format(value, row, index) {
	return '<button onclick="edit(' + index +
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">编 辑</button><button onclick="see(' + index +
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">查 看</button>'
}


//双击修改
function editRow(index, row){
	sessionStorage.setItem('rows', row["i_id"]);//传指令列表的i_id	
	layer.open({
		title: '编辑信息',
		type: 2,
		anim: 2,
		content: 'Configure_edit.html',
		area: ['792px', '600px'],
		maxmin: true,
		end: function() {
			location.reload();
		}
	});
	
}


//初始化弹窗
layui.use(['element', 'layer', 'form', 'layedit'], function() {
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		layedit = layui.layedit;
});

//新增指令
function add_Config() {
	layer.open({
		title: '新增指令',
		type: 2,
		anim: 2,
		content: 'Configure_add.html',
		area: ['852px', '450px'],
		maxmin: true,
		end: function() {
			location.reload();
		}
	});
	
}

//删除
function remove_Config() {
		if ($('#dg').datagrid('getSelected')) {
		var row = $('#dg').datagrid('getSelections');
		
		for (var i = 0; i < row.length; i++) {		
			var rowIndex = $('#dg').datagrid('getRowIndex', row[i]);
			var Titles = " Where i_id = '" + idd + "'";
			var Tab_name="t_configuration_instruct";
			var Tab_name1="t_configuration_instruct_return";
			var url1=routePath+"/dataDelete";
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
				function(data1){
				
				}, "json");
			$.get(url2,{'tabName':Tab_name1,'titles':Titles},
				function(data1){
				
				},
				"json");


			$('#dg').datagrid('deleteRow', rowIndex);
			var Tab_name="t_configuration_instruct"
    		var idd=row[i].i_id;
			var Titles = " Where i_id = '" + idd + "'";
			var url1=routePath+"/dataDelete";	
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
			
				},
			"json");	
			var Tab_name1="t_configuration_instruct_return"
			var url2=routePath+"/dataDelete";
			$.get(url2,{'tabName':Tab_name1,'titles':Titles},
			function(data1){
				
				},
			"json");	
		}
		layer.msg("数据删除完成");
	} else {
		layer.msg("请先选中要删除的行");
	}
}
//刷新
function rest_Config() {
	location.reload();
}
//搜索
function serach()
{			
			var name=$("#order_search").val();
	    	var Tab_name="t_configuration_instruct"
			var Titles = "where i_name like '"+"%"+name+"%"+"' order by i_id desc";
			console.log(Titles)
			var url5=routePath+"/getToGrid";
			$.get(url5,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg").datagrid({data:data1["content"]});
				},
			"json");			
}

//----转中文
function Qchinese(value,row,index)
{
	if(value==1)
	{
		return '启动';
	}
	else
	{
		return '禁用';
	}
}

function Ychinese(value,row,index)
{
	if(value==1)
	{
		return '预设';
	}
	else
	{
		return '非预设';
	}
}
 $(document).ready(function(){  	   
    $.ajaxSettings.async=false;   		
    $.get("json/Configure_List.json",
	function(data){		
		$("#dg").datagrid({	
			columns:[data.columns],
		});
	},"json");
			 var Tab_name="t_configuration_instruct"
		
			 var Titles = "";
				var url5=routePath+"/getToGrid";
				$.get(url5,{'tabName':Tab_name,'titles':Titles},
					function(data1){
						$("#dg").datagrid({data:data1["content"]});
					},
					"json");

 });