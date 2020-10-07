//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid(); //初始化单据树
    loadData();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
            }
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

function initGrid(){
	newJgGrid("dataGrid",{
        showCol:true,
        footerrow:true,
        columns : [
            {code:"code",text:"单据编号",width:80},
            {code:"name",text:"单据名称",width:100},
        ]
    });
}
function initPage(){
}

function loadData(){
	ajaxSubmit({
        url:"getVouchTypeList.do",
        success:function(result){
            if(result.isOk=="Y"){
            	debugger;
            	$('#dataGrid').jqGrid('loadData', result.data.vouchList);
            }
        }
    })
}

function saveClick(){
	var selRows = $('#dataGrid').jqGrid("getSelectedIds");
    if (selRows.length == 0) {
        alert("请选择数据");
        return;
    }
    var vouchList = [];
    for (var i = 0; i < selRows.length; i++) {
        var tempRowData = $("#dataGrid").jqGrid("getRowData", selRows[i],true);
        vouchList.push({code:tempRowData.code,name:tempRowData.name});
    }
    closeDialog(vouchList);
}
