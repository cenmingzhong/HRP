var userCode = "";

//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initUnitGrid(); //初始化模板
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


function initUnitGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: false,
        border:false,
        pageSize: 10,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'unitCode', title: '计量单位编码', align: 'left', halign: 'center', width: 100 },
            { field: 'unitName', title: '计量单位名称', align: 'left', halign: 'center', width: 120 },
            { field: 'isMain', title: '是否主计量', align: 'center', halign: 'center', width: 80,
                formatter:function(value, row, index){
                    return value?"<label style='color:blue'>是</label>":"否"
                }
            },
            { field: 'rate', title: '换算率', align: 'right', halign: 'center', width: 100}
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
        url: contextPath + "/db/inv/getInvUnitRateList.do",
        data: {
            invCode:getURLParameter("invCode")
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid('loadData', result.data.rateList);
            }
        }
    });
}

