
//鼠标悬停显示单元格文字
function hovertop(value) {
	return "<span title='" + value + "'>" + value + "</span>";
}

//初始化layui
layui.use(['element', 'layer', 'form', 'layedit', 'table'], function() {
	var $ = layui.jquery,
		element = layui.element,
		layer = layui.layer,
		table = layui.table,
		form = layui.form,
		layedit = layui.layedit;

	//监听折叠
	element.on('collapse(test)', function(data) {
		layer.msg('展开状态：' + data.show);
	});

	// 让绑定在select的change事件触发
	form.on('select', function(data) {
		$(data.elem).trigger('change', data.elem);
	});


});

//保存
function Save() {
	var f_name = $("#f_name").val();
	var lc1 = $("#lc1").val();
	if (f_name != '') {
		if (lc1 != '') {
			layer.msg("保存成功"); //保存代码放这里
		} else {
			layer.msg('步骤不能为空');
		}
	} else {
		layer.msg('流程名称不能为空');
	}
}

//返回
function Return() {
	parent.layer.closeAll();
}

//增加条件,生成多一个条件
function add_tr() {
	var tabs = document.getElementById("add_bz");
	var rows = tabs.rows.length;
	var number = Math.round(parseInt(rows) / 2);
	var id = 'TJ' + (parseInt(number) - 1);
	var table = document.getElementById(id);
	var rows2 = table.rows.length; //行数
	var ln = parseInt(rows2) + 1;
	if (ln < 4) {
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = '<input type="text" id="x' + id + ln + '" name="" class="layui-input left2">';
		cell3.innerHTML = '<input type="text" id="y' + id + ln + '" name="y' + id + '" class="layui-input left2">';
		cell4.innerHTML =
			'<div class="icon">&nbsp;<i onclick="add_tr()" class="layui-icon">&#xe61f;</i>&nbsp;<i onclick="delete_tr()" class="iconfont">&#xe6b7;</i></div>';
		cell2.innerHTML = '<div class="layui-input-inline if">' +
			'<select name="tj' + ln + '" id="tj' + ln + '" onchange="fn' + id + ln + '(this)">' +
			'<option value="">条件</option>' +
			'<option value="0">&gt;</option>' +
			'<option value="1">&lt;</option>' +
			'<option value="2">=</option>' +
			'<option value="3">&gt;=</option>' +
			'<option value="4">&lt;=</option>' +
			'<option value="5">⊆</option>' +
			'</select>' +
			'</div>'
	} else {
		layer.msg("条件上限为3个");
	}

	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}


//减少一个条件
function delete_tr() {
	var tabs = document.getElementById("add_bz");
	var rows = tabs.rows.length;
	var number = Math.round(parseInt(rows) / 2);
	var id = 'TJ' + (parseInt(number) - 1);
	var table = document.getElementById(id);
	var rows2 = table.rows.length;
	if (rows2 > 1) {
		table.deleteRow(-1);
	} else {
		layer.msg("至少保留一个条件或不填");
	}
}


//新增步骤的同时新增条件
function add_bz() {
	var table = document.getElementById("add_bz");
	var rows = table.rows.length;
	var ln = Math.round(parseInt(rows) / 2);
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	cell1.innerHTML = '';
	cell2.innerHTML = '';
	cell3.innerHTML = '<table id="TJ' + ln + '">' +
		'<tr>' +
		'<td><input type="text" id="x' + ln + '" name="x' + ln + '" class="layui-input left2"></td>' +
		'<td>' +
		'<div class="layui-input-inline if">' +
		'<select name="tj' + ln + '" id="tj' + ln + '" onchange="fn' + ln + '(this)">' +
		'<option value="">条件</option>' +
		'<option value="0">&gt;</option>' +
		'<option value="1">&lt;</option>' +
		'<option value="2">=</option>' +
		'<option value="3">&gt;=</option>' +
		'<option value="4">&lt;=</option>' +
		'<option value="5">⊆</option>' +
		'</select>' +
		'</div>' +
		'</td>' +
		'<td>' +
		'<input type="text" id="y' + ln + '" name="y' + ln + '" class="layui-input left2">' +
		'</td>' +
		'<td>' +
		'<div class="icon">&nbsp;<i onclick="add_tr()" class="layui-icon">&#xe61f;</i>&nbsp;<i onclick="delete_tr()" class="iconfont">&#xe6b7;</i></div>' +
		'</td>' +
		'</tr>' +
		'</table>'

	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});

	setTimeout(add_bz2, 100);
}


//增加一个步骤
function add_bz2() {
	var table = document.getElementById("add_bz");
	var rows = table.rows.length;
	var ln = Math.round(parseInt(rows) / 2);
	
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	cell1.innerHTML =
		'<i onclick="delete_bz()" class="iconfont icon_f">&#xe6fe;</i>&nbsp;<i onclick="add_bz()" class="iconfont icon_f">&#xe6b9;</i>';
	cell2.innerHTML = '第' + ln + '步：';
	cell3.innerHTML = '<div class="layui-input-inline wid">' +
		'<select class="layui-input-inline wid" name="" id="" onchange="fnA(this)">' +
		'<option value="">选择指令</option>' +
		'<option value="指令一">指令一</option>' +
		'<option value="指令二">指令二</option>' +
		'</select>' +
		'</div>';
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}

