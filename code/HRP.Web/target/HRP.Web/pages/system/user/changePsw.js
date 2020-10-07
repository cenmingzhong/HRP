var tip = null;
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "<b style='font-size:14px'>确定</b>",
            iconCls: "icon-save",
            handler: function () {
                ajaxSubmit({
                    url: contextPath + "/system/user/changePsw.do",
                    data: {
                        oldPsw : $("#txt_oldPsw").val(),
                        newPsw : $("#txt_newPsw").val()
                    },
                    formId: "infoForm",
                    beforeSend: function () {
                        var flag = validateForm("infoForm");
                        return flag;
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            parent.alertSuccess("修改成功");
                            closeDialog();
                        } 
                    }
                });
            }
        }, {
			id : "exit",
			text : "<b style='font-size:14px'>退出</b>",
			iconCls : "icon-exit",
			handler : function() {
				if(tip!=null){
					closeDialog();
				}else{
					closeTab();
				}
			}
		} ]
    });
}
function initPage(){
	window.setTimeout(function(){
		tip = getDialogParams();
	},100);
}