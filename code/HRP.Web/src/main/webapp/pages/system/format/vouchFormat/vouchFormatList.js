//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initTree();
    initGrid(); //初始化单据树
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
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeTab();
            }
        }]
    });
}

//初始化档案树
function initTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        data: {
            key: {
                name: "name",
                children: "children"
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                if (treeNode.children != null) {
                    
                } else {
                    getVouchFormat();
                }
                
            }
        }
    };
    
    ajaxSubmit({
        url:"getVouchTypeTree.do",
        success:function(result){
            if(result.isOk=="Y"){
            	$.fn.zTree.init($("#vouchList"), setting, result.data.vouchTypeTree);
            }
        }
    })
}

function initGrid(){
    $("#headGrid").datagrid({
        fit: true, //自动大小  
        fitColumns: false,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        pagination: false,
        border:false,
        pageSize: 20,
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'code', title: '字段编码', align:"left", halign:"center", width: 80},
            { field: 'name', title: '字段名称', align:"left", halign:"center", width: 120},
            { field: 'text', title: '显示名称', align:"left", halign:"center", width: 120,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='text' name='text' value='"+value+"'/>"
                }
            },
            { field: 'isShow', title: '是否显示', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isShow' "+(value?"checked='checked'":"")+" />"
                }
            },
            { field: 'isRequired', title: '是否必填', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isRequired' "+(value?"checked='checked'":"")+"/>"
                }
            },
            { field: 'isInput', title: '是否可改', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isInput' "+(value?"checked='checked'":"")+"/>"
                }
            }
        ]],
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
        },
        toolbar:[{
            id:'headDefine',
            text:'引用自定义项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'headItem',
            text:'引用档案项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'deleteItem',
            text:'删除',
            iconCls:'icon-delete',
            handler:function(){
                deleteRow("headGrid")
            }
        },'-',{
            id:'headTop',
            text:'置顶',
            iconCls:'icon-top',
            handler:function(){
                moveTop("headGrid")
            }
        },{
            id:'headUp',
            text:'上移',
            iconCls:'icon-up',
            handler:function(){
                moveUp("headGrid")
            }
        },{
            id:'headDown',
            text:'下移',
            iconCls:'icon-down',
            handler:function(){
                moveDown("headGrid")
            }
        },{
            id:'headBottom',
            text:'置底',
            iconCls:'icon-bottom',
            handler:function(){
                moveBottom("headGrid")
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#headGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $.each(domRows, function (idx, domRow) {
                //显示名称
                $("input[name=text]", domRow).bind("change", function () {
                    data.rows[idx].text = this.value;
                    data.rows[idx].IsUpdate = true;
                });
                //是否显示
                $("input[name=isShow]", domRow).bind("change", function () {
                    data.rows[idx].isShow = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否必填
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否可改
                $("input[name=isInput]", domRow).bind("change", function () {
                    data.rows[idx].isInput = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
            })
        }
    });
    
    $("#bodyGrid").datagrid({
        fit: true, //自动大小  
        fitColumns: false,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        pagination: false,
        border:false,
        pageSize: 20,
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'code', title: '字段编码', align:"left", halign:"center", width: 80},
            { field: 'name', title: '字段名称', align:"left", halign:"center", width: 120},
            { field: 'text', title: '显示名称', align:"left", halign:"center", width: 120,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='text' name='text' value='"+value+"'/>"
                }
            },
            { field: 'width', title: '宽度', align:"left", halign:"center", width: 120,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='text' name='width' value='"+value+"'/>"
                }
            },
            { field: 'isShow', title: '是否显示', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isShow' "+(value?"checked='checked'":"")+" />"
                }
            },
            { field: 'align', title: '对齐方式', align: 'left', halign: 'center', width: 90,
                formatter: function (value, row, index) {
                    var html = "<select name='align'  style='text-align:center'>";
                    html += "<option value='left' " + (value == "left" ? "selected='selected'" : "") + ">靠左</option>";
                    html += "<option value='center' " + (value == "center" ? "selected='selected'" : "") + ">居中</option>";
                    html += "<option value='right' " + (value == "right" ? "selected='selected'" : "") + ">靠右</option>";
                    html += "</select>";
                    return html;
                }
            },
            { field: 'isRequired', title: '是否必填', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isRequired' "+(value?"checked='checked'":"")+"/>"
                }
            },
            { field: 'isInput', title: '是否可改', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isInput' "+(value?"checked='checked'":"")+"/>"
                }
            },
            { field: 'dataType', title: '格式', align:"center", halign:"center", width: 80,
                formatter:function(value, rowData, rowIdx){
                    if(rowData.isSystem){
                    	return "";
                    }
                    var html = "<select name='dataType'>"
                    if(value =="text" || value =="date"){
                        log(value)
                        html += "<option value='text' " + (value == "text" ? "selected='selected'" : "") + ">文本</option>";
                        html += "<option value='date' " + (value == "date" ? "selected='selected'" : "") + ">日期</option>";
                    }else{
                        html += "<option value='number' " + (value == "number" ? "selected='selected'" : "") + ">数字</option>";
                    }
                    html += "</select>"
                    return html;
                }
            }
        ]],
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
        },
        toolbar:[{
            id:'headDefine',
            text:'引用自定义项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'headItem',
            text:'引用档案项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'deleteItem',
            text:'删除',
            iconCls:'icon-delete',
            handler:function(){
                
            }
        },'-',{
            id:'headTop',
            text:'置顶',
            iconCls:'icon-top',
            handler:function(){
                moveTop("bodyGrid")
            }
        },{
            id:'headUp',
            text:'上移',
            iconCls:'icon-up',
            handler:function(){
                moveUp("bodyGrid")
            }
        },{
            id:'headDown',
            text:'下移',
            iconCls:'icon-down',
            handler:function(){
                moveDown("bodyGrid")
            }
        },{
            id:'headBottom',
            text:'置底',
            iconCls:'icon-bottom',
            handler:function(){
                moveBottom("bodyGrid")
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#bodyGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $.each(domRows, function (idx, domRow) {
                //显示名称
                $("input[name=text]", domRow).bind("change", function () {
                    data.rows[idx].text = this.value;
                    data.rows[idx].IsUpdate = true;
                });
                //宽度
                $("input[name=width]", domRow).bind("change", function () {
                    data.rows[idx].width = this.value;
                    data.rows[idx].IsUpdate = true;
                });
                //对齐方式
                $("select[name=align]", domRow).bind("change", function () {
                    data.rows[idx].align = this.value;
                    data.rows[idx].IsUpdate = true;
                });
                //是否显示
                $("input[name=isShow]", domRow).bind("change", function () {
                    data.rows[idx].isShow = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否必填
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否可改
                $("input[name=isInput]", domRow).bind("change", function () {
                    data.rows[idx].isInput = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //格式
                $("select[name=dataType]", domRow).bind("change", function () {
                    data.rows[idx].dataType = this.value;
                    data.rows[idx].IsUpdate = true;
                });
            })
        }
    });
    
    $("#footGrid").datagrid({
        fit: true, //自动大小  
        fitColumns: false,
        striped: true,
        singleSelect: false,
        rownumbers: true,
        pagination: false,
        border:false,
        pageSize: 20,
        url: null,
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'code', title: '字段编码', align:"left", halign:"center", width: 80},
            { field: 'name', title: '字段名称', align:"left", halign:"center", width: 120},
            { field: 'text', title: '显示名称', align:"left", halign:"center", width: 120,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='text' name='text' value='"+value+"'/>"
                }
            },
            { field: 'isShow', title: '是否显示', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isShow' "+(value?"checked='checked'":"")+" />"
                }
            },
            { field: 'isRequired', title: '是否必填', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isRequired' "+(value?"checked='checked'":"")+"/>"
                }
            },
            { field: 'isInput', title: '是否可改', align:"center", halign:"center", width: 60,
                formatter:function(value, rowData, rowIdx){
                    return "<input type='checkbox' name='isInput' "+(value?"checked='checked'":"")+"/>"
                }
            }
        ]],
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('clearSelections')
            $(this).datagrid('clearChecked')
            $(this).datagrid('selectRow', rowIndex);
        },
        toolbar:[{
            id:'headDefine',
            text:'引用自定义项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'headItem',
            text:'引用档案项',
            iconCls:'icon-addline',
            handler:function(){
                
            }
        },{
            id:'deleteItem',
            text:'删除',
            iconCls:'icon-delete',
            handler:function(){
                
            }
        },'-',{
            id:'headTop',
            text:'置顶',
            iconCls:'icon-top',
            handler:function(){
                moveTop("footGrid")
            }
        },{
            id:'headUp',
            text:'上移',
            iconCls:'icon-up',
            handler:function(){
                moveUp("footGrid")
            }
        },{
            id:'headDown',
            text:'下移',
            iconCls:'icon-down',
            handler:function(){
                moveDown("footGrid")
            }
        },{
            id:'headBottom',
            text:'置底',
            iconCls:'icon-bottom',
            handler:function(){
                moveBottom("footGrid")
            }
        }],
        onLoadSuccess: function (data) {
            var domRows = $($('#footGrid').datagrid("getPanel")).find(".datagrid-view2 .datagrid-body .datagrid-row");
            $.each(domRows, function (idx, domRow) {
                //显示名称
                $("input[name=text]", domRow).bind("change", function () {
                    data.rows[idx].text = this.value;
                    data.rows[idx].IsUpdate = true;
                });
                //是否显示
                $("input[name=isShow]", domRow).bind("change", function () {
                    data.rows[idx].isShow = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否必填
                $("input[name=isRequired]", domRow).bind("change", function () {
                    data.rows[idx].isRequired = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
                //是否可改
                $("input[name=isInput]", domRow).bind("change", function () {
                    data.rows[idx].isInput = this.checked;
                    data.rows[idx].IsUpdate = true;
                });
            })
        }
    });
}
function initPage(){
}

function getVouchFormat(){
    var selNodes = getTreeSelections("vouchList");
    if(selNodes.length==0){
        alertError("请选择一个单据类型");
        return;
    }
    ajaxSubmit({
        url:"getVouchFormat4Design.do",
        data:{
            vouchType:selNodes[0].code
        },
        success:function(result){
            if(result.isOk=="Y"){
                $("#headGrid").datagrid("loadData", result.data.headFieldList);
                $("#bodyGrid").datagrid("loadData", result.data.bodyFieldList);
                $("#footGrid").datagrid("loadData", result.data.footFieldList);
            }
        }
    })
}

function saveClick(){
    var selNodes = getTreeSelections("vouchList");
    if(selNodes.length==0){
        alertError("请选择一个单据类型");
        return;
    }
    
    var headList = $("#headGrid").datagrid("getRows");
    var bodyList = $("#bodyGrid").datagrid("getRows");
    var footList = $("#footGrid").datagrid("getRows");
    
    var vouchFormat={
    	vouchType:selNodes[0].code,
        headList:headList,
        bodyList:bodyList,
        footList:footList
    };
    
    ajaxSubmit({
        url:"save.do",
        data:{
            vouchFormat:JSON.stringify(vouchFormat)
        },
        success:function(result){
            if(result.isOk=="Y"){
                alertSuccess(result.message);
            }
        }
    })
}
function deleteRow(gridId){
	var dg = $("#"+gridId);
    var selRows = dg.datagrid("getSelections");
    if (selRows.length ==0) {
        alert("请选择行");
        return;
    }
    for(var i = selRows.length-1 ; i>=0 ; i--){
    	dg.datagrid('deleteRow', dg.datagrid('getRowIndex', selRows[i]));
    }
    
}
function moveTop(gridId){
    var dg = $("#"+gridId);
	var selRow = dg.datagrid("getSelected");
    if (selRow == null) {
        alert("请选择需要置顶的行");
        return;
    }
    var rowIndex = dg.datagrid("getRowIndex", selRow);

    var rows =  dg.datagrid("getRows");
    if (rowIndex == 0) {
        return;
    }
    
    var tempObj = rows[rowIndex];
    for(var i =rowIndex; i>0;i--){
        rows[i] = rows[i-1];
    }

    rows[0] = tempObj;
    dg.datagrid("loadData", rows);
    dg.datagrid("selectRow", 0);
}
function moveUp(gridId){
	var dg = $("#"+gridId);
    var selRow = dg.datagrid("getSelected");
    if (selRow == null) {
        alert("请选择需要上移的行");
        return;
    }
    var rowIndex = dg.datagrid("getRowIndex", selRow);

    var rows =  dg.datagrid("getRows");
    if (rowIndex == 0) {
        return;
    }

    var tempObj = rows[rowIndex - 1];
    rows[rowIndex - 1] = rows[rowIndex];
    rows[rowIndex] = tempObj;
    dg.datagrid("loadData", rows);
    dg.datagrid("selectRow", rowIndex - 1);
}
function moveDown(gridId){
    var dg = $("#"+gridId);
    var selRow = dg.datagrid("getSelected");
    if (selRow == null) {
        alert("请选择需要下移的行");
        return;
    }
    var rows =  dg.datagrid("getRows");
    var rowIndex = dg.datagrid("getRowIndex", selRow);

    if (rowIndex == rows.length - 1) {
        return;
    }

    var tempObj = rows[rowIndex + 1];
    rows[rowIndex + 1] = rows[rowIndex];
    rows[rowIndex] = tempObj;
    
    dg.datagrid("loadData", rows);
    dg.datagrid("selectRow", rowIndex + 1);
}
function moveBottom(gridId){
    var dg = $("#"+gridId);
    var selRow = dg.datagrid("getSelected");
    if (selRow == null) {
        alert("请选择需要置顶的行");
        return;
    }
    var rowIndex = dg.datagrid("getRowIndex", selRow);

    var rows =  dg.datagrid("getRows");
    if (rowIndex == rows.length-1) {
        return;
    }
    
    var tempObj = rows[rowIndex];
    for(var i =rowIndex; i< rows.length-1;i++){
        rows[i] = rows[i+1];
    }

    rows[rows.length-1] = tempObj;
    dg.datagrid("loadData", rows);
    dg.datagrid("selectRow", rows.length-1);
}