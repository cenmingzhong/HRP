var action = null;
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
var selectedNode = "";
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initOrganTree(); //初始化部门树
 
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selNode = $.fn.zTree.getZTreeObj("organList").getSelectedNodes();
                if (selNode.length == 0) {
                    alert("请先选择机构");
                    return;
                }
                closeDialog(selNode[0])
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
            handler: function () {
                closeDialog();
            }
        }]
    });
}
//初始化档案树
function initOrganTree() {
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
                name: "orgCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "orgCode",
                pIdKey: "parentCode",
                rootPId: ""
            }
        },
        callback: {
            onDblClick: function (event, treeId, treeNode) {

                if (treeNode.children == null) {
                    closeDialog(treeNode);
                }
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/org/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var organList = result.data.orgList;
                for (var i = 0; i < organList.length; i++) {
                    organList[i].orgCodeName = "(" + organList[i].orgCode + ")" + organList[i].orgName;
                    if (organList[i].parentCode == null) {
                        organList[i].parentCode = "root";
                    }
                }
                $.fn.zTree.init($("#organList"), setting, organList);
                if (selectedNode != "") {
                    var treeObj = $.fn.zTree.getZTreeObj("organList");
                    var node = treeObj.getNodeByParam("orgCode", selectedNode, null);
                    treeObj.selectNode(node, false);
                }
            }
        }
    });
}