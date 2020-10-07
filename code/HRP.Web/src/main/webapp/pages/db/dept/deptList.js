var action = null;
var ACTION_ADD = "add";
var ACTION_UPDATE = "update";
var deptObj = null;
//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initDeptTree(); //初始化部门树
    initGrid();
    initPage();//获取编码规则
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "add",
            text: "增加下级",
            iconCls: "icon-add",
            enable:function(){
                return !isModify();
            },
            handler: function () {
                var selNode = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
                if (selNode.length == 0) {
                    alertError("请先选择上级分类");
                    return;
                }
                var deptCode = selNode[0].deptCode == 'root' ? "" : selNode[0].deptCode;
                ajaxSubmit({
                    url: contextPath + "/db/dept/getDeptCode.do",
                    data: {
                        deptParent:deptCode
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            action = ACTION_ADD;
                            deptObj = {deptCode:result.data.deptCode}
                            $("#infoForm").fill(deptObj)
                            $("#dataGrid").jqGrid("loadData", [])
                            ctrlStatus();
                        }
                    }
                });
            }
        }, {
            id: "edit",
            text: "修改",
            iconCls: "icon-edit",
            enable:function(){
                return !isModify();
            },
            handler: function () {
                var selNode = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
                if (selNode.length == 0 || selNode[0].deptCode=="root") {
                    alertError("请先选择需要修改的部门");
                    return;
                }
                action = ACTION_UPDATE;
                ctrlStatus();
            }
        }, {
            id: "delete",
            text: "删除",
            iconCls: "icon-remove",
            enable:function(){
                return !isModify();
            },
            handler: function () {
                var selNode = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
                if (selNode.length == 0 || selNode[0].deptCode=="root") {
                    alertError("请先选择需要修改的部门");
                    return;
                }
                ajaxSubmit({
                    url: contextPath + "/db/dept/delete.do",
                    data: {
                        deptCode: selNode[0].deptCode
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            alertSuccess(data.message);
                            initDeptTree(selNode[0].getParentNode().deptCode);
                            ctrlStatus();
                        }
                    }
                })
            }
        }, {
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            enable:function(){
                return isModify();
            },
            handler: function () {
                var dept = $.extend(deptObj,$("#infoForm").form2json());
               
                if (action == ACTION_ADD) {
                    dept.isNew = true;
                } else if (action == ACTION_UPDATE) {
                    dept.isUpdate = true;
                    dept.deptCode = $("#txt_deptCode").val()
                }
                dept.deptPerson = isNullorEmpty(dept.deptPerson)?null:dept.deptPerson;
                dept.deptMgr = isNullorEmpty(dept.deptMgr)?null:dept.deptMgr;
                var linkList = $("#dataGrid").jqGrid("getData")
                dept.organ = {
                	orgCode:dept.orgCode,
                	orgName:dept.orgName
                }
                ajaxSubmit({
                    url: contextPath + "/db/dept/save.do",
                    data: {
                        dept:JSON.stringify(dept),
                        deptLinkList: JSON.stringify(linkList)
                    },
                    beforeSend: function () {
                        return validateForm("infoForm");
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            alertSuccess(data.message);
                            initDeptTree(dept.deptCode);
                            action = null;
                            ctrlStatus();
                        }
                    }
                });
            }
        }, {
            id: "undo",
            text: "放弃",
            iconCls: "icon-undo",
            enable:function(){
                return isModify();
            },
            handler: function () {
                if (action == ACTION_UPDATE) {
                    var selNodes = $.fn.zTree.getZTreeObj("deptTree").getSelectedNodes();
                    if (selNodes.length > 0) {
                        loadDept(selNodes[0].deptCode)
                    }
                }
                $("#infoForm").fill("");
                $("#dataGrid").jqGrid("loadData", []);
                action = null;
                ctrlStatus();
            }
        }, {
            id: "search",
            text: "定位",
            iconCls: "icon-search",
            handler: function () {
                selRow = 0;
                openDialog({
                    dialogWidth: 300,
                    dialogHeight: 60,
                    elementId: "searchDiv",
                    dialogCallBack: function () {
                        if ($("#txt_deptNameSearch").val() != "") {
                            var treeObj = $.fn.zTree.getZTreeObj("deptTree");
                            var nodes = treeObj.getNodesByParamFuzzy("deptCodeName", $("#txt_deptNameSearch").val(), null);

                            if (nodes.length == 0) {
                                alert("无查询结果")
                                return false;
                            }
                            if (selRow >= nodes.length - 1) {
                                selRow = 0;
                            } else {
                                selRow++;
                            }
                            treeObj.selectNode(nodes[selRow]);
                            return false;
                        } else {
                            alert("请输入科室名称");
                            return false;
                        }
                    }
                })
            }
        },'-',{
            id: "uploadData",
            text: "导入数据",
            iconCls: "icon-import",
            type: "splitbutton",
            handler: function () {
                uploadData();
            },
            menuList: [{
                id: "setTemp",
                text: "模板设置",
                iconCls: "icon-setting",
                handler: function () {
                    setImportTemplate("department")
                }
            },{
                id: "downTemp",
                text: "模板下载",
                iconCls: "icon-down",
                handler: function () {
                    downImportTemplate("department","部门导入模板");
                }
            }]
        },{
            id: "export",
            text: "数据导出",
            iconCls: "icon-export",
            enable:function(){
                return !isModify();
            },
            handler: function () {
            	outExcel();
            }
        }]
    });
}
function initGrid(){
    newJgGrid("dataGrid", {
        columns:[
            {code:"linkName",text:"助记名",width:80,isInput:true,isShow:true},
            {code:"linkPsn",text:"联系人",width:120,isInput:true,isShow:true},
            {code:"linkPhone",text:"联系电话",width:80,isInput:true,isShow:true},
            {code:"linkAddress",text:"联系地址",width:160,isInput:true,isShow:true}
        ],
        isCellEditable:function(nm,rowData){
             return isModify();

        },
        toolbar: [ true, "top" , [
            {
                text: '增行' , 
                iconCls: 'icon-addline', 
                handler: function () {
                    if(action ==null){
                        alertError("当前状态不可以编辑");
                        return;
                    }
                    $("#dataGrid").jqGrid('addRowData',{ isNew: true})
                },
            },{
                text: '减行' , 
                iconCls: 'icon-delline', 
                handler: function () {
                    if(action ==null){
                        alertError("当前状态不可以编辑");
                        return;
                    }
                    var ids=$('#dataGrid').jqGrid("getSelectedIds");
                    if(ids.length ==0){
                        alertError("请选择需要删除的行");
                        return;
                    }
                    for(var i=ids.length-1; i >=0 ; i--){
                        var rowData = $("#dataGrid").jqGrid("getRowData", ids[i],true);
                        $("#dataGrid").jqGrid('delRowData',ids[i])
                    }
                },
            }
        ]]
    })
}

