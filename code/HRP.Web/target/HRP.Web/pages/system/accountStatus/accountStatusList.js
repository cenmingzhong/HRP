//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage();
    initGrid();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "openAccount",
            text: "<b style='font-size:14px'>开账</b>",
            iconCls: "icon-viewDetail",
            handler: function () {
               openAccountToCom();
            }
        },{
            id: "closeAccount",
            text: "<b style='font-size:14px'>关账</b>",
            iconCls: "icon-viewDetail",
            handler: function () {
               closeAccount();
            }
        }]
    });
}
function initPage(){
	var date = new Date();
	var month = date.getMonth()+1;
	month = month < 10?("0"+month):month;
    $("#txt_date").val(date.getFullYear()+"-"+month);
    loadGrid();
    $("#sel_isUpload").bind("change",function(){
    	loadGrid();
    })
}

function closeAccount() {
	 if ($("#txt_date").val().trim() == '') {
		 alertError("请选择关账的日期！");
		 return;
	 }
	 ajaxSubmit({
         url: "checkAccountStatus.do",
         data : {yearMonth : $("#txt_date").val()},
         success: function (result) {
             if (result.isOk == "Y") {
            	 var sysUserList = result.data.sysUserList;
                 if(sysUserList && sysUserList.length > 0){
                	 confirmMsg("有未上传的用户是否确认强行关账？", function() {
                		 updateAccountStatus();
                 	})
                 } else {
                	 updateAccountStatus();
                 }
             }
         }
     })
}

function updateAccountStatus() {
	ajaxSubmit({
        url: "closeAccount.do",
        data : {yearMonth : $("#txt_date").val()},
        success: function (result) {
            if (result.isOk == "Y") {
           	 	alertSuccess("关账成功！");
           	 	loadGrid();
            }
        }
    })
}

function openAccount() {
	ajaxSubmit({
		url: "openAccount.do",
        data : {
        	yearMonth : $("#txt_date").val(),
        	password : $("#txt_password").val()
        },
        success: function (result) {
            if (result.isOk == "Y") {
           	 	alertSuccess("重新开账成功！");
           	 	loadGrid();
            }
        }
	});
	$("#txt_password").val('');
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
        	return 'font-weight: bold;font-size:14px'; // return inline style
        },
        onLoadSuccess: function (data) {

        }
    });
    
}

function loadGrid() {
	ajaxSubmit({
        url: "checkAccountStatus.do",
        data : {yearMonth : $("#txt_date").val()},
        success: function (result) {
            if (result.isOk == "Y") {
            	if(result.data.isAccountClose){
            		$('#tb').toolbar("updateStatus");
            		check(false)

            		$("#dataGrid").datagrid('loadData', []);
            		return;
            	}else{
            		check(true)
            	}
            	var sysUserList = [];
            	if($("#sel_isUpload").val()=='true'){
            		sysUserList = result.data.inSysUserList;
            	}else{
            		sysUserList = result.data.sysUserList;
            	}
            	$("#dataGrid").datagrid('loadData', sysUserList);
            }
        }
    })
	
}
function check(flag){
	if(flag){
		if($.inArray("openAccount",isHideList)){
			$("#openAccount").hide();
		}
		if($.inArray("closeAccount",isHideList)){
			$("#closeAccount").show();
		}
	}else{
		if($.inArray("openAccount",isHideList)){
			$("#openAccount").show();
		}
		if($.inArray("closeAccount",isHideList)){
			$("#closeAccount").hide();
		}
	}
}

function openAccountToCom(){
	 openDialog({
	   	elementId : "passwordConfirm",
        dialogWidth : 300,
        dialogHeight : 60,
        dialogTitle : "消息提示",
        dialogCallBack:function(){
           openAccount();
        }
    });
}