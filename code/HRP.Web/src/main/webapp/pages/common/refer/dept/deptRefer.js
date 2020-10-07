var nodeList = [];
var setting = null;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initDeptTree();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
            }
        }, {
            id: "search",
            text: "过滤",
            iconCls: "icon-search",
            handler: function () {
                openDialog({
                    elementId: "filterBlock",
                    dialogWidth: 300,
                    dialogHeight: 80,
                    dialogCallBack: function () {
                        var treeObj = $.fn.zTree.getZTreeObj("deptTree");

                        loadDeptTree(nodeList);
                        treeObj.expandAll(false);
                        if ($("#txt_deptName").val() != "") {
                            var nodes = treeObj.getNodesByFilter(filter);
                            var filterNodes = [];
                            for (var i = 0; i < nodeList.length; i++) {
                                if (nodeList[i].deptCode == "root") {
                                    filterNodes.push(nodeList[i]);
                                    break;
                                }
                                for (var j = 0; j < nodes.length; j++) {
                                    if (nodes[j].deptCode.indexOf(nodeList[i].deptCode) == 0) {
                                        filterNodes.push(nodeList[i]);
                                        break;
                                    }
                                }
                            }
                            loadDeptTree(filterNodes);
                            treeObj.expandAll(true);
                        } else {
                            var nodes = treeObj.getNodes();
                            for (var i = 0; i < nodes.length; i++) {
                                treeObj.expandNode(nodes[i]);
                            }
                        }
                    }
                });
            }
        },{
            id: "back",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog()
            }
        }]
    });
}

//初始化部门分类树
function initDeptTree() {
    var itemOrganTree;
    setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: getURLParameter("isChecked")=="true"? true:false,
            chkboxType :chkboxType = { "Y" : "", "N" : "" }
        },
        data: {
            key: {
                name: "deptCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "deptCode",
                pIdKey: "deptParent",
                rootPId: ""
            }
        },
        callback: {
            onDblClick: function (e, treeId, treeNode) {
                if (treeNode != null) {
                    if( treeNode.children != null && getDialogParams().selectEnd){
                        return;
                    }else {
                        saveClick();
                    } 

                    
                }
            }
        }
    };
    ajaxSubmit({
        url: "getList.do",
        data: {
            filter: JSON.stringify({
                authFilter: getURLParameter("authFilter") == "true" ? true : false,
                isEnd: getURLParameter("isEnd") == "true" ? true : false,
                filterEnd:getURLParameter("filterEnd") == "true" ? true : false
            })
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var deptList = result.data.deptList;
                for (var i = 0; i < deptList.length; i++) {
                    deptList[i].deptCodeName = "(" + deptList[i].deptCode + ")" + deptList[i].deptName;
                }

                nodeList = deptList;
                loadDeptTree(nodeList);
            } else {
                alert(result.message);
            }
        }
    });
}
function saveClick() {
    if(getURLParameter("isChecked")=="true"){
        var selectedNodes =  $.fn.zTree.getZTreeObj("deptTree").getCheckedNodes(true);

        if (selectedNodes.length == 0) {
            alert("请先选择部门");
            return;
        }
        closeDialog(selectedNodes);
    }else{
        var selectedNode = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();

        if (selectedNode.length == 0) {
            alert("请先选择部门");
            return;
        }
        var dialogParameter = getDialogParams();
        
        if(dialogParameter == null){
        
        }else{
            if(dialogParameter.selectEnd && !selectedNode[0].isEnd){
                alert("请选择末级部门");
                return;
            }
        }
        closeDialog(selectedNode[0]);
    }
}

function filter(node) {
    if ($("#txt_deptName").val() == "") {
        return true;
    } else {
        return (node.deptCodeName.indexOf($("#txt_deptName").val()) > -1);
    }
}

function loadDeptTree(treeData) {
    $.fn.zTree.init($("#deptTree"), setting, treeData);
}