var params = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    loadGrid(); //初始化
    loadVenClsTree();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selRows = $('#dataGrid').datagrid("getSelections");
                if (selRows.length == 0) {
                    alert("请选择记录");
                    return;
                }
                closeDialog(selRows[0]);
            }
        }, {
            id: "search",
            text: "过滤",
            iconCls: "icon-search",
            handler: function () {
                search();
            }

        },{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
              loadVenList();
            }

        },{
             id: "cancel",
             text: "关闭",
             iconCls: "icon-cancel",
             handler: function () {
                 closeDialog();
             }
         }, '-', {
            id: "colSet",
            text: "栏目",
            iconCls: "icon-colSet",
            handler: function () {
                setDataGridCol("dataGrid")
            }
        }]
    });
}

function loadVenClsTree() {
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
                name: "venClsName"
            },
            simpleData: {
                enable: true,
                idKey: "venClsCode",
                pIdKey: "parentCode",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                loadVenList();
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/venCls/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {

                var dataList = result.data.venClsList;
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].venClsName = "(" + dataList[i].venClsCode + ")" + dataList[i].venClsName

                    if (dataList[i].parentCode == null||dataList[i].parentCode == "") {
                        dataList[i].parentCode = "root";
                    }
                }
                //增加一个根目录节点
                dataList.push({
                    venClsName: "供应商分类树",
                    venClsCode: "root",
                    parentCode: "",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                
                $.fn.zTree.init($("#venClsTree"), setting, dataList);
                loadVenList() ;
            }
        }
    });
}

//初始化table
function loadGrid() {
    $("#dataGrid").datagrid({
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        fit: true, //自动大小 
        border:false, 
        url: null,
        columns: [[
            { field: 'venCode', title: '供应商编码', width: 100 },
            { field: 'venName', title: '供应商名称', width: 150 },
            { field: 'venAbbName', title: '供应商简称', width: 100 },
            { field: 'venClsName', title: '供应商分类', width: 100 },
            { field: 'venPerson', title: '联系人', width: 100 },
            { field: 'venMobile', title: '联系人手机', width: 100 },
            { field: 'venPhone', title: '联系电话', width: 100 },
            { field: 'venEmail', title: '电子邮箱', width: 100 },
            { field: 'venAddress', title: '地址', width: 150 }
        ]],
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData);
        },        
        onSuccess: function (data) {
        }
    });
    showDataGridCol("dataGrid");
}

//加载人员数据
function loadVenList() {

    var selectedNodes = $.fn.zTree.getZTreeObj("venClsTree").getSelectedNodes();

    var venClsCode ="";
    if (selectedNodes.length > 0) {
        if(selectedNodes[0].venClsCode!= "root"){
            venClsCode = selectedNodes[0].venClsCode;
        }
    }

    var data = $("#infoForm").form2json();
    data.venClsCode = venClsCode;

    ajaxSubmit({
        url: contextPath + "/db/ven/getList.do",
        data:{
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.vendorList);
            }
        }
    });
}
function search(pageNum) {
    openDialog({
        dialogWidth: 300,
        dialogHeight: 200,
        elementId: "searchDiv",
        dialogCallBack: function () {
           loadVenList();
        }
    });
}
