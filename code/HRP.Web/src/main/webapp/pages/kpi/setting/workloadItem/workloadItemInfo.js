var isEdit = false;
var workloadItem = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initData();
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

    var id = getURLParameter("id");
    if (id) {
        loadData(decodeURI(id));
    }
    
}

function initPage(){
	Refer.WorkloadType({
		inputObj:$("#txt_typeName"),
		selectEnd:true,
		isEnd:true,
		referCallBack:function(returnFun){
			if(returnFun!=null){
				$("#txt_typeName").val(returnFun.name);
				$("#txt_typeId").val(returnFun.id);
			}
		}
	});
}

function loadData(id) {
	$("#txt_score").number();
    ajaxSubmit({
        url: contextPath + "/kpi/setting/workloadItem/getInfo.do",
        data: { id: id },
        success: function (result) {
            if (result.isOk == "Y") {
            	workloadItem = result.data.workloadItem;
                $("#infoForm").fill(workloadItem);
                isEdit = true;
            }
        }
    });
}
function saveSetting() {
    var params = $("#infoForm").form2json();
    
    workloadItem = $.extend(workloadItem, params);
    ajaxSubmit({
        url: contextPath + "/kpi/setting/workloadItem/save.do",
        data: {
        	workloadItem: JSON.stringify(workloadItem)
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