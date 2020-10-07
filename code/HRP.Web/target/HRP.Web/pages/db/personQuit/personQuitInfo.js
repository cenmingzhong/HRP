var personQuitVouch = {};
var billStatus = "U";
var statuses = { Null: "U", Save: "S", New: "N", Edit: "E", Veri: "V",Check: "PV" };
var oldBillId = null;

$(document).ready(function () {
    initToolBar();
    initGrid();
    //initPage();
    $("body").layout('panel', 'north').panel('resize', { height: $("#tb").height() / 26 * 31 });
    $("body").layout('resize');
    init();
});


function init() {
    
}

function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            handler: function () {
                addSetting();
            }
        }, {
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                editSetting();
            }
        }, {
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveSetting();
            }
        }, {
            id: "cancel",
            text: "取消",
            iconCls: "icon-undo",
            handler: function () {
                cancelSetting();
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-cancel",
            handler: function () {
                deleteSetting();
            }
        }, {
            id: "addRow",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                addline();
            }
        }, {
            id: "delRow",
            text: "减行",
            iconCls: "icon-delline",
            handler: function () {
                delline();
            }
        }, {
            id: "verify",
            text: "提交",
            iconCls: "icon-verify",
            handler: function () {
                verifySetting();
            }
        }, {
            id: "disverify",
            text: "弃审",
            iconCls: "icon-disverify",
            handler: function () {
                disverifySetting();
            }
        },{
            id: "print",
            text: "打印",
            type: "splitbutton",
            iconCls: "icon-print"
        }, '-',{
            id: "colSet",
            text: "栏目",
            iconCls: "icon-applicationviewdetail",
            handler: function () {
                setDataGridCol("dataBlock")
            }
        }]
    });
    /* bindCommonPrint("DB_PSQ", getToolBareItem("tb", "print"), function (params) {
        params.vouchHeadData = personQuitVouch;
        params.vouchBodyData = $("#dataBlock").datagrid("getRows");
        commonPrint(params);
    });*/
}

