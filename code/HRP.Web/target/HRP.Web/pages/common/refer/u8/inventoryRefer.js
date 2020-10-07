var nodeList = [];
var setting = null;
var singleSelect= true;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initInvClsTree();
    initDataGrid();
    loadData();
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
        },{
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
            	searchClick();
            }
        }]
    });
}


//初始化树
function initInvClsTree(invClsCode) {
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
                name: "invClsName"
            },
            simpleData: {
                enable: true,
                idKey: "invClsCode",
                pIdKey: "invClsParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                loadData();
            }
        }
    };

    ajaxSubmit({
        url: contextPath + "/u8/getU8InvClsListForRefer.do",
        async:false,
        data:{
            filter:JSON.stringify({
                accountId: getURLParameter("accountId"),
                year: getURLParameter("year"),
                itemClass: getURLParameter("itemClass")
            })
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.invClsList;
                
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].invClsName = "(" + dataList[i].invClsCode + ")" + dataList[i].invClsName

                    if (dataList[i].invClsParent == null || dataList[i].invClsParent == "") {
                        dataList[i].invClsParent = "root";
                    }
                }
                //增加一个根目录节点
                dataList.push({
                    invClsName: "存货分类树",
                    invClsCode: "root",
                    invClsParent: "",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });

                $.fn.zTree.init($("#invClsTree"), setting, dataList);
            }
        }
    });
}

function initDataGrid(){
	singleSelect = getURLParameter("singleSelect");
	if(singleSelect==null||singleSelect=="true"||singleSelect == true){
		singleSelect = true
	}else{
		singleSelect = false
	}
	$("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: singleSelect,
        pagination:true,
        rownumbers: true,
        pageSize:20,
        border:false,
        fit: true, //自动大小  
        url: null,
        columns: [[
        	{ field: 'ck', checkbox: true },
            { field: 'invCode', title: '物资编码', width: 100,align:"left" },
            { field: 'invName', title: '物资名称', width: 150,align:"left" },
            { field: 'invStd', title: '规格型号', width: 80,align:"left" },
            { field: 'unitName', title: '单位', width: 150,align:"left" },
            { field: 'referPrice', title: '单价', width: 80,align:"left" },
            { field: 'stockQuantity', title: '库存量', align: 'right', halign: 'center', width: 80 },
            { field: 'whName', title: '仓库名称', align: 'left', halign: 'center', width: 100 }
        ]],
        onDblClickRow: function (rowIndex, rowData) {
        	if(singleSelect){
        		var selRow = $('#dataGrid').datagrid("getSelected");
        	    if (selRow == null) {
        	        alertError("请选择一行");
        	        return;
        	    }
        	    closeDialog(selRow);
        	}else{
        		var rows = $('#dataGrid').datagrid('getSelections');
            	if(rows==null){
            		alertError("请至少选择一个物资")
            		return false;
            	}
                closeDialog(rows);
        	}
        }
    });
}


//加载部门类别数据
function loadData() {
    var filter = $("#infoForm").form2json();
    filter.accountId = getURLParameter("accountId");
    filter.year = getURLParameter("year");
    filter.itemClass = getURLParameter("itemClass");
    
    var treeObj = $.fn.zTree.getZTreeObj("invClsTree");
    if(treeObj != null){
        var selectedNodes = $.fn.zTree.getZTreeObj("invClsTree").getSelectedNodes();
        if (selectedNodes.length > 0 && selectedNodes[0].invClsCode!= "root") {
            filter.invClsCode = selectedNodes[0].invClsCode;
        }
    }
    
    ajaxSubmit({
        url: contextPath + "/u8/getU8InvListForRefer.do",
        data:{
            filter:JSON.stringify(filter)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                 $('#dataGrid').datagrid({ loadFilter:pagerFilter }).datagrid('loadData',result.data.invList);
            }
        }
    });
}

function saveClick() {
	if(singleSelect){
		var selRow = $('#dataGrid').datagrid("getSelected");
	    if (selRow == null) {
	        alertError("请选择一行");
	        return false;
	    }
	    closeDialog(selRow);
	}else{
		var rows = $('#dataGrid').datagrid('getSelections');
    	if(rows==null){
    		alertError("请至少选择一个物资")
    		return false;
    	}
        closeDialog(rows);
	}
}

function searchClick(){
	var dialog = openDialog({
        dialogWidth: 300,
        dialogTitle:"查询条件",
        dialogHeight: 150,
        elementId: "searchDiv",
        dialogCallBack: function () {
        	loadData();
        }
    });
    dialog.addButton("reset","重 置",function(){
        $("#infoForm")[0].reset();
    });
}

