var nodeList = [];
var setting = null;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initzTree();
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
            id: "back",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog()
            }
        }]
    });
}

var selectEnd = getURLParameter("selectEnd") == "true" ? true : false;
//初始化部门分类树
function initzTree() {
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
                name: "name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parent",
                rootPId: ""
            }
        },
        callback: {
            onDblClick: function (e, treeId, treeNode) {
                if (treeNode != null) {
                    if( treeNode.children != null && selectEnd){
                        return;
                    }else {
                        saveClick();
                    } 
                }
            }
        }
    };
    ajaxSubmit({
        url: "getListForRefer.do",
        data: {
            filter: JSON.stringify({
                isEnd: getURLParameter("isEnd") == "true" ? true : false
            })
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var workloadTypeList = result.data.workloadTypeList;
                
                $.fn.zTree.init($("#zTree"), setting, workloadTypeList);
            } else {
                alertError(result.message);
            }
        }
    });
}
function saveClick() {
    if(getURLParameter("isChecked")=="true"){
        var selectedNodes =  $.fn.zTree.getZTreeObj("zTree").getCheckedNodes(true);

        if (selectedNodes.length == 0) {
            alert("请先选择工作量类型");
            return;
        }
        closeDialog(selectedNodes);
    }else{
        var selectedNode = $.fn.zTree.getZTreeObj("zTree").getSelectedNodes();

        if (selectedNode.length == 0) {
            alertError("请先选择工作量类型");
            return;
        }
        if(selectEnd && !selectedNode[0].isEnd){
            alertError("请选择末级类型");
            return;
        }
        closeDialog(selectedNode[0]);
    }
}

