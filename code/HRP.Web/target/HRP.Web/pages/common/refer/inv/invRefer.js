//页面初始化
var selectRows =[];
var fileList = [];
var singleSelect = true;
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    if(getURLParameter("singleSelect") =="false"){
        singleSelect = false;
    }
    initInvClsTree(getURLParameter("invClsCode")); //初始化树
    initInvGrid();
});


//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {

                var selectRows = $("#invGrid").datagrid("getSelections");
                if (selectRows.length == 0) {
                    alert("请至少选择一个存货");
                    return;
                }
                if(singleSelect){
                    closeDialog(selectRows[0]);
                }
                else{
                    closeDialog(selectRows);
                }
            }
        }, {
            id: "close",
            text: "过滤",
            iconCls: "icon-search",
            handler: function () {
                loadInvList(1)
            }
        }, '-', {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog()
            }
        },
        '-', {
            id: "colSet",
            text: "栏目",
            iconCls: "icon-colSet",
            handler: function () {
                setDataGridCol("invGrid");
            }
        }]
    });
}


//初始化树
function initInvClsTree(invClsCode) {
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
                name: "invClsName"
            },
            simpleData: {
                enable: true,
                idKey: "invClsCode",
                pIdKey: "invClsParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                loadInvList();
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/invCls/getInvClsTree.do",
        data:{
            filter:JSON.stringify({
                invClsFilter:invClsCode
            })
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var dataList = result.data.invClsTree;
                
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].invClsName = "(" + dataList[i].invClsCode + ")" + dataList[i].invClsName

                    if (dataList[i].invClsParent == null || dataList[i].invClsParent == "") {
                        dataList[i].invClsParent = "root";
                    }
                }
                //增加一个根目录节点
                dataList.push({
                    invClsName: "存货分类树",
                    invClsCode: "root",
                    invClsParent: "",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });

                $.fn.zTree.init($("#invClsTree"), setting, dataList);

                initPage();
            }
        }
    });
}

function initInvGrid() {
    var datagrid; //定义全局变量datagrid
    datagrid = $("#invGrid").datagrid({
        locale: "zh_CN",
        nowrap: true,
        singleSelect:singleSelect,
        striped: true, //使用分隔行
        border: false,
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        data: [],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'invCode', title: '物资编码', align: 'left', halign: 'center', width: 80 },
            { field: 'invName', title: '物资名称', align: 'left', halign: 'center', width: 200 },
            { field: 'invAbbName', title: '通用名称', align: 'left', halign: 'center', width: 80 },
            { field: 'invStd', title: '规格型号', align: 'left', halign: 'center', width: 100 },
            { field: 'unitName', title: '单位', align: 'left', halign: 'center', width: 40 },
            { field: 'stockQuantity', title: '现存量', align: 'right', halign: 'center', width: 60 },
            { field: 'referPrice', title: '参考单价', align: 'right', halign: 'center', width: 60 },
            { field: 'newPrice', title: '最新单价', align: 'right', halign: 'center', width: 60 },
            { field: 'materialBrand', title: '品牌', align: 'left', halign: 'center', width: 80 },
            { field: 'mfrName', title: '厂家名称', align: 'left', halign: 'center', width: 120 }
        ]],
        pagination: true,
        pageSize: 50,
        rownumbers: false,
        fitColumns: false,
        idField: 'invCode',
        //在用户勾选一行的时候触发
        onCheck: function (rowIndex, rowData) {
            var isExist = false;
            for (var i = 0; i < selectRows.length; i++) {
                if (selectRows[i].invCode == rowData.invCode) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                selectRows.push(rowData);
            }
        },
        //在用户取消勾选一行的时候触发
        onUncheck: function (rowIndex, rowData) {
            var index = -1;
            for (var i = 0; i < selectRows.length; i++) {
                if (selectRows[i].invCode == rowData.invCode) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                selectRows.splice(index, 1);
            }
        },
        //在用户选择所有行的时候触发
        onSelectAll: function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var isExist = false;
                for (var j = 0; j < selectRows.length; j++) {
                    if (selectRows[j].invCode == rows[i].invCode) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    selectRows.push(rows[i]);
                }
            }
        },
        //用户取消选择所有行的时候触发
        onUnselectAll: function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var index = -1;
                for (var j = 0; j < selectRows.length; j++) {
                    if (selectRows[j].invCode == rows[i].invCode) {
                        index = j;
                        break;
                    }
                }
                if (index != -1) {
                    selectRows.splice(index, 1);
                }
            }
        },
        //在用户双击一个单元格的时候触发
        onDblClickRow: function (rowIndex, rowData) {
            closeDialog(rowData)
        },
        //在数据加载成功的时候触发
        onLoadSuccess: function (data) {
            for (var i = 0; i < selectRows.length; i++) {
                var idx = $("#invGrid").datagrid("getRowIndex", selectRows[i].invCode);

                if (idx != -1) {
                    $("#invGrid").datagrid("selectRow", idx);
                }
            }
        }
    });
    showDataGridCol("invGrid");
}

//过滤
function loadInvList(){
    var data = $.extend(getDialogParams(),$("#infoForm").form2json());
    
    var treeObj = $.fn.zTree.getZTreeObj("invClsTree");
    if(treeObj != null){
        var selectedNodes = $.fn.zTree.getZTreeObj("invClsTree").getSelectedNodes();
        if (selectedNodes.length > 0 && selectedNodes[0].invClsCode!= "root") {
            data.invClsCode = selectedNodes[0].invClsCode;
        }
    }
    
    ajaxSubmit({
        url: contextPath + "/db/inv/getInvListForRefer.do",
        data: {
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                fileList = result.data.filelist;
                $('#invGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.invList);
            }
        }
    });
}

function initPage(){
    window.setTimeout(function(){
        var dialogParams = getDialogParams();
        if(dialogParams == null){
        	return;
        }
        var invInfo = dialogParams.invInfo;
        
        if(invInfo != null && invInfo != ""){
            $("#txt_invInfo").val(invInfo);
            loadInvList()
        }
    },80)
}

function viewPic(href) {
    if (href != "" && href != null && href != window.location.href) {
        var diag = new Dialog();
        diag.Width = 10000;
        diag.Height = 10000;
        diag.ShowTop = true;
        diag.Title = "证书预览";
        diag.InnerHtml = '<img src="' + href + '" style="width:100%;" />'
        diag.show();
    }
}