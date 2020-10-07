/**
提供公用的基础档案参照方法
*/
var Refer = function () {}

/*
 * 财务科目档案参照
 */
Refer.Subject = function (params) {
    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:false,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'subjCode', title: '财务科目编码', align: 'left', halign: 'center', width: 120 },
            { field: 'subjName', title: '财务科目名称', align: 'left', halign: 'center', width: 120 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/system/subject/toRefer.do",
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/system/subject/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            subjCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.subjList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.subjList.length ==1){
                                settings.referCallBack(result.data.subjList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/system/subject/getList.do",
        paramName: "subjInfo",
        resultName: "subjList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
            	if(returnVal != null){
            		if(settings.selectEnd && !returnVal.isEnd){
            			settings.referCallBack({}, settings.inputObj);
            			alertError("请选择末级项目");
            			return false;
            		}
            	}
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
 * 财务项目档案参照
 */
Refer.Item = function (params) {
    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:false,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'itemCode', title: '预算项目编码', align: 'left', halign: 'center', width: 120 },
            { field: 'itemName', title: '预算项目名称', align: 'left', halign: 'center', width: 120 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/system/item/toRefer.do",
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/system/item/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            itemCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/system/item/getList.do",
        paramName: "itemInfo",
        resultName: "itemList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
            	if(returnVal != null){
            		if(settings.selectEnd && !returnVal.isEnd){
            			settings.referCallBack({}, settings.inputObj);
            			alertError("请选择末级项目");
            			return false;
            		}
            	}
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
 * 预算项目档案参照
 */
Refer.BudgetItem = function (params) {
    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:false,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'itemCode', title: '预算项目编码', align: 'left', halign: 'center', width: 120 },
            { field: 'itemName', title: '预算项目名称', align: 'left', halign: 'center', width: 120 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/system/budgetItem/toRefer.do",
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/system/budgetItem/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            itemCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/system/budgetItem/getList.do",
        paramName: "itemInfo",
        resultName: "itemList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
            	if(returnVal != null){
            		if(settings.selectEnd && !returnVal.isEnd){
            			settings.referCallBack({}, settings.inputObj);
            			alertError("请选择末级项目");
            			return false;
            		}
            	}
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
计量单位档案参照
*/
Refer.Unit = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'unitCode', title: '计量单位编码', align: 'left', halign: 'center', width: 80 },
            { field: 'unitName', title: '计量单位名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/system/unit/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/system/unit/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            unitCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.unitList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.unitList.length ==1){
                                settings.referCallBack(result.data.unitList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/system/unit/getList.do",
        paramName: "unitInfo",
        resultName: "unitList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
货位档案参照
*/
Refer.WhPosition = function (params) {

    var settings = $.extend({
        inputObj: null,
        url: contextPath + "/db/whPos/toRefer.do",
        dialogWidth: 600,
        dialogHeight:400,
        referCallBack: null,
        singleSelect: true,
        authFilter: true,
        dynamicData:null,
        blurEvent:true,
        beferFn:null
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
    if (settings.url.indexOf("?") < 0) {
        settings.url = settings.url + "?singleSelect=" + settings.singleSelect
    } else {
        settings.url = settings.url + "&singleSelect=" + settings.singleSelect
    }
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            if(settings.dynamicData != null){
                if(settings.originalUrl == null){
                    settings.originalUrl = settings.url
                }
                var url = settings.originalUrl;
                for(var dataKey in settings.dynamicData){
                    url = url + "&"+dataKey+"="+ eval(settings.dynamicData[dataKey]);
                }
                settings.url=url;
            }
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: settings.url,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal == ""){
                settings.referCallBack( inputObj,{});
            }
        }
    });
}
/*
厂家参照
*/
Refer.Manufacturer = function (params) {

    var settings = $.extend({
        inputObj: null,
        dialogWidth: 600,
        dialogHeight:400,
        referCallBack: null,
        singleSelect: true,
        blurEvent:true,
        authFilter: true
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: contextPath + "/db/mfr/toRefer.do?singleSelect=" + settings.singleSelect + "&authFilter=" + settings.authFilter,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal == ""){
                settings.referCallBack( inputObj,[{}]);
            }
        }
    });
}
/**
 * 存货分类参照
 */
Refer.InvCls = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:true,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'invClsCode', title: '物资分类编码', align: 'left', halign: 'center', width: 80 },
            { field: 'invClsName', title: '物资分类名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 400,
                dialogHeight: 300,
                url: contextPath + "/db/invCls/toRefer.do",
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/invCls/getInvClsTree.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            invClsCode: inputVal,
                            isEnd:settings.selectEnd
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.invClsTree.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.invClsTree.length ==1){
                                settings.referCallBack(result.data.invClsTree[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/invCls/getInvClsTree.do",
        paramName: "invClsInfo",
        resultName: "invClsTree",
        data:{
            isEnd:settings.selectEnd
        },
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}
/**
单据参照
*/
Refer.Vouch = function (params) {

    var settings = $.extend({
        inputObj: null,
        url: null,
        referCallBack: null,
        dialogWidth: 700,
        dialogHeight: 500,
        singleSelect: true,
        beferFn: null,
        blurEvent: false,
        dialogParams:null
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return
    }

    if (settings.url.indexOf("?") < 0) {
        settings.url = settings.url + "?singleSelect=" + settings.singleSelect
    } else {
        settings.url = settings.url + "&singleSelect=" + settings.singleSelect
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: settings.url,
                dialogParams:settings.dialogParams,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal != ""){
                if (typeof (settings.blurFun) == "function") {
                    settings.blurFun(inputVal,settings)
                }
                
            }else{
                settings.referCallBack(inputObj, null);
            }
        }
    });
}

