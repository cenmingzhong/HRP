
var isChecked = false;
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initInvClsTree();
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
function initInvClsTree() {
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
                name: "invClsCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "invClsCode",
                pIdKey: "invClsParent",
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
        url: contextPath + "/db/invCls/getInvClsTree.do",
        success: function (result) {
            if (result.isOk == "Y") {

                var dataList = result.data.invClsTree;
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].invClsCodeName = "(" + dataList[i].invClsCode + ")" + dataList[i].invClsName;
                }
                
                $.fn.zTree.init($("#invClsTree"), setting, dataList);

            }
        }
    });
}

function saveClick(){

    if(getURLParameter("isChecked")=="true"){
        var selectedNodes =  $.fn.zTree.getZTreeObj("invClsTree").getCheckedNodes(true);

        if (selectedNodes.length == 0) {
            alert("请先选择分类");
            return;
        }
        closeDialog(selectedNodes);
    }else{

        var selectedNodes = $.fn.zTree.getZTreeObj("invClsTree").getSelectedNodes();

        if (selectedNodes.length == 0) {
            alert("请选择物资分类");
            return;
        }
        else {
            var dialogParameter = getDialogParams();
	        if(dialogParameter != null && dialogParameter.selectEnd && !selectedNodes[0].isEnd){
                alertError("请选择末级物资分类");
                return;
	        }
	        if(isChecked){
	        	closeDialog(selectedNodes);
	        }else{
	        	closeDialog(selectedNodes[0]);
	        }
            
        }
    }
}

function initPage(){

    if(getURLParameter("isChecked")=="true"){
    	checked = true;
        //$("#selAll_Block").show();
    	$("#selAll_Block").hide();
    }else{
        $("#selAll_Block").hide();
    }
    $("#cb_selAll").bind("change", function(){
        var treeObj = $.fn.zTree.getZTreeObj("invClsTree");
        var nodes = treeObj.getNodes();
        for(var i = 0 ; i < nodes.length; i++){
            if(nodes[i].level==0){
                treeObj.checkNode(nodes[i], this.checked, false);
            }
        }
    });
}