
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initAuthTree();
    initGrid();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                setToolBar(true);
            }
        }, {
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {

                var selectedNodes = $.fn.zTree.getZTreeObj("authTree").getSelectedNodes();
                if (selectedNodes.length == 0) {
                    alertError("请选择用户或角色");
                    return;
                }
                var authType = "";
                var authCode = "";
                if (selectedNodes[0].nodeType == "U") {
                    authType = selectedNodes[0].nodeType,
                    authCode = selectedNodes[0].entity
                } else if (selectedNodes[0].nodeType == "R") {
                    authType = selectedNodes[0].nodeType,
                    authCode = selectedNodes[0].entity
                } else {
                    alertERRor("请选择用户或角色");
                    return;
                }
                
//                var orgAuthList = $("#orgGrid").datagrid("getData").rows;
//                var whAuthList = $("#whGrid").datagrid("getData").rows;
//                var deptAuthList = $("#deptGrid").datagrid("getData").rows;
//                var psnAuthList = $("#psnGrid").datagrid("getData").rows;
//                var invClsAuthList = $("#invClsGrid").datagrid("getData").rows;
//                var invAuthList = $("#invGrid").datagrid("getData").rows;
//                var drugClsAuthList = $("#drugClsGrid").datagrid("getData").rows;
//                var drugAuthList = $("#drugGrid").datagrid("getData").rows;
//                var assetGroupList = $("#assetGroupGrid").datagrid("getData").rows;
//                var assetClsAuthList = $("#assetClsGrid").datagrid("getData").rows;
//                var manageDeptAuthList =  $("#manageDeptGrid").datagrid("getData").rows;
                var roleAuthList =  $("#roleGrid").datagrid("getData").rows;
                ajaxSubmit({
                    url: "saveDataAuth.do",
                    data:{
                        authType:authType,
                        authCode:authCode,
                        authList:JSON.stringify({
//                            orgAuthList:orgAuthList,
//                            whAuthList:whAuthList,
//                            deptAuthList:deptAuthList,
//                            psnAuthList:psnAuthList,
//                            invClsAuthList:invClsAuthList,
//                            invAuthList:invAuthList,
//                            drugClsAuthList:drugClsAuthList,
//                            drugAuthList:drugAuthList,
//                            assetGroupList: assetGroupList,
//                            assetClsAuthList:assetClsAuthList,
//                            manageDeptAuthList:manageDeptAuthList
                            roleAuthList:roleAuthList
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            alertSuccess(result.message);
                            setToolBar(false);
                        }
                    }
                });
            }
        }, {
            id: "undo",
            text: "取消",
            iconCls: "icon-undo",
            handler: function () {
                setToolBar(false);
            }
        }, {
            id: "search",
            text: "定位",
            iconCls: "icon-search",
            handler: function () {
                var selRow = 0;
                openDialog({
                    elementId: "filterBlock",
                    dialogWidth: 300,
                    dialogHeight: 80,
                    dialogCallBack: function () {
                        if ($("#txt_SysUserName").val() != "") {
                            var treeObj = $.fn.zTree.getZTreeObj("authTree");
                            var nodes = treeObj.getNodesByParamFuzzy("NodeName", $("#txt_SysUserName").val(), null);
                            if (nodes.length == 0) {
                                alert("查询无结果");
                                return false;
                            }
                            if (selRow >= nodes.length - 1) {
                                selRow = 0;
                            } else {
                                selRow++;
                            }
                            treeObj.selectNode(nodes[selRow]);
                            return false;
                        } else {
                            alert("请输入查询名称");
                            return false;
                        }
                    }
                });
            }
        }]
    });
