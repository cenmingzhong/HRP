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
                            alert(result.message);
                            closeDialog(rows);
                        } else {
                            alert(result.message);
                        }
                    }
                });

            }
        }, {
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
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
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
            { field: 'colId', title: '列编码', align: 'left', halign: 'center', width: 80},
            { field: 'colTitle', title: '列标题', align: 'left', halign: 'center', width: 150,
                formatter: function (value, row, index) {
                    return "<input type='text' value='" + value + "' name='colTitle'/>"
                }
            },
            { field: 'colWidth', title: '列宽', align: 'left', halign: 'center', width: 90,
                formatter: function (value, row, index) {
                    return "<input type='text' value='" + value + "' name='colWidth' style='text-align:center'/>"
                }
            },
            { field: 'colAlign', title: '对齐方式', align: 'left', halign: 'center', width: 90,
                formatter: function (value, row, index) {
                    var html = "<select name='colAlign'  style='text-align:center'>";
                    html += "<option value='left' " + (value == "left" ? "selected='selected'" : "") + ">靠左</option>";
                    html += "<option value='center' " + (value == "center" ? "selected='selected'" : "") + ">居中</option>";
                    html += "<option value='right' " + (value == "right" ? "selected='selected'" : "") + ">靠右</option>";
                    html += "</select>";
                    return html;
                }
            },
            { field: 'isHidden', title: '是否显示', align: 'center', halign: 'center', width: 90,
                formatter: function (value, rowData, index) {
                    return "<input type='checkbox' name='isHidden' " + (value ? "" : "checked='checked'") + "/>";
                }
            },
            { field: 'isRequired', title: '必需显示', align: 'center', halign: 'center', width: 90,
                formatter: function (value, rowData, index) {
                    return "<input type='checkbox' name='isRequired' " + (value ? "checked='checked'" : "") + "/>";
                }
            }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: false,
        fitColumns: false,
        onLoadSuccess: function (data) {
            var domRows = $($('#dataGrid').datagrid("getPanel")).find(".datagrid-body .datagrid-row");

            $.each(domRows, function (idx, domRow) {
                //列标题
                $("input[name=colTitle]", domRow).bind("change", function () {
                    if (this.value =="") {
                        alert("列标题不能为空");
                        this.value = data.rows[idx].colWidth;
                        return;
                    }
                    data.rows[idx].colTitle = this.value;
                    data.rows[idx].isUpdate = true;
                })
                //列宽
                $("input[name=colWidth]", domRow).bind("change", function () {
                    if (this.value <= 0) {
                        alert("列宽必须大于0");
                        this.value = data.rows[idx].colWidth;
                        return;
                    }
                    data.rows[idx].colWidth = this.value;
                    data.rows[idx].isUpdate = true;
                }).integer();
                //对齐方式
                $("select[name=colAlign]", domRow).bind("change", function () {
                    data.rows[idx].colAlign = this.value;
                    data.rows[idx].isUpdate = true;
                });
                //是否显示
                $("input[name=isHidden]", domRow).bind("change", function () {
                    data.rows[idx].isHidden = !this.checked;
                    data.rows[idx].isUpdate = true;
                });
                //必需显示
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = this.checked;
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
                        var cols = getDialogParams().colOpts;

                        var dataList = [];

                        for (var i = 0; i < cols.length; i++) {
                            var col = cols[i];

                            if (!col.checkbox) {

                                var title = cols[i].title;
                                var isRequired = false;
                                if (title.indexOf("<span")==0) {
                                    title = $(title).text();
                                    isRequired = true;
                                }
                                dataList.push({
                                    colId: cols[i].field,
                                    colTitle: title,
                                    colWidth: cols[i].width,
                                    colAlign: cols[i].align,
                                    isHidden: cols[i].hidden,
                                    isRequired: isRequired
                                })
                            }
                        }
                        $('#dataGrid').datagrid('loadData', dataList);
                    }else{
                        for(var i = colList.length-1; i >=0; i--){
                            var isExist = false;
                            for(var j = 0 ; j <dialogParams.colOpts.length; j++){
                                var colOpt = dialogParams.colOpts[j];
                                if (!colOpt.checkbox) {
                                    if(colList[i].colId == colOpt.field){
                                        isExist = true;
                                        break;
                                    }
                                }
                            }
                            if(!isExist){
                                colList.splice(i,1)
                            }
                        }

                        for(var j = 0 ; j <dialogParams.colOpts.length; j++){

                            var colOpt = dialogParams.colOpts[j];
                            if (!colOpt.checkbox) {
                                var isExist = false;

                                for(var i = colList.length-1; i >=0; i--){
                                    if(colList[i].colId == colOpt.field){
                                        isExist = true;
                                        break;
                                    }
                                }

                                if(!isExist){
                                    if (!colOpt.checkbox) {
                                        var title = colOpt.title;
                                        var isRequired = false;
                                        if (title.indexOf("<span")==0) {
                                            title = $(title).text();
                                            isRequired = true;
                                        }
                                        colList.push({
                                            colId: colOpt.field,
                                            colTitle: title,
                                            colWidth: colOpt.width,
                                            colAlign: colOpt.align,
                                            isHidden: true,
                                            isRequired: isRequired
                                        })
                                    }
                                }
                            }
                            
                            
                        }
                        $('#dataGrid').datagrid('loadData', colList);
                    }

                } else {
                    //alert(result.Message);
                }
            }
        });
        
    }, 1000);
}