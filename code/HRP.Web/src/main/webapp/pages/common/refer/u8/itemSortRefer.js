var isEnd = false;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initTree();
    isEnd = getURLParameter("isEnd");
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
                name: "cItemCcodeName"
            },
            simpleData: {
                enable: true,
                idKey: "cItemCcode",
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
        url:contextPath+"/u8/getU8ItemSortRefer.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.itemSortList;
                for(var i = 0 ; i < dataList.length ; i++){
                    dataList[i].cItemCcodeName = "("+dataList[i].cItemCcode+")"+dataList[i].cItemCname
                }
                $.fn.zTree.init($("#zTree"), setting, dataList);
            }
        }
    });
}
function saveClick() {
    var selectedNode = $.fn.zTree.getZTreeObj("zTree").getSelectedNodes();
    if (selectedNode.length == 0) {
        alertError("请先选择一个");
        return;
    }
    if(isEnd){
    	//selectedNode
    	if(selectedNode[0].children!=null&&selectedNode[0].children.length>0){
    		alertError("请先选择末节点");
            return;
    	}
    }
    var returnVal = {
            cItemCcode : selectedNode[0].cItemCcode,
            cItemCname : selectedNode[0].cItemCname,
            cItemFullCname : getFullItemCname(selectedNode[0])
    }
    closeDialog(returnVal);
}

function getFullItemCname(treeNode) {
    var itemName = treeNode.cItemCname;
    while (treeNode.getParentNode() != null) {
        itemName = treeNode.getParentNode().cItemCname + " / " + itemName;
        treeNode = treeNode.getParentNode();
    }
    return itemName;
}