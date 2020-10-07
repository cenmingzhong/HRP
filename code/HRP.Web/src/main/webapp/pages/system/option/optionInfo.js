//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
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
                if(!validateForm("busForm")){
                    return false;
                }
                var data = $("#busForm").form2json();
                var $chks = $("#busForm").find(":checkbox:not(:checked)");    //取得所有未选中的checkbox  

                if ($chks.length >= 0) {
                    $chks.each(function () {
                        var chkName = $(this).attr("name");

                        if (data[chkName] == null) {
                            data[chkName] = ""
                        }
                    });
                }

                ajaxSubmit({
                    url: contextPath + "/system/option/save",
                    data: {
                    	sysProperty: JSON.stringify(data),
                        appKey: "DB"
                    },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            alert(result.message);

                            setToolBar("view");
                            disabledForm("busForm");
                        }
                    }
                });
            }
        }, {
            id: "edit",
            text: "编辑",
            iconCls: "icon-edit",
            handler: function () {
                setToolBar("edit");
                enableForm("busForm");

                $("#busForm select").each(function(){ 
                    var selObj = this;
                    if(this.value =="Local"){
                        $("#txt_"+this.name+"_Value").val(""); 
                        $("#txt_"+this.name+"_Value").attr("disabled","disabled"); 
                    }else{
                        $("#txt_"+this.name+"_Value").removeAttr("disabled");
                    }
                });

            }
        }, {
            id: "cancel",
            text: "取消",
            iconCls: "icon-cancel",
            handler: function () {
                setToolBar("view");
                disabledForm("busForm");
            }
        }]
    });
}
function initPage() {
    setToolBar("view");
    disabledForm("busForm");
    loadData();

    $("#busForm select").each(function(){ 
        var selObj = this;

        $(selObj).bind("change", function(){
            if(this.value =="Local"){
                $("#txt_"+this.name+"_Value").val(""); 
                $("#txt_"+this.name+"_Value").attr("disabled","disabled"); 
            }else{
                $("#txt_"+this.name+"_Value").removeAttr("disabled");
            }
        })
    });

    $("#btn_ClearData").bind("click", function(){
        clearData();
    });
    $("#btn_Set").bind("click", function(){
        $("#initForm")[0].reset();
    });
}

function setToolBar(status) {
    if (status == "view") {
        $('#tb').toolbar("disabled", 'save');
        $('#tb').toolbar("enable", 'edit');
        $('#tb').toolbar("disabled", 'cancel');
        $('#tb').toolbar("disabled", 'cancel1');
    } else if (status == "edit") {
        $('#tb').toolbar("enable", 'save');
        $('#tb').toolbar("disabled", 'edit');
        $('#tb').toolbar("enable", 'cancel');
        $('#tb').toolbar("enable", 'cancel1');
    }
}

function loadData() {
    ajaxSubmit({
        url: contextPath + "/system/option/getSysPropertyList.do",
        data: {
            appKey: "DB"
        },
        success: function (result) {
            if (result.isOk == "Y") {
                $("#busForm").fill(result.data.sysProperty);
                $("#vouchForm").fill(result.data.sysProperty);
            } else {
                alert(result.message);
            }
        }
    });
}


function clearData(){
    var keyTypeList =[]; 
    $('input[name="KeyType"]:checked').each(function(){ 
        keyTypeList.push($(this).val()); 
    }); 

    if(keyTypeList.length ==0){
        alert("请选择需要清空的模块")
        return;
    }
    if(!confirm("确定要清空所选模块的数据吗？")){
        return;
    }

    ajaxSubmit({
        url: contextPath + "/system/option/delete.do",
        data: {
            keyTypeList: JSON.stringify(keyTypeList)
        },
        success: function (result) {
            if (result.isOk == "Y") {
                alert(result.message);
                $("#initForm")[0].reset();
            } else {
                alert(result.message);
            }
        }
    });
}