var selectedNode = null
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "saveItemClass",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selNode = $.fn.zTree.getZTreeObj("itemClassTree").getSelectedNodes();
                if (selNode.length == 0) {
                    alert("请先选择项目分类");
                    return;
                }
                if(selNode[0].children != null){
                    alert("请先选择末级项目分类");
                    return;
                }
                closeDialog(selNode[0]);
            }
        }, {
            id: "back",
            text: "关闭",
            iconCls: "icon-back",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

function initPage(){
    loadItemTypeList();
    
    $("#sel_itemType").bind("change",function(){
        
        loadItemClassList();
    });
}

function loadItemTypeList(){
    ajaxSubmit({
        url:contextPath+"/db/itemClass/getItemTypeList.do",
        success:function(result){
            if(result.isOk=="Y"){
                bindDropDown("sel_itemType",result.data.itemTypeList, "itemTypeName","itemTypeCode", false);

                loadItemClassList();
                loadItemType();
            }
        }
    })
}
function loadItemClassList(){
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
                name: "itemClsCodeName"
            },
            simpledata: {
                enable: true,
                idKey: "id",
                pIdKey: "itemClsParent",
                rootPId: ""
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/itemClass/getItemClassList.do",
        data:{
            itemTypeCode:$("#sel_itemType").val()
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var itemClsList = result.data.itemClsList;
                for(var i = 0 ; i < itemClsList.length; i++){
                    itemClsList[i].itemClsCodeName = "("+itemClsList[i].itemClsCode+")"+ itemClsList[i].itemClsName;
                    if (itemClsList[i].itemClsParent == null||itemClsList[i].itemClsParent=="") {
                        itemClsList[i].itemClsParent = "root";
                    }
                }
                $.fn.zTree.init($("#itemClassTree"), setting, itemClsList);
                if (selectedNode != "") {
                    var treeObj = $.fn.zTree.getZTreeObj("itemClassTree");
                    var node = treeObj.getNodeByParam("id", selectedNode, null);
                    treeObj.selectNode(node, false);
                }
                setFieldsValue(false, true);
                setToolBarStatus(true);
            } 
        }
    });

}