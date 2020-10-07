var report = {};
//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
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
                var data = $.extend(report,$("#reportForm").form2json());
                data.reportScript = $("#txt_reportScript").val();
                ajaxSubmit({
                    url: "saveReport.do",
                    data: {
                        report: JSON.stringify(data),
                        reportParamList: JSON.stringify($("#dataGrid").datagrid("getRows"))
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            closeDialog();
                        } 
                    }
                });

            }
        }, {
            id: "uploadData",
            text: "上传报表",
            iconCls: "icon-import",
            enable:function(){
                return billStatus == statuses.Edit || billStatus == statuses.New
            },
            handler: function () {
                uploadReport();
            }
        },{
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}


function initGrid() {
    $("#dataGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: true,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'code', title: '参数编码', align: 'left', halign: 'center', width: 80},
            { field: 'text', title: '显示文本', align: 'left', halign: 'center', width: 100},
            { field: 'dataType', title: '参数类型', align: 'center', halign: 'center', width: 60,
                formatter: function (value, rowData, index) {
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
            },
            { field: 'isFreq', title: '是否常用', align: 'center', halign: 'center', width: 60,
                formatter: function (value, rowData, index) {
                    return "<input type='checkbox' name='isFreq' " + (value ? "checked='checked'":"" ) + "/>";
                }
            },
            { field: 'isRequired', title: '是否必填', align: 'center', halign: 'center', width: 60,
                formatter: function (value, rowData, index) {
                    return "<input type='checkbox' name='isRequired' " + (value ? "checked='checked'":"" ) + "/>";
                }
            }
        ]],
        toolbar: [{
            id: "addLine",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                $('#dataGrid').datagrid('appendRow',{isNew:true,dataType:"text",width:4});
                $("#dataGrid").datagrid("selectRow", $('#dataGrid').datagrid('getRows').length-1);
            }
        },{
            id: "delLine",
            text: "减行",
            iconCls: "icon-delline",
            handler: function () {
                var selRow = $("#dataGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择行");
                    return;
                }
                $('#dataGrid').datagrid('deleteRow', $('#dataGrid').datagrid('getRowIndex', selRow));
                disabledForm("infoForm");
                resetForm("infoForm")
            }
        },{
            id: "up",
            text: "上移",
            iconCls: "icon-up",
            handler: function () {
                var selRow = $("#dataGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要上移的行");
                    return;
                }
                var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);
                var rows =  $("#dataGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                var tempObj = rows[rowIndex - 1];
                rows[rowIndex - 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                $("#dataGrid").datagrid("loadData", rows);
                $("#dataGrid").datagrid("selectRow", rowIndex - 1);
            }
        }, {
            id: "down",
            text: "下移",
            iconCls: "icon-down",
            handler: function () {
                var selRow = $("#dataGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要下移的行");
                    return;
                }
                var rows =  $("#dataGrid").datagrid("getRows");
                var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);

                if (rowIndex == rows.length - 1) {
                    return;
                }

                var tempObj = rows[rowIndex + 1];
                rows[rowIndex + 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                
                $("#dataGrid").datagrid("loadData", rows);
                $("#dataGrid").datagrid("selectRow", rowIndex + 1);
            }
        },{
            id: "top",
            text: "置顶",
            iconCls: "icon-top",
            handler: function () {
                var selRow = $("#dataGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#dataGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i>0;i--){
                    rows[i] = rows[i-1];
                }

                rows[0] = tempObj;
                $("#dataGrid").datagrid("loadData", rows);
                $("#dataGrid").datagrid("selectRow", 0);
            }
        },{
            id: "bottom",
            text: "置底",
            iconCls: "icon-bottom",
            handler: function () {
                var selRow = $("#dataGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#dataGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#dataGrid").datagrid("getRows");
                if (rowIndex == rows.length-1) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i< rows.length-1;i++){
                    rows[i] = rows[i+1];
                }

                rows[rows.length-1] = tempObj;
                $("#dataGrid").datagrid("loadData", rows);
                $("#dataGrid").datagrid("selectRow", rows.length-1);
            }
        }
        ],
        pagination: false,
        pageSize: 20,
        rownumbers: true,
        fitColumns: false,
        onSelect: function (rowIndex, rowData) {
            enableForm("infoForm")
            fillInfoForm();
        },
        onLoadSuccess: function (data) {
            var domRows = $($('#dataGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");

            $.each(domRows, function (idx, domRow) {
                //是否常用
                $("input[name=isFreq]", domRow).bind("change", function () {
                    data.rows[idx].isFreq = this.checked;
                    data.rows[idx].isUpdate = true;
                });
                //是否常用
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = this.checked;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
}
function fillInfoForm(){
    var rowData = $("#dataGrid").datagrid("getSelected");
    if(rowData.dataType == "refer"){
        $("#referTo,#referParam").show();
    }else{
        $("#referTo,#referParam").hide();
    }
    if(rowData.dataType == "listValue"){
        $("#listValue").show();
        $("#sel_listValue").append(nullToEmpty(rowData.listValue));
    }else{
        $("#listValue").hide();
        $("#sel_listValue option").remove();
    }
    if(rowData.dataType == "date"){
        $("#dateFilter").show();
    }else{
        $("#dateFilter").hide();
    }
    $("#infoForm").fill(rowData);
}
function initPage(){
    disabledForm("infoForm") 
    $("#infoForm input, #infoForm select,  #infoForm textarea").not("#sel_listValue").bind("change", function(){
        var selectedRow = $("#dataGrid").datagrid("getSelected");
        var data = $("#infoForm").form2json()
        var $chks = $("#infoForm").find(":checkbox:not(:checked)");    //取得所有未选中的checkbox
        if ($chks.length >= 0) {
            $chks.each(function () {
                var chkName = $(this).attr("name");

                if (data[chkName] == null) {
                    data[chkName] = false;
                }
            });
        }
        $.extend(selectedRow, data) ;
        
        var rowIdx = $('#dataGrid').datagrid('getRowIndex',selectedRow);
        
        $('#dataGrid').datagrid('updateRow',{
            index: rowIdx,
            row:selectedRow
        });
        if(selectedRow.dataType=="refer"){
            $("#referTo,#referParam").show();
        }else{
            $("#referTo,#referParam").hide();
        }
        if(selectedRow.dataType == "listValue"){
            $("#listValue").show();
            $("#sel_listValue").append(nullToEmpty(selectedRow.listValue));
        }else{
            $("#listValue").hide();
            $("#sel_listValue option").remove();
        }
    });
    $("#btn_editReferParam").bind("click",function(){
        editReferParam();
    });
    $("#btn_editListValue").bind("click",function(){
        editListValue();
    });
    if(isNullorEmpty(getURLParameter("reportId"))){
        $("#txt_reportClsCode").val(getURLParameter("reportClsCode"))
        $("#txt_excelReportCls").val(getURLParameter("excelReportCls"))
    }else{
        ajaxSubmit({
            url: "getReport.do",
            data: {
                reportId: getURLParameter("reportId")
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    report = result.data.report;
                    $("#reportForm").fill(report);
                    $("#lbl_fileName").text(report.reportFile.fileName);
                    $("#txt_reportScript").val(report.reportScript);
                    $("#dataGrid").datagrid("loadData",result.data.reportParamList);
                } 
            }
        });
    }
}
function editReferParam(){
    openDialog({
        elementId:"listValueBlock",
        dialogWidth:350,
        dialogHeight:220,
        dialogCallBack:function(){
            $("#sel_referParam option").remove();
            var rows = $('#listValueGrid').datagrid("getRows");
            var referParam = {};
            for(var i = 0 ; i < rows.length; i++){
                referParam[rows[i].code] = rows[i].value
                $("#sel_referParam").append("<option value='"+rows[i].code+"'>"+rows[i].code+":"+rows[i].value+"</option>"); 
            }
            var selectedRow = $("#dataGrid").datagrid("getSelected");
            selectedRow.referParam = JSON.stringify(referParam)
        }
    });
    
    $("#listValueGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: true,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'code', title: '参数名', align: 'left', halign: 'center', width: 80,
                formatter: function (value, rowData, index) {
                    return "<input type='text' name='code' value='"+nullToEmpty(value)+"'/>";
                }
            },
            { field: 'value', title: '参数值', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text' name='value' value='"+nullToEmpty(value)+"'/>";
                }
            }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: true,
        fitColumns: false,
        toolbar: [{
            id: "addLine",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                var rows = $('#listValueGrid').datagrid("getRows");
                rows.push({});
                $('#listValueGrid').datagrid('loadData',rows);
            }
        },{
            id: "delLine",
            text: "减行",
            iconCls: "icon-delline",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择行");
                    return;
                }
                $('#listValueGrid').datagrid('deleteRow', $('#listValueGrid').datagrid('getRowIndex', selRow));
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#listValueGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $.each(domRows, function (idx, domRow) {
                $("input[name=code]", domRow).bind("change", function () {
                    data.rows[idx].code = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=value]", domRow).bind("change", function () {
                    data.rows[idx].value = this.value;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
    var listValueList = [];
    $("#sel_referParam option").each(function(){
        listValueList.push({
            code: $(this).text().split(":")[0],
            value: $(this).text().split(":")[1]
        })
    });
    $('#listValueGrid').datagrid("loadData",listValueList)
}
function editListValue(){
    openDialog({
        elementId:"listValueBlock",
        dialogWidth:350,
        dialogHeight:220,
        dialogCallBack:function(){
            $("#sel_listValue option").remove();
            var rows = $('#listValueGrid').datagrid("getRows");
            for(var i = 0 ; i < rows.length; i++){
                $("#sel_listValue").append("<option value='"+rows[i].code+"'>"+rows[i].text+"</option>"); 
            }
            var selectedRow = $("#dataGrid").datagrid("getSelected");
            selectedRow.listValue = $("#sel_listValue").html();
        }
    });
    
    $("#listValueGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: true,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'code', title: '编码', align: 'left', halign: 'center', width: 80,
                formatter: function (value, rowData, index) {
                    return "<input type='text' name='code' value='"+nullToEmpty(value)+"'/>";
                }
            },
            { field: 'text', title: '文本', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text' name='text' value='"+nullToEmpty(value)+"'/>";
                }
            }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: true,
        fitColumns: false,
        toolbar: [{
            id: "addLine",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                var rows = $('#listValueGrid').datagrid("getRows");
                rows.push({});
                $('#listValueGrid').datagrid('loadData',rows);
            }
        },{
            id: "delLine",
            text: "减行",
            iconCls: "icon-delline",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择行");
                    return;
                }
                $('#listValueGrid').datagrid('deleteRow', $('#listValueGrid').datagrid('getRowIndex', selRow));
            }
        },{
            id: "up",
            text: "上移",
            iconCls: "icon-up",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择需要上移的行");
                    return;
                }
                var rowIndex = $("#listValueGrid").datagrid("getRowIndex", selRow);
                var rows =  $("#listValueGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                var tempObj = rows[rowIndex - 1];
                rows[rowIndex - 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                $("#listValueGrid").datagrid("loadData", rows);
                $("#listValueGrid").datagrid("selectRow", rowIndex - 1);
            }
        }, {
            id: "down",
            text: "下移",
            iconCls: "icon-down",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择需要下移的行");
                    return;
                }
                var rows =  $("#listValueGrid").datagrid("getRows");
                var rowIndex = $("#listValueGrid").datagrid("getRowIndex", selRow);

                if (rowIndex == rows.length - 1) {
                    return;
                }

                var tempObj = rows[rowIndex + 1];
                rows[rowIndex + 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                
                $("#listValueGrid").datagrid("loadData", rows);
                $("#listValueGrid").datagrid("selectRow", rowIndex + 1);
            }
        },{
            id: "top",
            text: "置顶",
            iconCls: "icon-top",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#listValueGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#listValueGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i>0;i--){
                    rows[i] = rows[i-1];
                }

                rows[0] = tempObj;
                $("#listValueGrid").datagrid("loadData", rows);
                $("#listValueGrid").datagrid("selectRow", 0);
            }
        },{
            id: "bottom",
            text: "置底",
            iconCls: "icon-bottom",
            handler: function () {
                var selRow = $("#listValueGrid").datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#listValueGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#listValueGrid").datagrid("getRows");
                if (rowIndex == rows.length-1) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i< rows.length-1;i++){
                    rows[i] = rows[i+1];
                }

                rows[rows.length-1] = tempObj;
                $("#listValueGrid").datagrid("loadData", rows);
                $("#listValueGrid").datagrid("selectRow", rows.length-1);
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#listValueGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $.each(domRows, function (idx, domRow) {
                $("input[name=code]", domRow).bind("change", function () {
                    data.rows[idx].code = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=text]", domRow).bind("change", function () {
                    data.rows[idx].text = this.value;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
    var listValueList = [];
    $("#sel_listValue option").each(function(){
        listValueList.push({
            code: $(this).val(),
            text: $(this).text()
        })
    });
    $('#listValueGrid').datagrid("loadData",listValueList)
}
function uploadReport() {
    uploadFile({
        allImgExt:".cpt|.xls|.xlsx",
        isImage:true,
        action: contextPath+"/system/report/uploadReport.do",
        success: function (result) {
            if (result.isOk == "Y") {
                report.reportFile = result.data.uploadFile
                $("#lbl_fileName").text(report.reportFile.fileName);
            }
        }
    })
}