var params = {};

//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化
    loadDeptTree();
    loadPersonList();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [ {
            id: "save",
            text: "确定",
            iconCls: "icon-save",
            handler: function () {
                var selectRows = $("#dataGrid").datagrid("getSelections");
                if (selectRows.length == 0) {
                    alert("请选择人员");
                    return;
                }
                closeDialog(selectRows[0]);
            }
        },'-',{
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                openDialog({
                    elementId:"filterBlock",
                    dialogWidth:300,
                    dialogHeight:150,
                    dialogCallBack:function(){
                        loadPersonList();
                    }
                })
            }
        },{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadPersonList();
            }
        },'-', {
            id: "cancel",
            text: "取消",
            iconCls: "icon-cancel",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

function loadDeptTree() {
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
                name: "deptCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "deptCode",
                pIdKey: "deptParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function(e, treeId, treeNode){
                loadPersonList();
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/db/dept/getList.do",
        async:false,
        success: function (result) {
            if (result.isOk== "Y") {
                var deptList = result.data.deptList;
                for(var i = 0 ; i < deptList.length; i++){
                    if(deptList[i].deptParent =="" || deptList[i].deptParent == null){
                        deptList[i].deptParent= "root"
                    }
                    deptList[i].deptCodeName = "("+deptList[i].deptCode+")"+ deptList[i].deptName;
                }

                deptList.push({ 
                    deptCode: "root", 
                    deptCodeName: "部门列表", 
                    deptParent: "" 
                });
                $.fn.zTree.init($("#deptTree"), setting, deptList);

                var treeObj = $.fn.zTree.getZTreeObj("deptTree");
                var nodes = treeObj.getNodes();
                treeObj.expandNode(nodes[0], true, false, false);

            } 
        }
    });
}

//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: true,
        rownumbers: true,
        pagination: true,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        border:false,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'personCode', title: '人员编码', width: 100 },
            { field: 'personName', title: '人员姓名', width: 100 },
            { field: 'personTypeName', title: '人员类别', width: 100 },
            { field: 'deptCode', title: '部门编码', width: 100 },
            { field: 'deptName', title: '部门名称', width: 100 }
        ]],
        onDblClickRow:function(rowIndex, rowData){
            closeDialog(rowData)
        },
        onLoadSuccess: function (data) {
        }
    });
}

//加载人员数据
function loadPersonList() {
    var selectedNodes = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();

    var deptCode ="";
    if (selectedNodes.length > 0) {
        if(selectedNodes[0].deptCode != "root"){
            deptCode = selectedNodes[0].deptCode;
        }
    }
    var data = $("#infoForm").form2json();
    data.deptCode = deptCode;
    ajaxSubmit({
        url: contextPath + "/db/person/getList.do",
        data: { 
            filter: JSON.stringify(data)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.personList);
            } 
        }
    });
}
