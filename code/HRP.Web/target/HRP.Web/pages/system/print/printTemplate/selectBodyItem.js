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
        }, '-', {
            id: "up",
            text: "上移",
            iconCls: "icon-up",
            handler: function () {
                var selRow = $("#itemGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要上移的行");
                    return;
                }
                var rowIndex = $("#itemGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#itemGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }

                var tempObj = rows[rowIndex - 1];
                rows[rowIndex - 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                $("#itemGrid").datagrid("loadData", rows);
                $("#itemGrid").datagrid("selectRow", rowIndex - 1);
            }
        }, {
            id: "down",
            text: "下移",
            iconCls: "icon-down",
            handler: function () {
                var selRow = $("#itemGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要下移的行");
                    return;
                }
                var rows =  $("#itemGrid").datagrid("getRows");
                var rowIndex = $("#itemGrid").datagrid("getRowIndex", selRow);

                if (rowIndex == rows.length - 1) {
                    return;
                }

                var tempObj = rows[rowIndex + 1];
                rows[rowIndex + 1] = rows[rowIndex];
                rows[rowIndex] = tempObj;
                
                $("#itemGrid").datagrid("loadData", rows);
                $("#itemGrid").datagrid("selectRow", rowIndex + 1);
            }
        },{
            id: "top",
            text: "置顶",
            iconCls: "icon-top",
            handler: function () {
                var selRow = $("#itemGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#itemGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#itemGrid").datagrid("getRows");
                if (rowIndex == 0) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i>0;i--){
                    rows[i] = rows[i-1];
                }

                rows[0] = tempObj;
                $("#itemGrid").datagrid("loadData", rows);
                $("#itemGrid").datagrid("selectRow", 0);
            }
        },{
            id: "bottom",
            text: "置底",
            iconCls: "icon-bottom",
            handler: function () {
                var selRow = $("#itemGrid").datagrid("getSelected");
                if (selRow == null) {
                    alert("请选择需要置顶的行");
                    return;
                }
                var rowIndex = $("#itemGrid").datagrid("getRowIndex", selRow);

                var rows =  $("#itemGrid").datagrid("getRows");
                if (rowIndex == rows.length-1) {
                    return;
                }
                
                var tempObj = rows[rowIndex];
                for(var i =rowIndex; i< rows.length-1;i++){
                    rows[i] = rows[i+1];
                }

                rows[rows.length-1] = tempObj;
                $("#itemGrid").datagrid("loadData", rows);
                $("#itemGrid").datagrid("selectRow", rows.length-1);
            }
        },'-',{
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
        idField:"fieldCode",
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
            rowData.isCheck = true;
            //$(this).datagrid('clearSelections')
            //$(this).datagrid('selectRow', rowIndex);
        },
        onUncheck: function (rowIndex, rowData) {
            rowData.isCheck = false;
            $(this).datagrid('clearSelections')
        },
        onCheckAll: function (rows) {
            for(var i = 0 ; i <rows.length; i++){
                rows[i].isCheck = true;
            }
        },
        onUncheckAll: function (rows) {
            for(var i = 0 ; i <rows.length; i++){
                rows[i].isCheck = false;
            }
        },
        onLoadSuccess: function (data) {
        }
    });
}

function getDefaultValue(rowData){
    return {
        itemName:rowData.fieldCode,
        itemContent:rowData.fieldText,
        itemWidth:80,
        itemFontName:"宋体",
        itemFontSize:9,
        itemAlign:"left",
        isWrap: "N",
        itemColor:"#000000",
        itemPrecision:"",
        isTotal:false
    }
}

function initPage(){
    window.setTimeout(function(){
        ajaxSubmit({
            url: contextPath + "/system/vouchTable/getVouchTableInfo.do",
            data:{
            	vouchId:getURLParameter("vouchTableId")
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    window.setTimeout(function(){
                        initGridData(result.data.vouchTableBody);
                    }, 100);
                }
            }
        });
        
    },100);
    
    $("#infoForm input, #infoForm select, #infoForm textarea").bind("change", function(){
        var selectedRow = $("#itemGrid").datagrid("getSelected");
        if(selectedRow != null){
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
            selectedRow.itemData = $.extend(selectedRow.itemData, data) ;
        }
    });
}

function initGridData(dataRows){
    var bodyData = {};
    var bodyItemList =[]

    var dialogParams= getDialogParams();
    if(dialogParams != null){
        bodyData = dialogParams.bodyData;
        bodyItemList = dialogParams.bodyItemList;
    }
    $("#tableForm").fill(bodyData)

    if(bodyItemList == null || bodyItemList.length==0){
        $("#itemGrid").datagrid("loadData", dataRows);
    }else{
        var newList = [];
        for(var j = 0 ; j < bodyItemList.length; j++){
            for(var i = dataRows.length-1 ; i >=0 ; i--){
                if(dataRows[i].fieldCode == bodyItemList[j].itemName){
                    newList.push(dataRows[i]);
                    dataRows.splice(i, 1)
                }
            }
        }
        
        for(var i = 0 ; i <dataRows.length; i++){
            newList.push(dataRows[i]);
        }
        $("#itemGrid").datagrid("loadData", newList);

        var dataRows = $("#itemGrid").datagrid("getRows");
        for(var i = 0 ; i < bodyItemList.length; i++){
            var idx = $("#itemGrid").datagrid("getRowIndex", bodyItemList[i].itemName);

            if (idx != -1) {
                $("#itemGrid").datagrid("checkRow", idx);
                dataRows[idx].itemData = bodyItemList[i];
                dataRows[idx].isCheck= true;
            }
        }
    }

    
}

function saveClick(){
    var rows = $('#itemGrid').datagrid('getRows');
    var itemList = [];
    for(var i = 0 ; i < rows.length; i++){
        if(rows[i].isCheck){
            var itemData = rows[i].itemData;
            if(itemData == null){
                itemData = getDefaultValue(rows[i]);
            }
            itemList.push(itemData);
        }
        
    }
    if(itemList.length==0){
        alert("请选择列");
        return;
    }

    var bodyData = $("#tableForm").form2json();
    var $chks = $("#tableForm").find(":checkbox:not(:checked)");    //取得所有未选中的checkbox
    if ($chks.length >= 0) {
        $chks.each(function () {
            var chkName = $(this).attr("name");

            if (bodyData[chkName] == null) {
                bodyData[chkName] = "N"
            }
        });
    }
    closeDialog({
        bodyData:bodyData,
        bodyItemList: itemList
    });
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