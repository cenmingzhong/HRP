//页面初始化
$(document).ready(function () {
    initToolBar();
    initGrid(); 
    loadSysNationList(); 

});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "新增",
            iconCls: "icon-add",
            handler: function () {
                addClick();
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            handler: function () {
                deleteClick()
            }
        },{
       	 id: "release",
         text: "发布",
         iconCls: "icon-verify",
         handler: function(){
        	 releaseClick();
         }
    },{
        id: "undo",
        text: "取消发布",
        iconCls: "icon-undo",
        handler: function(){
            unReleaseClick();
        }
    }]
    });
}


//初始化table
function initGrid() {
    $("#dataGrid").datagrid({
        width: 'auto',
        height: 'auto',
        striped: true,
        singleSelect: true,
        rownumbers: true,
        border:false,
        pagination:true,
        pageSize: 20,
        fit: true, //自动大小  
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'noticeTitle', title: '公告标题', width: 200 },
            /*{ field: 'warehouse.whName', title: '发布仓库', width: 200 },
            { field: 'mustRead', title: '是否必读', width: 100,
                formatter:function(value, rowData, rowIdex){
                    if(value =="Y"){
                        return "是"
                    }else if(value=="N"){
                        return "否"
                    }
                    return value;
                }
            },*/
            { field: 'noticeState', title: '公告状态', width: 100,
                formatter:function(value, rowData, rowIdex){
                    if(value =="A"){
                    	return "未发布"
                    }else if(value=="S"){
                    	return "已发布"
                    }
                }
            },
            { field: 'creator', title: '创建人', width: 100 },
            { field: 'createTime', title: '创建时间', width: 140 },
            { field: 'releaser', title: '发布人', width: 100 },
            { field: 'releaseTime', title: '发布时间', width: 140 }
        ]],
        onDblClickRow:function(rowIdex, rowData){
            openTab({
		        url: "toInfo.do?id="+rowData.id,
		        tabCallBack: function (resultVal) {
		            if (resultVal != null) {
		                loadSysNationList();
		            }
		        }
		    });
        }
    });
}
function addClick(){
    openTab({
	    url: "toInfo.do",
	    tabCallBack: function (resultVal) {
	        if (resultVal != null) {
	            loadSysNationList();
	        }
	    }
	});
}

function deleteClick(){
	var selRow = $('#dataGrid').datagrid("getSelected");

    if (selRow == null) {
        alertError("请选择需要删除的行");
        return;
    }
    confirmMsg("确定要删除吗？",function(){
         ajaxSubmit({
             url:  contextPath + "/system/sysNotice/delete.do",
             data: { 
                id: selRow.id
             },
             success: function (result) {
                 if (result.isOk == "Y") {
                     alertSuccess(result.message);
                     loadSysNationList();
                 } 
             }
         });
    })
}

//加载数据
function loadSysNationList() {
    ajaxSubmit({
        url: "getNoticeList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').datagrid({ loadFilter: pagerFilter }).datagrid('loadData', result.data.noticeList);
            }
        }
    });
}

function releaseClick(){
    var selRow = $('#dataGrid').datagrid("getSelected");

    if (selRow == null) {
        alertError("请选择需要发布的公告");
        return;
    }
    confirmMsg("确定要发布吗？",function(){
      
        ajaxSubmit({
            url: "releaseNotice.do",
            data: {
            	id: selRow.id
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    loadSysNationList();
                } 
            }
        })
    });
}

function unReleaseClick(){
    var selRow = $('#dataGrid').datagrid("getSelected");

    if (selRow == null) {
        alertError("请选择需要取消发布的公告");
        return;
    }
    confirmMsg("确定要取消发布吗？",function(){
      
        ajaxSubmit({
            url: "unReleaseNotice.do",
            data: {
                id: selRow.id
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    alertSuccess(result.message);
                    loadSysNationList();
                } 
            }
        })
    });
}