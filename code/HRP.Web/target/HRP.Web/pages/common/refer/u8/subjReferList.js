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
                name: "endCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "ccode",
                pIdKey: "parent",
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
        url:contextPath+"/u8/getSubjListByRefer.do",
        data:{
        	filter:JSON.stringify({isEnd:0})
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $.fn.zTree.init($("#zTree"), setting, result.data.subjList);
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
    closeDialog(selectedNode[0]);
}

