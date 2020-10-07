
//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
    initPage();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增字典类型",
            iconCls: "icon-add",
            handler: function () {
                addDictTypeClick();
            }
        }, {
            id: "edit",
            text: "修改字典类型",
            iconCls: "icon-edit",
            handler: function () {
                editDictTypeClick();
            }
        }, {
            id: "delete",
            text: "删除字典类型",
            iconCls: "icon-remove",
            handler: function () {
                deleteDictTypeClick();
            }
        },'-',{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadDictTypeTree();
            }
        }]
    });
}

function loadDictTypeTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        data: {
            key: {
                name: "dictTypeCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "dictTypeCode",
                pIdKey: "",
                rootPId: ""
            }
        },
        callback: {
            onClick: function(e, treeId, treeNode){
                loadDataDictDetailList(treeNode);
            }
        }
    };
    ajaxSubmit({
        url: "getDictTypeList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var dictTypeList = result.data.dictTypeList;
                for(var i = 0 ; i < dictTypeList.length; i++){
                    dictTypeList[i].dictTypeCodeName = "("+dictTypeList[i].dictTypeCode+")"+dictTypeList[i].dictTypeName
                }
                $.fn.zTree.init($("#dictTypeTree"), setting, dictTypeList);
                $('#dataGrid').datagrid('loadData', []);
            }
        }
    });
    
}


//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        rownumbers: true,
        border:false,
        pagination: true,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'dictCode', title: '编码', width: 100,halign:"center" },
            { field: 'dictName', title: '名称', width: 250,halign:"center" }
        ]],
        onClickRow: function (rowIndex, rowdata) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        toolbar:[{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            handler: function () {
                addDataDictClick();
            }
        }, {
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                editDataDictClick();
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
                deleteDataDictClick();
            }
        },'-',{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                var selectedNodes = $.fn.zTree.getZTreeObj("dictTypeTree").getSelectedNodes();
                loadDataDictDetailList(selectedNodes[0]);
            }
        }, '-', {
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchClick();
            }
        }],
        onLoadSuccess: function (data) {
            
        }
    });
}

function initPage(){
    loadDictTypeTree();
}

//加载数据
function loadDataDictDetailList() {
    
    var selectedNodes = $.fn.zTree.getZTreeObj("dictTypeTree").getSelectedNodes();
    if(selectedNodes.length ==0){
        alertError("请选择字典类型!");
        return;
    }
    var filter = $.extend({dictTypeCode: selectedNodes[0].dictTypeCode},$("#infoForm").form2json());
    ajaxSubmit({
        url:contextPath+"/db/dataDict/getSearchList.do",
        data: { 
            filter:JSON.stringify(filter)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.dataDictDetailList);
            }
        }
    });
}

function searchClick(){
    var dialog = openDialog({
        dialogWidth: 300,
        dialogHeight: 100,
        dialogTitle:"查询条件",
        elementId: "searchDiv",
        dialogCallBack: function () {
            loadDataDictDetailList();
        }
    });
    dialog.addButton("reset","重 置",function(){
        $("#infoForm")[0].reset();
    });
}
//新增字典类型
function addDictTypeClick(){
    openDialog({
        dialogWidth: 350,
        dialogHeight: 250,
        url: "toDictTypeInfo.do",
        dialogCallBack: function (returnVal) {
            if(returnVal){
                loadDictTypeTree();
            }
        }
    });
}
//修改字典类型
function editDictTypeClick(){
    var selectedNodes = $.fn.zTree.getZTreeObj("dictTypeTree").getSelectedNodes();
    if(selectedNodes.length ==0){
        alert("请选择字典类型");
        return;
    }
    openDialog({
        dialogWidth: 350,
        dialogHeight: 250,
        url: "toDictTypeInfo.do?dictTypeCode="+selectedNodes[0].dictTypeCode,
        dialogCallBack: function (returnVal) {
            if(returnVal){
                loadDictTypeTree();
            }
        }
    });
}

//删除字典类型
function deleteDictTypeClick(){
    var selectedNodes = $.fn.zTree.getZTreeObj("dictTypeTree").getSelectedNodes();
    if(selectedNodes.length ==0){
        alertError("请选择字典类型");
        return;
    }
    confirmMsg("确定要删除吗?",function(){
        ajaxSubmit({
            url: "deleteDictType.do",
            data: { 
                dictTypeCode:selectedNodes[0].dictTypeCode
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    loadDictTypeTree();
                }
            }
        });
        
    }); 
}
//新增数据字典
function addDataDictClick(){
    var selectedNodes = $.fn.zTree.getZTreeObj("dictTypeTree").getSelectedNodes();
    if(selectedNodes.length ==0){
        alert("请选择字典类型");
        return;
    }
    openDialog({
        dialogWidth: 350,
        dialogHeight: 250,
        url: "toInfo.do?dictTypeCode="+selectedNodes[0].dictTypeCode,
        dialogCallBack: function (resultVal) {
            loadDataDictDetailList(selectedNodes[0]);
        }
    });
}

//修改数据字典
function editDataDictClick(){
    var selRow = $('#dataGrid').datagrid("getSelected");
    if (selRow == null) {
        alertError("请选择一行数据!");
        return;
    }
    openDialog({
        dialogWidth: 350,
        dialogHeight: 250,
        url: "toInfo.do?id=" + encodeURI(selRow.id),
        dialogCallBack: function (msg) {
            loadDataDictDetailList();
        }
    });
}
//删除数据字典
function deleteDataDictClick(){
    var selRows = $('#dataGrid').datagrid("getSelections");

    if (selRows.length ==0) {
        alertError("请选择需要删除的行");
        return;
    }
    confirmMsg("确定要删除吗?",function(){
        ajaxSubmit({
            url: contextPath + "/db/dataDict/delete.do",
            data: { 
                id:selRows[0].id
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    loadDataDictDetailList();
                }
            }
        });
        
    }); 
}