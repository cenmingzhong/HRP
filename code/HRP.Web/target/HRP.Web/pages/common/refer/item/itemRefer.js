var selectedNode = null;
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    
    initGrid()
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
                var selRows = $("#dataGrid").datagrid("getSelections");
                if(selRows.length ==0){
                    alert("请选择项目");
                    return;
                }
                closeDialog(selRows[0]);
            }
        }, {
            id: "quit",
            text: "关闭",
            iconCls: "icon-edit",
            handler: function () {
                closeDialog();
            }
        }, '-', {
            id: "colSet",
            text: "栏目",
            iconCls: "icon-colSet",
            handler: function () {
                setDataGridCol("dataGrid")
            }
        }]
    });
}

function initPage(){
    loadItemTypeList();
    $("#sel_itemType").bind("change",function(){
        loadItemClassList();
        loadItemList();
    });
    
    $("#btn_search").bind("click",function(){
        loadItemList();
    });
}

function loadItemTypeList(){
    ajaxSubmit({
        url:contextPath+"/db/itemClass/getItemTypeList.do",
        success:function(result){
            if(result.isOk=="Y"){
                bindDropDown("sel_itemType",result.data.itemTypeList, "itemTypeName","itemTypeCode", false);
                loadItemClassList();
                loadItemList();
            }
        }
    })
}
function loadItemList(){
    var filter = {
        itemTypeId:$("#sel_itemType").val(),
        itemInfo:$("#txt_itemInfo").val()
    }
    var treeObj = $.fn.zTree.getZTreeObj("itemClassTree");
    
    if(treeObj != null && treeObj.getSelectedNodes().length>0){
        if(treeObj.getSelectedNodes()[0].id != "root"){
            filter.itemClsCode = treeObj.getSelectedNodes()[0].itemClsCode
        }
        
    }
    ajaxSubmit({
        url:contextPath+"/db/item/getItemList.do",
        data:{
            filter:JSON.stringify(filter)
        },
        success:function(result){
            if(result.isOk=="Y"){
                $("#dataGrid").datagrid({ loadFilter: pagerFilter }).datagrid("loadData",result.data.itemList)
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
        data: {
            key: {
                name: "itemClsCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "itemClsParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                loadItemList()
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
                //增加一个根目录节点
                itemClsList.push({
                    itemClsCodeName: "项目分类树",
                    itemClsName: "项目分类树",
                    id: "root",
                    itemClsParent:"",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                $.fn.zTree.init($("#itemClassTree"), setting, itemClsList);
            } 
        }
    });

}

//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        border:false,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'itemCode', title: '项目编码', width: 100 },
            { field: 'itemName', title: '项目名称', width: 320 }
        ]],
        onClickRow: function (rowIndex, rowdata) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData)
        },
        onLoadSuccess: function (data) {
            
        }
    });
    showDataGridCol("dataGrid")
}