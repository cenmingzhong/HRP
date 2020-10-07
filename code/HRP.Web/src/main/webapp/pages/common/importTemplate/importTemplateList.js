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

                ajaxSubmit({
                    url: contextPath + "/system/importTemplate/save.do",
                    data: {
                        dbType: getURLParameter("dbType"),
                        importTemplateList: JSON.stringify(rows)
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
            { field: 'code', title: '字段编码', align: 'left', halign: 'center', width: 120},
            { field: 'text', title: '显示名称', align: 'left', halign: 'center', width: 80},
            { field: 'isRequired', title: '是否必填项', align: 'center', halign: 'center', width: 80,
                formatter: function (value, rowData, index) {
                    return value ? "是": "否";
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
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = !this.checked;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
}

function initPage() {

    ajaxSubmit({
        url: contextPath + "/system/importTemplate/getImportTemplateList.do",
        data: {
            dbType: getURLParameter("dbType")
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid('loadData', result.data.importTemplateList);
            } 
        }
    });
    
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