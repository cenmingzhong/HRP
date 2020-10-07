//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        },'-', {
            id: "searh",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchClick();
            }
        },'-',{
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog(false);
            }
        }]
    });
}
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        border:false,
        columns: [[
            { field: 'cPsnNum', title: '员工编码', halign:"center", width: 100 },
            { field: 'cPsnName', title: '员工姓名', halign:"center", width: 150 },
            { field: 'cDepName', title: '部门名称', halign:"center", width: 200 },
            { field: 'roleName', title: '角色名称', halign:"center", width: 200 }
        ]],
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData)
        },
    });
}
function initPage(){
	var deptName = getURLParameter("departmentName");
	if(!isNullorEmpty(deptName)){
		$("#txt_deptCode").val(deptName)
	}
	loadData(); 
}
function loadData() {
	var departmentCode = getURLParameter("departmentCode");
	var filter = $("#infoForm").form2json();
	if(departmentCode!=null){
		filter.departmentCode = departmentCode;
	}
    ajaxSubmit({
        url: contextPath + "/u8/getU8PsnForRefer.do",
        data: {
            filter:JSON.stringify(filter)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.psnList);
            } 
        }
    });
}

function saveSetting() {
    var selectRows = $("#dataGrid").datagrid("getSelections");
    if (selectRows.length == 0) {
        alert("请选择人员");
        return;
    }
    closeDialog(selectRows[0]);
}

function searchClick(){
    loadData();
}
