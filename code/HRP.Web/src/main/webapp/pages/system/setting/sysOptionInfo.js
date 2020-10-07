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
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                if (!validateForm("sysForm")) {
                    return false;
                }
                var data = $("#sysForm").form2json();
                var $chks = $("#sysForm").find(":checkbox:not(:checked)");//取得所有未选中的checkbox  

                if ($chks.length >= 0) {
                    $chks.each(function () {
                        var chkName = $(this).attr("name");

                        if (data[chkName] == null) {
                            data[chkName] = ""
                        }
                    });
                }
                $.extend(data, $("#vouchForm").form2json());
                $chks = $("#vouchForm").find(":checkbox:not(:checked)");    //取得所有未选中的checkbox
                if ($chks.length >= 0) {
                    $chks.each(function () {
                        var chkName = $(this).attr("name");

                        if (data[chkName] == null) {
                            data[chkName] = ""
                        }
                    });
                }

                ajaxSubmit({
                    url: contextPath + "/system/property/save.do",
                    data: {
                        sysPropList: JSON.stringify(data),
                        appKey: "SYS"
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            alertSuccess(result.Message);
                            setToolBar("view");
                            disabledForm("sysForm");
                        }
                    }
                });
            }
        }, {
            id: "edit",
            text: "编辑",
            iconCls: "icon-edit",
            handler: function () {
                setToolBar("edit");
                enableForm("sysForm");
                enableForm("vouchForm");
            }
        }, {
            id: "cancel",
            text: "取消",
            iconCls: "icon-cancel",
            handler: function () {
                setToolBar("view");
                disabledForm("sysForm");
                disabledForm("vouchForm");
            }
        }]
    });
}

function initPage() {
    setToolBar("view");
    disabledForm("sysForm");
    disabledForm("vouchForm");
    initFieldEvent();
    loadData();
}

function setToolBar(status) {
    if (status == "view") {
        $('#tb').toolbar("disabled", 'save');
        $('#tb').toolbar("enable", 'edit');
        $('#tb').toolbar("disabled", 'cancel');
    } else if (status == "edit") {
        $('#tb').toolbar("enable", 'save');
        $('#tb').toolbar("disabled", 'edit');
        $('#tb').toolbar("enable", 'cancel');        
    }
}
function initFieldEvent() {
    $("#btn_uploadLoginBg").bind("click", function () {
        uploadFile({
            action: contextPath + "/upload.do",
            isImage: true,
            success: function (result) {
                if (result.isOk == "Y") {
                    $("#txt_loginBgUrl").val(result.data.uploadFile.fileUrl)
                    $("#img_loginBg").attr("src",result.data.uploadFile.fileUrl);
                }
            }
        })
    });
    $("#btn_uploadMainLogo").bind("click", function () {
        uploadFile({
            action: contextPath + "/upload.do",
            isImage: true,
            success: function (result) {
                if (result.isOk == "Y") {
                    $("#txt_mainLogoUrl").val(result.data.uploadFile.fileUrl)
                    $("#img_mainLogo").attr("src",result.data.uploadFile.fileUrl);
                }
            }
        })
    });

}

function loadData() {

    ajaxSubmit({
        url: contextPath + "/system/property/getSysPropertyList.do",
        data: {
            appKey: "SYS"
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $("#sysForm").fill(result.data.sysProperty);
                $("#vouchForm").fill(result.data.sysProperty);
                $("#img_loginBg").attr("src",$("#txt_loginBgUrl").val());
                $("#img_mainLogo").attr("src",$("#txt_mainLogoUrl").val());
            }
        }
    });
}