//导入数据
function uploadData() {
    uploadFile({
    	isImage:false,
        success: function (result) {
            if (result.isOk == "Y") {
                ajaxSubmit({
                    url: contextPath + "/db/dept/importDept.do",
                    data: { 
                        file: JSON.stringify(result.data.uploadFile)
                    },
                    success: function (data) {
                        if (data.isOk == "Y") {
                            initDeptTree();
                        }
                    }
                });
            }
        }
    })
}

function initPage(){
    //获取编码规则
    ajaxSubmit({
        url: contextPath + "/db/codeRule/getCodeRule.do",
        data:{
            objectKey:"DB_Department"
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $("#lb_codeRule").html(getCodeRuleChar(result.data.codeRule))
            }
        }
    });
    initHtml();
    ctrlStatus();
}

function initHtml() {
    $("#txt_startDate,#txt_endDate").date("");
    Refer.Person({
        inputObj: $("#txt_deptPersonName"),
        referCallBack: function(returnVal,inputObj){ 
            if(returnVal){
                $("#txt_deptPerson").val(returnVal.personCode);
                $("#txt_deptPersonName").val(returnVal.personName);
            }
        }
    });
    Refer.Person({
        inputObj: $("#txt_deptMgrName"),
        referCallBack: function(returnVal,inputObj){
            if(returnVal){
                $("#txt_deptMgr").val(returnVal.personCode);
                $("#txt_deptMgrName").val(returnVal.personName);
            }
        }
    });
    ajaxSubmit({
        url: contextPath + "/db/dataDict/getList.do",
        data: { 
            dataTpyeCode: "DEPT_TYPE"
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	if(result.data.dataDictDetailList.length==0){
            		alertError("请至 [系统管理]-[数据字典档案] 中设置相关内容,编码为: DEPT_TYPE");
            		return
            	}
                bindDropDown("sel_deptProp", result.data.dataDictDetailList, "dictName","dictName", true)
            }
        }
    });
    $("#txt_deptName").bind("change",function(){
        $("#txt_inputCode").val(makePy(this.value));
    })
}

