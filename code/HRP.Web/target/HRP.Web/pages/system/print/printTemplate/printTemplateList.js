var LODOP; //声明为全局变量 
var templateClsAction = "";
isShowBgIframe= true;
var pageData = {}
var bodyData = null;
var headItemList = [];
var bodyItemList =[];
var defineItemList = [];
var headItemFormatterList ={};

//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initPage();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "addTemplateClass",
            text: "添加单据类型",
            iconCls: "icon-add",
            handler: function () {
                addTemplateClass();
            }
        },{
            id: "editTemplateClass",
            text: "修改单据类型",
            iconCls: "icon-edit",
            handler: function () {
                editTemplateClass();
            }
        },{
            id: "delTemplateClass",
            text: "删除单据类型",
            iconCls: "icon-remove",
            handler: function () {
                delTemplateClass();
            }
        },'-',{
            id: "addTemplate",
            text: "添加模板",
            iconCls: "icon-add",
            handler: function () {
                addTemplate();
            }
        },{
            id: "editTemplate",
            text: "修改模板",
            iconCls: "icon-edit",
            handler: function () {
                editTemplate();
            }
        },{
            id: "delTemplate",
            text: "删除模板",
            iconCls: "icon-remove",
            handler: function () {
                delTemplate();
            }
        },'-',{
            id: "copyTemplate",
            text: "复制模板",
            iconCls: "icon-referbill",
            handler: function () {
                copyTemplate();
            }
        }]
    });

    $("#templateTb").toolbar({
        items: [{
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            handler: function () {
                eidtPrintTemplateClick()
            }
        },{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                savePrintTemplateClick()
            }
        },{
            id: "cancel",
            text: "取消",
            iconCls: "icon-redo",
            handler: function () {
                cancelPrintTemplateClick();
                
            }
        },'-',{
            id: "pageSize",
            text: "页面设置",
            iconCls: "icon-applicationviewdetail",
            handler: function () {
                pageSizeClick();
            }
        },{
            id: "headItem",
            text: "表头项目",
            iconCls: "icon-headItem",
            handler: function () {
                headItemClick();
            }
        }, {
            id: "bodyItem",
            text: "表体项目",
            iconCls: "icon-bodyItem",
            handler: function () {
                bodyItemClick();
            }
        }, {
            id: "textItem",
            text: "活动文本",
            iconCls: "icon-text",
            handler: function () {
                textItemClick();
            }
        },{
            id: "lineItem",
            text: "线条",
            iconCls: "icon-line",
            handler: function () {
                lineItemClick();
            }
        },{
            id: "pageItem",
            text: "页码",
            iconCls: "icon-import",
            handler: function () {
                pageItemClick();
            }
        }, '-',{
            id: "deleteItem",
            iconCls: "icon-remove",
            text: "删除项",
            handler: function () {
                deleteItemClick();
            }
        }, '-',{
            id: "preview",
            iconCls: "icon-search",
            text: "预览",
            handler: function () {
                savePrintTemplateData();
                generatePrint(true);
            }
        }]
    });
}

