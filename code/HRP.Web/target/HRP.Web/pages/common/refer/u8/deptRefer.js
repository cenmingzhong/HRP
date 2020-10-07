var deptName = ""
//页面初始化
$(document).ready(function () {
    initToolBar();
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
        },{
            id: "save",
            text: "定位",
            iconCls: "icon-save",
            handler: function () {
            	searchSetting()
            }
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog()
            }
        }]
    });
}
//初始化树
function initTree() {

    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        data: {
            key: {
                name: "cDepName"
            },
            simpleData: {
                enable: true,
                idKey: "cDepCode",
                pIdKey: "parentNode",
                rootPId: ""
            }
        },
        callback: {
            onDblClick: function (e, treeId, treeNode) {
                if (treeNode != null) {
                    if( treeNode.children != null){
                        return;
                    }else {
                        saveClick();
                    } 

                    
                }
            }
        }
    };
    ajaxSubmit({
        url:contextPath+"/u8/getU8DeptRefer.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $.fn.zTree.init($("#zTree"), setting, result.data.deptList);
            }
        }
    });
}
function saveClick() {
    var selectedNode = $.fn.zTree.getZTreeObj("zTree").getSelectedNodes();
    if (selectedNode.length == 0) {
        alertError("请先选择部门");
        return;
    }
    closeDialog({
        deptName: selectedNode[0].cDepName, 
        deptCode: selectedNode[0].cDepCode 
    });
}

function filter(node) {
    if ($("#txt_nodeName").val() == "") {
        return true;
    } else {
        return (node.caliberName.indexOf($("#txt_nodeName").val()) > -1);
    }
}


function getFullItemClass(treeNode) {
    var itemName = treeNode.cDepName;
    while (treeNode.getParentNode() != null) {
        itemName = treeNode.getParentNode().cDepName + " / " + itemName;

        treeNode = treeNode.getParentNode();
    }

    return itemName;
}

var selRow = 0;
function searchSetting() {
	if ($("#txt_deptName").val() != "") {
		if(deptName!=$("#txt_deptName").val()){
			selRow = 0
		}
		deptName = $("#txt_deptName").val()
        var treeObj = $.fn.zTree.getZTreeObj("zTree");
        var nodes = treeObj.getNodesByParamFuzzy("cDepName", $("#txt_deptName").val(), null);

        if (nodes.length == 0) {
            alertError("无查询结果")
            return false;
        }
        if (selRow >= nodes.length - 1) {
            selRow = 0;
        } 
           
        treeObj.selectNode(nodes[selRow]);
        selRow++;
        return false;
    } else {
        alertError("请输入名称");
        return false;
    }
}