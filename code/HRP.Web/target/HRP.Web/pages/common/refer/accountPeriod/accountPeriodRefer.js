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
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selRows = $("#dataGrid").datagrid("getSelections");
                if(selRows.length ==0){
                    alertError("请选择会计期间");
                    return;
                }
                closeDialog(selRows[0])
            }
        }, {
            id: "reload",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
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
            { field: 'month', title: '期间', align: 'center', halign: 'center', width: 60 },
            { field: 'beginDate', title: '开始日期', align: 'center', halign: 'center', width: 100 },
            { field: 'endDate', title: '截至日期', align: 'center', halign: 'center', width: 100 }
        ]],
        pagination: false,
        pageSize: 20,
        rownumbers: false,
        fitColumns: false,
        onDblClickRow:function(rowIdx, rowData){
          closeDialog(rowData);
        },
        onLoadSuccess: function (data) {

        }
    });
}
function initPage(){
    loadYearList();
}

function loadYearList(){
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
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeCode",
                pIdKey: "parentCode",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                loadPeriodList(treeNode.nodeCode);
            }
        }
    };
    ajaxSubmit({
        url:"getAccountYearList.do",
         success: function (result) {
             if (result.isOk == "Y") {
                 var accountYearList = result.data.accountYearList;
                 for(var i = 0 ; i < accountYearList.length; i++){
                     accountYearList[i].parentCode= "-1";
                     accountYearList[i].nodeCode= accountYearList[i].year;
                     accountYearList[i].nodeName= accountYearList[i].year;
                 }
    
                 accountYearList.push({ 
                     nodeCode: "-1", 
                     nodeName: "会计年度", 
                     parentCode: "" 
                 });
                 $.fn.zTree.init($("#yearList"), setting, accountYearList);
                 var treeObj = $.fn.zTree.getZTreeObj("yearList");
                 treeObj.expandAll(true);
            }
        }
    });
}
function loadPeriodList(year) {
    ajaxSubmit({
        url: "getAccountPeriodList.do",
        data:{
            year:year
        },
        success: function (result) {
            if(result.isOk=="Y"){
                $('#dataGrid').datagrid('loadData', result.data.accountYearList);
            }
        }
    });
}
