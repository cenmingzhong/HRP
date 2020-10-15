//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); //初始化table
     // loadDeptTree();
    loadUserList();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            handler: function () {
                openDialog({
                    dialogHeight: 450,
                    dialogWidth: 600,
                    url: "toInfo.do",
                    dialogCallBack: function (resultVal) {
                        if (resultVal != null) {
                            loadUserList();
                        }
                    }
                });
            }
        }, {
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                var selRow = $('#dataGrid').datagrid("getSelected");
                if (selRow == null) {
                    alertError("请选择一行数据！");
                    return;
                }
                var teacherNumber = selRow.teacherNumber;
                openDialog({
                    dialogHeight: 450,
                    dialogWidth: 600,
                    url: "toInfo.do?teacherNumber=" + encodeURI(teacherNumber),
                    dialogCallBack: function (msg) {
                        if (msg) {
                            loadUserList();
                        }
                    }
                });
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
                var selRows = $('#dataGrid').datagrid("getSelections");

                if (selRows.length ==0) {
                    alertError("请选择需要删除的行");
                    return;
                }
                confirmMsg("确定要删除吗？",function(){
                     var teacherNumbers = [];
                     for(var i = 0 ; i < selRows.length ; i++){
                         teacherNumbers.push(selRows[i].teacherNumber)
                     }

                     ajaxSubmit({
                         url: contextPath + "/db/userMessageManager/delete.do",

                         data: {
                             teacherNumbers: JSON.stringify(teacherNumbers)
                         },
                         success: function (result) {
                             console.log(contextPath);
                             if (result.isOk == "Y") {
                                 alertSuccess(result.message);
                                 loadUserList();
                             } 
                         }
                     });
                })
            }
        }, {
            id:"refresh",
            text:"刷新",
            iconCls:"icon-reload",
            handler:function () {
                loadUserList();
            }
        }, {
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchClick();

            }
        }]
    });
}

// function loadDeptTree() {
//     var setting = {
//         view: {
//             dblClickExpand: true,
//             showLine: true,
//             selectedMulti: false
//         },
//         check: {
//             enable: false
//         },
//         data: {
//             key: {
//                 name: "deptCodeName"
//             },
//             simpleData: {
//                 enable: true,
//                 idKey: "deptCode",
//                 pIdKey: "deptParent",
//                 rootPId: ""
//             }
//         },
//         callback: {
//             onClick: function (e, treeId, treeNode) {
//                 loadUserList();
//             }
//         }
//     };
//     ajaxSubmit({
//         url:contextPath+"/db/dept/getList.do",
//          success: function (result) {
//              if (result.isOk == "Y") {
//                  var deptList = result.data.deptList;
//                  for(var i = 0 ; i < deptList.length; i++){
//                      if(deptList[i].deptParent =="" || deptList[i].deptParent == null){
//                          deptList[i].deptParent= "root"
//                      }
//                      deptList[i].deptCodeName = "("+deptList[i].deptCode+")"+ deptList[i].deptName;
//                  }
//
//                  deptList.push({
//                      deptCode: "root",
//                      deptCodeName: "教师列表",
//                      deptParent: ""
//                  });
//                  $.fn.zTree.init($("#deptTree"), setting, deptList);
//
//                  var treeObj = $.fn.zTree.getZTreeObj("deptTree");
//                  var nodes = treeObj.getNodes();
//                  treeObj.expandNode(nodes[0], true, false, false);
//
//              }
//          }
//      });
//      $.fn.zTree.init($("#deptTree"), setting, []);
// }


//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        //fitColumns: true,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        pagination:true,
        border:false,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'teacherNumber', title: '教师编号', width: 100 },
            { field: 'teacherName', title: '教师姓名', width: 100 },
            { field: 'positionNumber', title: '岗位编号', width: 120 },
            { field: 'teachPositionType', title: '教学岗位类型', width: 120 },
            { field: 'positionLevel', title: '岗位级别', width: 120 },
            { field: 'permissionNumber', title: '权限编号', width: 120 },
        ]],
        onClickRow: function (rowIndex, rowdata) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
            $(this).datagrid('checkRow', rowIndex);
        },
        onLoadSuccess: function (data) {
            
        }
    });
}

function searchClick() {
    openDialog({
        dialogWidth: 250,
        dialogHeight: 150,
        elementId: "searchDiv",
        dialogCallBack: function () {
           var data = $("#infoForm").form2json();
            loadUserList(data);

        }
    });
}

//加载人员数据
function loadUserList(data) {
    // var selectedNodes = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
    // var deptCode ="";
    // if (selectedNodes.length > 0) {
    //     if(selectedNodes[0].deptCode!= "root"){
    //         deptCode = selectedNodes[0].deptCode;
    //     }
    // }
    // if(!data){
    //     data = {};
    //     data.deptCode = deptCode; //把部门编号传入data
    // }
    ajaxSubmit({
        url: contextPath + "/db/userMessageManager/getList.do",
        data: { 
            filter: JSON.stringify(data) 
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.userMessageManagerList);
            }
        }
    });
}

