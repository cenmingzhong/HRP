var sysRole = null;
var dataList = [];
var mapList = {};
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
                saveClick();
            }
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
            	closeTab();
            }
        },"-",{
            id: "save",
            text: "获取菜单权限",
            iconCls: "icon-save",
            handler: function () {
                getRoleClick();
            }
        }]
    });
}

function saveClick(){
    if(!validateForm("infoForm")){
        return ;
    }
    var data = $.extend(sysRole,$("#infoForm").form2json());
    data.isNew = getURLParameter("sysRoleCode") == null;
    
    var notChecked = $("input:checkbox").not("input:checked");
    var idsList = [];
    var dataAuthList = [];
    notChecked.each(function() { 
    	if($(this).attr("name")==null){
    		
    	}else if($(this).attr("name")=="允许"){
    		dataAuthList.push($(this).attr("class"))
    	}else{
    		idsList.push({
    			"operId":$(this).attr("name"),
    			"pathUrl":$(this).attr("class")
    		})
    	}
    });
    ajaxSubmit({
        url:"saveAndAuth.do",
        data:{
            sysRole:JSON.stringify(data),
            idsList:JSON.stringify(idsList),
            dataAuthList:JSON.stringify(dataAuthList)
        },
        success:function(result){
            if(result.isOk=="Y"){
                alertMsg(result.message,function(){
                    closeTab();
                });
            }
        }
    });
}

function getRoleClick(){
	ajaxSubmit({
        url: contextPath+"/system/menu/getMenuList.do",
        data:{
        	filter:JSON.stringify({menuType:"menu",hasUrl:1})
        },
        async:false,
        success:function(result){
            if(result.isOk=='Y'){	
            	menuList = result.data.menuList;
            	if(menuList != null && menuList.length >0){
            		showLocker();
            		for (var i = 0; i < menuList.length; i++) {
            			var ifmStr = '<iframe id="ifmPage'+i+'" src="" style="width:0px;height:0px;display:none"></iframe>';
            			$("#ifm").append(ifmStr);
            		}
            		getOperAuthList(menuList[0].sysMenuUrl,"ifmPage",0);
            	}
            }
        }
    })
}

function getOperAuthList(sysMenuUrl,ifmId,num){
	ifmId = ifmId+num;
    var iframe = document.getElementById(ifmId)
    var src = sysMenuUrl;
    if(src.indexOf("http")!= 0){
        src = contextPath+"/"+sysMenuUrl;
    }
    iframe.src = src;
    
    var list = [];
    if (iframe.attachEvent){ 
        iframe.attachEvent("onload", function(){ 
            getTbItems(iframe,sysMenuUrl,num);
        }); 
    } else { 
        iframe.onload = function(){ 
            getTbItems(iframe,sysMenuUrl,num);
        }; 
    }
}

function getTbItems(iframe,sysMenuUrl,num){
    var items =$("#tb a",iframe.contentWindow.document);

    for(var i = 0 ; i < items.length ; i++){
    	dataList.push({
    		pathUrl:sysMenuUrl,
            operCode: items[i].id,
            operText: $(items[i]).text()
        });
    }
    
    num++;
    if(num<menuList.length){
    	getOperAuthList(menuList[num].sysMenuUrl,"ifmPage",num)
    }else{
		ajaxSubmit({
	        url: contextPath+"/system/auth/operation/saveAll.do",
	        data:{
	        	operationList:JSON.stringify(dataList)
	        },
	        success:function(result){
	            if(result.isOk=='Y'){	
	            	closeLocker();
    				$("#ifm").empty();
    				dataList = [];
    				initData();
	            }
	        }
	    })
    }
}

function initPage(){
    var sysRoleCode = getURLParameter("sysRoleCode");
    if(!isNullorEmpty(sysRoleCode)){
        ajaxSubmit({
            url: "getInfo.do",
            data:{
                sysRoleCode:sysRoleCode
            },
            success:function(result){
                if(result.isOk=='Y'){
                    sysRole = result.data.sysRole;
                    $("#infoForm").fill(sysRole);
                    $("#txt_sysRole_code").attr("disabled", "disabled")
                }
            }
        })
    }
    newJgGrid("dataBlock",{
        showCol:true,
        cellEdit:false,
        multiselect:false,
        rowNum:50,
        columns : [
            {code:"pathName",text:"权限名称",width:200},
            {code:"setUp",text:"设置",width:600},
            {code:"quanxuan",text:"全选",width:200}
        ],
        formatter:{
        	"quanxuan":{
        		formatter:function(value,rowOpts,rowData){
        			var select = "checked='checked'";
        			var re=eval("/checked='checked'/ig")
    				var length = rowData.setUp.match(re)==null?0:rowData.setUp.match(re).length;
        			if(length!=rowData.buttons.length){
        				select = "";
        			}
        			return "<input type='checkbox' "+select+" id="+rowData.pathUrl+" data-a='a' style='width:28px' onclick=checkAll(this)>全选";
        		}
        	}
        }
    });
    initData();
}

function initData(){
	ajaxSubmit({
        url: contextPath+"/system/auth/operAuth/getAllOperationAuthList.do",
        data:{
        	filter:JSON.stringify({sysRoleCode:getURLParameter("sysRoleCode")})
        },
        success:function(result){
            if(result.isOk=='Y'){	
            	allMenu = result.data.allMenu;
            	if(allMenu != null&&allMenu.length!=0){
            		for(var key in allMenu){
                		var menu = allMenu[key];
                		if(menu.buttons!=null&&menu.buttons.length>0){
                			var list = "";
                			for (var i = 0; i < menu.buttons.length; i++) {
                				var items = menu.buttons;
                				var select = items[i].selected?"checked='checked'":"";
                				mapList[key] = menu.pathUrl;
                				list += "<input type='checkbox' class='"+menu.pathUrl+"' "+select+" name='"+items[i].id+"' style='width:28px' onclick=checkSetUp(this)>"+items[i].operText+" "
    						}
                			menu.setUp = list;
                		}
            		}
                	$('#dataBlock').jqGrid('loadData',allMenu);
            	}
            }
        }
    })
}
function checkSetUp(obj){
	var thisClass = $(obj).attr("class");
	var flag = true;
	$("input[class='"+thisClass+"']").each(function(e,val){
		if(!$(this).prop("checked")){
			flag = false;
		}
	})
	if(flag){
		$("input[id='"+thisClass+"']").prop("checked","checked");
	}else{
		$("input[id='"+thisClass+"']").removeAttr("checked");
	}
}
function checkAll(obj){
	var thisId = $(obj).attr("id");
	var flag = $(obj).prop("checked");
	
	$("input[class='"+thisId+"']").each(function(e,val){
		if(flag){
			$(this).prop("checked","checked")
		}else{
			$(this).removeAttr("checked","checked")
		}
	})
}