//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏

});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "backup",
            text: "<b style='font-size:14px'>备份</b>",
            iconCls: "icon-add",
            handler: function () {
                backupClick();
            }
        },{
            id: "recovery",
            text: "<b style='font-size:14px'>还原</b>",
            iconCls: "icon-add",
            handler: function () {
                recoveryClick();
            }
        }]
    });
}

/**
 * 备份
 */
function backupClick(){
    ajaxSubmit({
        url: contextPath + "/common/tools/DataBaseBackupAndRecovery/backup",
        success: function () {

                alertSuccess("备份成功");


        }
    })
}

/**
 * 还原
 */
function recoveryClick(){
    ajaxSubmit({
        url: contextPath + "/common/tools/DataBaseBackupAndRecovery/recovery",
        success: function () {

            alertSuccess("还原成功");


        }
    })
}
