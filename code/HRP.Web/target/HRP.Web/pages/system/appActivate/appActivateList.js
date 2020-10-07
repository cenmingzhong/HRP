//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "activate",
            text: "启用",
            iconCls: "icon-add",
            handler: function () {
                activateClick();
            }
        }, {
            id: "activate",
            text: "弃用",
            iconCls: "icon-remove",
            handler: function () {
                unActivateClick();
            }
        },{
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
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
        singleSelect: true,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'appKey', title: '模块编码', align: 'left', halign: 'center', width: 100 },
            { field: 'appName', title: '模块名称', align: 'left', halign: 'center', width: 100 },
            { field: 'isActivate', title: '是否启用', align: 'left', halign: 'center', width: 100,
                formatter:function(value, rowData, rowIndex){
                    if(value){
                        return "启用"
                    }
                    return""
                }
            },
            { field: 'activatePeriod', title: '启用期间', align: 'left', halign: 'center', width: 100 }
        ]],
        pagination: true,
        pageSize: 20,
        rownumbers: false,
        fitColumns: false,
        onLoadSuccess: function (data) {

        }
    });
}

function initPage(){
    loadData();
}

function loadData(){
    ajaxSubmit({
        url: "getAppList.do",
        success: function (result) {
            if(result.isOk=='Y'){
                $('#dataGrid').datagrid('loadData', result.data.appList);
            }
            
        }
    });
}

function activateClick(){
    var selRows = $("#dataGrid").datagrid("getSelections");
    if(selRows.length !=1){
        alertError("请选择一条记录");
        return
    }

    if(selRows[0].isActivate){
        alertError("当前模块已启用");
        return;
    }

    openDialog({
        url: contextPath+"/system/accountPeriod/toAccountPeriodRefer.do",
        dialogCallBack:function(returnVal){
            if(returnVal != null){
                ajaxSubmit({
                    url: "activateApp.do",
                    data:{
                        appKey:selRows[0].appKey,
                        yearMonth:returnVal.yearMonth
                    },
                    success: function (result) {
                        if(result.isOk=="Y"){
                            alertSuccess(result.message);
                            loadData();
                        }
                    }
                });
            }
        }
    })
}

function unActivateClick(){
    var selRows = $("#dataGrid").datagrid("getSelections");
    if(selRows.length !=1){
        alertError("请选择一条记录");
        return
    }

    if(!selRows[0].isActivate){
        alertError("当前模块未启用");
        return;
    }
    
    confirmMsg("确定要弃用当前模块吗？",function(){
        ajaxSubmit({
            url: "unActivateApp.do",
            data:{
                appKey:selRows[0].appKey
            },
            success: function (result) {
                if(result.isOk=="Y"){
                    alertSuccess(result.message);
                    loadData();
                }
            }
        });
    })

}