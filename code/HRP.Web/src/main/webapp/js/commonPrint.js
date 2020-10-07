function commonPrint(params){
    var settings = $.extend({
        lodop: null,
        vouchType: null,
        templateCode:null,
        vouchHeadData: null,
        vouchBodyData: null,
        printCallBack: null
    }, params);

    var printObj = new commonPrintObj(settings);

    printObj.getPrintTemplate(function(printTempateData){
        var pageData = printTempateData.pageData;
        var bodyData = printTempateData.bodyData;
        if(settings.lodop == null){
            settings.lodop = getLodop();
            settings.lodop.PRINT_INITA(0,0,pageData.pageWidth ,pageData.pageHeight,"模板设置");
        }
        printObj.generatePrint(settings.lodop, printTempateData, settings.vouchHeadData, settings.vouchBodyData);
        settings.lodop.PREVIEW();
    })
}

function commonPrintObj(params){
    var thisObj = this;
    this.settings = $.extend({
        lodop: null,
        vouchType: null,
        templateCode:null,
        vouchHeadData: null,
        vouchBodyData: null,
        printCallBack: null
    }, params);

    this.getPrintTemplate = function (getCallBack){
        ajaxSubmit({
            url: contextPath + "/system/print/printTemplate/getPrintTemplate.do",
            data:{
                templateClsCode: thisObj.settings.vouchType,
                templateCode: thisObj.settings.templateCode
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    var printTemplateData = {
                        pageData : $.extend({pageWidth:800,pageHeight:600}, result.data.pageData),
                        bodyData : result.data.bodyData,
                        headItemList : result.data.headItemList,
                        bodyItemList : result.data.bodyItemList,
                        defineItemList : result.data.defineItemList
                    }
                    
                    if (typeof (getCallBack) == "function"){
                        getCallBack(printTemplateData);
                    }
                    
                }
            }
        });
    }
    

    //创建打印的样式
    this.generatePrint = function (LODOP, printTemplate, vouchHeadData, vouchDetailDataOri){
    
        var pageData = printTemplate.pageData;
        var bodyData = printTemplate.bodyData;
        var headItemList = printTemplate.headItemList;
        var bodyItemList = printTemplate.bodyItemList;
        var defineItemList = printTemplate.defineItemList;

        if(LODOP == null){
            LODOP = getLodop();
            LODOP.PRINT_INITA(0,0,pageData.pageWidth,pageData.pageHeight,"模板设置");
        }

        var vouchDetailData =null;
        if(vouchDetailDataOri != null){
            vouchDetailData = [];
            for(var i = 0 ; i < vouchDetailDataOri.length; i++){
                vouchDetailData.push($.extend({}, vouchDetailDataOri[i]))
            }
        }
        
        //创建表头项目
        if(headItemList != null){
            for(var i = 0; i < headItemList.length;i++){
                var item = headItemList[i];
                if(item.itemClassName=="Text"){
                    var itemContent = ""
                    if(item.itemName.indexOf(".")>-1){
                        itemContent = item.itemContent + nullToEmpty($.jgrid.getAccessor(vouchHeadData,item.itemName))
                    }else{
                        itemContent = item.itemContent + nullToEmpty(vouchHeadData[item.itemName]);
                    }
                    if(!isNullorEmpty(item.itemFormatter)){
                        itemContent = item.itemContent + eval(item.itemFormatter)
                    }
                    LODOP.ADD_PRINT_TEXTA(item.itemName,item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,itemContent);
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",item.itemType);
                    if(!isNullorEmpty(item.PageIndex)){
                        LODOP.SET_PRINT_STYLEA(0,"PageIndex",item.pageIndex);
                    }                    
                    LODOP.SET_PRINT_STYLEA(0,"ItemFontSize",item.itemFontSize);
                    if(item.ItemBold !=null && item.ItemBold !='' ){
                        LODOP.SET_PRINT_STYLEA(0,"Bold",item.itemBold);
                    }
                }else if(item.itemClassName =="BarCode"){
//                    LODOP.ADD_PRINT_BARCODEA(item.itemName,item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,"QRCode",vouchHeadData[item.itemName]);
//                    LODOP.SET_PRINT_STYLEA(0,"ItemFontSize",item.itemFontSize);
                    var itemContent = ""
                    if(item.itemName.indexOf(".")>-1){
                        itemContent = nullToEmpty($.jgrid.getAccessor(vouchHeadData,item.itemName))
                    }else{
                        itemContent = nullToEmpty(vouchHeadData[item.itemName]);
                    }
                    if(!isNullorEmpty(item.itemFormatter)){
                        itemContent = eval(item.itemFormatter)
                    }
                    LODOP.ADD_PRINT_BARCODEA(item.itemName,item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,item.itemFontName,itemContent);
                    LODOP.SET_PRINT_STYLEA(0,"itemFontSize",item.itemFontSize);
                    LODOP.SET_PRINT_STYLEA(0,"itemType",item.itemType);
//                    if(item.itemFontName=="QRCode"){
//                        LODOP.ADD_PRINT_TEXTA(item.itemName+"_value",parseInt(item.itemTop)+parseInt(item.itemHeight)-10,parseInt(item.itemLeft)+5,parseInt(item.itemWidth)-10,22,vouchHeadData[item.itemName]);
//                        LODOP.SET_PRINT_STYLEA(0,"itemFontSize",item.itemFontSize);
//                        LODOP.SET_PRINT_STYLEA(0,"itemType",item.itemType);
//                    }
                }
            }
        }
        var calculateEmValue = function(val,fontSize){
            return divFun(divFun(val,16,4),fontSize,4);
        }
        var calculateFontSize = function(value, width,height){
            var L=0.0;
            for(var m =0 ;m < value.length; m++){
                L+=(value.charCodeAt(m)>255)?1:0.5;
            }
            L=Math.ceil(L);
            L++;
            L++;
            return Math.floor(Math.sqrt(parseInt(width)*parseInt(height)/L))/16;
        }
        //创建表体项目
        if(bodyData != null && bodyItemList != null){
            var tableHtml = "";

            var fontSize = bodyData.fontSize;
            if(fontSize!= null && fontSize!=''){
                fontSize = 12;
            }else{
                fontSize = parseInt(fontSize.replace(/px/gi,""));
            }
            fontSize=fontSize/16;

            var rowHeight = bodyData.rowHeight;
            if(rowHeight==null||rowHeight==''){
                rowHeight = 22;
            }
            var borderWidth = bodyData.borderWidth;
            if(borderWidth==null||borderWidth==''){
                borderWidth= "1px";
            }

            tableHtml +="<style>.vouchBody{border-collapse:collapse;font-size:"+fontSize+"em;font-family:宋体;} .vouchBody tr{height:"+calculateEmValue(rowHeight,fontSize)+"em;} .vouchBody thead th, .vouchBody tfoot th{border: "+borderWidth+" solid #000;} .vouchBody tbody td{border: "+borderWidth+" solid #000;}</style>";
            tableHtml += "<table class='vouchBody' border=0 cellspacing='0' cellspacing='0' style='border-collapse:collapse'>"

            tableHtml += "<thead>";
            tableHtml += "<tr>";
            if(bodyData.IsRowNum=="Y"){
                tableHtml += "<th><div style='width:"+calculateEmValue(40,fontSize)+"em'>序号<div></th>"
            }
        
            for(var i = 0 ; i < bodyItemList.length; i++){
                var headStyle = ""
                if(bodyItemList[i].isWrap =="N"){
                    headStyle =" overflow:hidden;white-space:nowrap;"
                }
                tableHtml += "<th><div style='width:"+calculateEmValue(bodyItemList[i].itemWidth,fontSize)+"em;text-align:center;"+headStyle+"'>" + bodyItemList[i].itemContent+"</div></th>"
            }
            tableHtml += "</tr>";
            tableHtml += "</thead>";
        
            if(vouchDetailData != null){
                var rowLen = vouchDetailData.length;
                var bodyHeight = bodyData.itemHeight;

                if(bodyData.fixRow=="Y"){
                    var rowCount = 10
                    if(bodyData.rowCount !=null && bodyData.rowCount !=''){
                        rowCount = parseInt(bodyData.rowCount);
                    }
                    if(bodyData.isAllSum=="Y" && bodyData.allSumShow=="LastPage"){
                        rowLen ++;
                    }
                    if(rowLen % rowCount !=0){
                        var tempLen = Math.ceil(rowLen/rowCount) * rowCount;
                        for(var i = 0 ;i < tempLen - rowLen; i++){
                            vouchDetailData.push({isBlankRow4FixRow:true})
                        }
                        rowl = tempLen;
                    }
                    bodyHeight = (rowCount+1)*rowHeight;
                }
                tableHtml += "<tbody>";
                for(var j =0; j<vouchDetailData.length;j++){
                    if(vouchDetailData[j].isBlankRow4FixRow){
                        tableHtml += "<tr>";
                        if(bodyData.isRowNum=="Y"){
                            tableHtml += "<td>&nbsp;</td>"
                        }
                        for(var i = 0 ; i < bodyItemList.length; i++){
                            tableHtml += "<td>&nbsp;</td>"
                        }
                        tableHtml += "</tr>";
                    }else{
                    
                        tableHtml += "<tr>";
                        if(bodyData.isRowNum=="Y"){
                            tableHtml += "<td><div style='text-align:center'>"+(j+1)+"</div></td>"
                        }
                        for(var i = 0 ; i < bodyItemList.length; i++){
                            var bodyItemData = vouchDetailData[j];
                            var colStyle ="";

                            //colStyle += " width:" + calculateEmValue(bodyItemList[i].itemWidth,fontSize)+"em;border:1px red solid";
                            colStyle += " width:" + bodyItemList[i].itemWidth+"px;";
                            colStyle += " text-align:" + bodyItemList[i].itemAlign+";";
                            if(bodyItemList[i].isWrap =="Y"){
                                colStyle +=" word-break:break-all; "
                            }else{
                                colStyle += " overflow:hidden;white-space:nowrap;"
                            }

                            var value = ""
                            if(bodyItemList[i].itemName.indexOf(".")>-1){
                                value = nullToEmpty($.jgrid.getAccessor(bodyItemData,bodyItemList[i].itemName))
                            }else{
                                value = nullToEmpty(bodyItemData[bodyItemList[i].itemName]);
                            }
                            
                            if(!isNullorEmpty(bodyItemList[i].itemFormatter)){
                                eval("var itemFormatter = "+bodyItemList[i].itemFormatter);
                                if(typeof (itemFormatter) == "function"){
                                    value = itemFormatter(bodyItemData)
                                }else{
                                    value = itemFormatter;
                                }
                            }
                            if(bodyItemList[i].itemPrecision !=""){
                                value = formatNumber(value, bodyItemList[i].itemPrecision);
                            }
                            var font_size = calculateFontSize(value, bodyItemList[i].itemWidth,rowHeight);
                            
                            if(font_size > fontSize){
                              font_size = fontSize
                            }
                            font_size = font_size/fontSize;
                            tableHtml += "<td><div style='"+colStyle+";font-size:"+font_size+"em'>"+value+"</div></td>";
                        }
                        tableHtml += "</tr>";
                    }
                }
                
                //总合计
                if(bodyData.isAllSum=="Y" && bodyData.allSumShow=="LastPage"){
                    tableHtml += "<tr style='font-weight:bold'>"
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
            }

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
                if(bodyData.isAllSum=="Y" && bodyData.allSumShow !="LastPage"){
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
        }

        //创建自定义项目
        if(defineItemList != null){
            for(var i = 0; i < defineItemList.length;i++){
                var item = defineItemList[i];
                if(item.itemClassName=="Text"){
                    LODOP.ADD_PRINT_TEXT(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,item.itemContent);
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",item.itemType);
                    if(!isNullorEmpty(item.pageIndex)){
                        LODOP.SET_PRINT_STYLEA(0,"PageIndex",item.pageIndex);
                    }
                    LODOP.SET_PRINT_STYLEA(0,"ItemFontSize",item.itemFontSize);
                    if(item.itemBold != null && item.itemBold !=''){
                        LODOP.SET_PRINT_STYLEA(0,"Bold",item.itemBold);
                    }
            
                }else if(item.itemClassName=="UpLine"){
                    LODOP.ADD_PRINT_LINE(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight,0,1);
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",item.itemType);
                    if(item.pageIndex != null && item.pageIndex !=''){
                        LODOP.SET_PRINT_STYLEA(0,"PageIndex",item.pageIndex);
                    }
                }else if(item.itemClassName=="Htm"){
                    LODOP.ADD_PRINT_HTM(item.itemTop,item.itemLeft,item.itemWidth,item.itemHeight, item.itemContent);
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                    if(item.pageIndex != null && item.pageIndex !=''){
                        LODOP.SET_PRINT_STYLEA(0,"PageIndex",item.pageIndex);
                    }                    
                }
            }
        }
        return LODOP;
    }
    return this;
}
function bindCommonPrint(vouchType, printObj, printClick){
    $(printObj).splitbutton({
        onClick:function(){
            printClick({
                vouchType:vouchType
            });
        }
    });
    ajaxSubmit({
        url: contextPath + "/system/print/printTemplate/getPrintTemplateList.do",
        data:{
            templateClsCode: vouchType
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var printTemplateList = result.data.templateList
                var str = "";
                for(var i = 0; i<printTemplateList.length;i++){
                    str +="$($(printObj).splitbutton('options').menu).menu('appendItem',{"
                    str +="    text:'"+printTemplateList[i].templateName+"',"
                    str +="    onclick: function(){"
                    str +="        printEvent('"+printTemplateList[i].templateCode+"');"
                    str +="    },"
                    str +="    id:'"+printTemplateList[i].templateCode+"'";
                    str +="});"
                }
                eval(str)

                $($(printObj).splitbutton('options').menu).menu('appendItem',{
                    separator:true
                });
                str ="$($(printObj).splitbutton('options').menu).menu('appendItem',{"
                str +="    text:'设置默认模板',"
                str +="    iconCls:'icon-verify',"
                str +="    onclick: function(){"
                str +="        openCommonPrintDef('"+vouchType+"');"
                str +="    },"
                str +="    id:'setDefTemplate'";
                str +="});"
                eval(str)

            }
        }
    });

    var printEvent = function(templateCode){
        printClick({
            templateCode : templateCode
        });
    }
}
function openCommonPrintDef(vouchType) {
    openDialog({
        url: contextPath + "/pages/system/print/printTemplate/setCommonPrintDefault.jsp?type=" + vouchType,
        obj: window,
        dialogWidth: 450,
        dialogHeight: 300,
        dialogCallBack: function (returnVal) {
            if (returnVal == null) {
                return;
            }
        
        }
    });
}
