var selectedNode = "";
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initVenClsTree();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
                
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
function initVenClsTree() {
	
    var setting = {
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
                name: "venClsCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "venClsCode",
                pIdKey: "parentCode",
                rootPId: ""
            }
        },
        callback: {
            onDblClick: function (event, treeId, treeNode) {

                if (treeNode.children == null) {
                    closeDialog(treeNode);
                }
                else {
                    var dialogParameter = getDialogParams();

                    if(!treeNode.isEnd){
                        if (dialogParameter!= null && !dialogParameter.selectEnd ) {
                            closeDialog(treeNode);
                        }
                    }else {
                        closeDialog(treeNode);
                    }
                }
               
            
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/venCls/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {

                var dataList = result.data.venClsList;
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].venClsCodeName = "(" + dataList[i].venClsCode + ")" + dataList[i].venClsName;
                }
                
                $.fn.zTree.init($("#VenClsList"), setting, dataList);

            }
        }
    });
}

function fillVenCls(node) {
	$("#txt_venClsCode").val(node.venClsCode);
    $("#txt_venClsName").val(node.venClsName);
}
function saveClick(){

    if(getURLParameter("isChecked")=="true"){
        var selectedNodes =  $.fn.zTree.getZTreeObj("VenClsList").getCheckedNodes(true);

        if (selectedNodes.length == 0) {
            alert("请先选择分类");
            return;
        }
        closeDialog(selectedNodes);
    }else{

        var selectedNodes = $.fn.zTree.getZTreeObj("VenClsList").getSelectedNodes();

        if (selectedNodes.length == 0) {
            alert("请选择物资分类");
            return;
        }
        else {
            var dialogParameter = $.fn.zTree.getZTreeObj("VenClsList").getSelectedNodes();

            closeDialog(selectedNodes[0]);
        }
    }
}

function initPage(){
    if(getURLParameter("isChecked")=="true"){
        $("#selAll_Block").show();
    }else{
        $("#selAll_Block").hide();
    }
    $("#cb_selAll").bind("change", function(){
        var treeObj = $.fn.zTree.getZTreeObj("VenClsList");
        var nodes = treeObj.getNodes();
        for(var i = 0 ; i < nodes.length; i++){
            if(nodes[i].level==0){
                treeObj.checkNode(nodes[i], this.checked, false);
            }
        }
    });
}