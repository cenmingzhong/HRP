var setting={};

var statuses = { Null: "U", Save: "S", New: "N", Edit: "E", Veri: "V", Clos: "C", Tran: "T" ,Check:"CH" };
var billStatus = "U";

//页面初始化
$(document).ready(function () {
    initToolBar();
    initTree();
    initGrid();
    initPage();
});
//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "addClass",
            text: "增加分类",
            iconCls: "icon-add",
            enable:function(){
                return billStatus != statuses.Edit
            },
            handler: function () {
                addSetting();
            }
        }, {
            id: "editClass",
            text: "修改分类",
            iconCls: "icon-edit",
            enable:function(){
                return billStatus != statuses.Edit
            },
            handler: function () {
                editSetting();
            }
        }, {
            id: "deleteClass",
            text: "删除分类",
            iconCls: "icon-remove",
            enable:function(){
                return billStatus != statuses.Edit
            },
            handler: function () {
                deleteSetting();
            }
        },'-',{
            id: "refresh",
            text: "刷新",
            iconCls: "icon-reload",
            enable:function(){
                return billStatus != statuses.Edit
            },
            handler: function () {
            	initPage();
            }
        }]
    });
}

//初始化档案树
function initTree() {
    setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        data: {
            key: {
                name: "name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parent",
                rootPId: ""
            }
        },
        callback: {
            onClick:  function (e, treeId, treeNode) {
                getDetail();
            }
        }
    };
}
function initGrid(){
	$("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        pagination:true,
        rownumbers: true,
        pageSize:20,
        border:false,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'name', title: '类别名称', width: 120 }
        ]],
        onDblClickRow: function (index, row) {
        	editSetting();
        }
    });
}

function ctrlStatus(){
    $('#tb').toolbar("updateStatus");
}

function initPage(){
	ctrlStatus();
	ajaxSubmit({
        url:contextPath+"/kpi/setting/workloadType/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var workloadTypeList = result.data.workloadTypeList;
                $.each(workloadTypeList,(index,data)=>{
                	if(data.parent==null||data.parent==''){
                		data.parent = "root";
                	}
                });
                workloadTypeList.push({
                	name: "工作量类型列表",
                    id: "root",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                
                $.fn.zTree.init($("#zTree"), setting, workloadTypeList);
                
                var subjZTree = $.fn.zTree.getZTreeObj("zTree");
                var node = subjZTree.getNodesByFilter(function(node){
            		return node.id=="root";
            	});
                subjZTree.setChkDisabled(node[0],true,false,true);
            }
        }
    });
}

function addSetting() {
	$("#infoDiv").fill({})
	var zTreeObj = $.fn.zTree.getZTreeObj("zTree");  
	var selectedNodes = zTreeObj.getSelectedNodes();
	if(selectedNodes.length==0){
		alertError("请选择一个类型为上一层类型");
		return;
	}
	openDialog({
        dialogHeight: 150,
        dialogWidth: 400,
        elementId:"infoDiv",
        dialogCallBack: function (msg) {
        	var filter = $("#infoForm").form2json();
    		filter.parent=(selectedNodes[0].id=="root"?null:selectedNodes[0].id);
        	ajaxSubmit({
                url: contextPath + "/kpi/setting/workloadType/save.do",
                data: { 
                	workloadType: JSON.stringify(filter)
                },
                success: function (result) {
                    if (result.isOk == "Y") {
                        alertSuccess(result.message)
                        initPage();
                        $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData',[]);
                    }
                }
            });
        }
    });
}
function editSetting() {
	var selRow = $('#dataGrid').datagrid("getSelected");
    if (selRow == null) {
        alertError("请选择一行");
        return;
    }
    
	var info = selRow;
	
	ajaxSubmit({
        url: contextPath + "/kpi/setting/workloadType/getInfo.do",
        data: { 
        	id:info.id
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	var workloadType = result.data.workloadType;
            	$("#infoDiv").fill(workloadType);
            	openDialog({
                    dialogHeight: 150,
                    dialogWidth: 400,
                    elementId:"infoDiv",
                    dialogCallBack: function (msg) {
                    	var filter = $.extend(workloadType,$("#infoForm").form2json());
                    	filter.parent = filter.parent==null||filter.parent==''||filter.parent=='root'?null:filter.parent;
                    	ajaxSubmit({
                            url: contextPath + "/kpi/setting/workloadType/save.do",
                            data: { 
                            	workloadType: JSON.stringify(filter)
                            },
                            success: function (result) {
                                if (result.isOk == "Y") {
                                    alertSuccess(result.message)
                                    initPage();
                                    $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData',[]);
                                }
                            }
                        });
                    }
                });
            }
        }
    });
}
function deleteSetting() {
	var selRow = $('#dataGrid').datagrid("getSelected");
    if (selRow == null) {
        alertError("请选择一行");
        return;
    }
    
	var info = selRow;
	if(info.isEnd==false){
		alertError("请先删除最后的末级分类");
		return false;
	}
    confirmMsg("确定要删除吗？",function(){
        ajaxSubmit({
            url: contextPath + "/kpi/setting/workloadType/delete.do",
            data: { 
                id: info.id 
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message)
                    initPage();
                    $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData',[]);
                }
            }
        });
    })
}
var list = [];
function getDetail(){
	var zTreeObj = $.fn.zTree.getZTreeObj("zTree");  
	
	var selectedNodes = zTreeObj.getSelectedNodes();
	if(selectedNodes==null||selectedNodes.length!=1){
		alertError("请选择一个分类");
		return false;
	}
	var info = selectedNodes[0];
	list = [];
	if(info.id!="root"){
		list.push(info);
	}
	if(info.children!=null&&info.children.length>0){
		showNext(info.children);
	}
	$('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData',list);
}

function showNext(info){
	for (var i = 0; i < info.length; i++) {
		list.push(info[i]);
		if(info[i].children!=null&&info[i].children.length>0){
			showNext(info[i].children);
		}
	}
}