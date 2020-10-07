//页面初始化
$(document).ready(function () {
    initToolBar();
    loadGrid(); //初始化
    loadEducationList();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "增加",
            iconCls: "icon-add",
            handler: function () {
                addSetting();
            }
        }, {
        	id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                editSetting();
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
              deleteSetting();
            }
        },'-' , {
            id: "colSet",
            text: "栏目",
             iconCls: "icon-colSet",
             handler: function () {
            	 setjqGridCol('dataGrid');
             }
     	}]
    });
}
//初始化table
function loadGrid() {
	newJgGrid("dataGrid",{
        columns : [
            {code:"appointmentName",text:"岗位名称",width:150,align:"center"}
        ],
        showCol:true
    });
	showJgGridCol('dataGrid');
}
//加载人员数据
function loadEducationList() {
    ajaxSubmit({
        url: contextPath + "/kpi/setting/appointment/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').jqGrid('loadData', result.data.appointmentList);
                showJgGridCol('dataGrid');
            }
        }
    });
}
//新增
function addSetting() {
	 openDialog({
	        elementId:"editDiv",
	        dialogWidth:220,
	        dialogHeight:50,
	        dialogCallBack:function(){
	        	var appointmentName = $("#txt_appointmentName").val();
	        	ajaxSubmit({
	                url: contextPath + "/kpi/setting/appointment/add.do",
	                data: {appointmentName : appointmentName},
	                success: function (result) {
	                	loadEducationList();
	                }
	            });
	        }
	    })
}

//修改
function editSetting(){
	var selectedIds = $('#dataGrid').jqGrid('getSelectedIds');
    if (selectedIds.length != 1) {
        alert("请选择一行!");
        return;
    }
    var selectRowData = $("#dataGrid").jqGrid("getRowData", selectedIds[0],true);
    var appointment = {}
    appointment.id = selectRowData.id;
    openDialog({
        elementId:"editDiv",
        dialogWidth:259,
        dialogHeight:60,
        dialogCallBack:function(){
        	appointment = $.extend(appointment,$("#infoForm").form2json());
        	ajaxSubmit({
                url: contextPath + "/kpi/setting/appointment/update.do",
                data: { appointment: JSON.stringify(appointment) },
                success: function (result) {
                    if (result.isOk == "Y") {
                    	loadEducationList();
                    }else{
                    	alert(result.message);
                    }
                }
            });
        }
    })
    
}
//删除
function deleteSetting(){
	var selectedIds = $('#dataGrid').jqGrid('getSelectedIds');
    if (selectedIds.length != 1) {
        alert("请选择一行!");
        return;
    }
    var selectRowData = $("#dataGrid").jqGrid("getRowData", selectedIds[0],true);
    if (!confirm("确定要删除吗？")) {
        return;
    }
    var id = selectRowData.id;
    ajaxSubmit({
        url: contextPath + "/kpi/setting/appointment/delete.do",
        data: { id: id },
        success: function (result) {
            if (result.isOk == "Y") {
            	loadEducationList();
            }else{
            	alert(result.message);
            }
        }
    });
    
}



