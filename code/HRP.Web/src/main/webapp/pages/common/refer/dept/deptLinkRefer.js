
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid(); //初始化模板
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
                var selRows = $('#dataGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择数据");
                    return;
                }
                closeDialog(selRows[0]);
            }
        },
         {
             id: "refresh",
             text: "刷新",
             iconCls: "icon-reload",
             handler: function () {
                 loadData();
             }

         },

         {
             id: "cancel",
             text: "关闭",
             iconCls: "icon-cancel",
             handler: function () {
                 closeDialog();
             }

         }]
    });
}

function search(pageNum) {
    openDialog({
        dialogWidth: 300,
        dialogHeight: 200,
        elementId: "searchDiv",
        dialogCallBack: function () {
            loadData();
        }
    });
}


function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        border: false,
        pageSize: 10,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'linkName', title: '助记名', width: 100 },
            { field: 'linkPsn', title: '联系人', width: 100 },
            { field: 'linkPhone', title: '联系电话', width: 100 },
            { field: 'linkAddress', title: '联系地址', width: 100 },
        ]],
        onDblClickRow: function (rowIndex, rowData) {
            closeDialog(rowData);
        },
        onLoadSuccess: function (data) {
        }
    });
}

function initPage() {
    loadData();
}

function loadData(pageNum) {
    var deptCode = getURLParameter("deptCode");
    ajaxSubmit({
        gridId: "dataGrid",
        pageNum: pageNum,
        url: contextPath + "/db/dept/getInfo.do",
        data: { deptCode:deptCode },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.deptLinkList);
            }
        }
    });
}

