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
            id: "add",
            text: "新建年度期间",
            iconCls: "icon-add",
            handler: function () {
                ajaxSubmit({
                    url: "getNewAccountYear.do",
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.newYear == null){
                                openDialog({
                                    elementId:"filterBlock",
                                    dialogWidth:220,
                                    dialogHeight:60,
                                    dialogCallBack:function(){
                                        if($("#txt_year").val()==""){
                                            alertError("请选择年度");
                                            return false;
                                        }
                                        createYearPeriod($("#txt_year").val());
                                    }
                                })
                            }else{
                                createYearPeriod(result.data.newYear);
                            }
                        }
                    }
                })
            }
        }, {
            id: "remove",
            text: "删除年度期间",
            iconCls: "icon-remove",
            handler: function () {
                var treeObj = $.fn.zTree.getZTreeObj("yearList");
                var nodes = treeObj.getSelectedNodes();
                if(nodes.length ==0 || nodes[0].nodeCode=="-1"){
                    alertError("请选择考核年度");
                    return;
                }
                confirmMsg("确认要删除该年度吗？",function(){
                    ajaxSubmit({
                        url: "deleteYearPeriod.do",
                        data:{
                            year:nodes[0].nodeCode
                        },
                        success: function (result) {
                            if (result.isOk == "Y") {
                                alertSuccess(result.message);
                                loadYearList();
                                loadPeriodList(-1)
                            }
                        }
                    });
                });
                
            }
        }, {
            id: "reload",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadYearList();
            }
        }]
    });
}
function createYearPeriod(newYear){
    ajaxSubmit({
        url: "createYearPeriod.do",
        data: {
            year:newYear
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alertSuccess(result.message);
                loadYearList();
            }
        }
    })
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
        onDblClickCell:function(rowIndex, field,value){
            if(field=="endDate" && rowIndex != 11){
                selectDate(rowIndex, field, value)
            }
        },
        onLoadSuccess: function (data) {

        }
    });
}
function initPage(){
    $("#txt_year").date("","yyyy")
    $("#txt_date").date("")
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
                     nodeName: "考核年度", 
                     parentCode: "" 
                 });
                 $.fn.zTree.init($("#yearList"), setting, accountYearList);
                 var treeObj = $.fn.zTree.getZTreeObj("yearList");
                 treeObj.expandAll(true);
                 $('#dataGrid').datagrid('loadData', []);
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

function selectDate(rowIndex, field,value){
    openDialog({
        elementId:"dateBlock",
        dialogWidth:220,
        dialogHeight:60,
        dialogCallBack:function(){
            if($("#txt_date").val()==""){
                alertError("请选择日期");
                return false;
            }
            var accountPeriod = $('#dataGrid').datagrid('getRows')[rowIndex];
            accountPeriod.endDate = $("#txt_date").val();
            updatePeriodDate(accountPeriod)
        }
    })
    $("#txt_date").val(value)
}

function updatePeriodDate(accountPeriod){
    ajaxSubmit({
        url: "updateEndDate.do",
        data: {
            accountPeriod:JSON.stringify(accountPeriod)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var treeObj = $.fn.zTree.getZTreeObj("yearList");
                loadPeriodList(treeObj.getSelectedNodes()[0].nodeCode);
            }
        }
    })
}