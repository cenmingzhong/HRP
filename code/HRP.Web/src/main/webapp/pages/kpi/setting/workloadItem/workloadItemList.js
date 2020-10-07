//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化table
    loadList();
    initPage();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            handler: function () {
                openDialog({
                    dialogHeight: 450,
                    dialogWidth: 600,
                    url: "toInfo.do",
                    dialogCallBack: function (resultVal) {
                        if (resultVal != null) {
                            loadList();
                        }
                    }
                });
            }
        }, {
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
            	var rowid=$("#dataGrid").jqGrid("getGridParam","selrow");   
                if (rowid == null||rowid=='') {
                    alertError("请选择一行数据！");
                    return;
                }
                var selRow=jQuery("#dataGrid").jqGrid("getRowData",rowid);
                var id = selRow.id;
                openDialog({
                    dialogHeight: 450,
                    dialogWidth: 600,
                    url: "toInfo.do?id=" + encodeURI(id),
                    dialogCallBack: function (msg) {
                        if (msg) {
                            loadList();
                        }
                    }
                });
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
            	var rowid=$("#dataGrid").jqGrid("getGridParam","selrow");   
                if (rowid == null||rowid=='') {
                    alertError("请选择一行数据！");
                    return;
                }
                var selRow=jQuery("#dataGrid").jqGrid("getRowData",rowid);
                confirmMsg("确定要删除吗？",function(){
                     ajaxSubmit({
                         url: contextPath + "/kpi/setting/workloadItem/delete.do",
                         data: { 
                             id: selRow.id
                         },
                         success: function (result) {
                             if (result.isOk == "Y") {
                                 alertSuccess(result.message);
                                 loadList();
                             } 
                         }
                     });
                })
            }
        },'-',{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadList();
            }
        }, '-', {
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchClick();
            }
        }]
    });
}

//初始化table
function initGrid() {
	newJgGrid("dataGrid",{
        columns : [
            {code:"itemCode",text:"编码",width:150,align:"center"},
            {code:"itemName",text:"名称",width:150,align:"left"},
            {code:"typeName",text:"类型",width:150,align:"left"},
            {code:"score",text:"绩点",width:150,align:"right"}
        ],
        multiselect:false,
        showCol:true
    });
}
function initPage(){
	Refer.WorkloadType({
		inputObj:$("#txt_typeName"),
		selectEnd:true,
		referCallBack:function(returnFun){
			if(returnFun!=null){
				$("#txt_typeName").val(returnFun.name);
				$("#txt_typeId").val(returnFun.id);
			}
		}
	});
}

function searchClick() {
	var dialog = openDialog({
        dialogWidth: 300,
        dialogHeight: 200,
        elementId: "searchDiv",
        dialogCallBack: function () {
           var data = $("#infoForm").form2json(); 
            loadList(data);
        }
    });
	
	dialog.addButton("reset","清除条件",function(){
        $("#infoForm")[0].reset();
        $("#txt_typeName").val(null)
        $("#txt_typeId").val(null)
    });
    
    $("#searchDiv").layout();
}

//加载数据
function loadList(data) {
    ajaxSubmit({
        url: contextPath + "/kpi/setting/workloadItem/getList.do",
        data: { 
            filter: JSON.stringify(data) 
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').jqGrid('loadData', result.data.workloadItemList);
            }
        }
    });
}

