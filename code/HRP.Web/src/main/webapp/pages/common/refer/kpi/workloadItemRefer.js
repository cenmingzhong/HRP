var singleSelect = true;
//页面初始化
$(document).ready(function () {
	singleSelect = getURLParameter("singleSelect")==null||getURLParameter("singleSelect")==true?true:false;
    initToolBar();
    initGrid(); //初始化table
    loadList();
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
            	saveClick()
            }
        }, '-', {
            id: "exeit",
            text: "退出",
            iconCls: "icon-exeit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

//初始化table
function initGrid() {
	newJgGrid("dataGrid",{
        columns : [
            {code:"itemCode",text:"编码",width:150,align:"center"},
            {code:"itemName",text:"名称",width:150,align:"center"},
            {code:"typeName",text:"类型",width:150,align:"center"},
            {code:"score",text:"绩点",width:150,align:"center"}
        ],
        multiselect:!singleSelect,
        showCol:true
    });
}
function initPage(){
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

function saveClick(){
	if(!singleSelect){
		var rowid=$("#dataGrid").jqGrid("getGridParam","selarrrow");   
        if (rowid == null||rowid.length==0) {
            alertError("请选择一行数据！");
            return;
        }
        var arr = [];
        for (var int = 0; int < rowid.length; int++) {
        	var selRow = jQuery("#dataGrid").jqGrid("getRowData",rowid[int]);
        	arr.push(selRow);
		}
        return arr;
	}else{
		var rowid=$("#dataGrid").jqGrid("getGridParam","selrow");   
        if (rowid == null||rowid=='') {
            alertError("请选择一行数据！");
            return;
        }
        var selRow=jQuery("#dataGrid").jqGrid("getRowData",rowid);
        return selRow;
	}
}