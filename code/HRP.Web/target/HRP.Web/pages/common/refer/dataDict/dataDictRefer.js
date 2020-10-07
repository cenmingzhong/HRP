//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
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
                saveClick();
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
            handler: function () {
                closeDialog();
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
        pagination: true,
        border:false,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'dictCode', title: '编码', width: 100 },
            { field: 'dictName', title: '名称', width: 120 },
            { field: 'dictState', title: '状况', width: 120 }
        ]],
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

function initPage(){
    var dictTypeCode = getURLParameter("dictTypeCode");
    if(dictTypeCode=="undefined"){
    	dictTypeCode=null;
    }
    loadDataDictDetailList(dictTypeCode);
}
//加载数据
function loadDataDictDetailList(dictTypeCode) {
    ajaxSubmit({
    	url:contextPath+"/db/dataDict/getList.do",
        data: { 
            dataTpyeCode: dictTypeCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid('loadData', result.data.dataDictDetailList);
            }
        }
    });
}

function saveClick(){
    var selRow = $('#dataGrid').datagrid("getSelected");
    if (selRow == null) {
        alert("请选择一行");
        return;
    }
    closeDialog(selRow);
}