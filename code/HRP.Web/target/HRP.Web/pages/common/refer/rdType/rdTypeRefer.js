var userCode = "";

//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initUserGrid(); //初始化模板
    initPage();
    initHtml();
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
                    alertError("请选择数据");
                    return;
                }
                closeDialog(selRows[0]);
            }
        },{
             id: "refresh",
             text: "刷新",
             iconCls: "icon-reload",
             handler: function () {
                 loadData();
             }

         },{
             id: "exit",
             text: "退出",
             iconCls: "icon-exit",
             handler: function () {
                 closeDialog();
             }

         }]
    });
}

function initHtml() {
    Refer.Department({
        inputObj: $("#txt_deptName"),
        referCallBack: function (inputObj, returnVal) {
            if (returnVal) {
                if ($("#txt_deptCode").val() != returnVal.deptCode) {
                    $("#txt_personCode").val("");
                    $("#txt_personName").val("");
                }

                $("#txt_deptCode").val(returnVal.deptCode);
                $("#txt_deptName").val(returnVal.deptName);
            }
        }
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


function initUserGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: false,
        border: false,
        pageSize: 10,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'rdCode', title: '收发类别编码', width: 100,halign:"center" },
            { field: 'rdName', title: '收发类别名称', width: 150,halign:"center" }
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
    var data = $("#infoForm").form2json();
    data.inOut = getURLParameter("inOut");
    data.isEnd = true;
    ajaxSubmit({
        url: contextPath + "/db/rdType/getRdTypeList.do",
        data: { filter: JSON.stringify(data)},
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid('loadData', result.data.rdTypeList);
            }
        }
    });
}
