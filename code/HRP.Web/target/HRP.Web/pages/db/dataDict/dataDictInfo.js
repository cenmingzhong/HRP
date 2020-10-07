var dataDictDetail = null
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
    var id = getURLParameter("id");
    if(id == null){
        $("#txt_dictTypeCode").val(getURLParameter("dictTypeCode"))
    }else{
    	ajaxSubmit({
            url:contextPath+"/db/dataDict/getInfo.do",
            data:{
                id:id
            },
            success:function(result){
                if(result.isOk=="Y"){
                    dataDictDetail = result.data.dataDictDetail;
                    $("#infoForm").fill(dataDictDetail);
                }
            }
        })
    }
}

function saveClick(){
    
	var data = $.extend(dataDictDetail, $("#infoForm").form2json());
	data.isNew = getURLParameter("id")==null
    ajaxSubmit({
        url:contextPath+"/db/dataDict/save.do",
        data:{
            entity:JSON.stringify(data)
        },
        success:function(result){
            if(result.isOk=="Y"){
                alertSuccess(result.message);
                closeDialog();
            }
        }
    })
}
