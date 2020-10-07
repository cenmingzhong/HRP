var nodeList = [];
var setting = null;
var singleSelect= true;
//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid();
    initPage();
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
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
            	searchClick();
            }
        },'-',{
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog()
            }
        }]
    });
    
    if(getURLParameter("singleSelect")=="false"){
        singleSelect = false;
    }
}
//初始化table
function initGrid() {
    newJgGrid("dataGrid",{
        showCol:true,
        cellEdit:false,
        multiselect: !singleSelect,
        columns : [
            {code:"deptName",text:"部门名称",width:120, frozen: true},
            {code:"cItemCode",text:"项目编码",width:120, frozen: true},
            {code:"cItemName",text:"项目名称",width:240,frozen: true}
        ],
        ondblClickRow:function(rowId, rowIdx, colIdx){
            var rowData = $("#dataGrid").jqGrid("getRowData",rowId);
            rowData.itemClass=$("#sel_itemClass").val()
            if(singleSelect){
                closeDialog(rowData)
            }else{
                closeDialog([rowData])
            }
        }
    });
    showJgGridCol("dataGrid")
}
function initPage(){
	ajaxSubmit({
		url:contextPath+"/bm/setting/account/getDistItemClassList.do",
		async:false,
		data:{
            accountId: session.accountId,
            accountYear: session.accountYear
        },
        success: function (result) {
            if (result.isOk == "Y") {
                bindDropDown("sel_itemClass", result.data.itemClassList, "itemClassName", "itemClass", false);
                if(!isNullorEmpty(result.data.defaultItemClass)){
                    initDropDown("sel_itemClass", result.data.defaultItemClass)
                }
            }
        }
    });
	initItemSortTree()
	
	$("#sel_itemClass").change(function(){
		$('#dataGrid').jqGrid('loadData', []);
		initItemSortTree()
	});
}
//初始化树
function initItemSortTree() {
    var itemOrganTree;
    setting = {
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
                name: "cItemCname"
            },
            simpleData: {
                enable: true,
                idKey: "cItemCcode",
                pIdKey: "parentNode",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                searchClick()
            }
        }
    };
    ajaxSubmit({
        url:contextPath+"/u8/getU8ItemSortRefer.do",
        data:{
        	filter:JSON.stringify({itemClass:$("#sel_itemClass").val()})
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var itemSortList = result.data.itemSortList;
                
                for(var i = 0 ; i < itemSortList.length; i++){
                    itemSortList[i].cItemCcodeName = "("+itemSortList[i].cItemCcode+")"+ itemSortList[i].cItemCname;
                    if (isNullorEmpty(itemSortList[i].parentNode)) {
                        itemSortList[i].parentNode = "root";
                    }
                }
                //增加一个根目录节点
                itemSortList.push({
                    cItemCcodeName: "项目分类",
                    cItemCname: "项目分类",
                    cItemCcode: "root",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                $.fn.zTree.init($("#zTree"), setting, itemSortList);
            } 
        }
    });
}
function searchClick(){
    var selNodes = $.fn.zTree.getZTreeObj("zTree").getSelectedNodes();
    
    var data = {};
    if(selNodes.length >0 && selNodes[0].cItemCcode != "root"){
        data.itemCcode = selNodes[0].cItemCcode;
    }
    data.itemInfo = $("#txt_itemInfo").val();
    data.itemClass=$("#sel_itemClass").val()
    ajaxSubmit({
        url:contextPath+"/u8/getU8ItemRefer.do",
        data:{
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').jqGrid('loadData', result.data.itemList);
            } 
        }
    });
}

function saveClick() {
    var selRows = $("#dataGrid").jqGrid("getSelection")
    if(selRows==null||selRows.length==0){
        alertError("请选择项目");
        return;
    }
    selRows.itemClass=$("#sel_itemClass").val()
    closeDialog(selRows);
}