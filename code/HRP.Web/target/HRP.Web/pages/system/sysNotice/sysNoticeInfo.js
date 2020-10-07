var noticeObj = null;
$(document).ready(function(){
    initToolBar();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler:function(){
                saveClick();
            }
        },{
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function(){
                closeTab(true);
            }
        },{
            id: "addFile",
            text: "上传附件",
            iconCls: "icon-delline",
            type: "splitbutton",
            handler: function () {
                addFile();
            },
            menuList: [{
                id: "delFile",
                text: "删除附件",
                handler: function () {
                    delFile();
                }
            }]
        }]
    });
}
function initPage(){
    var um = UM.getEditor("txt_noticeContent"); 
    if(getURLParameter("id")!= null){
        ajaxSubmit({
	        url: "getNotice.do",
	        data: {
	            id: getURLParameter("id")
	        },
	        success: function (result) {
	            if (result.isOk == "Y") {
	            	noticeObj = result.data.sysNotice;
	            	$("#infoForm").fill(noticeObj);
	            	
	            	var table=$("<table id='attachGrid'></table>");
	            	var a=$("<a href='javascript:downloadAttach(\""+noticeObj.fileUrl+"\",\""+noticeObj.fileName+"\")'>"+noticeObj.fileName+"</a>");
	            	table.append(a);
	            	$("#attachGrid").html(table);
	            	$("#txt_noticeContent").html(noticeObj.noticeContent)
	            } 
	        }
	    });
    }
}
function saveClick(){
    var data = $.extend(noticeObj,$("#infoForm").form2json());//获取form表单所有值
    data.noticeContent = UM.getEditor("txt_noticeContent").getContent();
    ajaxSubmit({
        url: "save.do",
        data: {
            notice: JSON.stringify(data),
            attachFile : $("#attachFile").val()
        },
        success: function (data) {
            if (data.isOk == "Y") {
                alertSuccess(data.message);
                closeTab(true);
            } 
        }
    });
}

function addFile(){
    uploadFile({
        success: function (result) {
        	var table=$("<table id='attachGrid'></table>");
        	var a=$("<a href='javascript:downloadAttach(\""+result.data.uploadFile.fileUrl+"\",\""+result.data.uploadFile.fileName+"\")'>"+result.data.uploadFile.fileName+"</a>");
        	table.append(a);
        	$("#fileUrl").val(result.data.uploadFile.fileUrl);
        	$("#fileName").val(result.data.uploadFile.fileName);
        	$("#filePath").val(result.data.uploadFile.filePath);
        	$("#attachGrid").html(table);
        }
    });
}

function delFile(){
	$("#attachGrid").html("");
}