//部门档案参照
Refer.Department = function (params) {

    var settings = $.extend({
        inputObj: null,
        url: null,
        referCallBack: null,
        dialogWidth: 500,
        dialogHeight: 400,
        isChecked: false,
        checkedCodes: "",
        showEnd: true,
        selectEnd:true,
        filterEnd:false,
        blurEvent: true,
        authFilter: false,
        isEnd:true,
        data:{
            ShowEnd:1
        },
        dropHeight: 350,
        dropWidth: 300,
        columns: [
            { field: 'deptCode', title: '部门编码', width: 100},
            { field: 'deptName', title: '部门名称', width: 250,
                styler: function (value, row, index) {
                    var showEnd = true;
                    if(params.showEnd !=null){
                        showEnd = params.showEnd;
                    }
                    if(!showEnd){
                        var deptGrade = row.deptGrade;
                        if (value == null) {
                            return '';
                        }
                        var padding = (deptGrade - 1) * 20;
                        return 'padding-left:' + padding + 'px;' + value;
                    }else{
                        return value;
                    }

                } 
            }
        ]
    }, params);
    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: contextPath + "/db/dept/toRefer.do?deptInfo=" + escape(inputVal) + "&authFilter=" + settings.authFilter + "&isChecked=" + settings.isChecked + "&isEnd=" + settings.isEnd+"&filterEnd="+settings.filterEnd,
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },        
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/dept/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            deptCode: inputVal,
                            authFilter:settings.authFilter
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.deptList.length !=1 ){
                                if(settings.isChecked=="true"){
                                    settings.referCallBack([{}], inputObj);
                                }else{
                                    settings.referCallBack({}, inputObj);
                                }
                            }else if(result.data.deptList.length ==1){
                                if(settings.isChecked=="true"){
                                    settings.referCallBack([result.data.deptList[0]], inputObj);
                                }else{
                                    settings.referCallBack(result.data.deptList[0], inputObj);
                                }
                            }
                        }
                    }
                });
            }else{
                if(settings.isChecked=="true"){
                    settings.referCallBack(inputObj, [{}]);
                }else{
                    settings.referCallBack(inputObj, {});
                }
            }
        }
    });
    
    var tempData = settings.data;
    if(tempData == null){
        tempData = {}
    }
    tempData.showEnd = settings.showEnd;
    tempData.authFilter = settings.authFilter;
    tempData.filterEnd = settings.filterEnd;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/dept/getListForRefer.do",
        paramName: "deptInfo",
        resultName: "deptList",
        dropHeight: 350,
        dropWidth: 500,
        data: tempData,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}