function initPage(){
    LODOP=getLodop(document.getElementById('LODOP2'),document.getElementById('LODOP_EM2')); 
    LODOP.PRINT_INITA(0,0,800,600,"模板设置");LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE",1);
    LODOP.SET_SHOW_MODE("SETUP_ENABLESS","11111111000000");//隐藏关闭(叉)按钮
    LODOP.SET_SHOW_MODE("HIDE_GROUND_LOCK",true);//隐藏纸钉按钮
    LODOP.PRINT_DESIGN();
    setToolBarStatus(false);

    $("#txt_pageNumColor").colorpicker({
        fillcolor:true
    });
    ajaxSubmit({
        url: contextPath + "/system/vouchTable/getVouchTableList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                bindDropDown("sel_vouchTableId", result.data.vouchTableList, "vouchName", "vouchId", true)
            }
        }
    });
   
    loadTemplateTree();
}
//加载模板数
function loadTemplateTree(){
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
                name: "nodeName"
            },
            simpleData: {
                enable: true,
                idKey: "nodeCode",
                pIdKey: "nodeParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                if (treeNode.nodeType == "TempCls") {
                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                    zTree.expandNode(treeNode, null, null, null, true);
                } else {
                    loadPrintTemplate(treeNode.dataCode);
                }
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/print/printTemplate/getTemplateList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var templateList =  result.data.templateTree;
                for(var i = 0; i < templateList.length; i++){
                    if(templateList[i].nodeType=="Temp" && templateList[i].entity.isDefault){
                        templateList[i].nodeName = templateList[i].nodeName + " [默认]"
                    }else if(templateList[i].nodeType=="TempCls"){
                        templateList[i].nodeName = "["+templateList[i].nodeCode+"]"+templateList[i].nodeName ;
                    }
                }
                $.fn.zTree.init($("#templateList"), setting, templateList);
                fixIcon();
            }
        }
    });
}
function fixIcon(){
    var treeObj = $.fn.zTree.getZTreeObj("templateList");
    //过滤出sou属性为true的节点（也可用你自己定义的其他字段来区分，这里通过sou保存的true或false来区分）
    var folderNode = treeObj.getNodesByFilter(function (node) { return node.nodeType=="TempCls"});
    for(j=0 ; j<folderNode.length; j++){//遍历目录节点，设置isParent属性为true;
        folderNode[j].isParent = true;
    }
    treeObj.refresh();//调用api自带的refresh函数。
}
//添加模板类型
function addTemplateClass(){
    $("#templateClassForm")[0].reset()
    templateClsAction = "Add";
    $("#txt_templateClsCode").prop("disabled", false);
    openTemplateClass();
}
//编辑模板类型
function editTemplateClass(){
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="TempCls") {
        alert("请先选择单据类型");
        return;
    }
    $("#templateClassForm").fill(selNode[0].entity);
    templateClsAction = "Edit";
    $("#txt_templateClsCode").prop("disabled", true);
    openTemplateClass();
}

//打开模板类型界面
function openTemplateClass() {
    openDialog({
        elementId: "templateClassBlock",
        dialogWidth: 300,
        dialogHeight: 120,
        dialogCallBack: function () {
           
            if(!validateForm("templateClassForm")){
                return false
            }
            var data = $("#templateClassForm").form2json();
            data.isNew = templateClsAction=="Add";

            ajaxSubmit({
                url: contextPath + "/system/printCls/save.do",
                async: false,
                data: {
                    printTemplateClass: JSON.stringify(data)
                },
                success: function (result) {
                    if (result.isOk == "Y") {
                        alert(result.message);
                        loadTemplateTree();
                    }
                }
            });
            return true
        }
    })
}

//删除模板类型
function delTemplateClass() {
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType != "TempCls") {
        alert("请先选择单据类型");
        return;
    }  
    if (selNode[0].children != null && selNode[0].children.length>0) {
        alert("请先删除单据类型中的模板");
        return;
    }

    if(!confirm("确认要删除吗？")){
        return;
    }
         
    ajaxSubmit({
        url: contextPath + "/system/printCls/delete.do",
        data:{
            tempClsCode:selNode[0].entity.templateClsCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
                loadTemplateTree();
                $.fn.zTree.getZTreeObj("templateList").destroy()
            }
            }
    });
}
//添加模板
function addTemplate(){
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="TempCls") {
        alert("请先选择单据类型");
        return;
    }
    $("#templateForm").fill({})
    $("#txt_tempClsCode").val(selNode[0].entity.templateClsCode)
    openTemplate();
}
//编辑模板
function editTemplate(){
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    $("#templateForm").fill(selNode[0].entity);
    openTemplate();
}

//打开模板编辑界面
function openTemplate(){
    openDialog({
        elementId:"templateBlock",
        dialogWidth:300,
        dialogHeight:120,
        dialogCallBack:function(){
            if(!validateForm("templateForm")){
                return false
            }
            var data = $("#templateForm").form2json();
            ajaxSubmit({
                url: contextPath + "/system/print/printTemplate/save.do",
                async:false,
                data:{
                    printTemplate:JSON.stringify(data)
                },
                success: function (result) {
                    if (result.isOk == "Y") {
                        alertSuccess(result.message);
                        loadTemplateTree();
                    } else {
                        return false
                    }
                }
            });
            return true
        }
    })
}
//删除模板
function delTemplate() {
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
      if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }

    if(!confirm("确认要删除吗？")){
        return;
    }
    ajaxSubmit({
             url: contextPath + "/system/print/printTemplate/delete.do",
             data:{
                templateCode:selNode[0].entity.templateCode
             },
             success: function (result) {
                 if (result.isOk == "Y") {
                     alert(result.message);
                     loadTemplateTree();
                     $.fn.zTree.getZTreeObj("templateList").destroy()
                 }
             }
         });
}