function initGrid() {
    $("#dataBlock").datagrid({
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
            { field: 'personCode', title: '<span class="needLabel">人员编码</span>', align: 'left', halign: 'center', width: 150,
                formatter: function (value, row, index) {
                    value = nullToEmpty(value);
                    if (!isModify()) {
                        return value;
                    } else {
                        return "<input type='text' name='personCode' value='" + value + "'/>"
                    }
                }
            },
            { field: 'personName', title: '人员名称', align: 'left', halign: 'center', width: 200,
                formatter: function (value, row, index) {
                    value = nullToEmpty(value);
                    if (!isModify()) {
                        return value;
                    } else {
                        return "<input type='text' name='personName' value='" + value + "'/>"
                    }
                }
            },
            { field: 'detailMemo', title: '备注', align: 'left', halign: 'center', width: 250,
                formatter: function (value, row, index) {
                    value = nullToEmpty(value);
                    if (!isModify()) {
                        return value;
                    } else {
                        return "<input type='text' name='detailMemo' value='" + value + "'/>"
                    }
                }
            }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: true,
        fitColumns: false,
        showFooter: false,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
        },
        rowStyler: function (index, row, css) {
            if (row.isDelete == true) {
                return 'display:none';
            }
        },
        onLoadSuccess: function (data) {
            var domRows = $($('#dataBlock').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $("input", domRows).enterToTab();
            $.each(domRows, function (idx, domRow) {
            	Refer.Person({
                    inputObj: $("input[name=personCode]", domRow),
                    referCallBack: function (returnVal) {
                        if (returnVal != null) {
                            data.rows[idx].personCode = returnVal[0].personCode;
                            data.rows[idx].personName = returnVal[0].personName;
                            $('#dataBlock').datagrid('loadData', data);
                            $('#dataBlock').datagrid('unselectAll');
                        }
                    }
                });
                //备注
                $("input[name=detailMemo]", domRow).bind("change", function () {
                    data.rows[idx].detailMemo = this.value;
                    data.rows[idx].isUpdate = true;
                });
                //备注
                $("input[name=detailMemo]", domRow).bind("keydown", function (e) {
                    data.rows[idx].detailMemo = this.value;
                    data.rows[idx].isUpdate = true;
                    if (e.keyCode == 13) {
                        var rows = $("#dataBlock").datagrid("getData").rows;
                        rows.push({ isNew: true });
                        $('#dataBlock').datagrid('loadData', rows);
                        //下面执行聚焦新增行单元格。。。
                        var domRows = $($('#dataBlock').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
                        $("input[name=personCode]", domRows[domRows.lenght - 1]).focus()
                    }
                });
            })
        }
    });
    showDataGridCol("dataBlock")
}



function initPage() {
	if(getURLParameter("id")){
		loadData(getURLParameter("id"));
	}
}
function addSetting() {
    ajaxSubmit({
        url: contextPath + "/db/personQuit/getNewDef.do",
        async: false,
        lockScreen: false,
        success: function (result) {
            billStatus = statuses.New;
            personQuitVouch = result.data.newDefData;
            personQuitVouch.isNew = true;
            $('#dataBlock').datagrid('loadData', [{ isNew: true}]);
            $("#infoTopForm,#infoEndForm").fill(personQuitVouch);
            ctrlStatus();
            editDomSet();
        }
    });
}
function editSetting() {
    oldBillId = personQuitVouch.id;
    billStatus = statuses.Edit;
    $('#dataBlock').datagrid('loadData', $("#dataBlock").datagrid("getData").rows);
    ctrlStatus();
    editDomSet();
}
function saveSetting() {
	personQuitVouch = $.extend(personQuitVouch, $("#infoTopForm").form2json(), $("#infoEndForm").form2json());
    var personQuitDetail = $("#dataBlock").datagrid("getData").rows;
    if (personQuitDetail.length == 0) {
        alert("表体没数据");
        return;
    }
    for (var i = 0; i < personQuitDetail.length; i++) {
        if (!comTrim(personQuitDetail[i].personCode)) {
            alert("表体第" + (i + 1) + "行,人员不能为空");
            return;
        }
    }
    ajaxSubmit({
        url: contextPath + "/db/personQuit/save.do",
        data: {
        	personQuitVouch: JSON.stringify(personQuitVouch),
        	personQuitDetailList: JSON.stringify(personQuitDetail)
        },
        formId: "infoTopForm",
        beforeSend: function () {
            return validateForm("infoTopForm")
        },
        success: function (result) {
            if (result.isOk == "Y") {
                loadData(result.data.id);
                alert(result.message);
            } else {
                alert(result.message);
            }
        }
    });
}
function deleteSetting() {
    if (!confirm("确定要删除该单据吗？")) {
        return;
    }
    ajaxSubmit({
        url: contextPath + "/db/personQuit/delete.do",
        data: { id: personQuitVouch.id },
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
            } else {
                alert(result.message);
            }
        }
    });
}
function verifySetting() {
    ajaxSubmit({
        url: contextPath + "/db/personQuit/verify.do",
        data: { id: personQuitVouch.id},
        success: function (result) {
            if (result.isOk == "Y") {
                loadData(personQuitVouch.id);
                alert(result.message);
            } else {
                alert(result.message);
            }
        }
    });
}
function disverifySetting() {
    ajaxSubmit({
        url: contextPath + "/db/personQuit/disverify.do",
        data: { id: personQuitVouch.Id },
        success: function (result) {
            if (result.isOk == "Y") {
                loadData(personQuitVouch.id);
                alert(result.message);
            } else {
                alert(result.message);
            }
        }
    });
}

