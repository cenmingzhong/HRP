
var billStatus = "U";
var statuses = { Null: "U",Edit: "E"};
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initRoleTree();
    initGrid();
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
                var roleNode = $.fn.zTree.getZTreeObj("roleTree").getSelectedNodes();
                if (roleNode.length == 0) {
                    alertError("请先选择角色");
                    return;
                }
                var selNode = $.fn.zTree.getZTreeObj("menuTree").getSelectedNodes();
                if (selNode.length ==0 || isNullorEmpty(selNode[0].sysMenuUrl)) {
                	alertError("请先选择菜单");
                    return;
                }
                billStatus = statuses.Edit;
                ctrlStatus();
            }
        },{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            enable:function(){
                return billStatus == statuses.Edit
            },
            handler: function () {
                saveOperAuth();
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
            enable:function(){
                return billStatus == statuses.Edit
            },
            handler: function () {
                getOperationAuthList();
                billStatus = statuses.Null;
                ctrlStatus();
            }
        }]
    });
}



//初始化档案树
function initRoleTree() {
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
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeCode",
                pIdKey: "nodeParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                $('#dataGrid').jqGrid('loadData', []);
                if(treeNode.nodeCode !="root"){
                    initMenuTree();
                }else{
                    var zTreeObj = $.fn.zTree.getZTreeObj("menuTree");
                    zTreeObj.destroy();
                }
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/role/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.roleList;

                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].nodeCode = dataList[i].sysRoleCode;
                    dataList[i].nodeName = dataList[i].sysRoleName;
                    dataList[i].nodeParent = 'root';
                }
                //增加根目录节点
                dataList.push({
                    nodeName: "角色列表",
                    nodeCode: "root",
                    nodeParent: "",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });

                $.fn.zTree.init($("#roleTree"), setting, dataList);
            }
        }
    });
}

//初始化档案树
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
            onClick: function (e, treeId, treeNode) {
                if (treeNode.children == null) {
                    if(treeNode.sysMenuUrl !=null &&treeNode.sysMenuUrl !="" ){
                        $('#dataGrid').jqGrid('loadData', []);
                        getOperationAuthList();
                        billStatus = statuses.Null;
                        ctrlStatus();
                    }
                } else {
                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                    zTree.expandNode(treeNode, null, null, null, true);
                    billStatus = statuses.Null;
                    ctrlStatus();
                }
            }
        }
    };

    var treeObj = $.fn.zTree.getZTreeObj("roleTree");
    var nodes = treeObj.getSelectedNodes();
    if(nodes.length ==0 || nodes[0].nodeCode =="root"){
        alertError("请选择角色");
        return;
    }
    ajaxSubmit({
        url: contextPath + "/system/roleMenu/getRoleModuleMenuList.do",
        data:{
            sysRoleCode:nodes[0].nodeCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $.fn.zTree.init($("#menuTree"), setting, result.data.roleMenuList);
            }
        }
    });
}


function initGrid() {
	newJgGrid("dataGrid",{
		showCol:true,
        rowNum:50,
        
        columns : [
        	{code:"operCode",text:"功能编码",width:100},
        	{code:"operText",text:"功能描述",width:120},
        	
        ]
    });
	
	ctrlStatus() 
}
function getOperationAuthList(){
    var roleTreeObj = $.fn.zTree.getZTreeObj("roleTree");
    var roleNodes = roleTreeObj.getSelectedNodes();
    if(roleNodes.length ==0 || roleNodes[0].nodeCode =="root"){
        alertError("请选择角色");
        return;
    }
    
    var menuTreeObj = $.fn.zTree.getZTreeObj("menuTree");
    var menuNodes = menuTreeObj.getSelectedNodes();
    if(menuNodes.length ==0 || isNullorEmpty(menuNodes[0].sysMenuUrl)){
        alertError("请选择菜单");
        return;
    }

    ajaxSubmit({
        url: contextPath + "/system/auth/operation/getOperationList.do",
        data:{
            pathUrl: menuNodes[0].sysMenuUrl
        },
        success: function (result) {
            if (result.isOk == "Y") {
                
                $('#dataGrid').jqGrid('loadData', result.data.operationList);

                ajaxSubmit({
                    url: contextPath + "/system/auth/operAuth/getOperationAuthList.do",
                    data:{
                        sysRoleCode: roleNodes[0].nodeCode,
                        pathUrl: menuNodes[0].sysMenuUrl
                    },
                    success: function (operAuthResult) {
                        if (operAuthResult.isOk == "Y") {
                            var operAuthList = operAuthResult.data.operationAuthList;
                            if(operAuthList != null && operAuthList.length >0){
                            	var dataList = $("#dataGrid").jqGrid("getData");
                            	
                                for(var i = 0 ; i < dataList.length; i++){
                                	for(var j = 0;j<operAuthList.length;j++){
                                		if(dataList[i].id == operAuthList[j].operId){
                                			 $("#dataGrid").jqGrid("setSelection",dataList[i].jqRowId_,false);
                                		}
                                	}
                                }
                            }
                        }
                    }
                });

            }
        }
    });
}

function saveOperAuth(){
    var roleTreeObj = $.fn.zTree.getZTreeObj("roleTree");
    var roleNodes = roleTreeObj.getSelectedNodes();
    if(roleNodes.length ==0 || roleNodes[0].nodeCode =="root"){
        alertError("请选择角色");
        return;
    }
    
    var menuTreeObj = $.fn.zTree.getZTreeObj("menuTree");
    var menuNodes = menuTreeObj.getSelectedNodes();
    if(menuNodes.length ==0 || isNullorEmpty(menuNodes[0].sysMenuUrl)){
        alertError("请选择菜单");
        return;
    }
    var selRowIds = $('#dataGrid').jqGrid('getSelectedIds');
	if(selRowIds.length==0){
		alertError("请选择需要保存的功能按钮！")
        return;
    }
	
    var operIds = [];
    for (var i = 0; i < selRowIds.length; i++) {
        var tempRowData = $("#dataGrid").jqGrid("getRowData", selRowIds[i],true);
        operIds.push(tempRowData.id);
    }

    ajaxSubmit({
        url: contextPath + "/system/auth/operAuth/saveOperationList.do",
        data:{
            sysRoleCode: roleNodes[0].nodeCode,
            pathUrl: menuNodes[0].sysMenuUrl,
            operIds:JSON.stringify(operIds)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	//getOperationAuthList();
            	alertSuccess(result.message)
            	billStatus = statuses.Null;
                ctrlStatus();
            }
        }
    });
}

function ctrlStatus(){
    $('#tb').toolbar("updateStatus"); 
}