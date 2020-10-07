//页面初始化
$(document).ready(function () {
    initToolBar(); //初始化工具栏
    initMenuTree(); //初始化菜单树
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
        }]
    });
}
//初始化菜单树
function initMenuTree() {
    var setting = {
        view: {
            dblClickExpand: true,
            showLine: true,
            selectedMulti: false
        },
        check: {
            enable: true
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
    ajaxSubmit({
        url: contextPath + "/system/menu/getAllModuleMenu.do",
        success: function (result) {
            if (result.isOk == "Y") {
                var menuList = result.data.menuList;
            	getURLParameter("sysRoleCode")
                ajaxSubmit({
                    url: contextPath + "/system/roleMenu/getRoleModuleMenuList.do",
                    
                    data: { sysRoleCode: getURLParameter("sysRoleCode") },
                    success: function (result) {
                        if (result.isOk == "Y") {
                            var roleMenuList = result.data.roleMenuList;
                            for (var i = 0; i < menuList.length; i++) {
                                for (var j = 0; j < roleMenuList.length; j++) {
                                    if (menuList[i].sysMenuCode == roleMenuList[j].sysMenuCode) {
                                        menuList[i].checked = true;
                                        break;
                                    }
                                }
                            }
                            $.fn.zTree.init($("#menuTree"), setting, menuList);
                        }
                    }
                });

            }
        }
    });

}
function saveClick() {
    var sysRoleCode = getURLParameter("sysRoleCode");
    var roleMenuList = [];

    var treeObj = $.fn.zTree.getZTreeObj("menuTree"),
    nodes = treeObj.getCheckedNodes(true);

    for (var i = 0; i < nodes.length; i++) {
        roleMenuList.push({
            sysRoleCode: sysRoleCode,
            sysMenuCode: nodes[i].sysMenuCode
        })
    }

    ajaxSubmit({
        url: contextPath + "/system/roleMenu/save.do",
        data:{
            sysRoleCode: sysRoleCode,
            roleMenuList: JSON.stringify(roleMenuList)            
        },
        /*beforeSend: function () {
            return validateForm("infoForm")
        },*/
        success: function (data) {
            if (data.isOk == "Y") {
                alert(data.message);
                closeDialog();
            }
        }
    });
}