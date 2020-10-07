var data = [];
var form = null;
//页面初始化
$(document).ready(function () {
	initToolBar();
	initGrid();
	initPage();
});

function initPage(){
	form = jQuery("#batchUploadRiskFileForm");
    jQuery(form).attr('method', 'POST');
    if (form.encoding) {
        jQuery(form).attr('encoding', 'multipart/form-data');
    }
    else {
        jQuery(form).attr('enctype', 'multipart/form-data');
    }
    form.context.charset = "UTF-8";
}

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "search",
            text: "<b style='font-size:14px'>查询</b>",
            iconCls: "icon-search",
            handler: function () {
            	loadGrid();
            }
        },{
            id: "upList",
            text: "<b style='font-size:14px'>多文件上传</b>",
            iconCls: "icon-up",
            handler: function () {
                addListClick();
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
	newJgGrid("dataGrid",{
        columns : [
            {code:"fileName",text:"文件名",width:200,isShow:true},
            {code:"fileSize",text:"文件大小",width:150,isShow:true},
            {code:"fileExtension",text:"文件类型",width:120,isShow:true}
        ],
        multiselect:true,
        ondblClickRow:function(rowId, rowIdx, colIdx){
            var rowData = $("#dataGrid").jqGrid("getRowData",rowId);
            if(rowData.fileExtension!=null&&(rowData.fileExtension+"").toLowerCase()=="pdf"){
            	window.open(rowData.fileUrl,"_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes")
            }
        }
    });
	
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
	var date = new Date();
	var year = date.getFullYear();
	var mouth = date.getMonth();
	if(date.getMonth()==0){
		year = year-1;
		mouth = "12";
	}else{
		mouth = mouth<10?'0'+mouth:mouth.toString()
	}
	var yearMouth = year.toString()+"-"+mouth;
	$("#txt_uploadTime").date(yearMouth,"yyyy-MM");
	$("#txt_uploadTime").val(yearMouth);
	loadGrid();
}

function loadGrid(){
	var userCode="";
	var filter = {
		uploadTime:$("#txt_uploadTime").val(),
		fileRole:true
	}
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
	ajaxSubmit({
        url: "getList.do",
        data : {
        	filter:JSON.stringify(filter)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	$('#dataGrid').jqGrid('loadData', result.data.userFileList);
            }
        }
    })
}

function addListClick(){
	ajaxSubmit({
        url: contextPath+"/system/accountStatus/checkAccountStatus.do",
        data : {
        	yearMonth:$("#txt_uploadTime").val()
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	var isAccountClose = result.data.isAccountClose;
            	if(isAccountClose==null||isAccountClose==false){
            		var list = [];
            		$("#sel_selUserList option").each(function () {
            	        var val = $(this).val();
            	        list.push(val);
            	    })
            	    if(list==null||list.length==0){
            	    	alertError("请先选择员工");
            	    	return false;
            	    }
		            $("#ajax_upload_file").val("");
            		openDialog({
                        dialogWidth: 400,
                        dialogHeight: 100,
                        elementId: "uploadDiv",
                        dialogCallBack: function () {
                        	if($("#ajax_upload_file").val()==null||$("#ajax_upload_file").val()=='') { 
                        		alertError("请选择文件");
                        		return false;
                        	}
                        	var formData = new FormData($("#batchUploadRiskFileForm")[0]);
                        	formData.append("uploadTime",$("#txt_uploadTime").val());
                        	formData.append("userList",JSON.stringify(list.join(",")));
                        	$.ajax({
                        		url : contextPath + "/system/userFile/uploadList.do",
                        		type : 'POST',
                        		dataType : 'json',
                        		data : formData,
                        		async : false,
                        		cache : false,
                        		contentType : false,
                        		processData : false,
                        		success : function(result) {
                        			if (result.isOk == "Y") {
                    	            	alertSuccess(result.message)
                    	            	loadGrid();
                    	            }else{
                    	            	alertError(result.message)
                    	            	loadGrid();
                    	            }
                        		},
                        		error : function(data) {
                        			alertError(data);
                        		}
                    		});
                        }
                    })
            	}else{
            		alertError("当前日期已关账不能上传");
            	}
            }
        }
    })
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
		if(data.fileId!=null){
			idsList.push(data.fileId);
		}
	}
	ajaxSubmit({
        url: "delete.do",
        data : {
        	ids:JSON.stringify(idsList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	alertSuccess(result.message)
            	loadGrid();
            }
        }
    })
}