/*
人员档案参照
*/
Refer.Person = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent:true,
        referCallBack: null,
        dropHeight: 250,
        dropWidth: 300,
        columns: [
            { field: 'personCode', title: '人员编码',align:"left", width: 60 },
            { field: 'personName', title: '人员姓名',align:"left", width: 120 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alertError("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 400,
                dialogHeight: 300,
                url: contextPath + "/system/user/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,settings.inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal == ""){
                settings.referCallBack({},inputObj);
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/system/user/toRefer.do",
        paramName: "personInfo",
        resultName: "personList",
        dropHeight: 250,
        dropWidth: 300,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


/*
供应商分类档案参照
*/
Refer.VendorClass = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent:true,
        referCallBack: null,
        dropHeight: 250,
        dropWidth: 400,
        columns: [
            { field: 'venCode', title: '供应商编码', halign:"center", width: 100 },
            { field: 'VenName', title: '供应商名称', halign:"center", width: 250 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 800,
                dialogHeight: 600,
                url: contextPath + "/db/venCls/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },

        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/venCls/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            venCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.vendorList.length !=1 ){
                                settings.referCallBack(inputObj, {});
                            }else if(result.data.vendorList.length ==1){
                                settings.referCallBack(result.data.vendorList[0],inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack( {},inputObj);
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/venCls/getList.do",
        paramName: "venInfo",
        data: settings.data,
        resultName: "vendorList",
        dropHeight: 250,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
供应商档案参照
*/
Refer.Vendor = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent:true,
        referCallBack: null,
        dropHeight: 250,
        dropWidth: 400,
        columns: [
            { field: 'venClassName', title: '供应商分类', halign:"center", width: 100 },
            { field: 'venCode', title: '供应商编码', halign:"center", width: 100 },
            { field: 'venName', title: '供应商名称', halign:"center", width: 250 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: 800,
                dialogHeight: 600,
                url: contextPath + "/u8/toU8VendorRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },

        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/u8/getU8VendorRefer.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            venCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.vendorList.length !=1 ){
                                settings.referCallBack(inputObj, {});
                            }else if(result.data.vendorList.length ==1){
                                settings.referCallBack(result.data.vendorList[0],inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack( {},inputObj);
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getU8VendorRefer.do",
        paramName: "venInfo",
        data: settings.data,
        resultName: "vendorList",
        dropHeight: 250,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


//收发类别参照
Refer.RdType = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        inOut:null,
        isEnd:true,
        delay: 600,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'rdCode', title: '类别编码', align: 'left', halign: 'center', width: 60 },
            { field: 'rdName', title: '类别名称', align: 'left', halign: 'center', width: 150 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
    /*if (settings.inOut == null) {
        alert("未设置收发标志");
        return;
    }*/
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 400,
                dialogHeight: 320,
                url: contextPath + "/db/rdType/toRefer.do?inOut="+settings.inOut,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/rdType/getRdTypeList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            rdCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.rdTypeList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.rdTypeList.length ==1){
                                settings.referCallBack(result.data.rdTypeList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    settings.data.inOut = settings.inOut;
    settings.data.isEnd = settings.isEnd;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/rdType/getRdTypeList.do",
        paramName: "rdTypeInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "rdTypeList",
        dropWidth:300,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}
/*
仓库档案参照
*/
Refer.Warehouse = function (params) {

    var settings = $.extend({
        inputObj: null,
        dialogWidth: 600,
        dialogHeight:400,
        referCallBack: null,
        singleSelect: true,
        blurEvent:true,
        authFilter: false,
        dropHeight: 250,
        dropWidth: 400,
        columns: [
            { field: 'whCode', title: '仓库编码',halign:"center", width: 80},
            { field: 'whName', title: '仓库名称',halign:"center", width: 260 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: contextPath + "/db/wh/toRefer.do?singleSelect=" + settings.singleSelect + "&authFilter=" + settings.authFilter,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();

            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/wh/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            whCode: inputVal,
                            authFilter:settings.authFilter
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.warehouseList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.warehouseList.length ==1){
                                settings.referCallBack(result.data.warehouseList[0],inputObj);
                            }
                        } 
                    }
                });
            }else{
                settings.referCallBack( {},inputObj);
            }
        }
    });
    
    var tempData = settings.data;
    var authFilter = settings.authFilter;
    if(authFilter=="true"){
        authFilter =true;
    }else if(authFilter=="false"){
        authFilter =false;
    }
    if(tempData == null){
        tempData = {
           authFilter:authFilter
        }
    }
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/wh/getList.do",
        paramName: "whInfo",
        data: tempData,
        resultName: "warehouseList",
        dropHeight: 250,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


/*
存货档案参照
*/
Refer.Inv = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        IntroduceWay: null,
        blurEvent: true,
        filterEndDate:true,
        singleSelect:true,
        IsAsset:"",
        beferFn: null,
        Authfilter:true,
        VouchTypeCode:null,
        delay: 600,
        dynamicData:null,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'invCode', title: '物资编码', align: 'left', halign: 'center', width: 80 },
            { field: 'invName', title: '物资名称', align: 'left', halign: 'center', width: 200 },
            { field: 'invAbbName', title: '通用名称', align: 'left', halign: 'center', width: 100 },
            { field: 'invStd', title: '规格型号', align: 'left', halign: 'center', width: 100 },
            { field: 'unitName', title: '单位', align: 'left', halign: 'center', width: 40 },
            { field: 'stockQuantity', title: '现存量', align: 'left', halign: 'center', width: 60 },
            { field: 'materialBrand', title: '品牌', align: 'left', halign: 'center', width: 80 },
            { field: 'mfrCode', title: '厂家名称', align: 'left', halign: 'center', width: 80 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 1000,
                dialogHeight: 600,
                url: contextPath + "/db/inv/toRefer.do?invInfo=" + escape(inputVal) + "&singleSelect="+settings.singleSelect+"&IntroduceWay=" + settings.IntroduceWay + "&filterEndDate=" + settings.filterEndDate+"&IsAsset="+ settings.IsAsset+"&authfilter="+settings.Authfilter,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/inv/getInvListForRefer.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            fullInvCode: inputVal,
                            filterEndDate:settings.filterEndDate
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(settings.singleSelect){
                                if(result.data.invList.length !=1 ){
                                    settings.referCallBack({},inputObj);
                                }else if(result.data.invList.length ==1){
                                    settings.referCallBack(result.data.invList[0], inputObj);
                                }
                            }else{
                                if(result.data.invList.length !=1 ){
                                    settings.referCallBack([{}],inputObj);
                                }else if(result.data.invList.length ==1){
                                    settings.referCallBack(result.data.invList, inputObj);
                                }
                            }
                            
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data == null){
        settings.data = {};
    }
    settings.data.filterEndDate = settings.filterEndDate;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/inv/getInvListForRefer.do",
        paramName: "invInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        singleSelect:settings.singleSelect,
        resultName: "invList",
        dropWidth:800,
        dataGridUrl:"dropgrid.refer.inv",
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


/*
资金来源参照
*/
Refer.fundSrc = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        singleSelect: true,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'fundSrc', title: '资金来源', halign:"center", width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/pages/common/refer/u8/fundSrcRefer.jsp?singleSelect="+settings.singleSelect,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/u8/getFundSrcList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            fundSrcInfo: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.fundSrcList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.fundSrcList.length ==1){
                                settings.referCallBack(result.data.fundSrcList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getFundSrcList.do",
        paramName: "fundSrcInfo",
        data: settings.data,
        resultName: "fundSrcList",
        dropWidth:400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


/*
项目参照
*/
Refer.item = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        columns: [
            { field: 'itemCode', title: '项目编码', align: 'left', halign: 'center', width: 80 },
            { field: 'itemName', title: '项目名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 800,
                dialogHeight: 600,
                url: contextPath + "/db/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/item/getItemList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            itemCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/item/getItemList.do",
        paramName: "itemInfo",
        data: settings.data,
        resultName: "itemList",
        dropWidth:500,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/**
机构参照
*/
Refer.Org = function (params) {

    var settings = $.extend({
        inputObj: null,
        url: contextPath + "/db/org/toRefer.do",
        referCallBack: null,
        dialogWidth: 700,
        dialogHeight: 500,
        singleSelect: true,
        showEnd:true,
        beferFn: null,
        dialogParams:null,
        dropHeight: 250,
        dropWidth: 340,
        columns: [
            { field: 'orgCode', title: '机构编码',align:"left", width: 60 },
            { field: 'orgName', title: '机构名称',align:"left", width: 220 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return
    }

    if (settings.url.indexOf("?") < 0) {
        settings.url = settings.url + "?singleSelect=" + settings.singleSelect
    } else {
        settings.url = settings.url + "&singleSelect=" + settings.singleSelect
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: settings.dialogWidth,
                dialogHeight: settings.dialogHeight,
                url: settings.url,
                dialogParams:settings.dialogParams,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        }
    });
    var tempData = settings.data;
    if(tempData == null){
        tempData = {}
    }
    tempData.isEnd = settings.showEnd;
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/org/getListForRefer.do",
        paramName: "orgInfo",
        resultName: "orgList",
        dropHeight: settings.dropHeight,
        dropWidth: settings.dropWidth,
        data:tempData,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

/*
物资单位换算参照
*/
Refer.InvUnitRate = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        invCode:null
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            if(settings.invCode == null || settings.invCode ==""){
                alert("请先选择物资");
                return;
            }
            openDialog({
                dialogWidth: 600,
                dialogHeight: 400,
                url: contextPath + "/db/unit/toUnitRateRefer.do?invCode="+settings.invCode,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack( returnVal,inputObj);
                }
            })
        }
    });
}

/*
费用项目参照
*/
Refer.costItem = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        columns: [
            { field: 'costItemId', title: '费用项目编号', align: 'left', halign: 'center', width: 100 },
            { field: 'costItemName', title: '费用项目名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 800,
                dialogHeight: 600,
                url: contextPath + "/db/costItem/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/costItem/getCostItemList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            costItemCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/costItem/getCostItemList.do",
        paramName: "costItemInfo",
        data: settings.data,
        resultName: "costItemList",
        dropWidth:600,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


/*
费用项目参照
*/
Refer.AssetClass = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        selectEnd:true,
        columns: [
            { field: 'assetClsCode', title: '资产类别编码', align: 'left', halign: 'center', width: 100 },
            { field: 'assetClsName', title: '资产类别名称', align: 'left', halign: 'center', width: 120 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                url: contextPath + "/db/asset/assetClass/toRefer.do",
                dialogWidth: 800,
                dialogHeight: 600,
                dialogParams:{
                    selectEnd: settings.selectEnd
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/asset/assetClass/getAssetClsList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            itemCode: inputVal,
                            isEnd:settings.selectEnd
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data ={};
    }
    settings.data.isEnd= settings.selectEnd;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/asset/assetClass/getAssetClsList.do",
        paramName: "assetClsInfo",
        data: settings.data,
        resultName: "assetClassList",
        dropWidth:400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


Refer.DataDict = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        selectSingle:false,
        beferFn: null,
        dictTypeCode:null,
        delay: 600,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'dictCode', title: '编码', align: 'left', halign: 'center', width: 80 },
            { field: 'dictName', title: '名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    if (isNullorEmpty(settings.dictTypeCode)) {
        alert("未设置参照数据字典类别");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 800,
                dialogHeight: 500,
                url: contextPath + "/db/dataDict/toRefer.do?dictTypeCode="+settings.dictTypeCode,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/dataDict/getSearchList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            dictCode: inputVal,
                            dictTypeCode:settings.dictTypeCode
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.invList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.invList.length ==1){
                                settings.referCallBack(result.data.invList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data == null){
        settings.data = {};
    }
    settings.data.dictTypeCode = settings.dictTypeCode;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/dataDict/getSearchList.do",
        paramName: "dictInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "dataDictDetailList",
        dropWidth:400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


Refer.AccountCode = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:true,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'code', title: '科目编码', align: 'left', halign: 'center', width: 80 },
            { field: 'codeName', title: '科目名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

//    $(settings.inputObj).refer({
//        referClick: function (inputObj) {
//            openDialog({
//                dialogWidth: 400,
//                dialogHeight: 300,
//                url: contextPath + "/db/invCls/toRefer.do",
//                dialogParams:{
//                    selectEnd: settings.selectEnd
//                },
//                dialogCallBack: function (returnVal) {
//                    settings.referCallBack(returnVal,inputObj);
//                }
//            })
//        },
//        inputBlur:function(inputObj){
//            if(settings.blurEvent != true){
//                return; 
//            }
//            var inputVal = $(inputObj).val();
//
//            if(inputVal == ""){
//                settings.referCallBack( {},inputObj);
//            }
//        }
//    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/gl/accountCode/getCodeListForRefer.do",
        paramName: "codeInfo",
        resultName: "codeList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


Refer.CaseFlow = function (params) {

    var settings = $.extend({
        inputObj: null,
        blurEvent: true,
        referCallBack: null,
        selectEnd:true,
        columns:[
            { field: 'ck', checkbox: true },
            { field: 'itemCode', title: '项目编码', align: 'left', halign: 'center', width: 80 },
            { field: 'itemName', title: '项目名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).dropgrid({
        url: contextPath + "/db/gl/caseFlow/getListForRefer.do",
        paramName: "itemInfo",
        resultName: "caseFlowList",
        dropHeight: 350,
        dropWidth: 400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


Refer.EquipCard = function (params) {

    var settings = $.extend({
        inputObj: null,
        codeStata: false,
        referCallBack: null,
        blurEvent: true,
        selectSingle:false,
        beferFn: null,
        delay: 600,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'equipCode', title: '设备编码', align: 'left', halign: 'center', width: 80 },
            { field: 'equipName', title: '设备名称', align: 'left', halign: 'center', width: 200 },
            { field: 'equipStd', title: '规格型号', align: 'left', halign: 'center', width: 100 },
            { field: 'useDept', title: '使用科室', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 800,
                dialogHeight: 500,
                url: contextPath + "/fa/business/equip/equipCard/toEquipCardRefer.do?codeStata="+settings.codeStata,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/dataDict/getSearchList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            dictCode: inputVal,
                            dictTypeCode:settings.dictTypeCode
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.dataDictDetailList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.dataDictDetailList.length ==1){
                                settings.referCallBack(result.data.dataDictDetailList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data == null){
        settings.data = {};
    }
    settings.data.dictTypeCode = settings.dictTypeCode;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/fa/business/equip/equipCard/getEquipCardListForRefer.do",
        paramName: "equipInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "equipCardList",
        dropWidth:700,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//设备卡片参照
Refer.AssetCard = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        selectSingle:false,
        beferFn: null,
        delay: 600,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'assetCode', title: '设备编码', align: 'left', halign: 'center', width: 80 },
            { field: 'assetName', title: '设备名称', align: 'left', halign: 'center', width: 200 },
            { field: 'assetSpec', title: '设备规格', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 800,
                dialogHeight: 500,
                url: contextPath + "/fa/business/asset/assetCard/toAssetCardRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/db/dataDict/getSearchList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            dictCode: inputVal,
                            dictTypeCode:settings.dictTypeCode
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.invList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.invList.length ==1){
                                settings.referCallBack(result.data.invList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data == null){
        settings.data = {};
    }
    settings.data.dictTypeCode = settings.dictTypeCode;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/fa/business/asset/assetCard/getAssetCardListForRefer.do",
        paramName: "assetInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "assetCardList",
        dropWidth:700,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


//预算项目参照
Refer.BudgetFormItem = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: false,
        selectSingle:false,
        beferFn: null,
        formId:null,
        checkDeptCode:null,
        delay: 600,
        columns: [
            { field: 'ck', checkbox: true },
            { field: 'itemCode', title: '项目编码', align: 'left', halign: 'center', width: 80 },
            { field: 'itemName', title: '项目名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    if (settings.formId == null) {
        alert("未设置参照预算表");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 600,
                dialogHeight: 400,
                url: contextPath + "/bm/setting/budgetItem/toFormItemRefer.do",
                dialogParams:{
                    formId: settings.formId,
                    checkDeptCode: settings.checkDeptCode
                },
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data == null){
        settings.data = {};
    }
    settings.data.formId = settings.formId;
    settings.data.checkDeptCode = settings.checkDeptCode;
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/bm/setting/budgetItem/getItemReferByForm.do",
        paramName: "itemInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "itemList",
        dropWidth:700,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//故障类型

Refer.FaultType = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'typeName', title: '故障类型名称', align: 'left', halign: 'center', width: 100 },
            { field: 'typeMemo', title: '故障类型描述', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 600,
                dialogHeight: 320,
                url: contextPath + "/fa/business/equip/faultType/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/fa/business/equip/faultType/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                        	typeName: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.faultTypeList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.faultTypeList.length ==1){
                                settings.referCallBack(result.data.faultTypeList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/fa/business/equip/faultType/getList.do",
        paramName: "teamCodeInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "faultTypeList",
        dropWidth:500,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//故障等级
Refer.FaultPriority = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [

            { field: 'id', title: '故障等级编码', align: 'left', halign: 'center', width: 80 },
            { field: 'priorityName', title: '故障等级名称', align: 'left', halign: 'center', width: 200 },
            { field: 'priorityMemo', title: '故障等级描述', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 400,
                dialogHeight: 320,
                url: contextPath + "/fa/business/equip/faultPriority/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/fa/business/equip/faultPriority/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            typeName: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.faultPrioritieList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.faultPrioritieList.length ==1){
                                settings.referCallBack(result.data.faultPrioritieList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/fa/business/equip/faultPriority/getList.do",
        paramName: "teamCodeInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "faultPrioritieList",
        dropWidth:300,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//预警口径
Refer.Caliber = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'caliberName', title: '预警口径名称', align: 'left', halign: 'center', width: 150 },
            { field: 'caliberDesc', title: '预警口径描述', align: 'left', halign: 'center', width: 400 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 600,
                dialogHeight: 450,
                url: contextPath + "/bm/setting/warnCaliber/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/bm/setting/warnCaliber/getList.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            typeName: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.warnCaliber.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.warnCaliber.length ==1){
                                settings.referCallBack(result.data.warnCaliber[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/bm/setting/warnCaliber/getList.do",
        paramName: "warnCaliberInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "warnCaliberList",
        dropWidth:600,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//U8项目
Refer.U8Item = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'cItemCode', title: '项目编号', align: 'left', halign: 'center', width: 100 },
            { field: 'cItemPath', title: '项目名称', align: 'left', halign: 'center', width: 500 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alertError("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 700,
                dialogHeight: 500,
                url: contextPath + "/u8/toU8ItemRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        },
        inputBlur:function(inputObj){
            if(settings.blurEvent != true){
                return; 
            }
            var inputVal = $(inputObj).val();
            if(inputVal != ""){
                ajaxSubmit({
                    url: contextPath + "/u8/getU8ItemRefer.do",
                    async:false,
                    lockScreen:false,
                    data:{
                        filter: JSON.stringify({
                            itemCode: inputVal
                        })
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            if(result.data.itemList.length !=1 ){
                                settings.referCallBack({},inputObj);
                            }else if(result.data.itemList.length ==1){
                                settings.referCallBack(result.data.itemList[0], inputObj);
                            }
                        }
                    }
                });
            }else{
                settings.referCallBack(inputObj, {});
            }
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getU8ItemRefer.do",
        paramName: "itemInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "itemList",
        dropWidth:650,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//项目级别
Refer.ItemLevel = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'itemLevelCode', title: '项目级别编号', align: 'left', halign: 'center', width: 100 },
            { field: 'itemLevelName', title: '项目级别名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 400,
                dialogHeight: 320,
                url: contextPath + "/bm/setting/itemLevel/toRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/bm/setting/itemLevel/getList.do",
        paramName: "ItemLevelInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "itemLevelList",
        dropWidth:400,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//项目属性
Refer.ItemProp = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        isGetChild:false,
        singleSelect:true,
        data:{},
        isChecked:false,
        grade:null,
        columns: [
            { field: 'itemPropCode', title: '项目属性编号', align: 'left', halign: 'center', width: 100 },
            { field: 'treeName', title: '项目属性名称', align: 'left', halign: 'center', width: 150 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            var levelId = "";
            if(!jQuery.isEmptyObject(settings.data)&&settings.data.levelDiv!=null&&settings.data.levelDiv!=""){
            	levelId = $("#"+settings.data.levelDiv).val()
            }
            openDialog({
                dialogWidth: 400,
                dialogHeight: 320,
                dialogParams:{
                	levelId:levelId,
                	isChecked:settings.isChecked,
                	grade:settings.grade
                },
                url: contextPath + "/bm/setting/itemProp/toRefer.do?isGetChild="+settings.isGetChild+"&singleSelect="+settings.singleSelect,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/bm/setting/itemProp/getList.do",
        paramName: "ItemPropInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "itemPropList",
        dropWidth:400,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}


//u8用户表
Refer.U8User = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'sysUserName', title: '用户名称', align: 'left', halign: 'center', width: 100 },
            { field: 'DeptName', title: '部门名称', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/u8/toUserByU8.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getUserByU8.do",
        paramName: "userInfo",
        dynamicData:settings.dynamicData,
        resultName: "userList",
        dropWidth:500,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function"){
                settings.referCallBack(returnVal, settings.inputObj);
            }
        }
    })
}

Refer.U8Department = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'cDepCode', title: '部门编号', align: 'left', halign: 'center', width: 100 },
            { field: 'cDepName', title: '部门名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/u8/toU8DeptRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
   
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getU8DeptRefer.do",
        paramName: "deptInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "deptList",
        dropWidth:500,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function"){
                if(returnVal != null){
                    returnVal = {
                        deptCode: returnVal.cDepCode,
                        deptName: returnVal.cDepName
                    }
                }
                settings.referCallBack(returnVal, settings.inputObj);
            }
        }
    });
}

Refer.U8Person = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
        	{ field: 'cDepName', title: '部门名称', align: 'left', halign: 'center', width: 100 },
            { field: 'cPsnNum', title: '人员编号', align: 'left', halign: 'center', width: 100 },
            { field: 'cPsnName', title: '人员姓名', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
    var toUrl = contextPath + "/u8/toU8PsnForRefer.do"
    if(settings.data!=null&&settings.data.departmentCode!=null){
    	toUrl = contextPath + "/u8/toU8PsnForRefer.do?departmentCode="+settings.data.departmentCode
    }
    if(settings.data!=null&&settings.data.departmentName!=null){
        toUrl = contextPath + "/u8/toU8PsnForRefer.do?departmentName="+escape(settings.data.departmentName)
    }
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 700,
                dialogHeight: 500,
                url: toUrl,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getU8PsnForRefer.do",
        paramName: "psnNum",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "psnList",
        dropWidth:500,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function"){
                settings.referCallBack(returnVal, settings.inputObj);
            }
        }
    });
}
Refer.U8ItemSort = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        singleSelect:true,
        isChecked:false,
        isEnd:false,
        columns: [
            { field: 'cItemCcode', title: '项目分类编号', align: 'left', halign: 'center', width: 200 },
            { field: 'cItemCname', title: '项目分类名称', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/u8/toU8ItemSortRefer.do?isEnd="+settings.isEnd,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getItemClassList.do",
        paramName: "deptInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "itemClassList",
        dropWidth:300,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

Refer.itemCostByItemClass = function (params) {
	
    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        dialogParams:{}
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }

    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 1000,
                dialogHeight: 700,
                url: contextPath + "/rd/business/applyVouch/toRdItemCostByItemClass.do",
                dialogParams:settings.dialogParams,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
}


//物资参照
Refer.u8Inv = function (params) {

    var settings = $.extend({
        inputObj: null,
        accountId:null,
        year:null,
        itemClass:null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        accountId:null,
        year:null,
        itemClass:null,
        singleSelect:true,
        columns: [
        	{ field: 'ck', checkbox: true },
            { field: 'invCode', title: '物资编码', align: 'left', halign: 'center', width: 100 },
            { field: 'invName', title: '物资名称', align: 'left', halign: 'center', width: 150 },
            { field: 'invStd', title: '规格型号', align: 'left', halign: 'center', width: 120 },
            { field: 'unitName', title: '单位', align: 'left', halign: 'center', width: 80 },
            { field: 'referPrice', title: '单价', align: 'left', halign: 'center', width: 80 },
            { field: 'StockQuantity', title: '数量', align: 'left', halign: 'center', width: 80 },
            { field: 'whName', title: '仓库名称', align: 'left', halign: 'center', width: 80 }
        ]
    }, params);
    
    if (settings.inputObj == null) {
        alertError("未设置参照对象");
        return;
    }
    if (isNullorEmpty(settings.accountId)) {
        alertError("请选择账套");
        return;
    }
    if (isNullorEmpty(settings.year)) {
        alertError("请选择年度");
        return;
    }
    if (isNullorEmpty(settings.itemClass)) {
        alertError("请选择项目大类");
        return;
    }
    if(settings.data==null){
        settings.data= {};
    }
    settings.data.accountId = settings.accountId;
    settings.data.year = settings.year;
    settings.data.itemClass = settings.itemClass;
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 1000,
                dialogHeight: 600,
                url: contextPath + "/pages/common/refer/u8/inventoryRefer.jsp?accountId="+settings.data.accountId+"&year="+settings.data.year+"&itemClass="+settings.data.itemClass+"&singleSelect="+settings.singleSelect,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/u8/getU8InvListForRefer.do",
        paramName: "invInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "invList",
        dropWidth:800,
        dropHeight: 320,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}



//出库类别
Refer.RdStyle = function (params) {

    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        columns: [
            { field: 'cRdCode', title: '出库类别编码', align: 'left', halign: 'center', width: 100 },
            { field: 'cRdName', title: '出库类别名称', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 700,
                dialogHeight: 400,
                url: contextPath + "/rd/business/applyVouch/toRdStyleRefer.do",
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    
    $(settings.inputObj).dropgrid({
        url: contextPath + "/rd/business/applyVouch/getListForReferRdStyle.do",
        paramName: "rdStyleInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "RdStyleList",
        dropWidth:300,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });
}

//合同分类
Refer.ContractClass = function (params) {
	var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        data:{isEnd:false},
        columns: [
            { field: 'contractClassCode', title: '合同分类编号', align: 'left', halign: 'center', width: 100 },
            { field: 'contractClassName', title: '合同分类名称', align: 'left', halign: 'center', width: 200 }
        ]
    }, params);

    if (settings.inputObj == null) {
        alert("未设置参照对象");
        return;
    }
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 700,
                dialogHeight: 500,
                url: contextPath + "/bm/contract/contractClass/toRefer.do?isEnd="+settings.isEnd,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    $(settings.inputObj).dropgrid({
        url: contextPath + "/bm/contract/contractClass/getListForRefer.do",
        paramName: "contractClassInfo",
        data: settings.data,
        dynamicData:settings.dynamicData,
        resultName: "contractClassList",
        dropWidth:500,
        singleSelect:settings.singleSelect,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function"){
                settings.referCallBack(returnVal, settings.inputObj);
            }
        }
    });
    
    /*
    var settings = $.extend({
        inputObj: null,
        referCallBack: null,
        blurEvent: true,
        delay: 600,
        beferFn:null,
        isEnd:false,
        data:{isEnd:false},
        columns: [
            { field: 'contractClassCode', title: '合同分类编号', align: 'left', halign: 'center', width: 200 },
            { field: 'contractClassName', title: '合同分类名称', align: 'left', halign: 'center', width: 100 }
        ]
    }, params);
    settings.data.isEnd = settings.isEnd
    if (settings.inputObj == null) {
        alertError("未设置参照对象");
        return;
    }
   
    $(settings.inputObj).refer({
        referClick: function (inputObj) {
            var inputVal = $(inputObj).val();
            
            if (typeof (settings.beferFn) == "function") {
                var result = settings.beferFn(settings);
                if (result === false) {
                    return;
                }
            }
            openDialog({
                dialogWidth: 500,
                dialogHeight: 400,
                url: contextPath + "/bm/contract/contractClass/toRefer.do?isEnd="+settings.isEnd,
                dialogCallBack: function (returnVal) {
                    settings.referCallBack(returnVal,inputObj);
                    $(inputObj).focus();
                }
            })
        }
    });
    if(settings.data==null){
        settings.data= {};
    }
    
    $(settings.inputObj).dropgrid({
    	url: contextPath + "/bm/contract/contractClass/getListForRefer.do",
    	paramName: "contractClassInfo",
    	data: settings.data,
    	resultName: "ContractClassList",
        dropWidth:400,
        columns: settings.columns,
        onSelectData: function (returnVal) {
            if (typeof (settings.referCallBack) == "function")
                settings.referCallBack(returnVal, settings.inputObj);
        }
    });*/
}

//合同
Refer.Contract = function (params) {
	var settings = $.extend({
		inputObj: null,
		referCallBack: null,
		singleSelect:true,
		blurEvent: true,
		delay: 500,
		beferFn:null,
		isEnd:false,
		data:null,
		columns: [
			{ field: 'contractCode', title: '合同编号', align: 'left', halign: 'center', width: 120 },
			{ field: 'contractName', title: '合同名称', align: 'left', halign: 'center', width: 370 }
		]
	}, params);
	if (settings.inputObj == null) {
		alertError("未设置参照对象");
		return;
	}
	
	$(settings.inputObj).refer({
		referClick: function (inputObj) {
			var inputVal = $(inputObj).val();
			
			if (typeof (settings.beferFn) == "function") {
				var result = settings.beferFn(settings);
				if (result === false) {
					return;
				}
			}
			openDialog({
				dialogWidth: 600,
				dialogHeight: 400,
				url: contextPath + "/bm/contract/contract/toRefer.do",
				dialogCallBack: function (returnVal) {
					settings.referCallBack(returnVal,inputObj);
					$(inputObj).focus();
				}
			})
		}
	});
	if(settings.data==null){
		settings.data= {};
	}
	
	
	$(settings.inputObj).dropgrid({
		url: contextPath + "/bm/contract/contract/getListByRefer.do",
		paramName: "contractInfo",
		data: settings.data,
		dynamicData:settings.dynamicData,
		resultName: "contractList",
		dropWidth:500,
		singleSelect:settings.singleSelect,
		columns: settings.columns,
		onSelectData: function (returnVal) {
			if (typeof (settings.referCallBack) == "function")
				settings.referCallBack(returnVal, settings.inputObj);
		}
	});
}

//合同中的项目
Refer.ContractItemInfo = function (params) {
	var settings = $.extend({
		inputObj: null,
		referCallBack: null,
		singleSelect:true,
		blurEvent: true,
		delay: 500,
		beferFn:null,
		isEnd:false,
		data:null,
		columns: [
			{ field: 'deptName', title: '部门名称', align: 'left', halign: 'center', width: 80 },
			{ field: 'itemCode', title: '项目编号', align: 'left', halign: 'center', width: 120 },
			{ field: 'itemName', title: '项目名称', align: 'left', halign: 'center', width: 290 }
		]
	}, params);
	if (settings.inputObj == null) {
		alertError("未设置参照对象");
		return;
	}
	
	$(settings.inputObj).refer({
		referClick: function (inputObj) {
			var inputVal = $(inputObj).val();
			
			if (typeof (settings.beferFn) == "function") {
				var result = settings.beferFn(settings);
				if (result === false) {
					return;
				}
			}
			openDialog({
				dialogWidth: 600,
				dialogHeight: 400,
				dialogParams:{
                    data:settings.data
                },
				url: contextPath + "/bm/item/itemInfo/toItemInfoReferByContract.do",
				dialogCallBack: function (returnVal) {
					settings.referCallBack(returnVal,inputObj);
					$(inputObj).focus();
				}
			})
		}
	});
	if(settings.data==null){
		settings.data= {};
	}
	
	
	$(settings.inputObj).dropgrid({
		url: contextPath + "/bm/item/itemInfo/getItemInfoListByRefer.do",
		paramName: "itemInfo",
		data: settings.data,
		dynamicData:settings.dynamicData,
		resultName: "itemInfoList",
		dropWidth:600,
		singleSelect:settings.singleSelect,
		columns: settings.columns,
		onSelectData: function (returnVal) {
			if (typeof (settings.referCallBack) == "function")
				settings.referCallBack(returnVal, settings.inputObj);
		}
	});
}

//u8的科目代码
Refer.U8Subj = function (params) {
	var settings = $.extend({
		inputObj: null,
		referCallBack: null,
		singleSelect:true,
		blurEvent: true,
		delay: 500,
		beferFn:null,
		isEnd:null,
		data:null,
		columns: [
			{ field: 'ccode', title: '科目编码', align: 'left', halign: 'center', width: 80 },
			{ field: 'endName', title: '科目名称', align: 'left', halign: 'center', width: 120 },
			{ field: 'ccodeName', title: '科目完整名称', align: 'left', halign: 'center', width: 290 }
		]
	}, params);
	if (settings.inputObj == null) {
		alertError("未设置参照对象");
		return;
	}
	if(settings.data==null){
		settings.data= {};
	}
	settings.data.isEnd = settings.isEnd
	$(settings.inputObj).refer({
		referClick: function (inputObj) {
			var inputVal = $(inputObj).val();
			
			if (typeof (settings.beferFn) == "function") {
				var result = settings.beferFn(settings);
				if (result === false) {
					return;
				}
			}
			openDialog({
				dialogWidth: 600,
				dialogHeight: 400,
				dialogParams:{
					data:settings.data
				},
				url: contextPath + "/u8/toU8SubjForRefer.do",
				dialogCallBack: function (returnVal) {
					settings.referCallBack(returnVal,inputObj);
					$(inputObj).focus();
				}
			})
		}
	});
	$(settings.inputObj).dropgrid({
		url: contextPath + "/u8/getSubjListByRefer.do",
		paramName: "subjInfo",
		data: settings.data,
		dynamicData:settings.dynamicData,
		resultName: "subjList",
		dropWidth:600,
		singleSelect:settings.singleSelect,
		columns: settings.columns,
		onSelectData: function (returnVal) {
			if (typeof (settings.referCallBack) == "function")
				settings.referCallBack(returnVal, settings.inputObj);
		}
	});
}

//工作量类型
Refer.WorkloadType = function (params) {
	var settings = $.extend({
		inputObj: null,
		referCallBack: null,
		singleSelect:true,
		blurEvent: true,
		delay: 500,
		beferFn:null,
		isEnd:null,
		selectEnd:false,
		isChecked:false,
		data:null,
		columns: [
			{ field: 'name', title: '类型名称', align: 'left', halign: 'center', width: 80 }
		]
	}, params);
	if (settings.inputObj == null) {
		alertError("未设置参照对象");
		return;
	}
	
	$(settings.inputObj).refer({
		referClick: function (inputObj) {
			var inputVal = $(inputObj).val();
			
			if (typeof (settings.beferFn) == "function") {
				var result = settings.beferFn(settings);
				if (result === false) {
					return;
				}
			}
			openDialog({
				dialogWidth: 600,
				dialogHeight: 400,
				dialogParams:{
                    data:settings.data
                },
				url: contextPath + "/kpi/setting/workloadType/toRefer.do?selectEnd="+settings.selectEnd+
				"&isChecked="+settings.isChecked,
				dialogCallBack: function (returnVal) {
					settings.referCallBack(returnVal,inputObj);
					$(inputObj).focus();
				}
			})
		}
	});
	if(settings.data==null){
		settings.data= {};
	}
	if(settings.isEnd!=null&&(settings.isEnd==true||settings.isEnd==false)){
		settings.data.isEnd = Boolean(settings.isEnd);
	}
	
	$(settings.inputObj).dropgrid({
		url: contextPath + "/kpi/setting/workloadType/getListForRefer.do",
		paramName: "nameInfo",
		data: settings.data,
		dynamicData:settings.dynamicData,
		resultName: "workloadTypeList",
		dropWidth:600,
		singleSelect:settings.singleSelect,
		columns: settings.columns,
		onSelectData: function (returnVal) {
			if (typeof (settings.referCallBack) == "function")
				settings.referCallBack(returnVal, settings.inputObj);
		}
	});
}

//工作量
Refer.WorkloadItem = function (params) {
	var settings = $.extend({
		inputObj: null,
		referCallBack: null,
		singleSelect:true,
		blurEvent: true,
		delay: 500,
		beferFn:null,
		isEnd:false,
		selectEnd:false,
		isChecked:false,
		data:null,
		columns: [
			{ field: 'itemCode', title: '编码', align: 'left', width: 100 },
            { field: 'itemName', title: '名称', align: 'left', width: 100 },
            { field: 'typeName', title: '类型', align: 'left', width: 100 },
            { field: 'score', title: '绩点', align: 'left', width: 100 }
		]
	}, params);
	if (settings.inputObj == null) {
		alertError("未设置参照对象");
		return;
	}
	
	$(settings.inputObj).refer({
		referClick: function (inputObj) {
			var inputVal = $(inputObj).val();
			
			if (typeof (settings.beferFn) == "function") {
				var result = settings.beferFn(settings);
				if (result === false) {
					return;
				}
			}
			openDialog({
				dialogWidth: 600,
				dialogHeight: 400,
				dialogParams:{
					data:settings.data
				},
				url: contextPath + "/kpi/setting/workloadItem/toRefer.do?singleSelect="+settings.singleSelect,
				dialogCallBack: function (returnVal) {
					settings.referCallBack(returnVal,inputObj);
					$(inputObj).focus();
				}
			})
		}
	});
	if(settings.data==null){
		settings.data= {};
	}
	settings.data.isEnd = settings.isEnd;
	
	$(settings.inputObj).dropgrid({
		url: contextPath + "/kpi/setting/workloadItem/getList.do",
		paramName: "nameInfo",
		data: settings.data,
		dynamicData:settings.dynamicData,
		resultName: "workloadItemList",
		dropWidth:600,
		singleSelect:settings.singleSelect,
		columns: settings.columns,
		onSelectData: function (returnVal) {
			if (typeof (settings.referCallBack) == "function")
				settings.referCallBack(returnVal, settings.inputObj);
		}
	});
}