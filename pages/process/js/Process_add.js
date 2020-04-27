var step=2;//步骤文本
var roow=1;//下拉框数量
var ste2=0;//增加标识
//下拉框标识
var selN=1;
var Cselect=new Array();
var Cinp=new Array();
var RName=new Array();
var Csekect1=new Array();
var Cinp1=new Array();
var bill_no3=new Array();
$(document).ready(function(){
	$.ajaxSettings.async=false;
    frm_disp1();
    frm_disp2();
	frm_disp3();
    var Tab_name="t_configuration_instruct"
	var Titles = "";
	var url1=routePath+"getToGrid";
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
	function(data1){
		for(var i=0;i<data1["content"].length;i++){
			var row=data1["content"][i];
			$("#lc1").append("<option value="+row.i_id+">"+row.i_name+"</option>");
			layui.use('form', function(){
				var form = layui.form;
				form.render();
		});
		}
	},"json");
})
function frm_disp1(){
		var Vdata1 = '<td><span style="color: red;font-size: 20px">* </span>流程名称：</td><td><input type="text" name="f_name" id="f_name" placeholder="输入流程名称" class="layui-input" autocomplete="off"></td><td>&nbsp;&nbsp;&nbsp;&nbsp;流程描述：</td><td rowspan="2"><textarea name="f_describe" id="f_describe" placeholder="请输入流程描述" class="layui-textarea"></textarea></td>';
		var Vdata2 = '<td> &nbsp&nbsp&nbsp备注：</td><td><input type="text" name="f_remark" autocomplete="off" placeholder="请输入备注" class="layui-input"></td>';
		var Vdata3 = '<td>启动状态：</td><td><div class="layui-input-block" style="margin-left: 0px;"><input type="radio" name="f_start" value="1" title="启用" checked=""><input type="radio" name="f_start" value="0" title="禁用"></div></td>';
		var Vdata4 = '<td><!-- 不需要显示的隐藏部分字段 --><input type="text" name="f_owner" id="f_owner" class="layui-input none"><input type="text" name="f_id" id="f_id" class="layui-input none"><!-- 流程ID --><input type="text" name="f_create_user" id="f_create_user"class="layui-input none"><!-- 创建者 --><input type="text" name="f_create_date" id="f_create_date" class="layui-input none"><!-- 创建时间 --><input type="text" name="f_update_user" id="f_update_user" class="layui-input none"><!-- 修改者 --><input type="text" name="f_update_date" id="f_update_date" class="layui-input none"><!-- 修改时间 --><input type="text" name="f_preinstall" id="f_preinstall" class="layui-input none"><!-- 预设状态 --><!--副表字段 --><input type="text"  class="layui-input none"><input type="text"  class="layui-input none"><input type="text"  class="layui-input none"></td>';
		$('#frm01').html(Vdata1);
		$('#frm02').html(Vdata2);
		$('#frm03').html(Vdata3);
		$('#frm04').html(Vdata4);

}
function frm_disp2(){
	var html1 = '';
	var Vdata1 ='<td style=width: 10px><i onclick="add_bz2()" class="iconfont icon_f">&#xe6b9;</i> </td><td>第1步：</td><td><div class="layui-input-inline wid"><select  name="lc1" id="lc1" onchange="add_return()"><option value="">选择指令</option></select></div><span style="color: red;font-size: 20px" > &nbsp*</span></td>';
	html1 +=Vdata1;
	$('#tr').html(html1);
}
function frm_disp3(){
	var Vdata1 = '<td><input type="text" name="tid" id="tid" class="layui-input none"><input type="text" name="sid" id="sid" class="layui-input none"><!-- 流程ID --><input type="text" name="return_name" id="return_name"class="layui-input none"><!-- 创建者 --><input type="text" name="flag" id="flag" class="layui-input  none"><!-- 创建时间 --><input type="text" name="value" id="value" class="layui-input none"></td>';
	$('#re1').html(Vdata1);
}

