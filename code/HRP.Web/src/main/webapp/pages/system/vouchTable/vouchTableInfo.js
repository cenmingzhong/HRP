var vouchTable = {};
var billStatus = "U";
var statuses = { Null: "U", Save: "S",Edit:"E" };
$(document).ready(function () {
    initToolBar();
    initGrid();
    initPage();
    $("body").layout('panel', 'north').panel('resize', { height: $("#tb").height() / 26 * 31 });
    $("body").layout('resize');
});

function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        },{
            id: "cancel",
            text: "关闭",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

function initPage(undo) {   
    var vouchId = getURLParameter("vouchId");
    var isCopy = getURLParameter("isCopy")
    if (vouchId != null) {
        ajaxSubmit({
            url: contextPath + "/system/vouchTable/getVouchTableInfo.do?vouchId=" + vouchId,
            success: function (result) {
                if (result.isOk == "Y") {
                    if(!isCopy){
                        vouchTable = result.data.vouchTable;
                        $("#infoTopForm").fill(vouchTable);
                    }
                    $('#headGrid').datagrid('loadData', result.data.vouchTableHead);
                    $('#bodyGrid').datagrid('loadData', result.data.vouchTableBody);
                   
                }
            }
        });
    }
}


function initGrid () {
    $("#headGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'fieldCode', title: '字段编号', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='fieldCode'/>";
                }
            },
            { field: 'fieldName', title: '字段名称', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='fieldName'/>";
                }
            },
            { field: 'fieldText', title: '字段标题', align: 'left', halign: 'center', width: 200,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='fieldText'/>";
                }
            }
        ]],
        fitColumns: false,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        toolbar: [{
            text: '新增',
            id: 'addHead',
            iconCls: 'icon-add',
            handler: function () {
                var rows = $("#headGrid").datagrid("getData").rows;
                rows.push({IsNew: true });
                $('#headGrid').datagrid('loadData', rows);
                $('#headGrid').datagrid('unselectAll');
            }
        }, {
            text: '删除',
            id: 'delHead',
            iconCls: 'icon-remove',
            handler: function () {
                var selRows = $('#headGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择记录");
                    return;
                }
                for (var i = selRows.length - 1; i >= 0; i--) {
                    if (selRows[i]) {
                        $('#headGrid').datagrid('deleteRow', $('#headGrid').datagrid('getRowIndex', selRows[i]));
                    }
                }
            }
        }, {
            id: "up",
            text: "上移",
            iconCls: "icon-up",
            handler: function () {
                var selRow = $("#headGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要上移的行");
                    return;
                }
                var rowIndex = $("#headGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#headGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }

                var tempObj = rows[rowIndex - 1];
                rows[rowIndex - 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                $("#headGrid").datagrid("loadData", rows);
                $("#headGrid").datagrid("selectRow", rowIndex - 1);
            }
        }, {
            id: "down",
            text: "下移",
            iconCls: "icon-down",
            handler: function () {
                var selRow = $("#headGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要下移的行");
                    return;
                }
                var rows =  $("#headGrid").datagrid("getRows");
                var rowIndex = $("#headGrid").datagrid("getRowIndex", selRow);

                if (rowIndex == rows.length - 1) {
                    return;
                }

                var tempObj = rows[rowIndex + 1];
                rows[rowIndex + 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                
                $("#headGrid").datagrid("loadData", rows);
                $("#headGrid").datagrid("selectRow", rowIndex + 1);
            }
        },{
            id: "top",
            text: "置顶",
            iconCls: "icon-top",
            handler: function () {
                var selRow = $("#headGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#headGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#headGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i>0;i--){
                    rows[i] = rows[i-1];
                }

                rows[0] = tempObj;
                $("#headGrid").datagrid("loadData", rows);
                $("#headGrid").datagrid("selectRow", 0);
            }
        },{
            id: "bottom",
            text: "置底",
            iconCls: "icon-bottom",
            handler: function () {
                var selRow = $("#headGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#headGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#headGrid").datagrid("getRows");
                if (rowIndex == rows.length-1) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i< rows.length-1;i++){
                    rows[i] = rows[i+1];
                }

                rows[rows.length-1] = tempObj;
                $("#headGrid").datagrid("loadData", rows);
                $("#headGrid").datagrid("selectRow", rows.length-1);
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#headGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $("input", domRows).enterToTab();
            $.each(domRows, function (idx, domRow) {
                $("input[name=fieldCode]", domRow).bind("change", function () {
                    data.rows[idx].fieldCode = this.value;
                    data.rows[idx].isUpdate = true;
                    var fieldName = $(domRow).find("input[name=fieldName]");
                    if (fieldName.val() == "") {
                        data.rows[idx].fieldName = this.value;
                        fieldName.val(this.value);
                    }
                });
                 $("input[name=fieldName]", domRow).bind("change", function () {
                    data.rows[idx].fieldName = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=fieldText]", domRow).bind("change", function () {
                    data.rows[idx].fieldText = this.value;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });

    $("#bodyGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'fieldCode', title: '字段编号', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='fieldCode'/>";
                }
            },
            { field: 'fieldName', title: '字段名称', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    
                        return "<input type='text'  value='" + (value == null ? "" : value) + "' name='fieldName'/>";
                    
                }
            },
            { field: 'fieldText', title: '字段标题', align: 'left', halign: 'center', width: 200,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='fieldText'/>";
                }
            }
        ]],
        fitColumns: false,
        showFooter: true,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
        },
        toolbar: [{
            text: '新增',
            id: 'addBody',
            iconCls: 'icon-add',
            handler: function () {
                var rows = $("#bodyGrid").datagrid("getData").rows;
                rows.push({IsNew: true});
                $('#bodyGrid').datagrid('loadData', rows);
                $('#bodyGrid').datagrid('unselectAll');
            }
        }, {
            text: '删除',
            id: 'delBody',
            iconCls: 'icon-remove',
            handler: function () {
                var selRows = $('#bodyGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择记录");
                    return;
                }
                for (var i = selRows.length - 1; i >= 0; i--) {
                    if (selRows[i]) {
                        $('#bodyGrid').datagrid('deleteRow', $('#bodyGrid').datagrid('getRowIndex', selRows[i]));
                    }
                }
            }
        }, {
            id: "up",
            text: "上移",
            iconCls: "icon-up",
            handler: function () {
                var selRow = $("#bodyGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要上移的行");
                    return;
                }
                var rowIndex = $("#bodyGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#bodyGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }

                var tempObj = rows[rowIndex - 1];
                rows[rowIndex - 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                $("#bodyGrid").datagrid("loadData", rows);
                $("#bodyGrid").datagrid("selectRow", rowIndex - 1);
            }
        }, {
            id: "down",
            text: "下移",
            iconCls: "icon-down",
            handler: function () {
                var selRow = $("#bodyGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要下移的行");
                    return;
                }
                var rows =  $("#bodyGrid").datagrid("getRows");
                var rowIndex = $("#bodyGrid").datagrid("getRowIndex", selRow);

                if (rowIndex == rows.length - 1) {
                    return;
                }

                var tempObj = rows[rowIndex + 1];
                rows[rowIndex + 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                
                $("#bodyGrid").datagrid("loadData", rows);
                $("#bodyGrid").datagrid("selectRow", rowIndex + 1);
            }
        },{
            id: "top",
            text: "置顶",
            iconCls: "icon-top",
            handler: function () {
                var selRow = $("#bodyGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#bodyGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#bodyGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i>0;i--){
                    rows[i] = rows[i-1];
                }

                rows[0] = tempObj;
                $("#bodyGrid").datagrid("loadData", rows);
                $("#bodyGrid").datagrid("selectRow", 0);
            }
        },{
            id: "bottom",
            text: "置底",
            iconCls: "icon-bottom",
            handler: function () {
                var selRow = $("#bodyGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#bodyGrid").datagrid("getRowIndex", selRow);
                var rows =  $("#bodyGrid").datagrid("getRows");
                if (rowIndex == rows.length-1) {
                    return;
                }
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i< rows.length-1;i++){
                    rows[i] = rows[i+1];
                }
                rows[rows.length-1] = tempObj;
                $("#bodyGrid").datagrid("loadData", rows);
                $("#bodyGrid").datagrid("selectRow", rows.length-1);
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#bodyGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $("input", domRows).enterToTab();
            $.each(domRows, function (idx, domRow) {
                  $("input[name=fieldCode]", domRow).bind("change", function () {
                    data.rows[idx].fieldCode = this.value;
                    data.rows[idx].isUpdate = true;
                    var fieldName = $(domRow).find("input[name=fieldName]");
                    if (fieldName.val() == "") {
                        data.rows[idx].fieldName = this.value;
                        fieldName.val(this.value);
                    }
                });
                   $("input[name=fieldName]", domRow).bind("change", function () {
                    data.rows[idx].fieldName = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=fieldText]", domRow).bind("change", function () {
                    data.rows[idx].fieldText = this.value;
                    data.rows[idx].isUpdate = true;
                });
            })
        }
    });
}

