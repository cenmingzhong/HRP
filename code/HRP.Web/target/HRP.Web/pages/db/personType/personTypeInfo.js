var isEdit=false;
var person=null;
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
    loadDataList();

}

function loadDataList() {

    var id = getURLParameter("id");
    if (id){
        loadDataList(id);
    }

}

function loadDataList(id) {


}

function saveSetting() {
    var params = $("#infoForm").form2json();
    if (isEdit) {
        params.isUpdate = true;
    }
    else {
        params.isNew = true;
    }
    person = $.extend(person, params);
    ajaxSubmit({
        url: contextPath + "/db/personType/save.do",
        data: {
            person: JSON.stringify(params)
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