function cancelSetting() {
    loadData(oldBillId);
    oldBillId = null;
}
function addline() {
    var rows = $("#dataBlock").datagrid("getData").rows;
    rows.push({ isNew: true });
    $('#dataBlock').datagrid('loadData', rows);
    $('#dataBlock').datagrid('scrollTo',{
        index:rows.length,
        callback:function(){
            var tempRows = $($('#dataBlock').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $("input[name=[personCode]", tempRows[rows.length-1]).focus().select();
        }
    });
}
function delline() {
    var selRows = $('#dataBlock').datagrid("getSelections");
    if (selRows.length == 0) {
        alert("请选择记录");
        return;
    }
    for (var i = selRows.length - 1; i >= 0; i--) {
        if (selRows[i].isNew) {
            $('#dataBlock').datagrid('deleteRow', $('#dataBlock').datagrid('getRowIndex', selRows[i]));
        } else {
            selRows[i].isDelete = true;
        }
    }
    var rows = $("#dataBlock").datagrid("getData").rows;
    $('#dataBlock').datagrid('loadData', rows);
}


function loadData(id) {
    if (id) {
        ajaxSubmit({
            url: contextPath + "/db/personQuit/getOneVouch.do",
            data: { id: id},
            success: function (result) {
                if (result.isOk == "Y") {
                	personQuitVouch = result.data.personQuitVouch;
                     if (personQuitVouch.verifier) {
                        if (personQuitVouch.vouchState == "S" ) {
                            billStatus = statuses.Check;
                        }
                    }
                    else {
                        billStatus = statuses.Save;
                    }
                    $("#infoTopForm,#infoEndForm").fill(personQuitVouch);
                    $('#dataBlock').datagrid('loadData', result.data.personQuitDetail);
                    ctrlStatus();
                    editDomSet();
                }
                else {
                    //alert(result.Message);
                }
            }
        });
    }
    else {
        billStatus = statuses.Null;
        personQuitVouch = {};
        $('#dataBlock').datagrid('loadData', []);
        $("#infoTopForm,#infoEndForm").fill(personQuitVouch);
        ctrlStatus();
        editDomSet();
    }
}


function isModify() {
    return billStatus == statuses.New || billStatus == statuses.Edit
}
function editDomSet() {
    var canModify = isModify(); //canModify: false 只读
    editStatuSet($("#infoTopForm"), isModify());
}
function ctrlStatus() {
    var enable = "enable";
    var disabled = "disabled";
    switch (billStatus) {
        //add,edit,save,cancel,delete,addRow,delRow,verify,disverify,close,open,first,prev,next,last 
        case statuses.Null:
            {
                $('#tb').toolbar(enable, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(disabled, 'save');
                $('#tb').toolbar(disabled, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(disabled, 'addRow');
                $('#tb').toolbar(disabled, 'delRow');
                $('#tb').toolbar(disabled, 'verify');
                $('#tb').toolbar(disabled, 'disverify');
            }
            break;
        case statuses.Save:
            {
                $('#tb').toolbar(enable, 'add');
                $('#tb').toolbar(enable, 'edit');
                $('#tb').toolbar(disabled, 'save');
                $('#tb').toolbar(disabled, 'cancel');
                $('#tb').toolbar(enable, 'delete');
                $('#tb').toolbar(disabled, 'addRow');
                $('#tb').toolbar(disabled, 'delRow');
                $('#tb').toolbar(enable, 'verify');
                $('#tb').toolbar(disabled, 'disverify');
            }
            break;
        case statuses.New:
            {  
                $('#tb').toolbar(disabled, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(enable, 'save');
                $('#tb').toolbar(enable, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(enable, 'addRow');
                $('#tb').toolbar(enable, 'delRow');
                $('#tb').toolbar(disabled, 'verify');
                $('#tb').toolbar(disabled, 'disverify');
            }
            break;
        case statuses.Edit:
            {
                $('#tb').toolbar(disabled, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(enable, 'save');
                $('#tb').toolbar(enable, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(enable, 'addRow');
                $('#tb').toolbar(enable, 'delRow');
                $('#tb').toolbar(disabled, 'verify');
                $('#tb').toolbar(disabled, 'disverify');
            }
            break;
        case statuses.Veri:
            {
                $('#tb').toolbar(enable, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(disabled, 'save');
                $('#tb').toolbar(disabled, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(disabled, 'addRow');
                $('#tb').toolbar(disabled, 'delRow');
                if (session.getPersonCode() == checkPsnCode) {
                    $('#tb').toolbar(enable, 'check');
                } else {
                    $('#tb').toolbar(disabled, 'check');
                }
                $('#tb').toolbar(disabled, 'checklog');
            }
            break;
        case statuses.Check:
            {
                $('#tb').toolbar(enable, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(disabled, 'save');
                $('#tb').toolbar(disabled, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(disabled, 'addRow');
                $('#tb').toolbar(disabled, 'delRow');
                $('#tb').toolbar(disabled, 'verify');
                $('#tb').toolbar(enable, 'disverify');
                if (session.getPersonCode() == checkPsnCode) {
                    $('#tb').toolbar(enable, 'check');
                } else {
                    $('#tb').toolbar(disabled, 'check');
                }
                $('#tb').toolbar(enable, 'checklog');
            }
            break;
        default:
            {
                $('#tb').toolbar(enable, 'add');
                $('#tb').toolbar(disabled, 'edit');
                $('#tb').toolbar(disabled, 'save');
                $('#tb').toolbar(disabled, 'cancel');
                $('#tb').toolbar(disabled, 'delete');
                $('#tb').toolbar(disabled, 'addRow');
                $('#tb').toolbar(disabled, 'delRow');
                $('#tb').toolbar(disabled, 'verify');
                $('#tb').toolbar(disabled, 'disverify');
                $('#tb').toolbar(disabled, 'check');
                $('#tb').toolbar(disabled, 'checklog');
            }
            break;
    }
}
