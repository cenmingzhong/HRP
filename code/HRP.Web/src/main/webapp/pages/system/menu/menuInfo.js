var action = "";
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage(); //初始化菜单信息
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

//初始化菜单信息
function initPage() {
    var sysMenuCode = getURLParameter("sysMenuCode");

    if (sysMenuCode != null) {
        ajaxSubmit({
            url: contextPath + "/system/menu/getMenu.do",
            data: { sysMenuCode: sysMenuCode },
            success: function (result) {
                if (result.isOk == "Y") {
                    $("#infoForm").fill(result.data.menu);
                } 
            }
        });
    } else {
        var sysMenuModule = getURLParameter("sysMenuModule");
        var sysMenuParent = getURLParameter("sysMenuParent");

        if (sysMenuModule != null) {
            $("#hid_sysMenuModule").val(sysMenuModule);
        }
        if (sysMenuParent != null) {
            $("#hid_sysMenuParent").val(sysMenuParent);            
        }
    }
}
function saveClick() {
    ajaxSubmit({
        url: contextPath + "/system/menu/saveMenu.do",
        data: {
        	sysMenu: JSON.stringify($("#infoForm").form2json())
        },
        formId: "infoForm",
        beforeSend: function () {
            return validateForm("infoForm");
        },
        success: function (result) {
            if (result.isOk == "Y") {
                closeDialog(result.data.sysMenuCode,result.message);
            } 
        }
    });
}