//初始化档案树
function initDeptTree(selCode) {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        data: {
            key: {
                name: "deptCodeName"
            },
            simpleData: {
                enable: true,
                idKey: "deptCode",
                pIdKey: "deptParent",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                if (treeNode.deptCode == "root") {
                    $("#infoForm")[0].reset();
                    $("#dataGrid").jqGrid("loadData", [])
                } else {
                    loadDept(treeNode.deptCode);
                }
                action = null;
                ctrlStatus();
            }
        }
    };
    ajaxSubmit({
        url:contextPath+"/db/dept/getListNoOrgan.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var deptList = result.data.deptList;
                for(var i = 0 ; i < deptList.length; i++){
                    deptList[i].deptCodeName = "("+deptList[i].deptCode+")"+ deptList[i].deptName;
                    if (isNullorEmpty(deptList[i].deptParent)) {
                        deptList[i].deptParent = "root";
                    }
                }
                //增加一个根目录节点
                deptList.push({
                    deptCodeName: "部门列表",
                    deptName: "部门列表",
                    deptCode: "root",
                    open: true,
                    icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png"
                });
                
                $.fn.zTree.init($("#deptTree"), setting, deptList);
                if (selCode != null) {
                    var treeObj = $.fn.zTree.getZTreeObj("deptTree");
                    var node = treeObj.getNodeByParam("deptCode", selCode, null);
                    treeObj.selectNode(node, false);
                    loadDept(selCode)
                }
            }
        }
    });
}

function isModify(){
    return action ==ACTION_ADD || action == ACTION_UPDATE;
}

function ctrlStatus(){
    $('#tb').toolbar("updateStatus");
    if(isModify()){
        unReadOnlyForm("infoForm");
    }else{
        readOnlyForm("infoForm")
    }
}
function loadDept(deptCode){//加载部门联系
    ajaxSubmit({
        url: contextPath + "/db/dept/getInfo.do",
        data:{
            deptCode:deptCode
        },
        success: function (result) {
            if (result.isOk == "Y") {
                deptObj = result.data.dept[0];
                $("#txt_selDeptFlag").val('');
                $("#infoForm").fill(deptObj)
                $("#dataGrid").jqGrid("loadData", result.data.deptLinkList)
            }
        }
    });
}

function outExcel(){
	var deptList = [];
	ajaxSubmit({
        url: contextPath + "/db/dept/getList.do",
        async:false,
        success: function (result) {
        	if (result.isOk == "Y") {
        		deptList = result.data.deptList;
            }
        }
	}); 
	var url = contextPath + "/system/export/exportExcel.do";
    var colList = [{
        colId:"deptCode",
        colTitle:"部门编码",
        colWidth:100,
        colAlign:"center"
    },{
        colId:"deptName",
        colTitle:"部门名称",
        colWidth:200,
        colAlign:"center"
    },{
        colId:"orgName",
        colTitle:"所属院区",
        colWidth:150,
        colAlign:"center"
    },{
        colId:"deptGrade",
        colTitle:"部门次级",
        colWidth:70,
        colAlign:"center"
    },{
        colId:"startTime",
        colTitle:"成立日期",
        colWidth:100,
        colAlign:"center"
    }];
    outputExcel(url, {
        fileName:"部门档案",
        sheetName:"sheet1",
        dataList:JSON.stringify(deptList),
        titleList:JSON.stringify(colList)
    });
}