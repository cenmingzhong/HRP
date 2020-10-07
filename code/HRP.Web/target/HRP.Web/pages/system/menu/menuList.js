var moduleCode = "";
//页面初始化
$(document).ready(function () {
    initModuleTree(); //初始化模块信息
});

//初始化模块树
function initModuleTree() {
    var setting = {
        edit: {
            drag: {
                autoExpandTrigger: true,
                prev: dropPrev,
                inner: dropInner,
                next: dropNext
            },
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
        },
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        dnd: true,
        data: {
            key: {
                name: "sysMenuName"
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                moduleCode = treeNode.sysModuleCode;
                initMenuTree();
            },
            beforeDrag: beforeDrag,
            beforeDrop: beforeDrop         
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/menu/getModuleList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                for (var i = 0; i < result.data.moduleList.length; i++) {
                    result.data.moduleList[i].dropInner = false;
                    result.data.moduleList[i].iconSkin = "folder";
                }
                $.fn.zTree.init($("#moduleList"), setting, result.data.moduleList);
            } 
        }
    });
}
//初始化菜单树
var log, className = "dark", curDragNodes, autoExpandNode;
function initMenuTree(selMenuCode) {
    var setting = {
        edit: {
            drag: {
                autoExpandTrigger: true,
                prev: dropPrev,
                inner: dropInner,
                next: dropNext
            },
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
        },
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
            onRightClick: function (event, treeId, treeNode) {
                rightClick(event, treeId, treeNode)
            },
            beforeDrag: beforeDrag,
            beforeDrop: beforeDrop
      }
    };

    var selectedNode = $.fn.zTree.getZTreeObj("moduleList").getSelectedNodes();
    
    if (selectedNode.length > 0) {
        ajaxSubmit({
            url: contextPath + "/system/menu/getMenuListByModule.do",
            data: { 
                sysMenuModule: selectedNode[0].sysMenuCode 
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    var dataList = result.data.treeMenuList;
                    for (var i = 0; i < dataList.length; i++) {
                        dataList.dropInner = false;
                        if (dataList[i].sysMenuUrl == null || dataList[i].sysMenuUrl == "") {
                            dataList[i].dropInner = true;
                        }
                        if (dataList[i].sysMenuParent == ""||dataList[i].sysMenuParent == null) {
                            dataList[i].sysMenuParent = "root";
                        }
                        if(!isNullorEmpty(dataList[i].sysMenuIcon)){
                        	dataList[i].icon=contextPath +"/"+ dataList[i].sysMenuIcon
                        }
                        
                    }
                    //增加一个根目录节点
                    dataList.push({
                        sysMenuName: "根目录",
                        sysMenuCode: "root",
                        sysMenuParent: "",
                        open:true,
                        icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png",
                        drag: false
                    });
                    $.fn.zTree.init($("#menuList"), setting, dataList);
                    if(!isNullorEmpty(selMenuCode)){
                        var treeObj = $.fn.zTree.getZTreeObj("menuList");
                        var node = treeObj.getNodeByParam("sysMenuCode", selMenuCode, null);
                        treeObj.selectNode(node, false);
                    }
                }
            }
        });
    }
}
function rightClick(event, treeId, treeNode) {
    if (treeNode) {
        $('#mm').menu({
            onClick: function (item) {
                if (item.name == 'new') {
                    addMenu(treeNode.sysMenuCode);
                } else if (item.name == 'edit') {
                    editMenu(treeNode.sysMenuCode);
                } else if (item.name == 'delete') {
                    deleteMenu(treeNode.sysMenuCode);
                } else if (item.name == 'setRoleMenu'){
                	setRoleMenu(treeNode.sysMenuCode);
                }
            }
        });
        $('#mm').menu('show', {
            left: event.pageX,
            top: event.pageY
        });
        if (treeNode.SysMenuCode == "root") {
            $("#m_add").show();
            $("#m_edit").hide();
            $("#m_delete").hide();
        } else {
            $("#m_add").show();
            $("#m_edit").show();
            $("#m_delete").show();
        }
        $.fn.zTree.getZTreeObj(treeId).selectNode(treeNode);
    }
}
function dropPrev(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
function dropInner(treeId, nodes, targetNode) {
    if (targetNode && targetNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            if (!targetNode && curDragNodes[i].dropRoot === false) {
                return false;
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
function dropNext(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}

function beforeDrag(treeId, treeNodes) {

    className = (className === "dark" ? "" : "dark");
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            curDragNodes = null;
            return false;
        } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
            curDragNodes = null;
            return false;
        }
    }
    curDragNodes = treeNodes;
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {

    if (targetNode == null) {
        return false;
    }
    if (targetNode.SysMenuCode == "root" && (moveType == "prev" | moveType == "next")) {
        return false;
    }
    ajaxSubmit({
        url: contextPath + "/system/menu/dragMenu.do",
        data: { 
            beforeSysMenuCode: treeNodes[0].sysMenuCode,
            afterSysMenuCode: targetNode.sysMenuCode=="root"? "":targetNode.sysMenuCode,
            moveType: moveType
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alertSuccess(result.message);
                initMenuTree();
            }
        }
    })
    return true;
}

//新增模块
function addModule() {
    openDialog({
        dialogHeight: 250,
        dialogWidth: 400,
        url: contextPath +"/pages/system/menu/moduleInfo.jsp",
        dialogCallBack: function (returnVal) {
            initModuleTree();
        }
    })
}
//编辑模块
function editModule() {
    var selectedNode = $.fn.zTree.getZTreeObj("moduleList").getSelectedNodes();
    if (selectedNode.length == 0) {
        alertError("请选择需要修改的模块节点")
        return;
    }
    openDialog({
        dialogHeight: 250,
        dialogWidth: 400,
        url: contextPath +"/pages/system/menu/moduleInfo.jsp?sysMenuCode=" + selectedNode[0].sysMenuCode,
        dialogCallBack: function () {
            initModuleTree();
        }
    })
}
//删除模块
function deleteModule() {
    var selectedNode = $.fn.zTree.getZTreeObj("moduleList").getSelectedNodes();
    if (selectedNode.length == 0) {
        alertError("请选择需要修改的模块节点")
        return;
    }
    confirmMsg("删除模块，将删除该模块所有菜单，确定删除吗？",function(){
        ajaxSubmit({
            url: contextPath + "/system/menu/deleteMemu.do",
            data:{sysMenuCode:selectedNode[0].sysMenuCode},
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    initModuleTree();
                    $.fn.zTree.getZTreeObj("menuList").destroy()
                }
            }
        });
    });
}
//新增菜单
function addMenu(sysMenuParent) {
    var selectedNode = $.fn.zTree.getZTreeObj("moduleList").getSelectedNodes();
    if (selectedNode.length == 0) {
        alertError("请选择对应的模块")
        return;
    }
    var sysMenuModule = selectedNode[0].sysMenuCode;
    if (sysMenuParent == "root") {
        sysMenuParent = "";
    }

    openDialog({
        dialogHeight: 400,
        dialogWidth: 600,
        url: contextPath +"/system/menu/toMenuInfo.do?sysMenuModule=" + sysMenuModule + "&sysMenuParent=" + sysMenuParent,
        dialogCallBack: function (returnVal,message) {
            if(returnVal){
                initMenuTree(returnVal);
                alertSuccess(message);
            }
            
        }
    })
}
//编辑菜单
function editMenu(sysMenuCode) {
    if (sysMenuCode == "") {
        alertError("请选择一个菜单节点!");
        return;
    }
    openDialog({
        dialogHeight: 400,
        dialogWidth: 600,
        url: contextPath +"/system/menu/toMenuInfo.do?sysMenuCode=" + sysMenuCode,
        dialogCallBack: function () {
            initMenuTree(sysMenuCode);
        }
    })
}
//删除菜单
function deleteMenu(sysMenuCode) {
    if (sysMenuCode == "") {
        alertError("请选择一个菜单节点!");
        return;
    }
    confirmMsg("删除菜单，将删除该菜单的所有子菜单，确定删除吗？",function(){
        ajaxSubmit({
            url: contextPath + "/system/menu/deleteMemu.do",
            data:{
                sysMenuCode:sysMenuCode
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    initMenuTree();
                } 
            }
        });
    });
}
 
function setRoleMenu(sysMenuCode){
	if (sysMenuCode == "") {
        alertError("请选择一个菜单节点!");
        return;
    }
	openDialog({
        dialogWidth: 600,
        dialogHeight: 400,
        url: contextPath +"/system/menu/toSetRoleMenu.do?sysMenuCode=" + sysMenuCode,
        dialogCallBack: function () {
        }
    });
}