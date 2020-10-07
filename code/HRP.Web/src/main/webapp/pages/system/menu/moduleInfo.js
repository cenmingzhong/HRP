var action = "";
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage(); //初始化模块信息
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                ajaxSubmit({
                    url: contextPath + "/system/menu/saveModule.do",
                    data: {
                    	sysMenu: JSON.stringify($("#infoForm").form2json())
                    },
                    formId: "infoForm",
                    beforeSend: function () {
                        return validateForm("infoForm");
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            parent.alertSuccess(data.message);
                            closeDialog();
                        }
                    }
                });
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

//初始化模块信息
function initPage() {
	var sysMenuCode = getURLParameter("sysMenuCode");

    if (sysMenuCode != null) {
  
        ajaxSubmit({
            url: contextPath + "/system/menu/getMenu.do",
            data: { sysMenuCode: sysMenuCode },
            success: function (result) {
                if (result.isOk == "Y") {
                    $("#infoForm").fill(result.data.menu);
                } else {
                    alert(result.message);
                }
            }
        });
    }
    else {
        action = ACTION_ADD;
    }

}