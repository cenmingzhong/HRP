var params = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initPositionTree();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selectedNodes = $.fn.zTree.getZTreeObj("positionList").getSelectedNodes();
                if (selectedNodes.length == 0) {
                    alert("请选择货位");
                    return;
                }
                closeDialog(selectedNodes[0]);
            }
        },  {
            id: "cancel",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
              closeDialog();
            }
        }]
    });
}

//初始化货位树
function initPositionTree() { 
    if(getURLParameter("whCode")==null){
        alert("请先选择所属仓库");
        return;
    }
    var setting = {
    view: {
        dbClickExpand: true,
        showLine: true,
        selectedMulti: true
    },
    check: {
        enable: false
    },
    data: {
        key: { name: "posName" },
        simpleData: {
            enable: true,
            idKey: "posCode",
            pIdKey: "parentCode",
            rootPId: ""
        }
    },
    callback: {
        onDblClick: function (e, treeId, treeNode) {
                if (treeNode.children == null) {
                    closeDialog(treeNode);
                }
            }
        }
    };
     ajaxSubmit({
         url: contextPath + "/db/whPos/getPositionList.do",
         data:{params:JSON.stringify({whCode: getURLParameter("whCode")})},
         success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.positionList;
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].posName = dataList[i].posName;
                }

                $.fn.zTree.init($("#positionList"), setting, dataList);

            } 

        }
    });
}