//保存
function Save() {
	var f_name1 = $("#f_name").val();
	var f_stay1 = $("#lc1").val();
	if(f_name1!="")
	{
		if(f_stay1!="")
		{
			$.ajaxSettings.async=false;
			var options=$("#lc1 option:selected");  //获取选中的项
			console.log(options.val());   //拿到选中项的值
			console.log(options.text());   //拿到选中项的文本
			var bill_no3;
			var bill_no1 = "";
			var bill_no2 = new Array();
			var url2=taskRoutePath+"/newId";
			$.get(url2,{'tabName':"t_configuration_flow"},
				function(data1){
					bill_no1 =data1["content"];
			},"json");
			var myDate = currentDate();
			var owner=sessionStorage.getItem('owner');
			$('#f_owner').val(owner);
			$('#f_id').val(bill_no1);
			$('#f_create_user').val("admin");
			$('#f_create_date').val(myDate);
			$('#f_update_date').val(myDate);
			$('#f_preinstall').val("1");
			var Name = "t_configuration_flow";
			var value1=$("#main_info").serializeArray();
			//form save
			var data3 =JSON.stringify({"tabName":Name,"dataSet":value1});
			$.ajax({
				type: 'POST',
				processData: false,
				url: routePath+"formSave",
				data: data3,
				headers: {'Content-Type':'application/json'},
				success: function(respMsg){
					
				}
			});
			var bill_no4=new Array();
			var url4=taskRoutePath+"newId";
			for(var kk=1;kk<=roow;kk++){
				$.get(url4,{'tabName':"t_configuration_flow_step"},
					function(data1){
						bill_no2[kk-1] =data1["content"];
					},
					"json");
			}
			var arrayObj = new Array();
			for(var k=1;k<=roow;k++){
				var kk=k-1;
				var rowObj = new Object();
				rowObj["f_id"] = bill_no1;
				rowObj["fs_id"] = bill_no2[k-1];
				var indexS = "#lc"+k+" option:selected";
				var i_id = $(indexS).val();
				bill_no4[kk]=i_id;//获取下拉框的指令
				rowObj["i_id"] = i_id;
				rowObj["i_name"]= $(indexS).text();
				var tj = "#TJ"+k;
				var row = $(tj).find("tr").length ;
				var titles = "";
				for(var t = 1;t<=row;t++){
					if(t==1){
						titles  += $("#x"+k).val() +$("#tj"+k+" option:selected").val()+$("#y"+k).val()+",";
					}else{
						titles  += $("#xTJ"+k+t).val() +$("#tjTJ"+k+t+" option:selected").val()+$("#yTJ"+k+t).val() +",";
					}
				}
				titles == undefined? "" :titles;
				rowObj["fs_title"] =titles;
				arrayObj.push(rowObj);

			}
			//table保存
			var data2 =JSON.stringify({"tabName":"t_configuration_flow_step","dataSet":arrayObj});
			$.ajax({
				type: 'POST',
				processData: false,
				url: routePath+"/tableSave",
				data: data2,
				headers: {'Content-Type':'application/json'},
				success: function(respMsg){
					$("#respMsg").html("That,s OK!");
				}
			});
			//step保存
			var url1=routePath+"getToGrid";
			var Tabname2="t_configuration_instruct_return";
			var title2="";
			var valuesIR;
			var AvaluesIR=new Array();
			var bill_no5=new Array();//存放有返回值的fls指令
			$.get(url1,{'tabName':Tabname2,'titles':title2},
				function(data1){
					valuesIR=data1["content"];
				},
				"json");
			for(var b=0;b<valuesIR.length;b++)
			{
				AvaluesIR[b]=valuesIR[b].i_id;
			}
			var count=0;
			for(var m=0;m<bill_no4.length;m++)//下拉框的个数 2 lenght:4
			{
				for(var n=0;n<AvaluesIR.length;n++)//返回值表里面有多少个指令
				{
					if(bill_no4[m]==AvaluesIR[n])
					{
						bill_no5[count]=bill_no2[m]; //0 1
						count++;
						break;
					}
				}
			}
			for(var z=0;z<Cselect.length;z++)
			{
				$.get(url2,{'tabName':"t_configuration_step_title"},
					function(data1){
						bill_no3 =data1["content"];
					},
					"json");
				var select1 = document.getElementById(Cselect[z]);
				var ValueSelect = select1.value;
				var select2 = document.getElementById(Cinp[z]);
				var valueInp = select2.value;
				$('#tid').val(bill_no3);
				$('#sid').val(bill_no5[0]);
				$('#return_name').val(RName[z]);
				$('#flag').val(ValueSelect);
				$('#value').val(valueInp);
				var valueR=$("#Return").serializeArray();
				//form save
				var dataR =JSON.stringify({"tabName":"t_configuration_step_title","dataSet":valueR});
				$.ajax({
					type: 'POST',
					processData: false,
					url: routePath+"formSave",
					data: dataR,
					headers: {'Content-Type':'application/json'},
					success: function(respMsg){
					
					}
				});
			}

			parent.layer.closeAll();
			layer.msg('That,s OK!');
			// parent.layer.alert('新增成功',function(){
			// 	window.parent.location.reload();
				
			// });
		}
		else {layer.msg('至少选择一个步骤');}
	}
	else
	{
		layer.msg('流程名称不能为空');
	}

}
function  getSelect() {
	var selN=1;
	var seid="sel"+selN;

}

