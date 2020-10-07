var action = "";
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
var user = null;

// 页面初始化
$(document).ready(function() {
	initToolBar(); // 初始化工具栏

	initPage();
});

// 初始化工具栏
function initToolBar() {
	$("#tb").toolbar({
		items : [ {
			id : "save",
			text : "<b style='font-size:14px'>保存</b>",
			iconCls : "icon-save",
			handler : function() {
				saveClick();
			}
		},{
			id : "exit",
			text : "<b style='font-size:14px'>退出</b>",
			iconCls : "icon-exit",
			handler : function() {
				closeTab();
			}
		} ]
	});
}



function initPage() {

	ajaxSubmit({
		url : contextPath + "/db/dept/getList.do",
		async : false,
		success : function(result) {
			if (result.isOk == "Y") {
				bindDropDown("sel_sysDeptCode", result.data.deptList,
						"deptName", "deptCode", true, "--请选择--");

			}
		}
	});
	ajaxSubmit({
		url : contextPath + "/system/role/getList.do",
		async : false,
		success : function(result) {
			if (result.isOk == "Y") {
				bindDropDown("sel_sysRoleCode", result.data.roleList,
						"sysRoleName", "sysRoleCode", true, "--请选择--");
			}
		}
	});
	initUser();
}
// 初始化信息，进入修改界面时性别显示需要特别处理
function initUser() {
	var loginUser=session.getLoginUser();
	ajaxSubmit({
		url : contextPath + "/system/user/getInfo.do",
		data : {
			sysUserCode : loginUser.sysUserCode
		},
		success : function(result) {
			if (result.isOk == "Y") {
				user = result.data.sysUse;
				if (user.sysUserSex) {
					user.sysUserSex = "1";
				} else {
					user.sysUserSex = "0";
				}
				$("#infoForm").fill(user);
			}
		}
	});
}
// 保存用户
function saveClick() {
	var data = $("#infoForm").form2json();

	if (user != null) {
		data = $.extend(user,data);
	}
	var sex=null;
	if (data.sysUserSex == "0") {
		sex = false;
	} else {
		sex = true;
	}

	var sysDeptName = $("#sel_sysDeptCode").find("option:selected").text();
	var loginUser=session.getLoginUser().sysUserAccount;

	//data.userProjList = projList;
	data = $.extend(data, {sysUserSex:sex,sysDeptName:sysDeptName});
	data.isUpdate = true;
	data.editor=loginUser;
	data.edit_Time = new Date();
	ajaxSubmit({
		url : contextPath + "/system/user/save.do",
		data : {
			sysUser : JSON.stringify(data)
		},
		formId : "infoForm",
		success : function(data) {
			if (data.isOk == "Y") {
				alertSuccess(data.message);
				closeDialog();
			}
		}
	});
}