//	//组织机构工具栏
//    $("#tbOrg").toolbar({
//        items: [{
//            id: "addOrg",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/org/orgRefer.jsp",
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            if ($("#orgGrid").datagrid("getRowIndex", returnVal.orgCode) == -1) {
//
//                                $('#orgGrid').datagrid('appendRow',{
//                                    dbCode: returnVal.orgCode,
//                                    dbName: returnVal.orgName
//                                });
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delOrg",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#orgGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                    alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#orgGrid').datagrid('deleteRow', $('#orgGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//    //仓库工具栏
//    $("#tbWh").toolbar({
//        items: [{
//            id: "addWh",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/wh/whRefer.jsp",
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            if ($("#whGrid").datagrid("getRowIndex", returnVal.whCode) == -1) {
//
//                                $('#whGrid').datagrid('appendRow',{
//                                    dbCode: returnVal.whCode,
//                                    dbName: returnVal.whName
//                                });
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delWh",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#whGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#whGrid').datagrid('deleteRow', $('#whGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //部门工具栏
//    $("#tbDept").toolbar({
//        items: [{
//            id: "addDept",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/dept/deptRefer.jsp?isChecked=true&chkboxType=s&singleSelect=false",
//                    dialogParams:{
//                        selectEnd: false
//                    },
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            for(var i = 0 ; i < returnVal.length; i++){
//                                if ($("#deptGrid").datagrid("getRowIndex", returnVal[i].deptCode) == -1) {
//                                    $('#deptGrid').datagrid('appendRow',{
//                                        dbCode: returnVal[i].deptCode,
//                                        dbName: returnVal[i].deptName
//                                    });
//                                }
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delDept",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#deptGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#deptGrid').datagrid('deleteRow', $('#deptGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //人员工具栏
//    $("#tbPsn").toolbar({
//        items: [{
//            id: "addPsn",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/person/personRefer.jsp",
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                        	$('#psnGrid').datagrid('appendRow',{
//                                dbCode: returnVal.personCode,
//                                dbName: returnVal.personName
//                            });
//                            /*for(var i = 0 ; i< returnVal.length ; i++){
//                                if ($("#psnGrid").datagrid("getRowIndex", returnVal[i].personCode) == -1) {
//                                    $('#psnGrid').datagrid('appendRow',{
//                                        dbCode: returnVal.personCode,
//                                        dbName: returnVal.personName
//                                    });
//                                }
//                            }*/
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delPsn",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#psnGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#psnGrid').datagrid('deleteRow', $('#psnGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //物资分类工具栏
//    $("#tbInvCls").toolbar({
//        items: [{
//            id: "addInvCls",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/invCls/invClsRefer.jsp?isChecked=false",
//                    dialogParams:{
//                        selectEnd: false
//                    },
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//
//                            $('#invClsGrid').datagrid('appendRow',{
//                                dbCode: returnVal.invClsCode,
//                                dbName: returnVal.invClsName
//                            });
//
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delInvCls",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#invClsGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#invClsGrid').datagrid('deleteRow', $('#invClsGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //物资工具栏
//    $("#tbInv").toolbar({
//        items: [{
//            id: "addInv",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/inv/invRefer.jsp",
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//
//                        	$('#invGrid').datagrid('appendRow',{
//                                dbCode: returnVal.invCode,
//                                dbName: returnVal.invName,
//                                invStd: returnVal.invStd
//                            });
//                            /*for(var i = 0 ; i< returnVal.length ; i++){
//                                if ($("#invGrid").datagrid("getRowIndex", returnVal[i].InvCode) == -1) {
//                                    $('#invGrid').datagrid('appendRow',{
//                                        DbCode: returnVal[i].InvCode,
//                                        DbName: returnVal[i].InvName,
//                                        InvStd: returnVal[i].InvStd
//                                    });
//                                }
//                            }*/
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delInv",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#invGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#invGrid').datagrid('deleteRow', $('#invGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //药品分类工具栏
//    $("#tbDrugCls").toolbar({
//        items: [{
//            id: "addDrugCls",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/drugCls/drugClsRefer.jsp",
//                    dialogParams:{
//                        selectEnd: false
//                    },
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            if ($("#drugClsGrid").datagrid("getRowIndex", returnVal.InvClsCode) == -1) {
//                                $('#drugClsGrid').datagrid('appendRow',{
//                                    dbCode: returnVal.InvClsCode,
//                                    dbName: returnVal.InvClsName
//                                });
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delDrugCls",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#drugClsGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#drugClsGrid').datagrid('deleteRow', $('#drugClsGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//
//    //药品工具栏
//    $("#tbDrug").toolbar({
//        items: [{
//            id: "addDrug",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/drug/drugRefer.jsp",
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            for(var i = 0 ; i< returnVal.length ; i++){
//                                if ($("#drugGrid").datagrid("getRowIndex", returnVal[i].InvCode) == -1) {
//                                    $('#drugGrid').datagrid('appendRow',{
//                                        dbCode: returnVal[i].InvCode,
//                                        dbName: returnVal[i].InvName,
//                                        invStd: returnVal[i].InvStd
//                                    });
//                                }
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delDrug",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#drugGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#drugGrid').datagrid('deleteRow', $('#drugGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//    //资产组工具栏
//    $("#tbAssetGroup").toolbar({
//        items: [{
//            id: "addAssetGroup",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/fa/refer/assetGroup/referAssetGroup.jsp",
//                     dialogParams:{
//                        selectEnd: false
//                    },
//                    dialogCallBack: function (returnVal) {
//                        if (returnVal != null) {
//                                if ($("#assetGroupGrid").datagrid("getRowIndex", returnVal.GroupCode) == -1) {
//                                    $('#assetGroupGrid').datagrid('appendRow', {
//                                        dbCode: returnVal.groupCode,
//                                        dbName: returnVal.groupName
//                                    });
//                                }  
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delAssetGroup",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#assetGroupGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#assetGroupGrid').datagrid('deleteRow', $('#assetGroupGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//    //资产类别
//    $("#tbAssetCls").toolbar({
//        items: [{
//            id: "addAssetCls",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/asset/assetClsRefer.jsp?singleSelect=false",
//                    dialogCallBack: function (returnVal) {
//                        if (returnVal != null) {
//                            for(var i = 0 ; i < returnVal.length; i++){
//                                if ($("#assetClsGrid").datagrid("getRowIndex", returnVal[i].assetClsCode) == -1) {
//                                    $('#assetClsGrid').datagrid('appendRow', {
//                                        dbCode: returnVal[i].assetClsCode,
//                                        dbName: returnVal[i].assetClsName
//                                    });
//                                } 
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delAssetCls",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#assetClsGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#assetClsGrid').datagrid('deleteRow', $('#assetClsGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
//    
//  //管理部门工具栏
//    $("#tbManageDept").toolbar({
//        items: [{
//            id: "addManageDept",
//            text: "添加",
//            iconCls: "icon-add",
//            handler: function () {
//                openDialog({
//                    dialogWidth: 600,
//                    dialogHeight: 400,
//                    url: contextPath + "/pages/common/refer/manageDept/manageDeptRefer.jsp?isChecked=true&chkboxType=s&singleSelect=false",
//                    dialogParams:{
//                        selectEnd: false
//                    },
//                    dialogCallBack: function (returnVal) {
//                        if(returnVal != null){
//                            for(var i = 0 ; i < returnVal.length; i++){
//                                if ($("#manageDeptGrid").datagrid("getRowIndex", returnVal[i].deptCode) == -1) {
//                                    $('#manageDeptGrid').datagrid('appendRow',{
//                                        dbCode: returnVal[i].deptCode,
//                                        dbName: returnVal[i].deptName
//                                    });
//                                }
//                            }
//                        }
//                    }
//                })
//            }
//        }, {
//            id: "delManageDept",
//            text: "删除",
//            iconCls: "icon-remove",
//            handler: function () {
//                var selRows = $('#manageDeptGrid').datagrid("getSelections");
//                if (selRows.length == 0) {
//                	alertError("请选择记录");
//                    return;
//                }
//                for (var i = selRows.length - 1; i >= 0; i--) {
//                    $('#manageDeptGrid').datagrid('deleteRow', $('#manageDeptGrid').datagrid('getRowIndex', selRows[i]));
//                }
//            }
//        }]
//    });
    
    //角色工具栏
    $("#tbRole").toolbar({
        items: [{
            id: "addRole",
            text: "添加",
            iconCls: "icon-add",
            handler: function () {
                openDialog({
                    dialogWidth: 600,
                    dialogHeight: 400,
                    url: contextPath + "/pages/common/refer/role/roleRefer.jsp",
                    dialogCallBack: function (returnVal) {
                        if(returnVal != null){
                        	for(var i = 0 ; i < returnVal.length; i++){
                                if ($("#roleGrid").datagrid("getRowIndex", returnVal[i].sysRoleCode) == -1) {
                                    $('#roleGrid').datagrid('appendRow',{
                                        dbCode: returnVal[i].sysRoleCode,
                                        dbName: returnVal[i].sysRoleName
                                    });
                                }
                            }
                        }
                    }
                })
            }
        }, {
            id: "delRole",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
                var selRows = $('#roleGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alertError("请选择记录");
                    return;
                }
                for (var i = selRows.length - 1; i >= 0; i--) {
                    $('#roleGrid').datagrid('deleteRow', $('#roleGrid').datagrid('getRowIndex', selRows[i]));
                }
            }
        }]
    });
}


//初始化档案树
function initAuthTree() {
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
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeCode",
                pIdKey: "nodeParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                if(treeNode.nodeType=="U"){
                    loadDataAuth(treeNode.nodeType,treeNode.entity);
                    setToolBar(false);
                }else if(treeNode.nodeType=="R"){
                    loadDataAuth(treeNode.nodeType,treeNode.entity);
                    setToolBar(false);
                }
            }
        }
    };
    ajaxSubmit({
        url: "getDataAuthTree.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.authTree;

                $.fn.zTree.init($("#authTree"), setting, dataList);
            } 
        }
    });
    $.fn.zTree.init($("#InvClsList"), setting, []);
}


