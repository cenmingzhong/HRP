var printTemplateList = {};

$(document).ready(function () {
    initToolBar();
    loadGrid();
    loadData();
});
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        },  {
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        }]
    });
}

function loadGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: false,
        pagination: true,
        pageSize: 40,
        rownumbers: false,
        fitColumns: false,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'templateClsCode', title: '模板编号', width: 100 },
            { field: 'templateName', title: '模板名称', width: 100 }

        ]],
        singleSelect: true,
        onClickRow: function (rowIndex, rowData) {
         
            $(this).datagrid('clearSelections');
            $(this).datagrid('clearChecked');
      
            $(this).datagrid('selectRow', rowIndex);
        }
       

    });
}
function loadData() {
    var vouchType = getURLParameter("type");
    ajaxSubmit({
        url: contextPath + "/system/print/printTemplate/getPrintTemplateList.do",
        data: {
            templateClsCode: vouchType
        },
        success: function (result) {
            templateList = result.data.templateList;
            $('#dataGrid').datagrid('loadData', result.data.templateList);

        }
    });
}


function saveSetting() {
    printTemplateList = {};
    var selRow = $('#dataGrid').datagrid('getSelected') || {};
    if (selRow == "") {
        alert("表体没有勾选的行");
        return;
    }
    templateList = selRow;
    ajaxSubmit({
        url: contextPath + "/system/setCommonPrintDef/save.do",
        data: {
            printTemplate: JSON.stringify(templateList)
        },
  
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
            }
        }
    });

    closeDialog();
}