function add_return(){
    if(ste2==0)
    {
        selectID="lc1";
    }
   else
    {
        selectID="lc"+roow;
    }
    var myselect = document.getElementById(selectID);　　//获取select对象
    var index = myselect.selectedIndex;　　　　　　　　　//获取被选中的索引
    var options = myselect.options[index].value;　　　　　　//获取被选中的值
	var url1=routePath+"getToGrid";
	var Tabname2="t_configuration_instruct_return";
	var title2="where i_id='"+options+"'";
	var values1;
	$.get(url1,{'tabName':Tabname2,'titles':title2},
		function(data1){
			values1=data1["content"];
		},
		"json");
	if(values1.length!=0)
	{
		sessionStorage.setItem('return_lengh', 1);
		var lengh=Cselect.length;
		console.log(lengh);
		for (var i=0;i<values1.length;i++)
		{
			var seid="sel"+selN;
			var inp="inp"+selN;
			Cselect[i]=seid;
			Cinp[i]=inp;
			RName[i]=values1[i].ir_name;
			var table = document.getElementById("add_bz");
			var rows = table.rows.length;
			var ln = Math.round(parseInt(rows) / 2);
			var lnn="lc"+ln;
			var lnn1="#"+lnn;
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell1.innerHTML =values1[i].ir_name+':&nbsp&nbsp&nbsp';
            cell2.innerHTML = '<div class="layui-input-inline if"><select name="'+seid+'" id="'+seid+'"><option value="">条件</option> <option value="1">&gt;</option> <option value="2">&lt;</option> <option value="3">=</option> <option value="4">&gt;=</option> <option value="5">&lt;=</option><option value="6">⊆</option><option value="7">!=</option> </select ></div>&nbsp&nbsp&nbsp'
            cell3.innerHTML = '<input id="'+inp+'"type="text" value="'+values1[i].ir_describe+'">';
			selN++;
		}
		layui.use('form', function() {
			var form = layui.form;
			form.render();
		});
	}
	
}


//增加一个步骤
function add_bz2() {
    roow++;
	var table = document.getElementById("add_bz");
	var rows = table.rows.length;
	var ln = Math.round(parseInt(rows) / 2)+1;
	var lnn="lc"+roow;
	var lnn1="#"+lnn;
    ste2++;
	console.log(lnn1);
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	// if (num == 1) {
	cell1.innerHTML =
		'<i onclick="delete_bz()" class="iconfont icon_f">&#xe6fe;</i>&nbsp;<i onclick="add_bz2()" class="iconfont icon_f">&#xe6b9;</i>';
	cell2.innerHTML = '第' + step + '步：';
	cell3.innerHTML = ' <div id =s'+ rows +'name =s'+rows+'  class="layui-input-inline wid">  ' +
		'<select name="'+lnn+'" id="'+lnn+'" onchange="add_return()">' +
		'<option value="">选择指令</option>' +
		'</select>' +
		'</div>';
	cell4.innerHTML = '<td><i onclick="insert_bz()" class="layui-icon">&#xe623;</i> </td>';
    step++;
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});	
	var Tab_name="t_configuration_instruct"
	var Titles = "";
	var url1=routePath+"/getToGrid";
	//$(".lc1").empty();
	$.get(url1,{'tabName':Tab_name,'titles':Titles},
		function(data1){			
			for(var i=0;i<data1["content"].length;i++){
				var row=data1["content"][i];	
 				$(lnn1).append("<option value="+row.i_id+">"+row.i_name+"</option>");
				layui.use('form', function() {
				 	var form = layui.form;
				 	form.render();
				});	
			}				
		},"json");			
}
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
	var ln = (parseInt(rows2) + 1);
	if (ln < 4) {
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = '<input type="text" id="x' + (id+ln) + '" name="" class="layui-input left">';
		cell3.innerHTML = '<input type="text" id="y' + (id+ln) + '" name="y' + id + '" class="layui-input left">';
		cell4.innerHTML =
			'<div class="icon">&nbsp;<i onclick="add_tr()" class="layui-icon">&#xe61f;</i>&nbsp;<i onclick="delete_tr()" class="iconfont">&#xe6b7;</i></div>';
		cell2.innerHTML = '<div class="layui-input-inline if">' +
			'<select name="tj' + (id+ln) + '" id="tj' + (id+ln) + '" onchange="fn' + id + ln + '(this)">' +
			'<option value="">条件</option>' +
			'<option value="&gt">&gt;</option>' +
			'<option value="&lt">&lt;</option>' +
			'<option value="=<">=</option>' +
			'<option value="&gt">&gt;=</option>' +
			'<option value="&lt">&lt;=</option>' +
			'<option value="⊆">⊆</option>' +
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
		'<td><input type="text" id="x' + ln + '" name="x' + ln + '" class="layui-input left"></td>' +
		'<td>' +
		'<div class="layui-input-inline if">' +
		'<select name="tj' + ln + '" id="tj' + ln + '" onchange="fn' + ln + '(this)">' +
		'<option value="">条件</option>' +
		'<option value="&gt">&gt;</option>' +
		'<option value="&lt">&lt;</option>' +
		'<option value="=<">=</option>' +
		'<option value="&gt">&gt;=</option>' +
		'<option value="&lt">&lt;=</option>' +
		'<option value="⊆">⊆</option>' +
		'</select>' +
		'</div>' +
		'</td>' +
		'<td>' +
		'<input type="text" id="y' + ln + '" name="y' + ln + '" class="layui-input left">' +
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


function insert_bz() {
	alert("增加并行步骤测试")
}



//减少一个步骤
function delete_bz() {
    // var ele=document.getElementById("tr");    //删除与增加一样，同样要找到父级标签
    // var del_son=ele.lastElementChild;          // 指明要删除的标签在最后的位置(last)
    // ele.removeChild(del_son);
	var table = document.getElementById("add_bz");
	var rows = table.rows.length;
	if (rows > 2) {
		var row = table.deleteRow(-1);
        ste2--;
        step--;
        roow--;
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