//页面初始化
$(document).ready(function () {
    initToolBar();
    initTree();
    initPage(); //初始化
    loadGrid();
});
//初始化工具栏
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
            id: "getAllAppointment",
            text: "获取工作量",
            iconCls: "icon-add",
            handler: function () {
            	getAllAppointment();
            }
        }, {
        	id: "edit",
            text: "增行",
            iconCls: "icon-addline",
            handler: function () {
                addSetting();
            }
        }, {
            id: "delete",
            text: "减行",
            iconCls: "icon-delline",
            handler: function () {
              delSetting();
            }
        },'-' , {
            id: "colSet",
            text: "栏目",
             iconCls: "icon-colSet",
             handler: function () {
            	 setjqGridCol('dataGrid');
             }
     	}]
    });
}
//初始化table
function loadGrid() {
	newJgGrid("dataGrid",{
        columns : [
            {code:"itemName",text:"工作量名称",isInput:true,width:150,align:"left"},
            {code:"target",text:"目标",width:150,isInput:true,dataType:'number',align:"right"}
        ],
        bindEvent:{
        	"itemName":function(obj,rowOpts,rowData){
        		Refer.WorkloadItem({
        			inputObj:$(obj),
        			referCallBack:function(returnFun){
        				if(returnFun!=null){
        					rowData.itemName = returnFun.itemName;
        					rowData.workloadItemId = returnFun.id;
        					$('#dataGrid').jqGrid('setRowData',rowOpts.rowId,rowData);
        				}
        			}
        		})
        	}
        },
        showCol:true
    });
	showJgGridCol('dataGrid');
}

function initPage(){
	
}
//初始化档案树
function initTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        data: {
            key: {
                name: "appointmentName"
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
            	loadList();
            }
        }
    };
    ajaxSubmit({
        url:contextPath+"/kpi/setting/appointment/getList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var appointmentList = result.data.appointmentList;
                $.each(appointmentList,(index,data)=>{
            		data.parent = "root";
                });
                appointmentList.push({
                	appointmentName: "岗位列表",
                    id: "root",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                
                $.fn.zTree.init($("#zTree"), setting, appointmentList);
                
                var subjZTree = $.fn.zTree.getZTreeObj("zTree");
                var node = subjZTree.getNodesByFilter(function(node){
            		return node.id=="root";
            	});
                subjZTree.setChkDisabled(node[0],true,false,true);
            }
        }
    });
}
//加载数据
function loadList() {
	var zTreeObj = $.fn.zTree.getZTreeObj("zTree");
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes!=null&&nodes.length>0&&nodes[0].id!='root'){
		log(nodes)
		ajaxSubmit({
			url: contextPath + "/kpi/setting/appointmentTarget/getList.do",
			data:{
				filter:JSON.stringify({appointmentId:nodes[0].id})
			},
			success: function (result) {
				if (result.isOk == "Y") {
					//log(result.data.appointmentTargetList)
					$('#dataGrid').jqGrid('loadData', result.data.appointmentTargetList);
					showJgGridCol('dataGrid');
				}
			}
		});
	}else{
		$('#dataGrid').jqGrid('loadData', []);
		showJgGridCol('dataGrid');
	}
}

function saveSetting(){
	var dataList = $('#dataGrid').jqGrid('getAllData');
	dataList = $.grep(dataList,(data,index)=>{
		return data.target!=null&&data.target!=''
	})
	ajaxSubmit({
        url: contextPath + "/kpi/setting/appointmentTarget/save.do",
        data:{
        	appointmentTargetList:JSON.stringify(dataList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	alertSuccess(result.message);
            	loadList();
            }
        }
	})
}

function addSetting(){
	var zTreeObj = $.fn.zTree.getZTreeObj("zTree");
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes!=null||nodes.length==0||nodes[0].id=='root'){
		alertError("请先选择一个岗位");
		return;
	}
	$("#dataGrid").jqGrid('addRowData',{ isNew: true,appointmentId:nodes[0].id,appointmentName:nodes[0].appointmentName})
}

function delSetting(){
	var ids=$('#dataGrid').jqGrid("getSelectedIds");
    if(ids.length ==0){
        alertError("请选择需要删除的行");
        return;
    }
    for(var i=ids.length-1; i >=0 ; i--){
        $("#dataGrid").jqGrid('delRowData',ids[i])
    }
}

function getAllAppointment(){
	var zTreeObj = $.fn.zTree.getZTreeObj("zTree");
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes!=null&&nodes.length==0){
		alertError("请先选择一个岗位");
		return;
	}
	ajaxSubmit({
        url: contextPath + "/kpi/setting/workloadItem/getList.do",
        data:{
        	filter:JSON.stringify({})
        },
        success: function (result) {
            if (result.isOk == "Y") {
				var dataList = $('#dataGrid').jqGrid('getAllData');
				var list =[];
				var workloadItemList = result.data.workloadItemList;
				if(workloadItemList!=null&&workloadItemList.length>0){
					$.each(workloadItemList,(index,data)=>{
						let flag = true;
						for (var int = 0; int < dataList.length; int++) {
							if(dataList[int].workloadItemId == data.id){
								flag = false;
								list.push(dataList[int])
							}
						}
						if(flag){
							list.push({
								workloadItemId:data.id,
								itemName:data.itemName,
								appointmentId:nodes[0].id,
								appointmentName:nodes[0].appointmentName
							})
						}
					})
				}
                $('#dataGrid').jqGrid('loadData', list);
                showJgGridCol('dataGrid');
            }
        }
    });
}