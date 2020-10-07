
//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
    initPage();
    
    $("#dataBlock").layout('panel', 'north').panel('resize', { height: $("#dataBlock").height() *0.4 });
    $("#dataBlock").layout('resize');
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增报表类别",
            iconCls: "icon-add",
            handler: function () {
                addReportClassClick();
            }
        }, {
            id: "edit",
            text: "修改报表类别",
            iconCls: "icon-edit",
            handler: function () {
                editReportClassClick();
            }
        }, {
            id: "delete",
            text: "删除报表类别",
            iconCls: "icon-remove",
            handler: function () {
                deleteReportClassClick();
            }
        },'-',{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadReportClassTree();
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
    newJgGrid("reportGrid",{
        columns : [
            {code:"reportName",text:"报表名称",width:200},
            {code:"reportTemplate",text:"报表模版",width:100},
            {code:"reportState",text:"报表状态",width:80},
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
            },'-',{
                text: '发布' , 
                iconCls: 'icon-setting', 
                handler: function () {
                    publicReportClick();
                },
            },{
                text: '撤销发布' , 
                iconCls: 'icon-setting', 
                handler: function () {
                    unPublicReportClick();
                },
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
            "reportState":{
                formatter : function(value, rowOpts, rowData){
                    switch(value)
                    {
                        case "A":
                            return "未发布"
                            break;
                        case "V":
                            return "已发布"
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

function initPage(){
    loadReportClassTree();
}

function loadReportClassTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        data: {
            key: {
                name: "reportClsName"
            },
            simpleData: {
                enable: true,
                idKey: "reportClsCode",
                pIdKey: "reportClsParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function(e, treeId, treeNode){
                loadReportList(treeNode);
            }
        }
    };
    
    ajaxSubmit({
        url: "getReportClsList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var reportClassList = result.data.reportClassList
                for (var i = 0; i < reportClassList.length; i++) {
                    if (reportClassList[i].reportClsParent == ""||reportClassList[i].reportClsParent == null) {
                        reportClassList[i].reportClsParent = "root";
                    }
                }
                //增加一个根目录节点
                reportClassList.push({
                    reportClsName: "报表类别树",
                    reportClsCode: "root",
                    reportClsParent: "",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                $.fn.zTree.init($("#reportClassTree"), setting, result.data.reportClassList);
            } 
        }
    });
    $("#reportGrid").jqGrid("loadData",[])
    $("#conditionGrid").jqGrid("loadData",[])
}

function addReportClassClick(){
    var reportClsParent = null;
    var selectedNodes = $.fn.zTree.getZTreeObj("reportClassTree").getSelectedNodes();
    if(selectedNodes.length>0 && selectedNodes[0].reportClsCode !='root'){
        reportClsParent = selectedNodes[0].reportClsCode;
    }
    
    var dialog = openDialog({
        elementId:"reportClassBlock",
        dialogWidth:300,
        dialogHeight:60,
        dialogTitle:"报表类别",
        dialogCallBack:function(){
            if($("#txt_reportClsName").val()==""){
                alertError("请输入报表类别名称");
                return false;
            }
            var reportClass= $("#reportClassForm").form2json();
            reportClass.reportClsParent = reportClsParent;
            ajaxSubmit({
                url:"saveReportClass.do",
                data:{
                    reportClass:JSON.stringify(reportClass)
                },
                success:function(result){
                    if(result.isOk=="Y"){
                        dialog.close();
                        loadReportClassTree();
                        alertSuccess("保存成功");
                    }
                }
            });
            return false;
        }
    });
    resetForm("reportClassForm")
}

function editReportClassClick(){
    var selectedNodes = $.fn.zTree.getZTreeObj("reportClassTree").getSelectedNodes();
    if(selectedNodes.length==0 || selectedNodes[0].reportClsCode =='root'){
        alertError("请选择一个报表类别");
        return;
    }
    
    var dialog = openDialog({
        elementId:"reportClassBlock",
        dialogWidth:300,
        dialogHeight:60,
        dialogTitle:"报表类别",
        dialogCallBack:function(){
            if($("#txt_reportClsName").val()==""){
                alertError("请输入报表类别名称");
                return false;
            }
            var reportClass= $("#reportClassForm").form2json();
            ajaxSubmit({
                url:"saveReportClass.do",
                data:{
                    reportClass:JSON.stringify(reportClass)
                },
                success:function(result){
                    if(result.isOk=="Y"){
                        dialog.close();
                        loadReportClassTree();
                        alertSuccess("修改成功");
                    }
                }
            });
            return false;
        }
    });
    $("#reportClassForm").fill(selectedNodes[0])
}

function deleteReportClassClick(){
    var selectedNodes = $.fn.zTree.getZTreeObj("reportClassTree").getSelectedNodes();
    if(selectedNodes.length==0 || selectedNodes[0].reportClsCode =='root'){
        alertError("请选择一个报表类别");
        return;
    }
    
    confirmMsg("确定要删除吗?",function(){
        ajaxSubmit({
            url:"deleteReportClass.do",
            data:{
                reportClsCode:selectedNodes[0].reportClsCode
            },
            success:function(result){
                if(result.isOk=="Y"){
                    loadReportClassTree();
                    alertSuccess("删除成功");
                }
            }
        });
    }); 
    
}
//加载数据
function loadReportList(treeNode) {
    var selNodes = $.fn.zTree.getZTreeObj("reportClassTree").getSelectedNodes();
    if(selNodes.length ==0){
        alertError("请选择报表类别");
        return ;
    }
   
    ajaxSubmit({
        url: "getReportList.do",
        data: { 
            reportClsCode:selNodes[0].reportClsCode
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
    var selectedNodes = $.fn.zTree.getZTreeObj("reportClassTree").getSelectedNodes();
    if(selectedNodes.length==0 || selectedNodes[0].reportClsCode =='root'){
        alertError("请选择一个报表类别");
        return;
    }
    if(selectedNodes[0].isParent){
        alertError("请选择末级报表类别");
        return;
    }
    openDialog({
        url:"toInfo.do?reportClsCode="+selectedNodes[0].reportClsCode,
        dialogWidth:800,
        dialogHeight:600,
        dialogCallBack:function(returnVal){
        	loadReportList();
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
        	loadReportList();
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
                    loadReportList();
                    alertSuccess("删除成功");
                }
            }
        });
        
    });
}
function publicReportClick(){
    var selRow = $("#reportGrid").jqGrid("getSelection");
    if(selRow == null){
        alertError("请选择需要发布的报表");
        return;
    }
    if(selRow.reportState=="V"){
        alertError("所选择的报表已发布");
        return;
    }
    openDialog({
        url: contextPath+"/pages/system/report/sysMenuSelect.jsp",
        dialogWidth:800,
        dialogHeight:600,
        dialogCallBack:function(returnVal){
            if(returnVal != null){
                ajaxSubmit({
                    url:"publishReport.do",
                    data:{
                        reportId:selRow.id,
                        sysMenuParent:returnVal
                    },
                    success:function(result){
                        if(result.isOk=="Y"){
                            loadReportList();
                            alertSuccess("发布成功");
                        }
                    }
                });
            }
        }
    });
}

function unPublicReportClick(){
    var selRow = $("#reportGrid").jqGrid("getSelection");
    if(selRow == null){
        alertError("请选择需要发布的报表");
        return;
    }
    if(selRow.reportState !="V"){
        alertError("所选择的报表未发布");
        return;
    }
    confirmMsg("确定要撤销发布所选的报表吗？",function(){
        ajaxSubmit({
            url:"unPublishReport.do",
            data:{
                reportId:selRow.id
            },
            success:function(result){
                if(result.isOk=="Y"){
                    loadReportList();
                    alertSuccess("发布成功");
                }
            }
        });
        
    });
}