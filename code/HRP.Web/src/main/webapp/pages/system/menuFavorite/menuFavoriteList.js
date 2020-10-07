//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initMenuTree();
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
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

function initGrid(){
    $("#dataGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        idField:"sysMenuCode",
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'sysMenu.sysMenuName', title: '功能名称', align: 'left', halign: 'center', width: 160 }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: true,
        fitColumns: true,
        onLoadSuccess: function (data) {
            
        }
    });
}

//初始化菜单树
function initMenuTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: true
        },
        data: {
            key: {
                name: "sysMenuName"
            },
            simpleData: {
                enable: true,
                idKey: "sysMenuCode",
                pIdKey: "sysMenuParent",
                rootPId: ""
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/menu/getCurMenuTree.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var menuList = result.data.menuTree;
                $.fn.zTree.init($("#menuTree"), setting, menuList);
            }
        }
    });

}
function initPage(){
    $("#btn_addOften").bind("click",function(){
        var treeObj = $.fn.zTree.getZTreeObj("menuTree");
        var selNodes = treeObj.getCheckedNodes(true);
        
        var rows = $.extend([],$("#dataGrid").datagrid("getData").rows,true);;
        for(var i = 0 ; i < selNodes.length; i++){
            if ($("#dataGrid").datagrid("getRowIndex", selNodes[i].sysMenuCode) == -1 && !selNodes[i].isParent) {
                rows.push({
                	sysMenuCode: selNodes[i].sysMenuCode,
                	sysMenu:{
                        sysMenuCode: selNodes[i].sysMenuCode,
                        sysMenuName: selNodes[i].sysMenuName
                    },
                    iconUrl:selNodes[i].sysMenuIcon
                });
            }
        }
        if(rows.length>20){
            alertError("常用菜单最多可以设置20个");
            return;
        }
        $('#dataGrid').datagrid('loadData', rows);
    });
    $("#btn_delOften").bind("click",function(){
        var selRows = $("#dataGrid").datagrid("getSelections");
        if (selRows.length==0) {
            alertError("请选择需要去除的功能");
            return;
        }
        for(var i = selRows.length-1 ; i >=0; i--){
            $('#dataGrid').datagrid('deleteRow', $('#dataGrid').datagrid('getRowIndex', selRows[i]));
        }
        
    });
    
    $("#btn_upOften").bind("click",function(){
        var selRow = $("#dataGrid").datagrid("getSelected");
        if (selRow == null) {
            alert("请选择需要上移的行");
            return;
        }
        var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);
        var rows =  $("#dataGrid").datagrid("getRows");
        if (rowIndex == 0) {
            return;
        }
        var tempObj = rows[rowIndex - 1];
        rows[rowIndex - 1] = rows[rowIndex];
        rows[rowIndex] = tempObj;
        $("#dataGrid").datagrid("loadData", rows);
        $("#dataGrid").datagrid("selectRow", rowIndex - 1);
    });
    
    $("#btn_downOften").bind("click",function(){
        var selRow = $("#dataGrid").datagrid("getSelected");
        if (selRow == null) {
            alert("请选择需要下移的行");
            return;
        }
        var rows =  $("#dataGrid").datagrid("getRows");
        var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);

        if (rowIndex == rows.length - 1) {
            return;
        }

        var tempObj = rows[rowIndex + 1];
        rows[rowIndex + 1] = rows[rowIndex];
        rows[rowIndex] = tempObj;
        
        $("#dataGrid").datagrid("loadData", rows);
        $("#dataGrid").datagrid("selectRow", rowIndex + 1);
    });
    loadData();
}

function loadData(){
    ajaxSubmit({
        url: "getMenuFavoriteList.do",
        success: function (result) {
            if(result.isOk=='Y'){
                var favoriteList = result.data.favoriteList;
                for(var i = 0 ; i< favoriteList.length;i++){
                    favoriteList[i].sysMenuCode = favoriteList[i].sysMenu.sysMenuCode;
                }
                $('#dataGrid').datagrid('loadData', favoriteList);
            }
            
        }
    });
}

function saveClick(){

    ajaxSubmit({
        url: "save.do",
        data:{
            menuFavoriteList:JSON.stringify($("#dataGrid").datagrid("getRows"))
        },
        success:function(result){
            if(result.isOk=="Y"){
                closeDialog(true);
            }
        }
    })
}
