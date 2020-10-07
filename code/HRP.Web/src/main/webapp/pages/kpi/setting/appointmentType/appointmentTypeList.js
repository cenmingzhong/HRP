var appointmentTypeList =[];
//页面初始化
$(document).ready(function () {
    initToolBar();
    loadGrid(); //初始化
    loadTypeList();
});
//初始化工具栏
function initToolBar() {
    $("#tbType").toolbar({
        items: [{
            id: "add",
            text: "增加岗位类别",
            iconCls: "icon-add",
            handler: function () {
                addSetting();
            }
        }, {
        	id: "edit",
            text: "修改岗位类别",
            iconCls: "icon-edit",
            handler: function () {
                editSetting();
            }
        }, {
            id: "delete",
            text: "删除岗位类别",
            iconCls: "icon-remove",
            handler: function () {
              deleteSetting();
            }
        }]
    });
    $("#tbLevel").toolbar({
        items: [{
            id: "add",
            text: "增加岗位等级",
            iconCls: "icon-add",
            handler: function () {
                addSetting();
            }
        }, {
        	id: "edit",
            text: "修改岗位等级",
            iconCls: "icon-edit",
            handler: function () {
                editSetting();
            }
        }, {
            id: "delete",
            text: "删除岗位等级",
            iconCls: "icon-remove",
            handler: function () {
              deleteSetting();
            }
        }]
    });
}
//初始化table
function loadGrid() {
	newJgGrid("dataGridType",{
        columns : [
            {code:"appointmentTypeName",text:"岗位类别名称",width:250,align:"center"}
        ],
        multiselect:false,
        showCol:true,
        onClickRow:function(rowId, rowIdx, colIdx){
        	var rowData = $("#dataGridType").jqGrid("getRowData", rowId,true);
        	var appointmentType = $.grep(appointmentTypeList,function(obj,num){
        		return obj.id = rowData.id;
        	})
        	$('#dataGridLevel').jqGrid('loadData', appointmentType[0].appointmentLevelList);
        }
    });
	newJgGrid("dataGridLevel",{
        columns : [
            {code:"appointmentLevelName",text:"岗位等级名称",width:250,align:"center"}
        ],
        showCol:true
    });
}
//加载类别数据
function loadTypeList() {
    ajaxSubmit({
        url: contextPath + "/kpi/setting/appointmentType/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
            	appointmentTypeList = result.data.appointmentTypeList;
                $('#dataGridType').jqGrid('loadData', result.data.appointmentTypeList);
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



