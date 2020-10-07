var data = [];
var userCode = "";
//页面初始化
$(document).ready(function () {
	initToolBar();
	initGrid();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "up",
            text: "<b style='font-size:14px'>文件上传</b>",
            iconCls: "icon-up",
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
	userCode = session.getUserCode();
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
	$("#txt_uploadTime").val(yearMouth);
	loadGrid();
}
function loadGrid(){
	
	ajaxSubmit({
        url: "getList.do",
        data : {
        	filter:JSON.stringify({
        		uploadTime:$("#txt_uploadTime").val(),
        		userCode:userCode
        	})
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	$('#dataGrid').jqGrid('loadData', result.data.userFileList);
            }
        }
    })
}

function addClick(){
	ajaxSubmit({
        url: contextPath+"/system/accountStatus/checkAccountStatus.do",
        data : {
        	yearMonth:$("#txt_uploadTime").val()
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	var isAccountClose = result.data.isAccountClose;
            	if(isAccountClose!=null&&isAccountClose){
            		alertError("当前日期已关账不能上传");
            		return;
            	}else{
            		uploadFile({
            			action: contextPath + "/system/userFile/upload.do?uploadTime="+$("#txt_uploadTime").val(),
            			isImage:false,
            			success: function (result) {
            				if (result.isOk == "Y") {
            					alertSuccess(result.message)
            					loadGrid();
            				}
            			}
            		})
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
            	loadGrid();
            }
        }
    })
}

