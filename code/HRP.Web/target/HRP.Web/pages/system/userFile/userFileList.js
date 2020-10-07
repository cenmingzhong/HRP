var data = [];
//页面初始化
$(document).ready(function () {
	initToolBar();
	initGrid();
	initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "search",
            text: "<b style='font-size:14px'>查询</b>",
            iconCls: "icon-search",
            handler: function () {
            	search();
            }
        },{
            id: "down",
            text: "<b style='font-size:14px'>文件下载</b>",
            iconCls: "icon-down",
            handler: function () {
                addClick();
            }
        },{
            id: "delete",
            text: "<b style='font-size:14px'>删除文件</b>",
            iconCls: "icon-up",
            handler: function () {
                deleteClick();
            }
        }]
    });
}

function initGrid(){
	newJgGrid("dataGrid",{
        columns : [
            {code:"fileName",text:"文件名",width:200,isShow:true},
            {code:"fileSize",text:"文件大小",width:150,isShow:true},
            {code:"createTime",text:"上传时间",width:150,isShow:true},
            {code:"fileExtension",text:"文件类型",width:120,isShow:true}
        ],
        multiselect:true
    });
	
	ajaxSubmit({
		url : contextPath + "/db/dept/getList.do",
		data : {
			filter:JSON.stringify({authFilter:true})
		},
		async : false,
		success : function(result) {
			if (result.isOk == "Y") {
				bindDropDown("sel_deptCode", result.data.deptList,"deptName", "deptCode", false);
			}
		}
	});
	
}

function initPage(){
	ajaxSubmit({
		url:contextPath+"/system/user/getList.do",
		data:{
			filters:JSON.stringify({fileRole:true})  
		},
		success:function(result){
			if(result.isOk=='Y'){
				var userList = result.data.userList;
				bindDropDown("sel_userList",userList,"sysUserName","sysUserCode",false)
			}
		}
	})
	$("#btn_AddUser").bind("click",function(){
		var selUserList = $('#sel_userList option:selected');
		if(selUserList!=null&&selUserList.length>0){
			for (var i = 0; i < selUserList.length; i++) {
				$("#sel_selUserList").append(selUserList[i])
			}
		}
	})
	$("#btn_RemoveUser").bind("click",function(){
		var selUserList = $('#sel_selUserList option:selected');
		if(selUserList!=null&&selUserList.length>0){
			for (var i = 0; i < selUserList.length; i++) {
				$("#sel_userList").append(selUserList[i])
			}
		}
	})
	
	$("#btn_AddDept").bind("click",function(){
		var selUserList = $('#sel_deptCode option:selected');
		if(selUserList!=null&&selUserList.length>0){
			for (var i = 0; i < selUserList.length; i++) {
				$("#sel_selDeptCode").append(selUserList[i])
			}
		}
	})
	$("#btn_RemoveDept").bind("click",function(){
		var selUserList = $('#sel_selDeptCode option:selected');
		if(selUserList!=null&&selUserList.length>0){
			for (var i = 0; i < selUserList.length; i++) {
				$("#sel_deptCode").append(selUserList[i])
			}
		}
	})
}

function search(){
    loadData();
}

function loadData(){
	var filter = $("#infoForm").form2json();
	var userCode="";
	
	$("#sel_selUserList option").each(function () {
        var val = $(this).val();
        if(userCode==""){
        	userCode = "'"+val+"'";
        }else{
        	userCode += ",'"+val+"'"
        }
    })
    if(userCode!=""){
    	filter.userCodeList = userCode;
    }
	
	var deptCode="";
	
	$("#sel_selDeptCode option").each(function () {
		var val = $(this).val();
		if(deptCode==""){
			deptCode = "'"+val+"'";
		}else{
			deptCode += ",'"+val+"'"
		}
	})
	if(deptCode!=""){
		filter.deptCodeList = deptCode;
	}
	filter.fileRole=true;
	ajaxSubmit({
        url:contextPath+"/system/userFile/getList.do",
        data: {
        	filter: JSON.stringify(filter)
        },
        success: function (result) {
            if (result.isOk=='Y') {
            	$('#dataGrid').jqGrid('loadData', result.data.userFileList);
            }
        }
    });
}

function addClick(){
	var ids =$('#dataGrid').jqGrid('getGridParam','selarrrow');
	
	if(ids == null || ids.length ==0){
		alertError("请先选择一个文件");
		return false;
	}
	var idList = []
	for (var i = 0; i < ids.length; i++) {
		var rowData = $("#dataGrid").jqGrid('getRowData',ids[i]);
		idList.push(rowData.fileId)
	}
	downloadUserFile({
		fileList:idList.join("','")
	});
	
}

function deleteClick(){
	var ids = $('#dataGrid').jqGrid("getGridParam","selarrrow");   
	if(ids==null||ids.length==0){
		alertError("请先选择文件");
		return;
	}
	var idsList = [];
	for (var i = 0; i < ids.length; i++) {
		var data = $('#dataGrid').jqGrid("getRowData",ids[i]);
		idsList.push(data.fileId);
	}
	ajaxSubmit({
        url: "delete.do",
        data : {
        	ids:JSON.stringify(idsList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	alertSuccess(result.message)
            	loadData();
            }
        }
    })
}