function insert_bz() {
	alert("增加并行步骤测试")
}



//减少一个步骤
function delete_bz() {
	var table = document.getElementById("add_bz");
	var rows = table.rows.length;
	if (rows > 3) {
		var row = table.deleteRow(-1);
		var row2 = table.deleteRow(-1);
	} else {
		layer.msg("至少保留一个步骤");
	}
}


var fnA = function(elem) {
	//下拉框获取指令数据
}




//显示被隐藏的条件框
var fn1 = function(elem) {
	var tj = elem.value;
	document.getElementById('x1').style.display = 'block';
	document.getElementById('y1').style.display = 'block';
};

var fn2 = function(elem) {
	var tj = elem.value;
	document.getElementById('x2').style.display = 'block';
	document.getElementById('y2').style.display = 'block';
};

var fn3 = function(elem) {
	var tj = elem.value;
	document.getElementById('x3').style.display = 'block';
	document.getElementById('y3').style.display = 'block';
};

var fn4 = function(elem) {
	var tj = elem.value;
	document.getElementById('x4').style.display = 'block';
	document.getElementById('y4').style.display = 'block';
};

var fn5 = function(elem) {
	var tj = elem.value;
	document.getElementById('x5').style.display = 'block';
	document.getElementById('y5').style.display = 'block';
};

var fnTJ12 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ12').style.display = 'block';
	document.getElementById('yTJ12').style.display = 'block';
};

var fnTJ13 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ13').style.display = 'block';
	document.getElementById('yTJ13').style.display = 'block';
};

var fnTJ22 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ22').style.display = 'block';
	document.getElementById('yTJ22').style.display = 'block';
};

var fnTJ23 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ23').style.display = 'block';
	document.getElementById('yTJ23').style.display = 'block';
};

var fnTJ32 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ32').style.display = 'block';
	document.getElementById('yTJ32').style.display = 'block';
};

var fnTJ33 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ33').style.display = 'block';
	document.getElementById('yTJ33').style.display = 'block';
};

var fnTJ42 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ42').style.display = 'block';
	document.getElementById('yTJ42').style.display = 'block';
};

var fnTJ43 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ43').style.display = 'block';
	document.getElementById('yTJ43').style.display = 'block';
};

var fnTJ52 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ52').style.display = 'block';
	document.getElementById('yTJ52').style.display = 'block';
};

var fnTJ53 = function(elem) {
	var tj = elem.value;
	document.getElementById('xTJ53').style.display = 'block';
	document.getElementById('yTJ53').style.display = 'block';
};

function frm_disp2(){
	
	var html1 = '';
	var Vdata1 ='<td><i onclick="add_bz()" class="iconfont icon_f">&#xe6b9;</i> </td>';
	html1 +=Vdata1;
}


$(document).ready(function(){
			$.ajaxSettings.async=false;
    		var num = sessionStorage.getItem('rows3');
			var Tab_name="t_configuration_flow"
			var Title = "Where f_id = '" + num + "' ";
			var url1=routePath+"/getToGrid"
			var num2;
			$.get(url1,{'tabName':Tab_name,'titles':Title},
			function(data1){									
				num2=data1["content"][0];				
				},
			"json");
			$("#f_name").val(num2.f_name);
			$("#f_describe").val(num2.f_describe);
			$("#f_remark").val(num2.f_remark);
			$("#f_start").val(num2.f_start);//0 or 1
			if(num2.f_start==1)
			{
				$("#f_start1").prop("checked",true)				
			}
			else
			{
				$("#f_start2").prop("checked",true)
			}
			
//======================================================			
			

			var Tab_name2="jiyin_flow_step";
			var Titles2 =  " Where f_id = '" + num + "' order by fs_id";		
			var fname;
			var url2=routePath+"/getToGrid";
			$.get(url2,{'tabName':Tab_name2,'titles':Titles2},
			function(data1){			
				fname=data1["content"];
				//=======遍历流程有多少个步骤
				for(var j=0;j<fname.length;j++)
				{
						var table1 = document.getElementById("add_bz");
						var row = table1.insertRow(-1);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var jj=j+1;
						var titlet="title"+jj;
						var lcaa="#lc"+jj;
						var lca1="lc"+jj;
						cell1.innerHTML = '第 ' + jj + '步 ：';
						cell2.innerHTML = 
						'<td><i onclick="add_bz()" class="iconfont icon_f">&#xe6b9;</i> </td><td><div class="layui-input-inline wid"><select  name="'+lca1+'" id="'+lca1+'"><option value="">'+fname[j].i_name+'</option></select></div></td>';
											
					var Tab_name1="jiyin_instruct";
					var Title1 = "order by i_id";
					var num3;		
					console.log(lcaa);
					//----------------------------生成下拉框的值
					$.get(url1,{'tabName':Tab_name1,'titles':Title1},
					function(data1){									
						for(var i=0;i<data1["content"].length;i++)
						{
							num3=data1["content"][i];
							console.log(num3)
		 					$(lcaa).append("<option value="+num3.i_id+">"+num3.i_name+"</option>");
						   	layui.use('form', function(){
						 			 var form = layui.form;
						 			 form.render();
						 			});	
						}
					},
					"json");
					//=======遍历生成条件

				}				
				},
			"json");	

			
 })
