//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化table
    loadUserList();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [ {
            id: "edit",
            text: "权限修改",
            iconCls: "icon-edit",
            handler: function () {
                var selRow = $('#dataGrid').datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择一行数据！");
                    return;
                }
                var teacherNumber = selRow.teacherNumber;
                openDialog({
                    dialogHeight: 450,
                    dialogWidth: 600,
                    url: "toInfo.do?teacherNumber=" + encodeURI(teacherNumber),
                    dialogCallBack: function (msg) {
                        if (msg) {
                            loadUserList();
                        }
                    }
                });
            }
        }, {
            id:"refresh",
            text:"刷新",
            iconCls:"icon-reload",
            handler:function () {
                loadUserList();
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
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        pagination:true,
        border:false,
        pageSize: 20,
        fit: true, //自动大小
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'teacherNumber', title: '教师编号', width: 100 },
            { field: 'teacherName', title: '教师姓名', width: 100 },
            { field: 'permissionNumber', title: '权限编号', width: 120 },
        ]],
        onClickRow: function (rowIndex, rowdata) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        onLoadSuccess: function (data) {

        }
    });
}

function searchClick() {
    openDialog({
        dialogWidth: 250,
        dialogHeight: 150,
        elementId: "searchDiv",
        dialogCallBack: function () {
            var data = $("#infoForm").form2json();
            loadUserList(data);

        }
    });
}

//加载人员数据
function loadUserList(data) {
    ajaxSubmit({
        url: contextPath + "/db/permissionManager/getList.do",
        data: {
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.permissionUserList);
            }
        }
    });
}