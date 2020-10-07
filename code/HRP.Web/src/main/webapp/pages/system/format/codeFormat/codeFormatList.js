//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initTree(); //初始化单据树
    initPage();
});

var codePreObj = {
    "":{
        text:"",
        codeContextHtml:""
    },
    vouchType:{
        text:"单据代码",
        codeContextHtml:"<input type='text' style='width:82px' name='codeContent'/>"
    },
    vouchDate:{
        text:"单据日期",
        codeContextHtml:"<select style='width:87px' name='codeContent'><option value='yyyy'>年</option><option value='yyyyMM'>年月</option><option value='yyyyMMdd'>年月日</option></select>"
    },
    createTime:{
        text:"制单日期",
        codeContextHtml:"<select style='width:87px' name='codeContent'><option value='yyyy'>年</option><option value='yyyyMM'>年月</option><option value='yyyyMMdd'>年月日</option></select>"
    },
    warehouse:{
        text:"仓库",
        codeContextHtml:""
    }
}

var preList = [];
for(var pre in codePreObj){
    preList.push({
        code:pre,
        text:codePreObj[pre].text
    })
}

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
                    getCodeFormat();
                }
                
            }
        }
    };
    var vouchList =[{
        name:"库存管理",
        children:[{
            code:"RD_QCRK",
            name:"期初入库单"
        },{
            code:"RD_CGRK",
            name:"采购入库单"
        },{
            code:"RD_QTRK",
            name:"其他入库单"
        },{
            code:"RD_CLCK",
            name:"材料出库单"
        },{
            code:"RD_QTCK",
            name:"其他出库单"
        },{
            code:"RD_PDD",
            name:"盘点单"
        },{
            code:"RD_DBD",
            name:"调拨单"
        }]
    },{
        name:"采购管理",
        children:[{
            code:"RD_XQJH",
            name:"需求计划单"
        },{
            code:"RD_CGDD",
            name:"采购订单"
        },{
            code:"RD_CGFP",
            name:"采购发票"
        }]
    },{
        name:"申请管理",
        children:[{
            code:"RD_LLSQ",
            name:"领料申请单"
        }]
    },{
        name:"费用管理",
        children:[{
            code:"RD_FYDJ",
            name:"费用登记单"
        }]
    },{
        name:"设备管理",
        children:[{
            code:"FA_GZSQ",
            name:"设备购置申请单"
        },{
            code:"FA_SBZTB",
            name:"采购中标登记单"
        },{
            code:"FA_SBHT",
            name:"采购合同登记单"
        },{
            code:"FA_JKLZ",
            name:"采购论证登记单"
        },{
            code:"FA_SBRK",
            name:"资产入库"
        },{
            code:"FA_SBBD",
            name:"设备变动"
        }]
    }];
    $.fn.zTree.init($("#vouchList"), setting, vouchList);
}

function initPage(){
    bindDropDown("sel_codePre1", preList, "text", "code", false);
    bindDropDown("sel_codePre2", preList, "text", "code", false);
    bindDropDown("sel_codePre3", preList, "text", "code", false);
    
    bindDropDown("sel_according1", preList, "text", "code", false);
    bindDropDown("sel_according2", preList, "text", "code", false);
    bindDropDown("sel_according3", preList, "text", "code", false);
    
    $("#sel_codePre1,#sel_codePre2,#sel_codePre3").bind("change",function(){
        var self =this;
        var codeContextHtml = codePreObj[this.value].codeContextHtml;
        var idx = $(self).attr("idx");
        codeContextHtml = codeContextHtml.replace("codeContent","codeContent"+idx);
        $("td[name='codeContext']", $(self).parent().parent()).html(codeContextHtml)
    });
    
    $("#sel_according1,#sel_according2,#sel_according3").bind("change",function(){
        var self =this;
        var codeContextHtml = codePreObj[this.value].codeContextHtml;
        var idx = $(self).attr("idx");
        codeContextHtml = codeContextHtml.replace("codeContent","accordingContent"+idx);
        $("td[name='codeContext']", $(self).parent().parent()).html(codeContextHtml)
    })
}

function saveClick(){
    var selNodes = getTreeSelections("vouchList");
    if(selNodes.length==0){
        alertError("请选择一个单据类型");
        return;
    }
    var data = $("#infoForm").form2json();
    data.vouchType = selNodes[0].code;
    
    ajaxSubmit({
        url:"save.do",
        data:{
            codeFormat:JSON.stringify(data)
        },
        success:function(result){
            if(result.isOk=="Y"){
                alertSuccess(result.message);
            }
        }
    })
}

function getCodeFormat(){
    var selNodes = getTreeSelections("vouchList");
    if(selNodes.length==0){
        alertError("请选择一个单据类型");
        return;
    }
    $("#infoForm")[0].reset();
    ajaxSubmit({
        url:"getCodeFormat.do",
        data:{
            vouchType:selNodes[0].code
        },
        success:function(result){
            if(result.isOk=="Y"){
                $("#infoForm").fill(result.data.codeFormat);
                var codeFormat = result.data.codeFormat;
                $("#sel_codePre1").change();
                $("#sel_codePre2").change();
                $("#sel_codePre3").change();
                $("#sel_according1").change();
                $("#sel_according2").change();
                $("#sel_according3").change();
                $("#infoForm").fill(result.data.codeFormat);
            }
        }
    })
}