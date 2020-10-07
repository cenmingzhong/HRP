
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

function search() {
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
        pageSize: 50,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'costItemName', title: '费用项目名称', width: 100 },
            { field: 'memo', title: '备注', width: 150 }
        ]],
        onDblClickRow: function (rowIndex, rowData) {
            closeDialog(rowData);
        },
        onLoadSuccess: function (data) {
        }
    });
}

function initPage() {
    $("#btn_query").bind("click", function(){
        loadData();
    });
    loadData();
}

function loadData() {
    var data = $("#infoForm").form2json();
    ajaxSubmit({
    	url:contextPath+"/db/costItem/getCostItemList.do",
        data: { filter: JSON.stringify(data) },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.costItemList);
            }
        }
    });
}

