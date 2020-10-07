var excelReportCls = getURLParameter("excelReportCls");
var vouchId = getURLParameter("vouchId");
//页面初始化
$(document).ready(function () {
    initGrid(); //初始化
    loadReportList(excelReportCls);
    $("#dataBlock").layout('panel', 'north').panel('resize', { height: $("#dataBlock").height() *0.4 });
    $("#dataBlock").layout('resize');
});

//初始化table
function initGrid() {
    newJgGrid("reportGrid",{
        columns : [
            {code:"reportName",text:"报表名称",width:200},
            {code:"reportTemplate",text:"报表模版",width:100},
            {code:"downLoad",text:" ",width:80,align:"center"}
        ],
        multiselect:false,
        toolbar: [ true, "top" , [
            {
                text: '新增' , 
                iconCls: 'icon-add', 
                handler: function () {
                    addReportClick();
                },
            },{
                text: '修改' , 
                iconCls: 'icon-edit', 
                handler: function () {
                    editReportClick();
                },
            },{
                text: '删除' , 
                iconCls: 'icon-delete', 
                handler: function () {
                    deleteReportClick();
                },
            },"-",{
            	id: "openReport",
                text: "导出",
                iconCls: "icon-export",
                handler: function () {
                	openReportClick();
                }
            }
        ]],
        showCol:true,
        formatter:{
            "reportTemplate":{
                formatter : function(value, rowOpts, rowData){
                    switch(value)
                    {
                        case "commonTemplate":
                            return "常用模版"
                            break;
                    }
                }
            },
            "downLoad":{
                formatter : function(value, rowOpts, rowData){
                    return "<a href='javascript:void(0)' onclick='downReportFile(\""+rowOpts.rowId+"\")'>下载报表文件</a>";
                }
            }
        },
        onClickRow:function(rowId, rowIdx, colIdx){
            var rowData = $("#reportGrid").jqGrid("getRowData", rowId, true);
            loadDetailList(rowData.id)
        },
        ondblClickRow:function(rowId, rowIdx, colIdx){
            var rowData = $("#reportGrid").jqGrid("getRowData",rowId);
            openDialog({
                url:"toInfo.do?reportId="+rowData.id,
                dialogWidth:800,
                dialogHeight:600,
                dialogCallBack:function(returnVal){
                    
                }
            });
        }
    });
    
    newJgGrid("reportParamGrid",{
        columns : [
            {code:"code",text:"参数编码",width:80},
            {code:"text",text:"显示文本",width:80},
            {code:"width",text:"宽度",width:80},
            {code:"dataType",text:"参数类型",width:80}
        ],
        multiselect:false,
        formatter:{
            "dataType":{
                formatter : function(value, rowOpts, rowData){
                    switch(value)
                    {
                        case "text":
                            return "文本"
                            break;
                        case "number":
                            return "数字"
                            break;
                        case "date":
                            return "日期"
                            break;
                        case "listValue":
                            return "枚举"
                            break;
                        case "refer":
                            return "参照"
                            break;
                    }
                }
            }
        },
        showCol:true
    });
}

//加载数据
function loadReportList(excelReportCls) {
    ajaxSubmit({
        url: "getExcelReportList.do",
        data: { 
        	excelReportCls:excelReportCls
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#reportGrid').jqGrid('loadData', result.data.reportList);
                $('#reportParamGrid').jqGrid('loadData', []);
            }
        }
    });
}

function downReportFile(rowId){
    var rowData = $("#reportGrid").jqGrid("getRowData", rowId, true);
    
    downloadFile({
        fileId: rowData.fileId
    });
}

//加载数据
function loadDetailList(id) {
    ajaxSubmit({
        url: "getReport.do",
        data: {
            reportId:id
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#reportParamGrid').jqGrid('loadData', result.data.reportParamList);
            } 
        }
    });
}
function addReportClick(){
    if(excelReportCls.length==0){
        alertError("请选择一个报表类别");
        return;
    }
    openDialog({
        url:"toInfo.do?excelReportCls="+excelReportCls,
        dialogWidth:800,
        dialogHeight:600,
        dialogCallBack:function(returnVal){
        	loadReportList(excelReportCls);
        }
    });
}

function editReportClick(){
    var selRow = $("#reportGrid").jqGrid("getSelection");
    if(selRow == null){
        alertError("请选择需要修改的报表");
        return;
    }
    openDialog({
        url:"toInfo.do?reportId="+selRow.id,
        dialogWidth:800,
        dialogHeight:600,
        dialogCallBack:function(returnVal){
            
        }
    });
}
function deleteReportClick (){
    var selRow = $("#reportGrid").jqGrid("getSelection");
    if(selRow == null){
        alertError("请选择需要修改的报表");
        return;
    }
    if(selRow.reportState =="V"){
        alertError("所选择的报表已发布");
        return;
    }
    confirmMsg("确定要删除所选的报表吗？",function(){
        ajaxSubmit({
            url:"deleteReport.do",
            data:{
                reportId:selRow.id
            },
            success:function(result){
                if(result.isOk=="Y"){
                	loadReportList(excelReportCls);
                    alertSuccess("删除成功");
                }
            }
        });
        
    });
}

function openReportClick() {
	var selRow = $("#reportGrid").jqGrid("getSelection");
	if(selRow == null){
        alertError("请选择模板");
        return;
    }
	openDialog({
		dialogHeight: 540,
        dialogWidth: 1160,
		url: contextPath + "/system/report/toExcelReport.do?reportId=" + selRow.id + "&vouchId=" + vouchId
	})
}