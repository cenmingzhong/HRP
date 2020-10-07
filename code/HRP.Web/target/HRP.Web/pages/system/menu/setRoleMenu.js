//页面初始化
var sysMenuCode = "";
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [ {
            id: "save",
            text: "保存",
            iconCls: "icon-edit",
            handler: function () {
            	saveClick();
            }
        },'-',{
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
            	 openDialog({
                     dialogWidth: 400,
                     dialogHeight: 80,
                     elementId: "filterBlock",
                     dialogCallBack: function () {
                        loadData();
                     }
                 })
            }    
        },{
            id: "reload",
            text: "刷新",
            iconCls: "icon-reload",
            handler: function () {
                loadData();
            }
        }]
    });
}


function initGrid(){ 
    $("#dataBlock").jqGrid({
        data: [],
        datatype : "local",
        colNames : [ '角色编码', '角色名称', '角色描述'],
        colModel : [ 
            {name : 'sysRoleCode',label : '角色编码',width : 105,editable:true}, 
            {name : 'sysRoleName',label : '角色名称',width : 105,editable:true}, 
            {name : 'sysRoleDesc',label : '角色描述',width : 190,editable:true}
        ],
        rowNum:500,
        multiselect: true, 
        multiboxonly:true, 
        pagination:false,
        mtype : "post",
        styleUI:"Bootstrap",
        scroll:1,
        viewrecords : true,
        pager:"gridpager",
        loadui:"enable",
        loadtext:"请稍等...",
        shrinkToFit:false,
        rownumbers:false,
        autowidth:true,
        height:100,
        afterEditCell:function(value, dataRow, cellName,rowIndex, colIndex){
        },
        loadComplete : function() {
            var table = this;
            setTimeout(function(){
                var domRows = $('#dataBlock').find(".jqgrow");
                $.each(domRows, function (idx, domRow) {
                    $("input[name=name]", domRow).bind("change", function () {
                    });
                });
            }, 0);
        }
    });
}

function initPage(){
	sysMenuCode = getURLParameter("sysMenuCode");
    loadData();
}

function loadData(){
    ajaxSubmit({
        url:contextPath+"/system/role/getList.do",
        data:{
        	filter:JSON.stringify({sysRoleName:$("#txt_SysRoleName").val()})
        },
        success:function(result){
            if(result.isOk=='Y'){
            	var dataList = [];
            	dataList = result.data.roleList;
            	$("#dataBlock").jqGrid('clearGridData')
                $("#dataBlock").jqGrid('loadData',dataList)
            }
        }
    })
}
function saveClick(){
	var selRows = jQuery("#dataBlock").jqGrid("getGridParam","selarrrow");
    if(selRows.length ==0 ){
        alertError("请选择一行记录");
        return;
    }
    var codeList = [];
    for(var i = 0; i < selRows.length; i++){
    	var rowData = $("#dataBlock").jqGrid("getRowData",selRows[i]);
    	codeList.push(rowData.sysRoleCode);
    }

    ajaxSubmit({
	    url:contextPath+"/system/roleMenu/setRoleMenu.do",
	    data:{
	    	sysMenuCode:sysMenuCode,
	    	codeList:JSON.stringify(codeList)
	    },
	    success:function(result){
	        if(result.isOk=="Y"){
	            alertSuccess(result.message);
	            closeDialog();
	        }
	    }
    });
}