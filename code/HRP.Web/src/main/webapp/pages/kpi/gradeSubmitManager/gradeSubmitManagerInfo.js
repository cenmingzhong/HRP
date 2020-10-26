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
            { field: 'submitTime', title: '申请时间', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='submitTime'/>";
                }
            },
            { field: 'submitYear', title: '申请年度', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='submitYear'/>";
                }
            },
            { field: 'workloadTypeNumber', title: '工作量类型编号', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='workloadTypeNumber'/>";
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
                $("input[name=submitTime]", domRow).bind("change", function () {
                    data.rows[idx].submitTime = this.value;
                    data.rows[idx].isUpdate = true;
                    var submitYear = $(domRow).find("input[name=submitYear]");
                    if (submitYear.val() == "") {
                        data.rows[idx].submitYear = this.value;
                        submitYear.val(this.value);
                    }
                });
                $("input[name=submitYear]", domRow).bind("change", function () {
                    data.rows[idx].submitYear = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=workloadTypeNumber]", domRow).bind("change", function () {
                    data.rows[idx].workloadTypeNumber = this.value;
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
            // { field: 'submitNumber', title: '表头申报编号', align: 'left', halign: 'center', width: 100,
            //     formatter: function (value, rowData, index) {
            //         return "<input type='text'  value='" + (value == null ? "" : value) + "' name='submitNumber'/>";
            //     }
            // },
            { field: 'tailSubmitNumber', title: '表尾申报编号', align: 'left', halign: 'center', width: 100,
                formatter: function (value, rowData, index) {

                    return "<input type='text'  value='" + (value == null ? "" : value) + "' name='tailSubmitNumber'/>";

                }
            },
            { field: 'gradeTaskNumber', title: '绩点任务编号', align: 'left', halign: 'center', width: 200,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='gradeTaskNumber'/>";
                }
            },
            { field: 'gradeScore', title: '绩点分数', align: 'left', halign: 'center', width: 200,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='gradeScore'/>";
                }
            },
            { field: 'supportingMaterial', title: '佐证材料', align: 'left', halign: 'center', width: 200,
                formatter: function (value, rowData, index) {
                    return "<input type='text' value='" + (value == null ? "" : value) + "' name='supportingMaterial'/>";
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
                $("input[name=submitNumber]", domRow).bind("change", function () {
                    data.rows[idx].submitNumber = this.value;
                    data.rows[idx].isUpdate = true;
                    var tailSubmitNumber = $(domRow).find("input[name=tailSubmitNumber]");
                    if (tailSubmitNumber.val() == "") {
                        data.rows[idx].tailSubmitNumber = this.value;
                        tailSubmitNumber.val(this.value);
                    }
                });
                $("input[name=tailSubmitNumber]", domRow).bind("change", function () {
                    data.rows[idx].tailSubmitNumber = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=gradeTaskNumber]", domRow).bind("change", function () {
                    data.rows[idx].gradeTaskNumber = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=gradeScore]", domRow).bind("change", function () {
                    data.rows[idx].gradeScore = this.value;
                    data.rows[idx].isUpdate = true;
                });
                $("input[name=supportingMaterial]", domRow).bind("change", function () {
                    data.rows[idx].supportingMaterial = this.value;
                    data.rows[idx].isUpdate = true;
                });

            })
        }
    });
}

function initPage(undo) {
    var submitNumber = getURLParameter("submitNumber");
    var isCopy = getURLParameter("isCopy")
    if (submitNumber != null) {
        ajaxSubmit({
            url: contextPath + "/kpi/gradeSubmitManager/getGradeSubmitManagerInfo.do?submitNumber=" + submitNumber,
            success: function (result) {
                if (result.isOk == "Y") {
                    if(!isCopy){
                        debugger
                        console.log(result)
                        vouchTable = result.data.submitHeadAndTailList[0];
                        $("#infoTopForm").fill(vouchTable);
                    }
                    $('#headGrid').datagrid('loadData', result.data.submitHeadAndTailList);
                    $('#bodyGrid').datagrid('loadData', result.data.submitHeadAndTailList);

                }
            }
        });
    }
}

