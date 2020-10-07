//页面初始化
$(document).ready(function () {
    initToolBar();
    loadGrid(); //初始化
    loadData();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
            }
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

//初始化table
function loadGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        pagination:true,
        rownumbers: true,
        border:false,
        fit: true, //自动大小  
        url: null,
        columns: [[
        	{ field: 'sysUserName', title: '员工姓名', width: 120,align:"center" }
        ]],
        onDblClickRow:function(index,row){
        	saveClick(row)
        }
    });
}

function loadData() {
    ajaxSubmit({
        url: contextPath + "/system/user/getList.do",
        data:{
        	authFilter:true
        },
        success: function (result) {
            if (result.isOk == "Y") {
                 $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData',result.data.userList);
            }
        }
    });
}
function saveClick() {
    var selRow = $('#dataGrid').datagrid("getSelected");
    if (selRow == null) {
        alertError("请选择一行");
        return;
    }
    closeDialog(selRow);
}
