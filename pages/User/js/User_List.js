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
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">编 辑</button>'
}


//双击修改
function editRow(index, row){
	sessionStorage.setItem('rows', row["username"]);//传指令列表的i_id	
	layer.open({
		title: '编辑信息',
		type: 2,
		anim: 2,
		content: 'User_edit.html',
		area: ['792px', '480px'],
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
		title: '新增用户',
		type: 2,
		anim: 2,
		content: 'User_add.html',
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
			var Titles = " Where id = '" + row[i]["id"] + "'";
			var Tab_name="sys_user";
			var url1=routePath+"/dataDelete";
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
				function(data1){
					
				}, "json");
		}
		layer.msg("数据删除完成");
		location.reload();
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
	    	var Tab_name="sys_user"
			var Titles = "where username like '"+"%"+name+"%"+"'";
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


function SexChinese(value,row,index)
{
	if(value==1)
	{
		return '男';
	}
	else
	{
		return '女';
	}
}
 $(document).ready(function(){  	   
    		$.ajaxSettings.async=false;   		
    		$.get("json/Configure_List.json",
			function(data){		
				var values=data.columns;
				values[3].formatter=SexChinese;
			$("#dg").datagrid({	
				columns:[data.columns],
			});
		},"json");
		var Tab_name="sys_user";
		var Titles = "";
		var url5=routePath+"/getToGrid";
		$.get(url5,{'tabName':Tab_name,'titles':Titles},
			function(data1){
				$("#dg").datagrid({data:data1["content"]});
		},"json");	
 });