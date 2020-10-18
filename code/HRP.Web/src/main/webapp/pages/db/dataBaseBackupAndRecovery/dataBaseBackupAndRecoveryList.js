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
    debugger
    ajaxSubmit({
        url: contextPath + "/db/dataBaseUtil/backup.do",
        success: function () {

                debugger
                // alertSuccess(res.result.message[1]);
            alertSuccess("备份成功");



        }
    })
}

/**
 * 还原
 */
function recoveryClick(){
    ajaxSubmit({
        url: contextPath + "/db/dataBaseUtil/recovery.do",
        success: function () {

            alertSuccess("还原成功");


        }
    })
}
