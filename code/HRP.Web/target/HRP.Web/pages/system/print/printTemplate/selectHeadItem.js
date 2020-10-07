//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initGrid();
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                saveClick();
            }
        }, {
            id: "back",
            text: "放弃",
            iconCls: "icon-back",
            handler: function () {
                closeDialog();
            }
        },{
            id: "position",
            text: "定位",
            iconCls: "icon-search",
            handler: function () {
                positionRow();
            }
        }]
    });
}


function initGrid() {
    $("#itemGrid").datagrid({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        sortOrder: 'desc',
        collapsible: false, //是否可折叠的  
        fit: true, //自动大小  
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        idField: "fieldCode",
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'fieldCode', title: '字段标识', align: 'left', halign: 'center', width: 60},
            { field: 'fieldText', title: '字段名称', align: 'left', halign: 'center', width: 80}
        ]],
        pagination: false,
        pageSize: 500,
        rownumbers: false,
        fitColumns: true,
        showFooter: true,
        checkOnSelect:false,
        selectOnCheck:false,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('selectRow', rowIndex);

            var itemData= rowData.itemData;
            if(itemData == null){
                itemData = getDefaultValue(rowData)
            }
            $("#infoForm").fill(itemData);
        },
        onCheck: function (rowIndex, rowData) {
            //$(this).datagrid('clearSelections')
            //$(this).datagrid('selectRow', rowIndex);
        },
        onUncheck: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
        },
        onLoadSuccess: function (data) {
        }
    });
}

function getDefaultValue(rowData){
    return {
        itemName:rowData.fieldCode,
        itemType:1,
        itemClass:2,
        itemClassName:"Text",
        itemTop:0,
        itemLeft:0,
        itemWidth:150,
        itemHeight:22,
        itemContent:rowData.fieldText+"：",
        itemFontName:"宋体",
        itemFontSize:9,
        itemColor:"#000000",
        pageIndex:""
    }
}

function initPage(){
    window.setTimeout(function(){
    	var vouchTableId=getURLParameter("vouchTableId");
        ajaxSubmit({
            url: contextPath + "/system/vouchTable/getVouchTableInfo.do",
            data:{
            	vouchId:vouchTableId
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    $('#itemGrid').datagrid('loadData', result.data.vouchTableHead);
                    window.setTimeout(initGridData, 100);
                }
            }
        });
        
    },100);
    $("#infoForm input, #infoForm textarea").bind("change", function(){
        var selectedRow = $("#itemGrid").datagrid("getSelected");
        if(selectedRow != null){
            var itemData = selectedRow.itemData;
            if(itemData == null){
                itemData = getDefaultValue(selectedRow);
            }

            var data = $("#infoForm").form2json()
            var $chks = $("#infoForm").find(":checkbox:not(:checked)");    //取得所有未选中的checkbox
            if ($chks.length >= 0) {
                $chks.each(function () {
                    var chkName = $(this).attr("name");

                    if (data[chkName] == null) {
                        data[chkName] = "N"
                    }
                });
            }
            selectedRow.itemData = $.extend(itemData, data) ;
        }
    });
}

function initGridData(){
    var headItemList = [];
    var dialogParams= getDialogParams();
    if(dialogParams != null){
        headItemList = dialogParams.headItemList;
        for(var i = 0 ; i < headItemList.length; i++){
            if(headItemList[i].itemClassName =="BarCode"){
                headItemList[i].isBarCode ="Y"
            }
        }
    }
    
    var dataRows = $("#itemGrid").datagrid("getRows");
    for(var i = 0 ; i < headItemList.length; i++){
        var idx = $("#itemGrid").datagrid("getRowIndex", headItemList[i].itemName);

        if (idx != -1) {
            $("#itemGrid").datagrid("checkRow", idx);
            dataRows[idx].itemData = headItemList[i];
        }

    }
}

function saveClick(){
    var selectRows = $('#itemGrid').datagrid('getChecked');
    var itemList = [];
    for(var i = 0 ; i < selectRows.length; i++){
        var itemData = selectRows[i].itemData;
        if(itemData == null){
            itemData = getDefaultValue(selectRows[i]);
        }
        if(itemData.isBarCode=="Y"){
            itemData.itemClassName ="BarCode";
        }else{
            itemData.itemClassName ="Text";
        }
        itemList.push(itemData);
    }
    closeDialog(itemList);
}
var selRow=-1;
function positionRow(){
    selRow = -1;
    var isFind = false;
    openDialog({
        dialogWidth: 300,
        dialogHeight: 60,
        elementId: "positionBlock",
        dialogCallBack: function () {
            if ($("#txt_fieldText").val() != "") {
                var rows =  $("#itemGrid").datagrid("getData").rows;
                var isMapping = false;
                for(var i = selRow+1 ; i < rows.length ;i++){
                    if(rows[i].fieldText.indexOf($("#txt_fieldText").val()) >-1){
                        selRow = i;
                        $('#itemGrid').datagrid('unselectAll');
                        $('#itemGrid').datagrid('scrollTo', selRow);
                        window.setTimeout(function(){
                            $('#itemGrid').datagrid('selectRow', selRow);
                        },300)
                        
                        isFind = true;
                        isMapping = true;
                        break;
                    }
                }
                if(!isMapping){
                    selRow = -1;
                }
                if (!isFind) {
                    alert("该字段不存在")
                    $("#txt_fieldText").focus();
                    return false;
                }
                return false;
            } else {
                alert("请输入字段名称");
                $("#txt_fieldText").focus();
                return false;
            }
        }
    });
    $("#txt_fieldText").focus();
}