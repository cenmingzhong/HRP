var userCode = "";

//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initUserGrid(); //初始化模板
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selRows = $('#sysUserGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择记录");
                    return;
                }
                closeDialog(selRows);

            }
        }, {
            id: "searh",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                openDialog({
                    dialogWidth: 300,
                    dialogHeight: 100,
                    elementId: "filterBlock",
                    dialogCallBack: function () {
                        loadData();
                    }
                })
            }

        }, {
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        }, {
            id: "cancel",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }

        }]
    });
}

function initUserGrid() {
    var datagrid; //定义全局变量datagrid
    datagrid = $("#sysUserGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: getURLParameter("singleSelect") == "true",
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'sysUserCode', title: '用户编号', align: 'left', halign: 'center', width: 100 },
            { field: 'sysUserName', title: '用户姓名', align: 'left', halign: 'center', width: 100 },
            { field: 'sysRoleName', title: '用户角色', align: 'left', halign: 'center', width: 100 },
            { field: 'sysDeptName', title: '所属部门', align: 'left', halign: 'center', width: 120 },
            { field: 'sysUserDesc', title: '备注', align: 'left', halign: 'center', width: 200 }
        ]],
        pagination: true,
        pageSize: 20,
        rownumbers: false,
        fitColumns: false,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        onDblClickRow: function (rowIndex, rowData) {
            closeDialog(rowData);
        },
        onLoadSuccess: function (data) {

        }
    });
}

function initPage() {
    ajaxSubmit({
        url: contextPath + "/system/user/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var dropDownList = [{}];
                dropDownList = result.data.roleList;
                bindDropDown("sel_SysRoleCode", dropDownList, "sysRoleName", "sysRoleCode", true);
                loadData();
            }
        }
    });
    loadData();
}

function loadData() {
    ajaxSubmit({
        url: contextPath + "/system/user/getList.do",//传参都是自己的字段，没有做关联查询仍然可以调用此方法
        data: {
            data: JSON.stringify($("#infoForm").form2json())
        },
        success: function (result) {
            $('#sysUserGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.userList);
        }
    });
}