//复制模板
function copyTemplate(){

    ajaxSubmit({
        url: contextPath + "/system/printCls/getTemplateClsList.do",
        async:false,
        success: function (result) {
            if (result.isOk == "Y") {
                bindDropDown("sel_templateCls", result.data.tempLateClsList, "templateClsName", "templateClsCode", true)
            }
        }
    });
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    $("#copyTemplateForm").fill(selNode[0].entity);
    var copyTemplateCode = selNode[0].entity.templateCode;
    $("#txt_copyTemplateCode").val("");
    $("#sel_templateCls").val(selNode[0].entity.templateClsCode);
    openDialog({
        elementId: "copyTemplateBlock",
        dialogWidth: 300,
        dialogHeight: 120,
        dialogCallBack: function () {
            if (!validateForm("copyTemplateForm")) {
                return false
            }
            var data = $("#copyTemplateForm").form2json();
            ajaxSubmit({
                url: contextPath + "/system/print/printTemplate/copyTemplate.do",
                async:false,
                data:{
                    printTemplate:JSON.stringify(data),
                    copyTemplateCode:copyTemplateCode
                },
                success: function (result) {
                    if (result.isOk == "Y") {
                        alert(result.message);
                        loadTemplateTree();
                    }
                }
            });
            return true
        }
    })
}
//加载模板
function loadPrintTemplate(){
    
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    setToolBarStatus(false);
    
    ajaxSubmit({
        url: contextPath + "/system/print/printTemplate/getPrintTemplate.do",
        data:{
            templateCode:selNode[0].entity.templateCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
                pageData = $.extend({pageWidth:800,pageHeight:600}, result.data.pageData);
                bodyData = result.data.bodyData;
                headItemList = result.data.headItemList;
                bodyItemList = result.data.bodyItemList;
                defineItemList = result.data.defineItemList;
                headItemFormatterList={};

                if(headItemList != null){
                    for(var i = 0 ; i < headItemList.length ; i++){
                        if(!isNullorEmpty(headItemList[i].itemFormatter)){
                            headItemFormatterList[headItemList[i].itemName] = headItemList[i].itemFormatter
                        }
                    }
                }
                generatePrint();
                
            } else {
                return false
            }
        }
    });
}
//修改模板
function eidtPrintTemplateClick(){
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    setToolBarStatus(true);
}
//保存模板
function savePrintTemplateClick(){
    savePrintTemplateData();
    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    ajaxSubmit({
        url: contextPath + "/system/print/printTemplate/savePrintTemplate.do",
        data:{
            templateCode:selNode[0].entity.templateCode,
            pageData:JSON.stringify(pageData),
            bodyData:JSON.stringify(bodyData),
            headItemList:JSON.stringify(headItemList),
            bodyItemList:JSON.stringify(bodyItemList),
            defineItemList:JSON.stringify(defineItemList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alertSuccess(result.message);
                loadPrintTemplate();
                
            }
        }
    });
}
//取消修改
function cancelPrintTemplateClick(){
    if(!confirm("是否取消修改")){
        return;
    }
    loadPrintTemplate();
}
//页面设置
function pageSizeClick(){
    var pageWidth = LODOP.GET_VALUE('printInitWidth',0).replace(/"/gi,"");
    var pageHeight = LODOP.GET_VALUE('printInitHeight',0).replace(/"/gi,"");

    //初始化宽度
    if(pageWidth.indexOf('mm')>-1){
        $("#txt_pageWidth").val(pageWidth.substring(0, pageWidth.indexOf("m")))
        initDropDown("sel_pageWidthUnit","mm")
    }else{
        $("#txt_pageWidth").val(pageWidth)
        initDropDown("sel_pageWidthUnit","px")
    }
    
    //初始化高度
    if(pageHeight.indexOf('mm')>-1){
        $("#txt_pageHeight").val(pageHeight.substring(0, pageHeight.indexOf("m")))
        initDropDown("sel_pageHeightUnit","mm")
    }else{
        $("#txt_pageHeight").val(pageHeight)
        initDropDown("sel_pageHeightUnit","px")
    }

    openDialog({
        elementId:"pageSizeBlock",
        dialogWidth:300,
        dialogHeight:120,
        dialogCallBack:function(){
            savePrintTemplateData();
            if($("#sel_pageWidthUnit").val()=="px"){
                pageData.pageWidth = $("#txt_pageWidth").val()
            }else{
                pageData.pageWidth = $("#txt_pageWidth").val()+$("#sel_pageWidthUnit").val()
            }
            
            if($("#sel_pageHeightUnit").val()=="px"){
                pageData.pageHeight = $("#txt_pageHeight").val()
            }else{
                pageData.pageHeight = $("#txt_pageHeight").val()+$("#sel_pageHeightUnit").val()
            }
            generatePrint();
        }
    })
}
//表头项目
function headItemClick(){
    savePrintTemplateData();

    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    var templateNode = selNode[0];
    var tempClsNode = templateNode.getParentNode();

    openDialog({
        dialogWidth: 800,
        dialogHeight: 600,
        showTop:false,
        url: contextPath + "/pages/system/print/printTemplate/selectHeadItem.jsp?vouchTableId="+tempClsNode.entity.vouchTableId,
        dialogParams:{
            headItemList:headItemList
        },
        dialogCallBack: function (returnVal) {
            if(returnVal != null){
                headItemList = returnVal;
                headItemFormatterList = {};
                for(var i = 0 ; i < headItemList.length; i++){
                    headItemFormatterList[headItemList[i].itemName] = headItemList[i].itemFormatter;
                }
                generatePrint();
            }
        }
    });;
}
//表体项目
function bodyItemClick(){
    savePrintTemplateData();

    var selNode = $.fn.zTree.getZTreeObj("templateList").getSelectedNodes();
    if (selNode.length == 0 || selNode[0].nodeType !="Temp") {
        alert("请先选择打印模板");
        return;
    }
    var templateNode = selNode[0];
    var tempClsNode = templateNode.getParentNode();

    openDialog({
        dialogWidth: 800,
        dialogHeight: 600,
        showTop:false,
        url: contextPath + "/pages/system/print/printTemplate/selectBodyItem.jsp?vouchTableId="+tempClsNode.entity.vouchTableId,
        dialogParams:{
            bodyData:bodyData,
            bodyItemList: bodyItemList
        },
        dialogCallBack: function (returnVal) {
            if(returnVal != null){
                bodyData = returnVal.bodyData;
                bodyItemList = returnVal.bodyItemList
                generatePrint();
            }
        }
    });
}

//活动文本项目
function textItemClick(){
    LODOP.ADD_PRINT_TEXT(0,0,150,22,"");
    LODOP.SET_PRINT_STYLEA(0,"LinkedItem","D");
}

//线条项目
function lineItemClick(){
    LODOP.ADD_PRINT_LINE(41,40,40,190,0,1);
    LODOP.SET_PRINT_STYLEA(0,"LinkedItem","D");
}

//分页项目
function pageItemClick(){
    openDialog({
        elementId:"pageBlock",
        dialogWidth:300,
        dialogHeight:180,
        dialogCallBack:function(){
            var pageNumWidth =  $("#txt_pageNumWidth").val();
            var pageNumHeight =  $("#txt_pageNumHeight").val();

            var pageTile = $("#txt_pageTitle").val();
            var pageNumColor =$("#txt_pageNumColor").val();
            var pageNumSize =$("#txt_pageNumSize").val()/16;
            var pageNumStyle = $('input[name="pageNumStyle"]:checked').val();
            var pageStyle = $('input[name="pageStyle"]:checked').val();

            LODOP.ADD_PRINT_HTM(1,600,pageNumWidth,pageNumHeight, "<label style='color:"+pageNumColor+"; font-size:"+pageNumSize+"em;' format='"+ pageNumStyle +"'>"+pageTile+pageStyle+"</label>");
            LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
            LODOP.SET_PRINT_STYLEA(0,"LinkedItem","D");
        }
    })
}

//删除项目
function deleteItemClick(){
    var itemName = LODOP.GET_VALUE("itemName",'selected');
    if(itemName =="H" || itemName =="B" ||itemName =="D"){
        return;
    }
    if(confirm("确定要删除该项吗？")){
        LODOP.SET_PRINT_STYLEA('Selected','Deleted',true);
    }
}

//创建打印的样式
function generatePrint(isPreview){
    //是否预览模式
    isPreview = isPreview==null? false:isPreview;
    
    LODOP.SET_PRINT_STYLEA('All','Deleted',true);
    LODOP.PRINT_INITA(0,0,pageData.pageWidth,pageData.pageHeight,"");

    if(!isPreview){
        LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE",1);
        LODOP.SET_SHOW_MODE("SETUP_ENABLESS","11111111000000");//隐藏关闭(叉)按钮
        LODOP.SET_SHOW_MODE("HIDE_GROUND_LOCK",true);//隐藏纸钉按钮
        LODOP.PRINT_DESIGN();
        LODOP.ADD_PRINT_TEXTA("H",0,0,0,0,"");
        LODOP.ADD_PRINT_TEXTA("B",0,0,0,0,"");
        LODOP.ADD_PRINT_TEXTA("D",0,0,0,0,"");
    }

    //创建表头项目
    if(headItemList != null){
        for(var i = 0; i < headItemList.length;i++){
            var item = headItemList[i];
            if(item.itemClassName=="Text"){
                LODOP.ADD_PRINT_TEXTA(item.itemName,item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,item.itemContent);
                LODOP.SET_PRINT_STYLEA(0,"itemType",item.itemType);
                if(item.pageIndex!=null && item.pageIndex!=''){
                    LODOP.SET_PRINT_STYLEA(0,"pageIndex",item.pageIndex);
                }
                LODOP.SET_PRINT_STYLEA(0,"itemFontSize",item.itemFontSize);
                if(item.itemBold!=null ){
                    LODOP.SET_PRINT_STYLEA(0,"Bold",item.itemBold);
                }
                if(!isPreview){
                    LODOP.SET_PRINT_STYLEA(0,"LinkedItem","H");
                }
            }else if(item.itemClassName =="BarCode"){
                LODOP.ADD_PRINT_BARCODEA(item.itemName,item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,"QRCode","123456789012");
                LODOP.SET_PRINT_STYLEA(0,"itemFontSize",item.itemFontSize);
                if(!isPreview){
                    LODOP.SET_PRINT_STYLEA(0,"LinkedItem","H");
                }
            }
        }
    }
    var calculateEmValue = function(val,fontSize){
        return divFun(divFun(val,16,4),fontSize,4);
    }
    //创建表体项目
    if(bodyData != null && bodyItemList != null){
        var tableHtml = "";

        var fontSize = bodyData.fontSize;
        if(isNullorEmpty(fontSize)){
            fontSize = 12;
        }else{
            fontSize = parseInt(fontSize.replace(/px/gi,""));
        }
        fontSize=fontSize/16;

        var rowHeight = bodyData.rowHeight;
        if(isNullorEmpty(rowHeight)){
            rowHeight = 22;
        }

        var rowLen = 50;
        var bodyHeight = bodyData.itemHeight;
        if(bodyData.fixRow=="Y"){
            var rowCount = 10
            if(!isNullorEmpty(bodyData.rowCount)){
                rowCount = parseInt(bodyData.rowCount);
            }
            if(rowLen % rowCount !=0){
                rowLen = Math.ceil(rowLen/rowCount) * rowCount;
            }
            bodyHeight = (rowCount+1)*rowHeight;
        }

        var borderWidth = bodyData.borderWidth;
        if(isNullorEmpty(borderWidth)){
            borderWidth= "1px";
        }
        tableHtml +="<style>.vouchBody{border-collapse:collapse;font-size:"+fontSize+"em;font-family:宋体;} .vouchBody tr{line-height:"+calculateEmValue(rowHeight,fontSize)+"em;} .vouchBody thead th, .vouchBody tfoot th{border: "+borderWidth+" solid #000;} .vouchBody tbody td{border: "+borderWidth+" solid #000;}</style>";
        tableHtml += "<table class='vouchBody' border=0 cellspacing='0' cellspacing='0' style='border-collapse:collapse'>"

        
        tableHtml += "<thead>";
        tableHtml += "<tr>";
        if(bodyData.isRowNum=="Y"){
            tableHtml += "<th><div style='width:"+calculateEmValue(40,fontSize)+"em'>序号<div></th>"
        }
        
        for(var i = 0 ; i < bodyItemList.length; i++){
            tableHtml += "<th><div style='width:"+calculateEmValue(bodyItemList[i].itemWidth,fontSize)+"em;text-align:center'>" + bodyItemList[i].itemContent+"</div></th>"
        }
        tableHtml += "</tr>";
        tableHtml += "</thead>";
        
        tableHtml += "<tbody>";
        for(var j =0; j<rowLen;j++){
            tableHtml += "<tr>";
            if(bodyData.isRowNum=="Y"){
                tableHtml += "<td><div style='text-align:center'>"+(j+1)+"</div></td>"
            }
            for(var i = 0 ; i < bodyItemList.length; i++){
                var colStyle ="";

                colStyle += " width:" + calculateEmValue(bodyItemList[i].itemWidth,fontSize)+"em;";
                colStyle += " text-align:" + bodyItemList[i].itemAlign+";";
                if(bodyItemList[i].isWrap =="Y"){
                    colStyle +=" word-break:break-all; "
                }else{
                    colStyle += " overflow:hidden;white-space:nowrap;"
                }

                var value = +Math.floor(Math.random()*10+1);
                if(bodyItemList[i].itemPrecision !=""){
                    value = formatNumber(value, bodyItemList[i].itemPrecision);
                }
                
                tableHtml += "<td><div style='"+colStyle+"'>"+value+"</div></td>"
//                tableHtml += "<td><div style='"+colStyle+"'>gsalja;asdfjljsdfdsdsfsdfsfsdfsdfkldslfjsdlfjsdlfjsldjl</div></td>"
            }
            tableHtml += "</tr>";
        }
        
        //总合计
        if(bodyData.isAllSum=="Y" && bodyData.allSumShow=="LastPage"){
            tableHtml += "<tr  style='font-weight:bold'>"
            if(bodyData.isRowNum=="Y"){
                tableHtml += "<td></td>"
            }
            tableHtml += "<td align='center'>总计</td>"
            for(var i = 1 ; i < bodyItemList.length; i++){
                if(bodyItemList[i].isTotal=="Y"){
                    tableHtml += "<td tdata='AllSum' format='#.00' align='right'>######</td>"
                }else{
                    tableHtml += "<td></td>"
                }
            }
            tableHtml += "</tr>"
        }
        tableHtml += "</tbody>";
        

        //处理合计行
        if(bodyData.isPageSum=="Y" || bodyData.isAllSum=="Y"){
            tableHtml +="<tfoot>"
            //本页合计
            if(bodyData.isPageSum=="Y"){
                tableHtml += "<tr>"
                if(bodyData.isRowNum=="Y"){
                    tableHtml += "<th></th>"
                }
                tableHtml += "<th>小计</th>"
                for(var i = 1 ; i < bodyItemList.length; i++){
                    if(bodyItemList[i].isTotal=="Y"){
                        tableHtml += "<th tdata='SubSum' format='#.00' align='right'>######</th>"
                    }else{
                        tableHtml += "<th></th>"
                    }
                }
                tableHtml += "</tr>"
            }
            //总合计
            if(bodyData.isAllSum=="Y"  && bodyData.allSumShow !="LastPage"){
                tableHtml += "<tr>"
                if(bodyData.isRowNum=="Y"){
                    tableHtml += "<th></th>"
                }
                tableHtml += "<th>总计</th>"
                for(var i = 1 ; i < bodyItemList.length; i++){
                    if(bodyItemList[i].isTotal=="Y"){
                        tableHtml += "<th tdata='AllSum' format='#.00' align='right'>######</th>"
                    }else{
                        tableHtml += "<th></th>"
                    }
                }
                tableHtml += "</tr>"
            }
            tableHtml +="</tfoot>"
        }
        tableHtml += "</table>"

        LODOP.ADD_PRINT_TABLE(bodyData.itemTop,bodyData.itemLeft,bodyData.itemWidth,bodyHeight,tableHtml);
        if(!isPreview){
            LODOP.SET_PRINT_STYLEA(0,"LinkedItem","B");
        }
    }

    //创建自定义项目
    if(defineItemList != null){
        for(var i = 0; i < defineItemList.length;i++){
            var item = defineItemList[i];
            if(item.itemClassName=="Text"){
                LODOP.ADD_PRINT_TEXT(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,item.itemContent);
                LODOP.SET_PRINT_STYLEA(0,"itemType",item.itemType);
                if(item.pageIndex !=null && item.pageIndex !=''){
                    LODOP.SET_PRINT_STYLEA(0,"pageIndex",item.pageIndex);
                }
                LODOP.SET_PRINT_STYLEA(0,"itemFontSize",item.itemFontSize);
                if(item.itemBold !=null && item.itemBold !=''){
                    LODOP.SET_PRINT_STYLEA(0,"Bold",item.itemBold);
                }
            
            }else if(item.itemClassName=="UpLine"){
                LODOP.ADD_PRINT_LINE(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,0,1);
                LODOP.SET_PRINT_STYLEA(0,"itemType",item.itemType);
                if(!isNullorEmpty(item.pageIndex)){
                    LODOP.SET_PRINT_STYLEA(0,"pageIndex",item.pageIndex);
                }
                
            }else if(item.itemClassName=="Htm"){
                LODOP.ADD_PRINT_HTM(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight, item.itemContent);
                LODOP.SET_PRINT_STYLEA(0,"itemType",1);
                if(!isNullorEmpty(item.pageIndex)){
                    LODOP.SET_PRINT_STYLEA(0,"pageIndex",item.pageIndex);
                }                
            }
            if(!isPreview){
                LODOP.SET_PRINT_STYLEA(0,"LinkedItem","D");
            }
        }
    }
    if(isPreview){
        LODOP.PREVIEW();
        generatePrint();
    }
}

//保存页面设置的属性
function savePrintTemplateData(){
    var itemCount = LODOP.GET_VALUE('itemCount',0);

    headItemList =[];
    defineItemList = [];
    for(var i = 0 ; i< itemCount; i++){
        var itemLinked = LODOP.GET_VALUE("itemLinkedItem",i+1);
        var itemName = LODOP.GET_VALUE("itemName",i+1);
        if(itemLinked =="1" || itemLinked =="H" ){
            var pageIndex = LODOP.GET_VALUE("itemPageIndex",i+1);
            if(pageIndex=='' || pageIndex ==null){
                pageIndex = "";
            }

            headItemList.push({
                itemName:LODOP.GET_VALUE("itemName",i+1),
                itemType:LODOP.GET_VALUE("itemPageType",i+1),
                itemClass:LODOP.GET_VALUE("itemClass",i+1),
                itemClassName:LODOP.GET_VALUE("itemClassName",i+1),
                itemTop:LODOP.GET_VALUE("itemTop",i+1),
                itemLeft:LODOP.GET_VALUE("itemLeft",i+1),
                itemWidth:LODOP.GET_VALUE("itemWidth",i+1),
                itemHeight:LODOP.GET_VALUE("itemHeight",i+1),
                itemContent:LODOP.GET_VALUE("itemContent",i+1),
                itemFontName:LODOP.GET_VALUE("itemFontName",i+1),
                itemFontSize:LODOP.GET_VALUE("itemFontSize",i+1),
                itemColor:LODOP.GET_VALUE("itemColor",i+1),
                pageIndex:pageIndex,
                itemBold:LODOP.GET_VALUE("itembold",i+1),
                itemFormatter: headItemFormatterList[LODOP.GET_VALUE("itemName",i+1)]
            })
        }else if(itemLinked =="2" || itemLinked =="B"){
            bodyData.itemTop = LODOP.GET_VALUE("itemTop",i+1);
            bodyData.itemLeft = LODOP.GET_VALUE("itemLeft",i+1);
            bodyData.itemWidth = LODOP.GET_VALUE("itemWidth",i+1);
            bodyData.itemHeight = LODOP.GET_VALUE("itemHeight",i+1);

        }else if(itemLinked =="3" || itemLinked =="D"){
            var pageIndex = LODOP.GET_VALUE("itemPageIndex",i+1);
            if(pageIndex=='' || pageIndex ==null){
                pageIndex = "";
            }
            defineItemList.push({
                itemName:LODOP.GET_VALUE("itemName",i+1),
                itemType:LODOP.GET_VALUE("itemPageType",i+1),
                itemClass:LODOP.GET_VALUE("itemClass",i+1),
                itemClassName:LODOP.GET_VALUE("itemClassName",i+1),
                itemTop:LODOP.GET_VALUE("itemTop",i+1),
                itemLeft:LODOP.GET_VALUE("itemLeft",i+1),
                itemWidth:LODOP.GET_VALUE("itemWidth",i+1),
                itemHeight:LODOP.GET_VALUE("itemHeight",i+1),
                itemContent:LODOP.GET_VALUE("itemContent",i+1),
                itemFontName:LODOP.GET_VALUE("itemFontName",i+1),
                itemFontSize:LODOP.GET_VALUE("itemFontSize",i+1),
                itemColor:LODOP.GET_VALUE("itemColor",i+1),
                PageIndex:pageIndex,
                itemBold:LODOP.GET_VALUE("itembold",i+1)
            })
        }

    }
}
//设置工具栏按钮的状态
function setToolBarStatus(flag) {
    var editStatus = "disabled";
    var saveStatus = "enable"
    if (flag) {
        editStatus = "enable";
        saveStatus = "disabled"
    }
    $('#templateTb').toolbar(saveStatus, 'edit');
    $('#templateTb').toolbar(editStatus, 'save');
    $('#templateTb').toolbar(editStatus, 'cancel');
    $('#templateTb').toolbar(editStatus, 'pageSize');
    $('#templateTb').toolbar(editStatus, 'headItem');
    $('#templateTb').toolbar(editStatus, 'bodyItem');
    $('#templateTb').toolbar(editStatus, 'textItem');
    $('#templateTb').toolbar(editStatus, 'lineItem');
    $('#templateTb').toolbar(editStatus, 'pageItem');
    $('#templateTb').toolbar(editStatus, 'deleteItem');
}


//表示全局唯一标识符 (GUID)。
function Guid(g){
     var arr = new Array(); //存放32位数值的数组
     if (typeof(g) == "string"){ //如果构造函数的参数为字符串
         InitByString(arr, g);
     }
     else{
         InitByOther(arr);
     }
     //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
     this.Equals = function(o){
         if (o && o.isGuid){
              return this.toString() == o.toString();
         }
         else{
              return false;
         }
     }
     //Guid对象的标记
     this.isGuid = function(){}
     //返回 Guid 类的此实例值的 String 表示形式。
     this.toString = function(format){
         if(typeof(format) == "string"){
              if (format == "N" || format == "D" || format == "B" || format == "P"){
                   return toStringWithFormat(arr, format);
              }
              else{
                   return toStringWithFormat(arr, "D");
              }
         }
         else{
              return toStringWithFormat(arr, "D");
         }
     }
     //由字符串加载
     function InitByString(arr, g){
         g = g.replace(/\{|\(|\)|\}|-/g, "");
         g = g.toLowerCase();
         if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
              InitByOther(arr);
         }
         else{
              for (var i = 0; i < g.length; i++){
                   arr.push(g[i]);
              }
         }
     }
     //由其他类型加载
     function InitByOther(arr){
         var i = 32;
         while(i--){
              arr.push("0");
         }
     }
     /*
     根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
     N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
     P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
     */
     function toStringWithFormat(arr, format){
         switch(format){
              case "N":
                   return arr.toString().replace(/,/g, "");
              case "D":
                   var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);
                   str = str.replace(/,/g, "");
                   return str;
              case "B":
                   var str = toStringWithFormat(arr, "D");
                   str = "{" + str + "}";
                   return str;
              case "P":
                   var str = toStringWithFormat(arr, "D");
                   str = "(" + str + ")";
                   return str;
              default:
                   return new Guid();
         }
     }
}
//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function(){
     var g = "";
     var i = 32;
     while(i--){
         g += Math.floor(Math.random()*16.0).toString(16);
     }
     return new Guid(g);
}