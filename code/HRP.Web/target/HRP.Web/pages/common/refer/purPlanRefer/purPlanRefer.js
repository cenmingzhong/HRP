var mId = [];
var params={};
$(document).ready(function () {
    initToolBar();
    initSearchHtml();
    loadGrid();
    loadData();
});
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        },'-', {
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchSetting();
            }
        }, {
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData(getPageIndex("dataGrid"));
            }
        }, '-', {
            id: "cancel",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }]
    });
}
function initSearchHtml() {
    $("#txt_startPurPlanDate,#txt_endPurPlanDate,#txt_startVerifyDate,#txt_endVerifyDate").date('');
    Refer.Inv({
        inputObj: $("#txt_invCode"),
        isSearch: true,
        referCallBack: function (inputObj, returnVal) {
            if (returnVal != null) {
                $("#txt_invCode").val(returnVal[0].invCode);
                $("#txt_invName").val(returnVal[0].invName);
            }
        }
    });
    Refer.Inv({
        inputObj: $("#txt_invName"),
        isInvName: true,
        isSearch: true,
        referCallBack: function (inputObj, returnVal) {
            if (returnVal != null) {
                $("#txt_invCode").val(returnVal[0].invCode);
                $("#txt_invName").val(returnVal[0].invName);
            }
        }
    });
    Refer.Department({
        inputObj: $("#txt_deptName"),
        referCallBack: function (inputObj, returnVal) {
            if (returnVal) {
                $("#txt_deptName").val(returnVal.deptName);
            }
        }
    });
    Refer.Person({
        inputObj: $("#txt_personName"),
        referCallBack: function (inputObj, returnVal) {
            if (returnVal != null) {
                $("#txt_personName").val(returnVal[0].personName);
            }
        }
    });
    Refer.Vendor({
        inputObj: $("#txt_venName"),
        referCallBack: function (inputObj, returnVal) {
            if (returnVal != null) {
                $("#txt_venName").val(returnVal.venName);
            }
        }
    });
}
function loadGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: false,
        pagination: true,
        pageSize: 30,
        rownumbers: false,
        fitColumns: false,
        border:false,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'purPlanCode', title: '采购计划单号', width: 100 },
            { field: 'purPlanDate', title: '单据日期', width: 80 },
            { field: 'purPlanType', title: '计划类型', width: 100 },
            { field: 'personName', title: '计划人员', width: 100 },
            { field: 'deptName', title: '计划科室', width: 100 },
            { field: 'whName', title: '仓库名称', width: 100 },
            { field: 'memo', title: '备注', width: 150 },
            { field: 'verifier', title: '审核人', width: 100 },
            { field: 'verifyDate', title: '审核日期', width: 100 }
        ]],
        onCheck: function (rowIndex, rowData) {
            mId.push(rowData.id);
            loadBodyData();
        },
        onCheckAll: function (rows) {
            for (var i = 0; i < rows.length; i++) {
                if ($.inArray(rows[i].id, mId) == -1) {
                    mId.push(rows[i].id);
                }
            }
            loadBodyData();
        },
        onUncheck: function (rowIndex, rowData) {
            for(var j = mId.length -1; j>=0; j-- ){
                if(rowData.id==mId[j]){
                    mId.splice(j, 1);
                }
            }
            loadBodyData();
        },
        onUncheckAll: function (rows) {
            for (var i = 0; i < rows.length; i++) {
                for(var j = mId.length -1; j>=0; j-- ){
                    if(rows[i].id==mId[j]){
                        mId.splice(j, 1);
                    }
                }
            }
            loadBodyData();
        },
        onLoadSuccess: function (data) {
            var rows = data.rows;
            for (var i = 0; i < rows.length; i++) {
                if ($.inArray(rows[i].id, mId) != -1) {
                    var rowIndex = $("#dataGrid").datagrid("getRowIndex", rows[i]);
                    $("#dataGrid").datagrid("selectRow", rowIndex);
                }
            }
        }
    });
    $("#dataBodyGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        border: true,
        rownumbers: false,
        border: false,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'purPlanCode', title: '采购计划单号', width: 100 },
            { field: 'invCode', title: '物资编码', width: 80 },
            { field: 'invName', title: '物资名称', width: 150 },
            { field: 'invStd', title: '规格型号', width: 120 },
            { field: 'unitName', title: '计量单位', width: 80 },
            { field: 'venName', title: '供应商', width: 100 },
            { field: 'quantity', title: '数量', align: "right", width: 100 },
            { field: 'canRefQuantity', title: '未参照数量', align: "right", width: 100 },
            { field: 'refPurQuantity', title: '已参照数量', align: "right", width: 100 }
        ]]
    });
}
function loadData() {
    if (!isNullorEmpty(getURLParameter("whCode"))) {
        params.whCode = getURLParameter("whCode");
    }
    if (!isNullorEmpty(getURLParameter("venCode"))) {
        params.venCode= getURLParameter("venCode");
    }
    ajaxPageSubmit({
        pageNum:1,
        gridId:"dataGrid",
        url: contextPath + "/rd/purPlan/getPurPlanRefer.do",
        data: {
            hashtable: JSON.stringify(params)
        },
        success: function (result) {
            $('#dataGrid').datagrid('loadData', result.data.vouchList);
        }
    });
}
function loadBodyData() {
    if(mId.length ==0){
        $('#dataBodyGrid').datagrid('loadData', []);
        return;
    }
    params.mids = mId.join(",");
    ajaxSubmit({
        url: contextPath + "/rd/purPlan/getDetailRefer.do",
        data: {
            hashtable: JSON.stringify(params)
        },
        success: function (result) {
            $('#dataBodyGrid').datagrid('loadData', result.data.detailList);
        }
    });
}
function searchSetting() {
    openDialog({
        dialogWidth: 480,
        dialogHeight: 210,
        elementId: "searchDiv",
        dialogCallBack: function () {
            params = $("#infoForm").form2json();
            loadData(1);
            mId=[];
            loadBodyData();
        }
    });
}
function saveSetting() {
    var selBodyRows = $('#dataBodyGrid').datagrid('getSelections');
    if (selBodyRows.length == 0) {
        alert("表体没有勾选的行");
        return;
    }
    closeDialog(selBodyRows);
}