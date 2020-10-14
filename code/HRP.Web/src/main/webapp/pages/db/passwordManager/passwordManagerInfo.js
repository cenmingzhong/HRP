var action = "";
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
var user = null;

// 页面初始化
$(document).ready(function() {
    initToolBar(); // 初始化工具栏
    // initPage();
    initUser();
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

// function initPage() {
//
//     ajaxSubmit({
//         url : contextPath + "/db/dept/getList.do",
//         async : false,
//         success : function(result) {
//             if (result.isOk == "Y") {
//                 bindDropDown("sel_sysDeptCode", result.data.deptList,"deptName", "deptCode", true, "--请选择--");
//
//             }
//         }
//     });
//     ajaxSubmit({
//         url : contextPath + "/system/role/getList.do",
//         async : false,
//         success : function(result) {
//             if (result.isOk == "Y") {
//                 bindDropDown("sel_sysRoleCode", result.data.roleList, "sysRoleName", "sysRoleCode", true, "--请选择--");
//             }
//         }
//     });
//     if (!getURLParameter("userCode") == null) {
//
//     }
//     initUser();
// }
// 初始化信息，
function initUser() {
    debugger
    if (getURLParameter("teacherNumber") != null) {
        ajaxSubmit({
            url : contextPath + "/db/passwordManager/getInfo.do",
            async : false,

            data : {

                teacherNumber : getURLParameter("teacherNumber")
            },
            success : function(result) {
                if (result.isOk == "Y") {
                    debugger
                    user = result.data.password;
                    $("#infoForm").fill(user);
                    // $('#projGrid').jqGrid('loadData',result.data.userProjList);
                }
            }
        });
    } else {
        action = ACTION_ADD;
    }
}
// 保存用户
// function saveClick() {
//     var data = $("#infoForm").form2json();
//     // var sysDeptName = $("#sel_sysDeptCode").find("option:selected").text();
//     // var loginUser=session.getLoginUser().sysUserAccount;
//
//     // data = $.extend(data, {sysDeptName:sysDeptName});
//     // if (getURLParameter("userCode") == null) {
//     //     // data.isNew = true;
//     //     // data.creator=loginUser;
//     //     data.createTime = new Date();
//     // } else {
//     //     // data.isUpdate = true;
//     //     // data.editor=loginUser;
//     //     // data.edit_Time = new Date();
//     //     data.teacherAccount=getURLParameter("userCode")
//     // }
//     ajaxSubmit({
//         url : contextPath + "/db/passwordManager/save.do",
//         data : {
//             password : JSON.stringify(data)
//         },
//         formId : "infoForm",
//         success : function(data) {
//             if (data.isOk == "Y") {
//                 alertSuccess(data.message);
//                 closeDialog();
//             }
//         }
//     });
// }

function saveClick() {
    var params = $("#infoForm").form2json();
    // if (isEdit) {
    //     params.isUpdate = true;
    // }
    // else {
    //     params.isNew = true;
    // }
    // user = $.extend(user, params);
    ajaxSubmit({
        url: contextPath + "/db/passwordManager/save.do",
        data: {
            password: JSON.stringify(params)
        },
        // formId: "infoForm",
        // beforeSend: function () {
        //     return validateForm("infoForm");
        // },
        success: function (data) {
            if (data.isOk == "Y") {
                alertSuccess(data.message);
                closeDialog(true);
            }
        }
    });
}


