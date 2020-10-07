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
                var selRows = $('#dataGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择记录");
                    return;
                }
                closeDialog(selRows[0]);
            }
        }, '-',{
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                loadData();
            }

        },{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }

        }, '-',{
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
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        border:false,
        pageSize: 10,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'unitCode', title: '计量单位编码', width: 100 },
            { field: 'unitName', title: '计量单位名称', width: 150 }
        ]],
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData);
        },        
        onLoadSuccess: function (data) {
        }
    });
}

function initPage() {
    loadData();
}

function loadData() {
    ajaxSubmit({
        url: contextPath + "/db/unit/getUnitList.do",
        data: {
        	filter:JSON.stringify($("#infoForm").form2json())
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.unitList);
            }
        }
    });
}

