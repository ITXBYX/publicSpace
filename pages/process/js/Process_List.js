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
	var fId = "'"+row["f_id"]+"'";
	return '<button onclick="begin(' +fId+
		')" type="button" class="layui-btn layui-btn-normal layui-btn-xs">执 行</button>'
}

//编辑
function edit(index) {
	$('#dg').datagrid('selectRow', index);
	var row3 = $('#dg').datagrid('getSelected');
	sessionStorage.setItem('rows3', row3.f_id)
	layer.open({
		title: '编辑流程',
		type: 2,
		anim: 2,
		content: 'Process_edit.html',
		area: ['810px', '500px'],
		maxmin: true,
		end: function() {
			// 刷新代码放这里
		}
	});
}

function viewRow(index, row){
	layer.open({
		type: 1,
		title: '查看流程',
		skin: 'layui-layer-demo',
		closeBtn: 1,
		anim: 2,
		scrollbar: false,
		area: ["810px", "600px"],
		content: $('#CONFIG'),
		cancel:function(){
			
			location.reload();
		}
	});
	$.ajaxSettings.async=false; 
	var flowId=	row["f_id"];
	var row11=$("#intr2")[0];	
	var butt1=new Array();
	var Name="t_configuration_flow";
	var Titles = " Where f_id = '" + flowId + "'";	
	var url2=routePath+"/getToForm"
	$.get(url2,{'tabName':Name,'titles':Titles},
		function(data1){	
			$('#main_info').form('load',data1["content"]);		
	},"json");

	var Tab_name1="t_configuration_flow_step";
	var Titles1 =  " Where f_id = '" + flowId + "' order by fs_id";		
	var url2=routePath+"/getToGrid";
	$.get(url2,{'tabName':Tab_name1,'titles':Titles1},
	function(data1){			
		var fname=data1["content"];
		for(var j=0;j<fname.length;j++)
		{
				var table1 = document.getElementById("add_tr1");
				var row = table1.insertRow(-1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var jj=j+1;
				var titlet="title"+jj;
				cell1.innerHTML = '第 ' + jj + ' 步骤：';
				cell2.innerHTML = 
				'<input type="text" id="'+titlet+'" name="'+titlet+'" readonly="readonl" class="layui-input" placeholder="加载流程中的步骤"><br>';
				var ttile="#"+titlet;
				var b=fname[j].i_name;
				$(ttile).val(b);
		}				
		for(var i=fname.length-1;i>=0;i--)
			{
				butt1[i]=fname[i].i_name;
				var cell1 = row11.insertCell(1);
				var cell2 = row11.insertCell(2);
				cell1.innerHTML ='<img src="../../images/jiantou.png" style="width: 60px;"></i>';
				cell2.innerHTML = '<button type="button" class="layui-btn layui-btn-primary layui-btn-radius">"'+butt1[i]+'"</button>';
			}
		},
	"json");


}


//执行
function begin(index) {
	sessionStorage.setItem('rows2', index);//传指令列表的i_id	
	layer.open({
		title: '添加任务',
		type: 2,
		anim: 2,
		content: '../Task/Task_add.html',
		area: ['100%', '100%'],
		maxmin: true,
		end: function() {
			layer.closeAll();
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

//新增流程
function add() {
	layer.open({
		title: '新增流程',
		type: 2,
		anim: 2,
		content: 'Process_add.html',
		area: ['840px', '550px'],
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
			$('#dg').datagrid('deleteRow', rowIndex);
			var Tab_name="t_configuration_flow"
    		var idd=row[i].f_id;
			var Titles = " Where f_id = '" + idd + "'";
			var url1=routePath+"/dataDelete";
			console.log(Titles);
			$.get(url1,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg2").datagrid({data:data1["content"]});
				},
			"json");	
			var Tab_name1="t_configuration_flow_step"
			var url2=routePath+"/dataDelete";
			$.get(url2,{'tabName':Tab_name1,'titles':Titles},
			function(data1){			
				$("#dg2").datagrid({data:data1["content"]});
				},
			"json");	
		}
		layer.msg("数据删除完成");
	} else {
		layer.msg("请先选中要删除的行");
	}
	
}

//刷新
function rest() {
	location.reload();
}
function serach()
{			
			var name=$("#order_search").val();
	    	var Tab_name="t_configuration_flow"
			var Titles = "where f_name like '"+"%"+name+"%"+"' order by f_id desc";
			console.log(Titles)
			var url5=routePath+"/getToGrid";
			$.get(url5,{'tabName':Tab_name,'titles':Titles},
			function(data1){			
				$("#dg").datagrid({data:data1["content"]});
				},
			"json");		
}

function frm_disp(){
		var html1 = '';

		var Vdata1 = '<td class="top"><table class="tab_pd"><tr><td>流程名称：</td><td><input type="text" id="f_name" name="f_name" class="layui-input" value="word文件转换pdf"></td></tr><tr><td>流程描述：</td><td><textarea name="f_describe" id="f_describe" class="layui-textarea" placeholder="流程描述测试"></textarea></td></tr></table><br><table  class="Tab" id="add_tr1"></table></td><td class="top"><table class="tab_pd"><tr><td>创建人：</td><td><input type="text" name="f_create_user" id="f_create_user" class="layui-input" value="管理员"></td></tr><tr><td>创建时间：</td><td><input type="text" name="f_create_date" id="f_create_date" class="layui-input" value="2019-12-28 13:25:38"></td></tr><tr><td>修改人：</td><td><input type="text" name="f_update_user" id="f_update_user" class="layui-input" value="管理员"></td></tr><tr><td>修改时间：</td><td><input type="text" name="f_update_date" id="f_update_date" class="layui-input" value="2019-12-28 13:25:38"></td></tr><tr><td>启动状态：</td><td><div class="layui-input-block" style="margin-left: 0px;"><input type="radio" name="ih_start" value="启用" title="启用" checked=""><input type="radio" name="ih_start" value="禁用" title="禁用"></div></td></tr><tr><td>预设状态：</td><td><div class="layui-input-block" style="margin-left: 0px;"><input type="radio" name="ih_preinstall" value="预设" title="预设" checked=""><input type="radio" name="ih_preinstall" value="非预设" title="非预设"></div></td></tr><tr><td>备注：</td><td><input type="text" name="f_remark" id="f_remark" class="layui-input" value="备注测试"></td></tr></table></td>';
		html1 +=Vdata1;
		$('#frm01').html(html1);
	
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
    frm_disp();
    $.get("json/Process_List.json",
			function(data){
				var values=data.columns;
				values[5].formatter=Qchinese;	
				values[6].formatter=Ychinese;	
				values[7].formatter=format;				
			$("#dg").datagrid({					
				columns:[data.columns]
			});
	},"json");
	var Tab_name="t_configuration_flow";
	var Titles = "";
	var url1=routePath+"/getToGrid";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){
			$("#dg").datagrid({data:data1["content"]});
	},"json");
 })