var moduleCode = "";
//页面初始化
$(document).ready(function () {
	initToolBar();
    initModuleTree(); //初始化模块信息
});


//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "save",
            text: "保存",
            iconCls: "icon-save",
            handler: function () {
                var selectedNode = $.fn.zTree.getZTreeObj("menuList").getSelectedNodes();
                if(selectedNode.length ==0 || selectedNode[0].sysMenuCode=="root"){
                    alertError("请选择菜单节点");
                    return;
                }
                closeDialog(selectedNode[0].sysMenuCode);
            }
        },{
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeDialog();
            }
        }]
    });
}

//初始化模块树
function initModuleTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: false
        },
        dnd: true,
        data: {
            key: {
                name: "sysMenuName"
            },
            simpleData: {
                enable: true,
                idKey: "sysMenuCode",
                pIdKey: "",
                rootPId: ""
            }
        },
        callback: {
            onClick: function (e, treeId, treeNode) {
                moduleCode = treeNode.SysModuleCode;
                initMenuTree();
            }
        }
    };
    ajaxSubmit({
        url: contextPath + "/system/menu/getModuleList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                for (var i = 0; i < result.data.moduleList.length; i++) {
                    result.data.moduleList[i].dropInner = false;
                    result.data.moduleList[i].iconSkin = "folder";
                }
                $.fn.zTree.init($("#moduleList"), setting, result.data.moduleList);
                
                initMenuTree();
            } 
        }
    });
}
//初始化菜单树
function initMenuTree(selMenuCode) {
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
                name: "sysMenuName"
            },
            simpleData: {
                enable: true,
                idKey: "sysMenuCode",
                pIdKey: "sysMenuParent",
                rootPId: ""
            }
        }
    };

    var selectedNode = $.fn.zTree.getZTreeObj("moduleList").getSelectedNodes();
    
    if (selectedNode.length > 0) {
        ajaxSubmit({
            url: contextPath + "/system/menu/getMenuListByModule.do",
            data: { 
                sysMenuModule: selectedNode[0].sysMenuCode 
            },
            success: function (result) {
                if (result.isOk == "Y") {
                    var dataList = result.data.treeMenuList;
                    for (var i = 0; i < dataList.length; i++) {
                        dataList.dropInner = false;
                        if (dataList[i].sysMenuUrl == null || dataList[i].sysMenuUrl == "") {
                            dataList[i].dropInner = true;
                        }
                        if (dataList[i].sysMenuParent == ""||dataList[i].sysMenuParent == null) {
                            dataList[i].sysMenuParent = "root";
                        }
                        if(!isNullorEmpty(dataList[i].sysMenuIcon)){
                        	dataList[i].icon=contextPath +"/"+ dataList[i].sysMenuIcon
                        }
                        
                    }
                    //增加一个根目录节点
                    dataList.push({
                        sysMenuName: "根目录",
                        sysMenuCode: "root",
                        sysMenuParent: "",
                        open:true,
                        icon: contextPath + "/js/zTree_v3/css/zTreeStyle/img/diy/1_open.png",
                        drag: false
                    });
                    $.fn.zTree.init($("#menuList"), setting, dataList);
                }
            }
        });
    }else{
        $.fn.zTree.init($("#menuList"), setting, []);
    }
}