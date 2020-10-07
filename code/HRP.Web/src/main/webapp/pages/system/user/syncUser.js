var isEdit = false;
var account = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid();
    initTree();
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
                saveSetting();
            }
        },'-', {
            id: "searh",
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
                closeDialog(false);
            }
        }]
    });
}
function initGrid() {
    newJgGrid("dataGrid",{
        showCol:true,
        footerrow:false,
        multiselect:true,
        rowNum:200,
        columns : [
            {code:"cPsnNum",text:"员工编码",width:100},
            {code:"cPsnName",text:"员工姓名",width:120},
            {code:"cDepName",text:"所属部门",width:180},
            {code:"cPsnTypeName",text:"员工类别",width:80}
        ]
    });
}

//初始化树
function initTree() {

    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        data: {
            key: {
                name: "cDepName"
            },
            simpleData: {
                enable: true,
                idKey: "cDepCode",
                pIdKey: "parentNode",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                if (treeNode != null) {
                    loadData();
                }
            }
        }
    };
    ajaxSubmit({
        url:contextPath+"/u8/getU8DeptRefer.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $.fn.zTree.init($("#deptTree"), setting, result.data.deptList);
            }
        }
    });
}
function initRole(){
    ajaxSubmit({
        url:contextPath+"/system/role/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                bindDropDown("sel_role", result.data.roleList, "sysRoleName", "sysRoleCode", true);
            }
        }
    });
}
function initPage(){
    initRole();
    loadData(); 
}
function loadData() {
    var data = $("#infoForm").form2json();
    
    var ztreeObj = $.fn.zTree.getZTreeObj("deptTree");
    if(ztreeObj != null){
        var selectedNode = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
        if (selectedNode.length != 0 ) {
            data.deptCodeLike = selectedNode[0].cDepCode
        }
    }
    
    ajaxSubmit({
        url: contextPath + "/u8/getU8PsnForRefer.do",
        data: {
            filter:JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $("#dataGrid").jqGrid("loadData", result.data.psnList);
            } 
        }
    });
}
function saveSetting() {
    var selIds = $('#dataGrid').jqGrid("getSelectedIds");
    if(selIds.length<=0){
        alertError("请选择用户");
        return false;
    }
    
    var selRows = [];
    for(var i=0;i<selIds.length;i++){
        var rowData = $("#dataGrid").jqGrid("getRowData", selIds[i],true);
        selRows.push(rowData);
    }
    $("#sel_role").val("");
    
    openDialog({
        elementId:"roleBlock",
        dialogHeight:60,
        dialogWidth:350,
        dialogCallBack:function(){
            var roleCode = $("#sel_role").val();
            if(isNullorEmpty(roleCode)){
                alertError("请选择角色");
                return false;
            }
            
            ajaxSubmit({
                url:contextPath+"/system/user/syncUser.do",
                data:{
                    userList: JSON.stringify(selRows),
                    roleCode: roleCode
                },
                success: function (result) {
                    if (result.isOk == "Y") {
                        closeDialog(true);
                    }
                }
            });
            return false;
        }
    })

}

function initDept(){
    ajaxSubmit({
        url:contextPath+"/u8/getU8Department.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var departmentList = result.data.departmentList;
                bindDropDown("sel_deptCode", departmentList, "cDepName", "cDepCode", true);
            }
        }
    });
    
}


function searchClick(){
    loadData();
}
