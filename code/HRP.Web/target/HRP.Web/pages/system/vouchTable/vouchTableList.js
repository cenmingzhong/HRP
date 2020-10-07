var userCode = "";
var newcolcoLumns = [];
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initViewGrid(); //初始化模板
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "添加",
            iconCls: "icon-add",
            handler: function () {
                openDialog({
                    url: "toInfo.do",
                    dialogWidth:800,
                    dialogHeight:600,
                    dialogCallBack: function (returnVal) {
                        loadData()
                    }
                });
            }
        }, {
            id: "edit",
            text: "编辑",
            iconCls: "icon-edit",
            handler: function () {
                var selectRow = $('#viewList').datagrid('getSelections');
                if (selectRow.length != 1) {
                    alert("请选择一条记录!");
                    return;
                }
                openDialog({
                    url: "toInfo.do?vouchId=" + selectRow[0].vouchId,
                    dialogWidth:800,
                    dialogHeight:600,
                    dialogCallBack: function (returnVal) {
                        loadData()
                    }
                });
            }
        },
        {
            id: "copy",
            text: "复制",
            iconCls: "icon-referbill",
            handler: function () {
                var selectRow = $('#viewList').datagrid('getSelections');
                var copy = true;
                if (selectRow.length != 1) {
                    alert("请选择一条记录!");
                    return;
                }
                openDialog({
                    url: "toInfo.do?vouchId=" + selectRow[0].vouchId + "&isCopy=" + copy,
                    dialogWidth: 800,
                    dialogHeight: 600,
                    dialogCallBack: function (returnVal) {
                        loadData()
                    }
                });
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
                var selectRows = $('#viewList').datagrid('getSelections');
                if (selectRows.length == 0) {
                    alert("请选择一项!");
                    return;
                }
                if (!confirm("是否确认删除?")) {
                    return false;
                }
                var ids = [];
                for (var i = 0; i < selectRows.length; i++) {
                    ids.push(selectRows[i].vouchId)
                }
                ajaxSubmit({
                    url: contextPath + "/system/vouchTable/deleteList.do",
                    data: {
                        ids: JSON.stringify(ids)
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            alert(data.message);
                            loadData();
                        }
                    }
                })
            }
        },{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        }]
    });
}

function initViewGrid() {
    var datagrid; //定义全局变量datagrid
    datagrid = $("#viewList").datagrid({
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
            { field: 'ck', checkbox: true },
            { field: 'vouchCode', title: '单据编号', align: 'left', halign: 'center', width: 100 },
            { field: 'vouchName', title: '单据名称', align: 'center', halign: 'center', width: 180 }
        ]],
        fitColumns: false,
        onLoadSuccess: function (data) {
        }
    });
}

function initPage() {
    loadData();
}

function loadData() {
    ajaxSubmit({
        url: contextPath + "/system/vouchTable/getVouchTableList.do",
        data: {
        	filters: JSON.stringify($("#infoForm").form2json())
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#viewList').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.vouchTableList);
            }

        }
    });
}
