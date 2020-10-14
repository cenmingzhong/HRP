//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    // initPage();
    loadGrid();
    loadData();
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
                var selectRow = $('#sysUserGrid').datagrid('getSelected');
                if (selectRow == null || selectRow.teachrNumber == "") {
                    alertError("请选择一个用户!");
                    return;
                }
                openDialog({
                    url: "toInfo.do?teacherNumber=" + selectRow.teacherNumer,
                    dialogHeight: 520,
                    dialogWidth: 950,
                    dialogCallBack: function () {
                        loadData();
                    }
                });
            }
        },{
            id: "delete",
            text: "<b style='font-size:14px'>删除</b>",
            iconCls: "icon-delete",
            handler: function () {
                var selectRow = $('#sysUserGrid').datagrid('getSelected');
                if (selectRow == null || selectRow.teacherNumber == "") {
                    alertError("请选择一个用户!");
                    return;
                }
                confirmMsg("是否确认删除该用户?",function() {
                    ajaxSubmit({
                        url:contextPath+"/db/passwordManager/delete.do",
                        data: { teacherNumber: selectRow.teacherNumber },
                        success: function (data) {
                            if (data.isOk == "Y") {
                                alertSuccess(data.message);
                                loadData();
                            }
                        }
                    })
                },function(){})
            }
        },'-', {
            id: "searh",
            text: "<b style='font-size:14px'>查询</b>",
            iconCls: "icon-search",
            handler: function () {
                searchClick();
            }
        },{
            id: "refresh",
            text: "<b style='font-size:14px'>刷新</b>",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        }]
    });
}

function addClick(){
    openDialog({
        url: "toInfo.do",
        dialogHeight: 520,
        dialogWidth: 950,
        dialogCallBack: function () {
            loadData();
        }
    });
}

function initPage(){
    ajaxSubmit({
        url: contextPath + "/db/dept/getList.do",
        success: function (result) {
            if(result.isOk=="Y"){
                bindDropDown("sel_sysDeptCode", result.data.deptList,"deptName","deptCode", true,"--请选择--");

            }
        }
    });
}

function loadGrid(){
    var datagrid; //定义全局变量datagrid
    datagrid = $("#sysUserGrid").datagrid({
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
        columns: [[
            { field: 'operate', title: '<b style="font-size:14px">操作</b>', align: 'left', halign: 'center', width: 100,formatter:formatOper },
            { field: 'teacherNumber', title: '<b style="font-size:14px">教师编号</b>', align: 'left', halign: 'center', width: 100, width: 100 },
            { field: 'teacherName', title: '<b style="font-size:14px">用户姓名</b>', align: 'left', halign: 'center', width: 160 },
            { field: 'teacherAccount', title: '<b style="font-size:14px">用户账户</b>', align: 'left', halign: 'center', width: 100 },
            { field: 'teacherPassword', title: '<b style="font-size:14px">用户密码</b>', align: 'left', halign: 'center', width: 100 },
            { field: 'createTime', title: '<b style="font-size:14px">创建时间</b>', align: 'left', halign: 'center', width: 120 }
        ]],
        pagination: true,
        rownumbers: true,
        pageList: [50, 100, 150, 200],
        pageSize: 100,
        fitColumns: false,
        singleSelect: true,
        rowStyler: function(index,row){
            return 'font-weight: bold;font-size:16px';
        },
        onLoadSuccess: function (data) {

        }
    });
}
function formatOper(val, row, index) {
    var str = "";
    if(isHideList!=null&&isHideList.length>0){
        if($.inArray("edit",isHideList)<0){
            str = str+'&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="editrow(\'' + index
                + '\')"><img src="'+contextPath+'/images/edit.png"/></a>&nbsp;';
        }
        if($.inArray("delete",isHideList)<0){
            str = str+'&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="delerow(\'' + index
                + '\')"><img src="'+contextPath+'/images/delete.png"/></a>&nbsp;';
        }
    }else{
        str = '&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="editrow(\'' + index
            + '\')"><img src="'+contextPath+'/images/edit.png"/></a>&nbsp;'
            + '&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" onclick="delerow(\'' + index
            + '\')"><img src="'+contextPath+'/images/delete.png"/></a>&nbsp;';
    }
    return str;
}
function editrow(index){
    var data= $('#sysUserGrid').datagrid('getData');
    var selectRow=data.rows[index];

    openDialog({
        url: "toInfo.do?teacherNumber=" + selectRow.teacherNumber,
        dialogHeight: 520,
        dialogWidth: 950,
        dialogCallBack: function () {
            loadData();
        }
    });
}
function delerow(index){
    confirmMsg("是否确认删除该用户?",function() {
        var data= $('#sysUserGrid').datagrid('getData');
        var selectRow=data.rows[index];
        ajaxSubmit({
            url:contextPath+"/db/passwordManager/delete.do",
            data: { teacherNumber: selectRow.teacherNumber },
            success: function (data) {
                if (data.isOk == "Y") {
                    alertSuccess(data.message);
                    loadData();
                }
            }
        })
    },function(){})
}
function loadData(){
    ajaxSubmit({
        url:contextPath+"/db/passwordManager/getList.do",
        data: {
            filter: JSON.stringify($("#infoForm").form2json())
        },
        success: function (result) {
            if (result.isOk=='Y') {
                $('#sysUserGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.passwordList);
            }
        }
    });
}
function searchClick(){
    var dialog = openDialog({
        dialogWidth: 500,
        dialogTitle:"查询条件",
        dialogHeight: 240,
        elementId: "filterBlock",
        dialogCallBack: function () {
            loadData();
        }
    });
    dialog.addButton("reset","重 置",function(){
        resetForm("infoForm");
    });
}
