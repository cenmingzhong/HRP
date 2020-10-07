//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();
    loadGrid();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "forceCloseAccount",
            text: "强制关账",
            iconCls: "icon-close",
            handler: function () {
            	confirmMsg("确认强行关账？", function() {
            		closeDialog(true);
            	}, function() {
            		closeDialog();
            	})
            }
        },{
            id: "cancel",
            text: "取消",
            iconCls: "icon-close",
            handler: function () {
               closeDialog();
            }
        }]
    });
}

function initGrid(){ 
    var datagrid; //定义全局变量datagrid
    datagrid = $("#dataGrid").datagrid({
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
            { field: 'ck', checkbox: true },
            { field: 'sysDeptName', title: '部门名称', align: 'left', halign: 'center', width: 120 },
            { field: 'sysUserName', title: '员工姓名', align: 'left', halign: 'center', width: 160 },
            { field: 'sysUserAccount', title: '登录账户', align: 'left', halign: 'center', width: 100 },

            { field: 'sysUserCode', title: '员工编号', align: 'left', halign: 'center', width: 120 },

            { field: 'sysUserPhone', title: '联系电话', align: 'left', halign: 'center', width: 120 },
            { field: 'sysUserEmail', title: '邮箱', align: 'left', halign: 'center', width: 120 },
        ]],
        rownumbers: true,
        fitColumns: false,
        rowStyler: function(index,row){
            if (row.isAdmin==true){
                return 'color:red'; // return inline style
            }
        },
        onLoadSuccess: function (data) {

        }
    });
    
}

function loadGrid() {
	ajaxSubmit({
        url: "checkAccountStatus.do",
        data : {yearMonth : getURLParameter("yearMonth")},
        success: function (result) {
            if (result.isOk == "Y") {
           	 var sysUserList = result.data.sysUserList;
                if(sysUserList && sysUserList.length > 0){
                	$("#dataGrid").datagrid('loadData', sysUserList);
                }
            }
        }
    })
	
}