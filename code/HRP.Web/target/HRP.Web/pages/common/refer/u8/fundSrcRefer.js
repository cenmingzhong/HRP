//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
    initPage()
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
                if(getURLParameter("singleSelect")=="false"){
                    closeDialog(selRows);
                }else{
                    closeDialog(selRows[0]);
                }
                
            }
        }/*, {
            id: "search",
            text: "过滤",
            iconCls: "icon-search",
            handler: function () {
               loadDataList(1)
            }

        }*/, {
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadDataList(1);
            }

        }, {
            id: "cancel",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }/*, '-', {
            id: "colSet",
            text: "栏目",
            iconCls: "icon-colSet",
            handler: function () {
                setDataGridCol("dataGrid")
            }
        }*/]
    });
}
function initPage() {
    loadDataList(1);
}
//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: (getURLParameter("singleSelect")=="false"?false:true),
        pagination: true,
        pageSize: 20,
        border: false,
        rownumbers: false,
        fitColumns: false,
        fit: true, //自动大小  
        url: null,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'fundSrc', title: '资金来源', halign:"center", width: 200 }
        ]],
        onDblClickRow: function (rowIndex, rowData) {
            if(getURLParameter("singleSelect")=="false"){
                closeDialog([rowData]);
            }else{
                closeDialog(rowData);
            }
        }
    });
    showDataGridCol("dataGrid")
}
//加载数据
function loadDataList(pageNum) {
    searchParams = $("#infoForm").form2json();
    ajaxPageSubmit({
        gridId: "dataGrid",
        pageNum: pageNum,
        url: contextPath + "/u8/getFundSrcList.do",
        data: {
            filter: JSON.stringify(searchParams)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.fundSrcList);
            }
        }
    });
}