function saveSetting() {
	if(!$("#txt_vouch_Code").val()){
		alertError("单据编码不能为空！");
		return;
	}
	
	if(!$("#txt_vouch_Name").val()){
		alertError("单据名称不能为空！");
		return;
	}
    vouchTable = $.extend(vouchTable, $("#infoTopForm").form2json());
    var vouchTableBodyList = $("#bodyGrid").datagrid("getData").rows;
    var vouchTableHeadList = $("#headGrid").datagrid("getData").rows;
    if (vouchTableBodyList.length == 0&&vouchTableHeadList.length ==0) {
        alertError("表体没数据");
        return;
    }
    var str = "";
    var flag = "";
       for(var i=0;i<vouchTableHeadList.length;i++)
       {
            for(var j=0;j<vouchTableHeadList.length;j++)
            {
              if(vouchTableHeadList[i].fieldCode==vouchTableHeadList[j].fieldCode && i!=j && i<j)
              {
                  str +="表头的" +vouchTableHeadList[i].fieldCode + "重复了\n";
                  flag = "A";
              }
            }
      }
        for(var i=0;i<vouchTableBodyList.length;i++)
       {
            for(var j=0;j<vouchTableBodyList.length;j++)
            {
              if(vouchTableBodyList[i].fieldCode==vouchTableBodyList[j].fieldCode && i!=j && i<j)
              {
                  str += "表体的"+vouchTableBodyList[i].fieldCode + "重复了\n";
                  flag ="A";
              }
            }
      }
      if (flag =="A") {
          alert(str);
          return;
      }


   
    ajaxSubmit({
        url: contextPath + "/system/vouchTable/save.do",
        data: {
            vouchTable: JSON.stringify(vouchTable),
            vouchTableHeadList: JSON.stringify(vouchTableHeadList),
            vouchTableBodyList: JSON.stringify(vouchTableBodyList)
        },
        formId: "infoTopForm",
        beforeSend: function () {
            return validateForm("infoTopForm")
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
                closeDialog();
                //openPage("toInfo.do?vouchId=" + result.data.vouchTable.vouchId);
            }
        }
    });
}