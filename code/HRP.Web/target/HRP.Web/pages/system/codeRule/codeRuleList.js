var isUpdate = false;
var addNew = false;
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
        	id:"add",
        	text:"新增",
        	iconCls:"icon-add",
        	enable:function(){
        		return !isModify();
        	},
        	handler:function(){
        		addClick();
        	}
        },{
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            enable:function(){
                return !isModify();
            },
            handler: function(){
                editClick();
            }
        }, {
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            enable:function(){
                return isModify();
            },
            handler: function () {
                saveClick();
            }
        }, {
            id: "undo",
            text: "取消",
            iconCls: "icon-undo",
            enable:function(){
                return isModify();
            },
            handler: function () {
                cancelClick();
            }
        }]
    });
}

//初始化table
function initGrid() {
    newJgGrid("dataGrid",{
        columns : [
            {code:"objectKey",text:"档案编码",width:120,isInput:true,isShow:true},
            {code:"objectName",text:"档案名称",width:150,isInput:true,isShow:true},
            {code:"objectRule",text:"编码规则",width:120,isInput:true,isShow:true}
        ],
        multiselect:false,
        isCellEditable:function(nm,rowData){
            if(!isModify()){
                return false;
            }
            if(addNew){
            	if(rowData.isNew == false){
            		if(nm == "objectKey" || nm == "objectName" || nm == "objectRule"){
            			return false;
            		}
            	}
            }else{
            	if(nm == "objectKey" || nm == "objectName"){
        			return false;
        		}
            }
            return true;
        }
    });
    
    
    newJgGrid("dataGrid1",{
        columns : [
            {code:"objectKey",text:"档案编码",width:120,isInput:true,isShow:true},
            {code:"objectName",text:"档案名称",width:150,isInput:true,isShow:true},
            {code:"objectRule",text:"编码规则",width:120,isInput:true,isShow:true}
        ],
        multiselect:false,
        isCellEditable:function(nm,rowData){
            return true;
        }
    });
}

function isModify(){
    return isUpdate;
}

function initPage() {
    loadData();
}

//加载规则数据
function loadData() {
    ajaxSubmit({
        url: contextPath + "/system/codeRule/getCodeRuleList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $('#dataGrid').jqGrid('loadData', result.data.codeRuleList);
                $('#dataGrid1').jqGrid('loadData', result.data.codeRuleList);
                isUpdate=false;
                $('#tb').toolbar("updateStatus");
            }
        }
    });
}
function addClick(){
	$("#dataGrid").jqGrid('addRowData',{ isNew: true});
	isUpdate=true;
	addNew = true;
	$('#tb').toolbar("updateStatus");
}
function editClick() {
    isUpdate=true;
    $('#tb').toolbar("updateStatus");
}
function saveClick() {
    var dataList = $('#dataGrid').jqGrid("getData");
    ajaxSubmit({
        url: contextPath + "/system/codeRule/save.do",
        data: { 
            codeRuleList:JSON.stringify(dataList) 
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	addNew = false;
                alertSuccess(result.message);
                loadData();
            }
        }
    });
}
function cancelClick(){
	addNew = false;
    loadData();
}