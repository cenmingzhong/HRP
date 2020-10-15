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
        }, {
            id : "exit",
            text : "<b style='font-size:14px'>退出</b>",
            iconCls : "icon-exit",
            handler : function() {
                closeDialog();
            }
        } ]
    });
}

function initPage() {

    // ajaxSubmit({
    //     url : contextPath + "/db/permissionManager/getPermissionList.do",
    //     async : false,
    //     success : function(result) {
    //         if (result.isOk == "Y") {
    //             bindDropDown("permissionNumber", result.data.permissionUserList,"deptName", "deptCode", true, "--请选择--");
    //
    //         }
    //     }
    // });



    initUser();
}

// 初始化信息，
function initUser() {
    if (getURLParameter("teacherNumber") != null) {
        ajaxSubmit({
            url : contextPath + "/db/permissionManager/getInfo.do",
            async : false,
            data : {
                teacherNumber : getURLParameter("teacherNumber")
            },
            success : function(result) {
                if (result.isOk == "Y") {
                    user = result.data.permissionUser;
                    $("#infoForm").fill(user);

                }
            }
        });
    } else {
        action = ACTION_ADD;
    }
}

// 保存用户
function saveClick() {
    debugger
    var teacherNumber=getURLParameter("teacherNumber")
    var data = $("#infoForm").form2json();
    // var permissionNumber = $("#permissionNumber").find("option:selected").text();
    // // var loginUser=session.getLoginUser().sysUserAccount;
    //
    // data = $.extend(data, {permissionNumber:permissionNumber});
    // if (getURLParameter("teacherNumber") == null) {
    //     data.isNew = true;
    //     // data.creator=loginUser;
    //     // data.create_Time = new Date();
    // } else {
    //     data.isUpdate = true;
    //     data.editor=loginUser;
    //     data.edit_Time = new Date();
    //     data.sysUserCode=getURLParameter("userCode")
    // }
    ajaxSubmit({
        url : contextPath + "/db/permissionManager/save.do",
        data : {
            permission : JSON.stringify(data),
            teacherNumber:teacherNumber
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
