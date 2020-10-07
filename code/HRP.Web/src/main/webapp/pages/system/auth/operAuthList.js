
var billStatus = "U";
var statuses = { Null: "U",Edit: "E"};
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();//初始化DataGrid
    initMenuTree();
    initPage();
});


//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "edit",
            text: "编辑",
            iconCls: "icon-edit",
            enable:function(){
                return billStatus != statuses.Edit
            },
            handler: function () {
                var treeObj = $.fn.zTree.getZTreeObj("menuTree");
                var nodes = treeObj.getSelectedNodes();
                if(nodes.length ==0 || isNullorEmpty(nodes[0].sysMenuUrl)){
                    alertError("请选择菜单");
                    return;
                }
                billStatus = statuses.Edit;
                ctrlStatus();
                //var dataList = $("#dataGrid").jqGrid("getRows");
                //$('#dataGrid').jqGrid('loadData', dataList);
            }
        },{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            enable:function(){
                return billStatus == statuses.Edit
            },
            handler: function () {
            	save();
            }
        },{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            enable:function(){
                return billStatus == statuses.Edit || billStatus == statuses.New
            },
            handler: function () {
            	addLine();
            }
        },{
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            enable:function(){
                return billStatus == statuses.Edit 
            },
            handler: function () {
            	delLine();
            }
        },'-',{
            id: "getBtn",
            text: "获取按钮",
            iconCls: "icon-bottom",
            enable:function(){
                return billStatus == statuses.Edit 
            },
            handler: function () {
                var treeObj = $.fn.zTree.getZTreeObj("menuTree");
                var nodes = treeObj.getSelectedNodes();
                if(nodes.length ==0 || isNullorEmpty(nodes[0].sysMenuUrl)){
                    alertError("请选择菜单");
                    return;
                }
                getOperAuthList(nodes[0].sysMenuUrl)
            }
        },'-',{
            id: "undo",
            text: "取消",
            iconCls: "icon-undo",
            enable:function(){
                return billStatus == statuses.Edit
            },
            handler: function () {
                getOperationList();
                billStatus = statuses.Null;
                ctrlStatus();

            }
        }]
    });
}


function initGrid() {
	newJgGrid("dataGrid",{
		showCol:true,
        footerrow:true,
        rowNum:50,
        isCellEditable:function(nm,rowData){
        	if(!isModify()){
                return false;
            }
            return true;
        },
        columns : [
        	{code:"operCode",text:"功能编码",width:80,isInput:true},
        	{code:"operText",text:"功能描述",width:100,isInput:true},
        	
        ]
    });
}

//初始化菜单树
function initMenuTree() {
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
                name: "sysMenuName"
            },
            simpleData: {
                enable: true,
                idKey: "sysMenuCode",
                pIdKey: "sysMenuParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode){
                if (treeNode.children == null) {
                    if(treeNode.sysMenuUrl !=null &&treeNode.sysMenuUrl !="" ){
                        $('#dataGrid').jqGrid('loadData', []);
                        getOperationList();
                        billStatus = statuses.Null;
                        ctrlStatus();
                        
                    }
                } else {
                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                    zTree.expandNode(treeNode, null, null, null, true);
                }
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/menu/getAllModuleMenu.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var menuList = result.data.menuList;
                $.fn.zTree.init($("#menuTree"), setting, menuList);
            }
        }
    });
}

function initPage(){
	ctrlStatus();
}

function getOperationList(){
    var treeObj = $.fn.zTree.getZTreeObj("menuTree");
    var nodes = treeObj.getSelectedNodes();
    if(nodes.length ==0 || isNullorEmpty(nodes[0].sysMenuUrl)){
        alertError("请选择菜单");
        return;
    }

    ajaxSubmit({
        url: contextPath + "/system/operation/getOperationList.do",
        data:{
            pathUrl: nodes[0].sysMenuUrl
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').jqGrid('loadData', result.data.operationList);
            }
        }
    });
}

function save(){
	var treeObj = $.fn.zTree.getZTreeObj("menuTree");
    var nodes = treeObj.getSelectedNodes();
    if(nodes.length ==0 || isNullorEmpty(nodes[0].sysMenuUrl)){
        alertError("请选择菜单");
        return;
    }
    //获取所有数据行
    var dataList = $("#dataGrid").jqGrid("getAllData");
    ajaxSubmit({
        url: contextPath + "/system/operation/save.do",
        data:{
            pathUrl: nodes[0].sysMenuUrl,
            operationList:JSON.stringify(dataList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alertSuccess(result.message);
                billStatus = statuses.Null;
                ctrlStatus();
            }
        }
    });
}

function ctrlStatus(){
    $('#tb').toolbar("updateStatus"); 
}
function isModify() {
    return billStatus == statuses.Edit
}

function getOperAuthList(sysMenuUrl){
    var iframe = document.getElementById("ifmPage")
    iframe.src = contextPath+"/"+sysMenuUrl;
    showLocker();
    if (iframe.attachEvent){ 
        iframe.attachEvent("onload", function(){ 
            getTbItems(iframe)
        }); 
    } else { 
        iframe.onload = function(){ 
            getTbItems(iframe);
        }; 
    } 
}

function getTbItems(iframe){
    var items =$("#tb a",iframe.contentWindow.document);

    var list = [];
    for(var i = 0 ; i < items.length ; i++){
        list.push({
            operCode: items[i].id,
            operText: $(items[i]).text()
        });
    }

    $('#dataGrid').jqGrid('loadData', list);
    closeLocker();
}

function addLine(){
    $("#dataGrid").jqGrid('addRowData',{ isNew: true})
}
function delLine(){

    ids = $('#dataGrid').jqGrid("getSelectedIds");
    if(ids.length ==0){
        alertError("请选择需要删除的行");
        return;
    }
    for(var i=ids.length-1; i >=0 ; i--){
        var rowData = $("#dataGrid").jqGrid("getRowData", ids[i],true);
        /*if(!rowData.isNew){
           $('#dataGrid').jqGrid("saveDelRow",rowData);
        }*/
        $("#dataGrid").jqGrid('delRowData',ids[i])
    }
}