//关闭弹出框
function closeDialog(returVal) {
    if (typeof (parentDialog) == 'undefined') {
        window.close()
    } else {
        window.setTimeout(function () {
            if (parentDialog.CallBack != null) {
                var returnVal = parentDialog.CallBack(returVal)

                if (!returnVal) {
                    parentDialog.close();
                }

            } else {
                parentDialog.close();
            }
        }, 50);
    }
}

function saveSetting() {
    if(!$("#submitNumber").val()){
        alertError("申报编号不能为空！");
        return;
    }

    if(!$("#teacherNumber").val()){
        alertError("教师编号不能为空！");
        return;
    }
    // if(!$("#teacherName").val()){
    //     alertError("教师名字不能为空！");
    //     return;
    // }
    // vouchTable = $.extend(vouchTable, $("#infoTopForm").form2json());
    var SubmitHead = $("#infoTopForm").form2json();
    var vouchTableBodyList = $("#bodyGrid").datagrid("getData").rows;
    var vouchTableHeadList = $("#headGrid").datagrid("getData").rows;




    var vouchTableHeadList1=JSON.stringify(vouchTableHeadList);
    SubmitHead =JSON.stringify(SubmitHead);
    // var vouchTableHeadList1Element = vouchTableHeadList1[0];
    console.log(SubmitHead)
    var parse = JSON.parse(vouchTableHeadList1);
    var head = JSON.parse(SubmitHead);


    console.log(parse)
    console.log(head)

    var aa=Object.assign(parse[0],head);
    console.log(aa)

    delete aa.IsNew
    delete aa.isUpdate
    delete aa.Id

    var all=Object.assign(aa,vouchTableBodyList[0]);

    delete all.IsNew
    delete all.isUpdate

    var HeadResult = JSON.stringify(aa);
    var vouchTableBodyList1=JSON.stringify(vouchTableBodyList);
    var allResult=JSON.stringify(all);















    debugger
    console.log(HeadResult)

    console.log(vouchTableBodyList1)

    if (vouchTableBodyList.length == 0&&vouchTableHeadList.length ==0) {
        alertError("表体没数据");
        return;
    }
    // var str = "";
    // var flag = "";
    // for(var i=0;i<vouchTableHeadList.length;i++)
    // {
    //     for(var j=0;j<vouchTableHeadList.length;j++)
    //     {
    //         if(vouchTableHeadList[i].fieldCode==vouchTableHeadList[j].fieldCode && i!=j && i<j)
    //         {
    //             str +="表头的" +vouchTableHeadList[i].fieldCode + "重复了\n";
    //             flag = "A";
    //         }
    //     }
    // }
    // for(var i=0;i<vouchTableBodyList.length;i++)
    // {
    //     for(var j=0;j<vouchTableBodyList.length;j++)
    //     {
    //         if(vouchTableBodyList[i].fieldCode==vouchTableBodyList[j].fieldCode && i!=j && i<j)
    //         {
    //             str += "表体的"+vouchTableBodyList[i].fieldCode + "重复了\n";
    //             flag ="A";
    //         }
    //     }
    // }
    // if (flag =="A") {
    //     alert(str);
    //     return;
    // }



    ajaxSubmit({
        url: contextPath + "/kpi/gradeSubmitManager/save.do",
        contentType:"application/json;charset=UTF-8",
        dataType:"json",



        data: {
            SubmitHead: allResult,
            // vouchTableHeadList: JSON.stringify(vouchTableHeadList),
            // SubmitTail: vouchTableBodyList1

        },

        formId: "infoTopForm",
        // beforeSend: function () {
        //     return validateForm("infoTopForm")
        // },
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
                closeDialog();
                //openPage("toInfo.do?vouchId=" + result.data.vouchTable.vouchId);
            }
        }
    });
}