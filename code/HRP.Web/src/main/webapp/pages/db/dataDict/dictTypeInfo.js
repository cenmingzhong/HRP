var dictType = null
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
                saveClick();
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}


function initPage(){
    var dictTypeCode = getURLParameter("dictTypeCode");
    if(dictTypeCode != null){
        ajaxSubmit({
            url: "getDictType.do",
            data:{
                dictTypeCode:dictTypeCode
            },
            success:function(result){
                if(result.isOk=="Y"){
                    $("#infoForm").fill(result.data.dictType);
                    $("#txt_dictTypeCode").attr("readonly","readonly")
                }
            }
        })
    }
}

function saveClick(){
    if(!validateForm("infoForm")){
        return;
    }
    var data = $.extend(dictType, $("#infoForm").form2json());
    data.isNew = getURLParameter("dictTypeCode")==null
    ajaxSubmit({
        url:"saveDictType.do",
        data:{
            dictType:JSON.stringify(data)
        },
        success:function(result){
            if(result.isOk=="Y"){
                alertSuccess(result.message);
                closeDialog("Y");
            }
        }
    })
}