function initGrid() {
    var gridOptions ={
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        border:false,
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        data: [],
        idField:"dbCode",
        pagination: false,
        rownumbers: false,
        fitColumns: false,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        onLoadSuccess: function (data) {
        }
    }
    //角色列表
    gridOptions.columns=[[
        { field: 'ck', checkbox: true },
        { field: 'dbName', title: '角色名称', align: 'left', halign: 'center', width: 200 }
    ]]
    $("#roleGrid").datagrid(gridOptions);
    
//    //组织机构列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '机构编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '机构名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#orgGrid").datagrid(gridOptions);
//
//    //仓库列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '仓库编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '仓库名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#whGrid").datagrid(gridOptions);
//
//    //部门列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '部门编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '部门名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#deptGrid").datagrid(gridOptions);
//
//    //人员列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '人员编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '人员姓名', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#psnGrid").datagrid(gridOptions);
//
//    //物资分类列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '物资分类编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '物资分类名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#invClsGrid").datagrid(gridOptions);
//
//    //物资列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '物资编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '物资名称', align: 'left', halign: 'center', width: 200 },
//        { field: 'invStd', title: '规格型号', align: 'left', halign: 'center', width: 120 }
//    ]]
//    $("#invGrid").datagrid(gridOptions);
//  //资产类别
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '资产类别编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '资产类别名称', align: 'left', halign: 'center', width: 200 },
//        /*{ field: 'assetClsType', title: '资产类型', align: 'left', halign: 'center', width: 120 }*/
//    ]]
//    $("#assetClsGrid").datagrid(gridOptions);
//
//    //药品分类列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '药品分类编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '药品分类名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#drugClsGrid").datagrid(gridOptions);
//
//    //药品列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '药品编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '药品名称', align: 'left', halign: 'center', width: 200 },
//        { field: 'invStd', title: '规格型号', align: 'left', halign: 'center', width: 120 }
//    ]]
//    $("#drugGrid").datagrid(gridOptions);
//
//    //资产组列表
//    gridOptions.columns = [[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '资产组编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '资产组名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#assetGroupGrid").datagrid(gridOptions);
//    
//    //管理部门列表
//    gridOptions.columns=[[
//        { field: 'ck', checkbox: true },
//        { field: 'dbCode', title: '部门编码', align: 'left', halign: 'center', width: 120 },
//        { field: 'dbName', title: '部门名称', align: 'left', halign: 'center', width: 200 }
//    ]]
//    $("#manageDeptGrid").datagrid(gridOptions);
}

