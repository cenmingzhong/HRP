var params = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
    loadRoleList();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [ {
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
            	var selRows = $('#sysRoleGrid').datagrid("getSelections");
                if (selRows.length==0) {
                    alert("请选择一行");
                    return;
                }
                closeDialog(selRows);
            }
        }, {
            id: "cancel",
            text: "取消",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }, {
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
            	searchClick();
            }
        }]
    });
}

//初始化table
function initGrid() {
	var datagrid; //定义全局变量datagrid
    datagrid = $("#sysRoleGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border:false,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'sysRoleName', title: '角色名称', align: 'left', halign: 'center', width: 150 },
            { field: 'sysRoleDesc', title: '角色描述', align: 'left', halign: 'center', width: 200 }
        ]],
        pagination: true,
        rownumbers: false,
        fitColumns: false,
        onDblClickRow:function(rowIndex, rowData){
            closeDialog([rowData]);
        },
        onLoadSuccess: function (data) {
            
        }
    });
}

//加载人员数据
function loadRoleList() {
	var param = {};
	if($("#txt_sysRoleCode").val()){
		param.sysRoleCode = $("#txt_sysRoleCode").val();
	}
	if($("#txt_sysRoleName").val()){
		param.sysRoleName = $("#txt_sysRoleName").val();
	}
    ajaxSubmit({
        url: contextPath + "/system/role/getList.do",
        data: { 
        	filter: JSON.stringify(param)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	$('#sysRoleGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.roleList);
            }
        }
    });
}

function searchClick(){
	var dialog = openDialog({
        dialogWidth: 300,
        dialogHeight: 100,
        elementId: "searchDiv",
        dialogCallBack: function () {
        	loadRoleList();
        }
    });
    dialog.addButton("reset","重 置",function(){
        $("#infoForm")[0].reset();
    });
}