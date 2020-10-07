//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();
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
                var rows = $("#dataGrid").datagrid("getRows");
                var dialogParams = getDialogParams();

                ajaxSubmit({
                    url: contextPath + "/system/gridColumn/save.do",
                    data: {
                        pathUrl: dialogParams.pathUrl,
                        gridId: dialogParams.gridId,
                        colList: JSON.stringify(rows)
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            closeDialog(rows);
                        } 
                    }
                });

            }
        }, {
            id: "addLine",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                $('#dataGrid').datagrid('appendRow',{isNew:true});
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
            { field: 'colId', title: '编码', align: 'left', halign: 'center', width: 120},
            { field: 'colTitle', title: '列标题', align: 'left', halign: 'center', width: 80},
            { field: 'colWidth', title: '列宽', align: 'center', halign: 'center', width: 50},
            { field: 'colAlign', title: '对齐方式', align: 'center', halign: 'center', width: 60,
                formatter: function (value, row, index) {
                    if(value=="right"){
                        return "靠右";
                    }else if(value=="center"){
                        return "居中";
                    }
                    return "靠左"
                }
            },
            { field: 'isHidden', title: '是否显示', align: 'center', halign: 'center', width: 60,
                formatter: function (value, rowData, index) {
                    return "<input type='checkbox' name='isHidden' " + (value ? "" : "checked='checked'") + "/>";
                }
            }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: false,
        fitColumns: false,
        onClickRow: function (rowIndex, rowData) {
            $("#infoForm").fill(rowData);
        },
        onLoadSuccess: function (data) {
            var domRows = $($('#dataGrid').datagrid("getPanel")).find(".datagrid-body .datagrid-row");

            $.each(domRows, function (idx, domRow) {
                //是否显示
                $("input[name=isHidden]", domRow).bind("change", function () {
                    data.rows[idx].isHidden = !this.checked;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
}

function initPage() {

    window.setTimeout(function () {
        var dialogParams = getDialogParams();//.colOpts;

        ajaxSubmit({
            url: contextPath + "/system/gridColumn/getGridColumnList.do",
            data: {
                pathUrl: dialogParams.pathUrl,
                gridId: dialogParams.gridId
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    var colList = result.data.colList;
                    
                    if(colList == null || colList.length ==0){
                        var cols = getDialogParams().columnList;
                        var dataList = [];

                        for (var i = 0; i < cols.length; i++) {
                            dataList.push({
                                colId: cols[i].code,
                                colField: cols[i].col,
                                colTitle: cols[i].text,
                                colWidth: cols[i].width,
                                colAlign: cols[i].align==null?"left":cols[i].align,
                                colType:cols[i].dataType==null?"text":cols[i].dataType,
                                colPrecision:cols[i].decimalPlaces,
                                isHidden: cols[i].hidden,
                                colFormatter:cols[i].formatter,
                                frozen:cols[i].frozen==null? false:cols[i].frozen,
                				isExportFmt:cols[i].isExportFmt==null? false:cols[i].isExportFmt,
        						sortable:cols[i].sortable==null? false:cols[i].sortable,
        						formative:cols[i].formative
                            })
                        }
                        $('#dataGrid').datagrid('loadData', dataList);
                    }else{

                        for(var j = 0 ; j <getDialogParams().columnList.length; j++){

                            var colOpt = dialogParams.columnList[j];
                            var isExist = false;
       
                            for(var i = colList.length-1; i >=0; i--){
                                if(colList[i].colId == colOpt.code){
                                    isExist = true;
                                    break;
                                }
                            }

                            if(!isExist){
                                colList.push({
                                    colId: colOpt.code,
                                    colField: colOpt.col,
                                    colTitle: colOpt.text,
                                    colWidth: colOpt.width,
                                    colAlign: colOpt.align==null?"left":colOpt.align,
                                    colType: colOpt.dataType==null?"text":colOpt.dataType,
                                    colPrecision:colOpt.decimalPlaces,
                                    colFormatter:colOpt.formatter,
                                    isHidden: colOpt.hidden
                                })
                            }
                        }
                        $('#dataGrid').datagrid('loadData', colList);
                    }
                } 
            }
        });
        
    }, 1000);
    
    $("#infoForm input, #infoForm select,  #infoForm textarea").bind("change", function(){
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
    });
}