function initPage(){
    setToolBar(false);
}

function setToolBar(editable){
    if(editable){
        $('#tb').toolbar("disabled", 'edit');
        $('#tb').toolbar("enable", 'save');
        $('#tb').toolbar("enable", 'undo');
//        $('#tbWh').toolbar("enable", 'addWh');
//        $('#tbWh').toolbar("enable", 'delWh');
//        $('#tbOrg').toolbar("enable", 'addOrg');
//        $('#tbOrg').toolbar("enable", 'delOrg');
//        $('#tbDept').toolbar("enable", 'addDept');
//        $('#tbDept').toolbar("enable", 'delDept');
//        $('#tbPsn').toolbar("enable", 'addPsn');
//        $('#tbPsn').toolbar("enable", 'delPsn');
//        $('#tbInvCls').toolbar("enable", 'addInvCls');
//        $('#tbInvCls').toolbar("enable", 'delInvCls');
//        $('#tbInv').toolbar("enable", 'addInv');
//        $('#tbInv').toolbar("enable", 'delInv');
//        $('#tbDrugCls').toolbar("enable", 'addDrugCls');
//        $('#tbDrugCls').toolbar("enable", 'delDrugCls');
//        $('#tbDrug').toolbar("enable", 'addDrug');
//        $('#tbDrug').toolbar("enable", 'delDrug');
//        $('#tbAssetGroup').toolbar("enable", 'addAssetGroup');
//        $('#tbAssetGroup').toolbar("enable", 'delAssetGroup');
//        $('#tbAssetCls').toolbar("enable", 'addAssetCls');
//        $('#tbAssetCls').toolbar("enable", 'delAssetCls');
//        $('#tbManageDept').toolbar("enable", 'addManageDept');
//        $('#tbManageDept').toolbar("enable", 'delManageDept');
        $('#tbRole').toolbar("enable", 'addRole');
        $('#tbRole').toolbar("enable", 'delRole');
    }else{
        $('#tb').toolbar("enable", 'edit');
        $('#tb').toolbar("disabled", 'save');
        $('#tb').toolbar("disabled", 'undo');
//        $('#tbWh').toolbar("disabled", 'addWh');
//        $('#tbWh').toolbar("disabled", 'delWh');
//        $('#tbOrg').toolbar("disabled", 'addOrg');
//        $('#tbOrg').toolbar("disabled", 'delOrg');
//        $('#tbDept').toolbar("disabled", 'addDept');
//        $('#tbDept').toolbar("disabled", 'delDept');
//        $('#tbPsn').toolbar("disabled", 'addPsn');
//        $('#tbPsn').toolbar("disabled", 'delPsn');
//        $('#tbInvCls').toolbar("disabled", 'addInvCls');
//        $('#tbInvCls').toolbar("disabled", 'delInvCls');
//        $('#tbInv').toolbar("disabled", 'addInv');
//        $('#tbInv').toolbar("disabled", 'delInv');
//        $('#tbDrugCls').toolbar("disabled", 'addDrugCls');
//        $('#tbDrugCls').toolbar("disabled", 'delDrugCls');
//        $('#tbDrug').toolbar("disabled", 'addDrug');
//        $('#tbDrug').toolbar("disabled", 'delDrug');
//        $('#tbAssetGroup').toolbar("disabled", 'addAssetGroup');
//        $('#tbAssetGroup').toolbar("disabled", 'delAssetGroup');
//        $('#tbAssetCls').toolbar("disabled", 'addAssetCls');
//        $('#tbAssetCls').toolbar("disabled", 'delAssetCls');
//        $('#tbManageDept').toolbar("disabled", 'addManageDept');
//        $('#tbManageDept').toolbar("disabled", 'delManageDept');
        $('#tbRole').toolbar("disabled", 'addRole');
        $('#tbRole').toolbar("disabled", 'delRole');
    }
}

function loadDataAuth(authType, authCode){

    ajaxSubmit({
        url: "getDataAuthList.do",
        data:{
            authType:authType,
            authCode:authCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
//                $('#orgGrid').datagrid('loadData', result.data.orgAuthList);
//                $('#whGrid').datagrid('loadData', result.data.whAuthList);
//                $('#deptGrid').datagrid('loadData', result.data.deptAuthList);
//                $('#psnGrid').datagrid('loadData', result.data.psnAuthList);
//                $('#invClsGrid').datagrid('loadData', result.data.invClsAuthList);
//                $('#invGrid').datagrid('loadData', result.data.invAuthList);
//                $('#assetGroupGrid').datagrid('loadData', result.data.assetGroupList);
//                $('#assetClsGrid').datagrid('loadData', result.data.assetClsAuthList);
//                $("#manageDeptGrid").datagrid('loadData',result.data.manageDeptList);
                
                $('#roleGrid').datagrid('loadData', result.data.roleAuthList);
            }
        }
    });
}