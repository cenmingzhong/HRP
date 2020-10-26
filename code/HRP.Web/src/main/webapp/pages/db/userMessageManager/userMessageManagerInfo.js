var isEdit = false;
var user = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initData();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        },{
            id: "exit",
            text: "取消",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog(false);
            }
        }]
    });
}

function initData() {

    var teacherNumber = getURLParameter("teacherNumber");
    if (teacherNumber) {
        loadData(decodeURI(teacherNumber));
    }
    Refer.Department({
        inputObj: $("#positionNumber"),
        selectEnd:false,
        referCallBack: function (returnVal,inputObj) {
            if (returnVal) {
                $(inputObj).val(returnVal.deptCode);
                $("#teachPositionType").val(returnVal.deptName);
            }
        }
    })
}
function loadData(teacherNumber) {
    ajaxSubmit({
        url: contextPath + "/db/userMessageManager/getInfo.do",
        data: { teacherNumber: teacherNumber },
        success: function (result) {
            if (result.isOk == "Y") {
                user = result.data.user;
                $("#infoForm").fill(user);
                $("#teacherNumber").css("color", "gray").attr("readonly", true);
                isEdit = true;
            }
        }
    });
}
function saveSetting() {
    var params = $("#infoForm").form2json();
    debugger
    console.log(params)
    if (isEdit) {
        params.isUpdate = true;
    }
    else {
        params.isNew = true;
    }
    user = $.extend(user, params);
    var p=JSON.stringify(params);
    ajaxSubmit({
        url: contextPath + "/db/userMessageManager/save.do",
        data: {
            user: p
        },
        formId: "infoForm",
        beforeSend: function () {
            return validateForm("infoForm");
        },
        success: function (data) {
            if (data.isOk == "Y") {
                alertSuccess(data.message);
                closeDialog(true);
            } 
        }
    });
}