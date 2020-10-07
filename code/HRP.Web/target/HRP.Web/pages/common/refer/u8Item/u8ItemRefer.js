var nodeList = [];
var setting = null;
var singleSelect= true;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initPage();
    initTree();
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
                        var treeObj = $.fn.zTree.getZTreeObj("zTree");

                        loadTree(nodeList);
                        treeObj.expandAll(false);
                        if ($("#txt_itemName").val() != "") {
                            var nodes = treeObj.getNodesByFilter(filter);
                            var filterNodes = [];
                            for (var i = 0; i < nodeList.length; i++) {
                                if (nodeList[i].id == "root") {
                                    filterNodes.push(nodeList[i]);
                                    break;
                                }
                                for (var j = 0; j < nodes.length; j++) {
                                    if (nodes[j].id.indexOf(nodeList[i].id) == 0) {
                                        filterNodes.push(nodeList[i]);
                                        break;
                                    }
                                }
                            }
                            loadTree(filterNodes);
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
function initPage(){
    singleSelect = getURLParameter("singleSelect")=="true"?true:false;
}
//初始化树
function initTree() {

    var itemOrganTree;
    setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: !singleSelect
        },
        check: {
            enable: getURLParameter("isChecked")=="false"? false:true,
        },
        data: {
            key: {
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeCode",
                pIdKey: "parentNode",
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
        url:contextPath+"/u8/getDeptItemTree.do",
        data: {
            filter: JSON.stringify({
                authFilter: getURLParameter("authFilter") == "true" ? true : false,
                isEnd: getURLParameter("isEnd") == "true" ? true : false,
                filterEnd:getURLParameter("filterEnd") == "true" ? true : false,
            })
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var deptItemTree = result.data.deptItemTree;
                nodeList = deptItemTree;
                loadTree(nodeList);
            } else {
                alert(result.message);
            }
        }
    });
}
function saveClick() {
    if(!singleSelect){
    	var checkedNodes = $.fn.zTree.getZTreeObj("zTree").getCheckedNodes();
    	var selectedItems = [];
        $.each(checkedNodes, function (n, value) {
            if (value.nodeCode.indexOf("i_") != -1) {
                selectedItems.push({
                    item_code: value.nodeCode.split("_")[1],
                    item_name:value.nodeName
                })
            }
        });
        if(selectedItems.length==0){
            alert("请选择项目");
            return;
        }
        closeDialog(selectedItems);
    }else{
        var selectedNode = $.fn.zTree.getZTreeObj("zTree").getCheckedNodes();
        if (selectedNode.length == 0) {
            alert("请先选择项目");
            return;
        }
        var dialogParameter = getDialogParams();
        
        
        closeDialog(selectedNode[0]);
    }
}

function filter(node) {
    if ($("#txt_nodeName").val() == "") {
        return true;
    } else {
        return (node.caliberName.indexOf($("#txt_nodeName").val()) > -1);
    }
}

function loadTree(treeData) {
    $.fn.zTree.init($("#zTree"), setting, treeData);
}