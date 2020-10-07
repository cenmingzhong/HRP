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
            id: "add",
            text: "<b style='font-size:14px'>添加</b>",
            iconCls: "icon-add",
            handler: function () {
                addClick();
            }
        }, {
            id: "edit",
            text: "<b style='font-size:14px'>修改</b>",
            iconCls: "icon-edit",
            handler: function () {
                editClick();
            }
        },{
            id: "delete",
            text: "<b style='font-size:14px'>删除</b>",
            iconCls: "icon-delete",
            handler: function () {
                deleteClick();
            }
        },'-',{
            id: "search",
            text: "<b style='font-size:14px'>查询</b>",
            iconCls: "icon-search",
            handler: function () {
                 openDialog({
                     dialogWidth: 300,
                     dialogHeight: 100,
                     elementId: "filterBlock",
                     dialogCallBack: function () {
                        // loadData();
                        ajaxSubmit({
                            url:contextPath+"/system/role/getList.do",
                            data:{
                                filter:JSON.stringify({sysRoleName:$("#txt_SysRoleName").val()})
                            },
                            success:function(result){
                                if(result.isOk=='Y'){
                                    var dataList = [];
                                    dataList = result.data.roleList;
                    
                                    $("#dataBlock").jqGrid('clearGridData')
                                    $("#dataBlock").jqGrid('loadData',dataList)
                                }
                            }
                        })
                     }
                 })
            }
        },{
            id: "reload",
            text: "<b style='font-size:14px'>刷新</b>",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        }]
    });
}

function initGrid(){ 
    var datagrid; //定义全局变量datagrid
    datagrid = newJgGrid("dataBlock",{
        showCol:true,
        cellEdit:false,
        multiselect:false,
        rowNum:50,
        columns : [
            {code:"sysRoleCode",text:'<b style="font-size:14px">角色编码</b>',width:150},
            {code:"sysRoleName",text:'<b style="font-size:14px">角色名称</b>',width:150},
            {code:"sysRoleDesc",text:'<b style="font-size:14px">角色描述</b>',width:150}
        ],
        rowattr:function(row, rowData, rowId){
            return {"style":"font-weight: bold;font-size:14px"};
        }
    });

    newJgGrid("userGrid",{
        showCol:true,
        cellEdit:false,
        multiselect:false,
        rowNum:50,
        columns : [
            {code:"sysUserAccount",text:"<b style='font-size:14px'>登录账号</b>",width:100},
            {code:"sysUserName",text:"<b style='font-size:14px'>用户姓名</b>",width:150},
            {code:"deptName",text:"<b style='font-size:14px'>所属部门</b>",width:180}
        ]
    });
}

function initPage(){
    loadData();
}

function addClick(){
	openTab({
    	url: "toInfo.do",
    	tabCallBack:function(){
            loadData();
        }
    });
}

function editClick(){
	var rowid=$("#dataBlock").jqGrid("getGridParam","selrow");
    if(rowid==null ){
        alertError("请选择一行记录");
        return;
    }
	var selRows=jQuery("#dataBlock").jqGrid("getRowData",rowid);
    openTab({
    	url: "toInfo.do?sysRoleCode="+selRows.sysRoleCode,
    	tabCallBack:function(){
            loadData();
        }
    });
}

function deleteClick(){
	var rowid=$("#dataBlock").jqGrid("getGridParam","selrow");
    if(rowid==null ){
        alertError("请选择一行记录");
        return;
    }
	var selRow=jQuery("#dataBlock").jqGrid("getRowData",rowid);
    var delRoleFun = function(){
        ajaxSubmit({
            url:contextPath+"/system/role/delete.do",
            data:{
                sysRoleCode: selRow.sysRoleCode 
            },
            success:function(result){
                if(result.isOk=='Y'){
                    alertSuccess(result.message);
                    loadData();
                }
            }
        });
    }
    
    ajaxSubmit({
        url:contextPath+"/system/user/getList.do",
        data:{
            filters: JSON.stringify({sysRoleCode: selRow.sysRoleCode})
        },
        success:function(result){
            if(result.isOk=='Y'){
                var userList = result.data.userList;
                if(userList.length >0){
                    openDialog({
                        elementId: "userBlock",
                        dialogTitle: "以下用户拥有该角色，是否确定要删除？",
                        dialogWidth: 600,
                        dialogHeight: 500,
                        dialogCallBack: function () {
                            delRoleFun();
                        }
                    });
                    $("#userGrid").jqGrid("loadData", userList)
                }else{
                    confirmMsg("确定要删除该角色吗？", function(){
                        delRoleFun();
                    });
                }
            }
        }
    });
}

function loadData(){
    ajaxSubmit({
        url:contextPath+"/system/role/getList.do",
        data: {
            filters: JSON.stringify($("#infoForm").form2json())
        },
        success:function(result){
            if(result.isOk=='Y'){
                var dataList = [];
                dataList = result.data.roleList;
                $("#dataBlock").jqGrid("loadData", dataList)
                //$('#dataBlock').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', dataList);
            }
        }
    })
}
function jurisdictionSetting() {
     
    var selRows = $('#dataBlock').datagrid('getSelected');
    if(selRows==null ){
        alertError("请选择一行记录");
        return;
    }
    openDialog({
        url: "getJurisdiction.do?sysRoleCode=" + selRows.sysRoleCode,
        dialogWidth: 500,
        dialogHeight: 400
    });
}