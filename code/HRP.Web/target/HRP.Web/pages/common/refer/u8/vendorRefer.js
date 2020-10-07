var venName = ""

//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid();
    //loadData();
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
function initGrid() {
    /*$("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        border:false,
        columns: [[
        	{ field: 'venClassName', title: '供应商分类', halign:"center", width: 100 },
        	{ field: 'venCode', title: '供应商编码', halign:"center", width: 100 },
            { field: 'venName', title: '供应商名称', halign:"center", width: 250 }
        ]],
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData)
        },
    });*/
	var setting = {
        view: {
            dblClickExpand: true,
            //showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        data: {
            key:{
                name : "cName"
            },
            simpleData: {
                enable:true,
                idKey: "cCode",
                pIdKey: "cParent",
                rootPId: ""
            }
        },
        callback: {
            
        }
    };
	ajaxSubmit({
        url:contextPath + "/u8/getU8VendorRefer.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var vendorList = result.data.vendorTreeList;
                $.fn.zTree.init($("#ztree"), setting, vendorList);
            }
        }
    });
}
var selRow = 0;
function searchSetting() {
	if ($("#txt_venName").val() != "") {
		if(venName!=$("#txt_venName").val()){
			selRow = 0
		}
		venName = $("#txt_venName").val()
        var treeObj = $.fn.zTree.getZTreeObj("ztree");
        var nodes = treeObj.getNodesByParamFuzzy("venName", $("#txt_venName").val(), null);

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

/*function loadData() {
    var data = $("#infoForm").form2json();
    ajaxSubmit({
        url: contextPath + "/u8/getU8VendorRefer.do",
        data: { 
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.vendorList);
            } 
        }
    });
}*/

function saveClick() {
	/*var selectRows = $("#dataGrid").datagrid("getSelections");
    if (selectRows.length == 0) {
        alert("请选择人员");
        return;
    }
    closeDialog(selectRows[0]);*/
	var treeObj=$.fn.zTree.getZTreeObj("ztree");
	var node = treeObj.getSelectedNodes();
	if(node==null||node.length==0){
		alertError("请选择一个单位");
		return false;
	}
	if(node[0].venCode==null||node[0].venCode==''){
		alertError("请选择单位");
		return false;
	}
	closeDialog(node[0])
}
