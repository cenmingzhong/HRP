<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.gzhh.hrp.tools.JsonTools"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
    <title>${mainSetting.data.mainTitle == null ? "绩效考核管理系统":mainSetting.data.mainTitle}</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <style type="text/css">
        .accordion, .accordion-body{
            background:#395A83 !important;
            border-width:0px !important;
        }
        .accordion .accordion-header{
            background:#4D74A7 !important;
            border-width:0px !important;
            height:32px !important;
            padding:2px;
        }
        .accordion-collapse {
            background: url(images/accordion-collapse.png) no-repeat center center;
        }
        .accordion-expand {
            background: url(images/accordion-expand.png) no-repeat center center;
        }
        .panel-tool {
            right: 10px;
            width: auto;
        }
        .panel-tool a {
            opacity:1 !important;
        }
        .panel-title{
            line-height:30px !important;
            color:#fff !important;
            font-size:14px !important;
        }
        .panel-with-icon {
            padding-left: 22px !important;
            padding-top: 1px !important;
        }
        #top a
        {
            border:1px transparent solid;
            _border:0px transparent solid;
            display:block;
            padding-top:10px;
            padding-bottom:5px; 
            cursor:pointer;
            font-size:12px;
            line-height:20px;
            color:#FFFFFF;
        }
        #top a img
        {
            border-width:0px;
        }
        #top a:hover
        {
            border:1px #95B8E7 solid;
            background:#F7F2DE;
            color:blue;
        }
        /* .layui-nav-itemed>a, .layui-nav-tree .layui-nav-title a, .layui-nav-tree .layui-nav-title a:hover {
			    color: #ff5722!important;
			}字体颜色*/
    </style>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-jtemplates.js"></script>
    
    <script type="text/javascript">
    var loginUser = null;
    var appSetting = null;
    $(document).ready(function () {
        $(".nav-side-fold").bind("click",function(){
            if($("#westPanel").hasClass("side-folded")){
                $("body").layout('panel', 'west').panel('resize', { width: 240});
                $("body").layout('resize');
                $("#westPanel").removeClass("side-folded");
                $(".layui-nav-item span").show();
                $(".layui-nav-item li").css("display","");
                $(".layui-nav-item a").css("text-overflow","ellipsis");
                
                $("#menuBlock .panel-title").show()
                $("#menuBlock .panel-tool").css("visibility","visible");
                $("#menuBlock .panel-icon").css("left","5px")
            }else{
                $("#westPanel").addClass("side-folded");
                $(".layui-nav-item span").hide();
                $(".layui-nav-item a").css("text-overflow","clip");
                
                $("body").layout('panel', 'west').panel('resize', { width:156});
                $("body").layout('resize');
                
                $("#menuBlock .panel-title").hide()
                $("#menuBlock .panel-tool").css("visibility","hidden");
                $("#menuBlock .panel-icon").css("left","20px")
            }
        });
        addTab("工作台","toDesktop.do",false,"icon-home");
        //addTab("工时录入","system/workTime/toList.do",false,"icon-home")
        //绑定tabs的右键菜单
        $("#tabs").tabs({
            onContextMenu: function (e, title) {
                e.preventDefault();
                $('#tabsMenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        });
        initEvent();
        getUserInit();

        //实例化menu的onClick事件
        $("#tabsMenu").menu({
            onClick: function (item) {
                CloseTab(this, item.name);
            }
        });
        //几个关闭事件的实现
        function CloseTab(menu, type) {
            var curTabTitle = $(menu).data("tabTitle");
            var tabs = $("#tabs");

            if (type === "close") {
                var opt = $('#tabs').tabs('getSelected').panel("options");
                if (opt.closable) {
                    tabs.tabs("close", curTabTitle);
                }
                return;
            }

            var allTabs = tabs.tabs("tabs");
            var currentTab = $('#tabs').tabs('getSelected');

            var closeTabsTitle = [];

            $.each(allTabs, function (i, n) {
                var opt = $(this).panel("options");
                if (opt.closable && opt.title != curTabTitle && type === "Other") {
                    closeTabsTitle.push(opt.title);
                } else if (opt.closable && type === "All") {
                    closeTabsTitle.push(opt.title);
                } else if (opt.closable && type === "closeleft") {
                    var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
                    if (i < tabIndex) {
                        closeTabsTitle.push(opt.title);
                    }
                } else if (opt.closable && type === "closeright") {
                    var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
                    if (i > tabIndex) {
                        closeTabsTitle.push(opt.title);
                    }
                }
            });

            for (var i = 0; i < closeTabsTitle.length; i++) {
                tabs.tabs("close", closeTabsTitle[i]);
            }
            if (curTabTitle != null) {
                tabs.tabs('select', curTabTitle);
            }
        }
    });
    function addTab(title, href, closable, icon, id) {
        if (closable == null) {
            closable = true;
        }
        if (id != null) {
            if(href.indexOf("?")==-1){
                href = href + "?sysMenuCode=" + id
            }else{
                href = href + "&sysMenuCode=" + id
            }
        }
        var tt = $('#tabs');
        if (tt.tabs('existURL', href)) {//如果tab已经存在,则选中并刷新该tab          
            tt.tabs('selectURL', href);
            //refreshTab({ tabTitle: title, url: href });
        } else {
            if (href) {
                var content = '<iframe frameborder="0"  src="' + href + '" style="width:100%;height:100%;" '+(id == null ? '' : ' id='+id )+'></iframe>';
            } else {
                var content = '未实现';
            }
            tt.tabs('add', {
                id:new Date().getTime(),
                title: title,
                closable: closable,
                content: content, 
                iconCls: icon
            });
            tt.tabs('getSelected').URL = href;
        }
    }
    function initEvent() {
        $("#btnExit").click(function () {
            ajaxSubmit({
                url: contextPath + "/exit.do",
                success: function (data) {
                    if (data.isOk == "Y") {
                        location.href = "toLogin.do";
                    }
                }
            });
        });
        $("#btnHome").click(function () {
            $('#tabs').tabs('selectURL', "system/workTime/toList.do");
        });
        $("#btnChangePsw").click(function () {
            openDialog({
                dialogTitle: "修改密码",
                url: "pages/system/user/changePsw.jsp",
                dialogParams:{
                	dialog:true
                }
            })
        });
    }
    
    function getUserInit() {
        ajaxSubmit({
            url: contextPath + "/getUserInit.do",
            async:false,
            success: function (result) {
                if (result.isOk == "Y") {
                    loginUser = result.data.loginUser;
                    appSetting = result.data.appSetting;
                    initLoginInfo()
                } 
            }
        });
    }

    function initLoginInfo(){
        $("#txt_loginUserName").text(loginUser.sysUserName)
        $("#txt_loginDate").text(loginUser.loginDate)
    }
  
    </script>
    <style>
    iframe{
        display: block;
    }
    </style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:75px;background:url(${mainSetting.data.mainLogoUrl==null||mainSetting.data.mainLogoUrl==''?'images/logo.png':mainSetting.data.mainLogoUrl}) no-repeat  #000000;" id="header">
        <div style="top:5px;right:10px;">
            <div style="float:left;">
            	<!-- <img src="images/logo.png" style="height:70px;position:absolute;left:50px"> -->
            	<span style="color: #fff;font-size: 20px;font-weight: bold;position:absolute;left:160px;top:25px">绩效考核管理系统</span>
            </div>
            <div style="float:right;" id="top">
                <table>
                    <tr>
                        <td style="width:60px;" align="center" valign="top"><a id="btnHome" href="javascript:void(0)"><img src="images/top/home.png" alt="首页"/><br />首页</a></td>
                        <td style="width:60px;" align="center" valign="top"><a id="btnChangePsw" href="javascript:void(0)"><img src="images/top/user.png"  alt="修改密码"/><br />修改密码</a></td>
                        <td style="width:60px;" align="center" valign="top"><a id="btnExit" href="javascript:void(0)"><img src="images/top/sign-out.png" alt="退出系统" /><br />退出系统</a></td>
                    </tr>
                </table>
            </div>
            <div style="float:right; border:0px solid red;height:50px;color:#fff;line-height:20px;padding-top:12px" id="login">
                <table>
                    <colgroup>
                        <col width="60px">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <td style="font-size:14px;font-weight: bold;width:80px">当前用户：</td>
                        <td><div style="width:200px;font-size:14px;font-weight: bold;" id="txt_loginUserName"></div></td>
                    </tr>
                    <tr>
                    	<td style="font-size:14px;font-weight: bold;width:80px">登录时间：</td>
                        <td><div style="width:80px;font-size:14px;font-weight: bold;" id="txt_loginDate"></div></td>
                    </tr> 
                </table>
            </div>
        </div>
    </div>
    
    <div data-options="region:'west',split:false,border:false" style="width:240px;background:#ffffff;border-width:0px 1px 0px 0px;" id="westPanel">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" >
                <div class="nav-side-fold" style="overflow:hidden" >
                    <i class="fa fa-navicon" aria-hidden="true" style="font-size:18px;line-height:18px;padding-top:8px;color:#adc4d0"></i><!-- #010915 -->
                </div>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px;background:#395A83;">
                <div id="menuBlock" class="easyui-accordion" data-options="fillSpace:true,fit:true,border:false,animate:true" style="overflow:hidden">
                    <c:forEach items="${moduleList}" var="field" varStatus="status">  
                        <div title="${field.sysMenuName }" data-options="iconCls:'icon-colSet',border:false" >
                            <ul class="layui-nav layui-nav-tree">
                                <c:forEach items="${field.sysMenuList}" var="sysMenu" varStatus="menu">
                                    <li class="layui-nav-item">
                                        <c:choose>
                                            <c:when test="${sysMenu.children ==null || fn:length(sysMenu.children)==0}">
                                                <a data-options='${sysMenu.sysMenuUrl}'>
                                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    <span>${sysMenu.sysMenuName}</span>
                                                </a>
                                            </c:when>
                                            <c:otherwise>
                                                <a>
                                                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                                                    <span>${sysMenu.sysMenuName}</span>
                                                </a>
                                                <dl class="layui-nav-child">
                                                    <c:forEach items="${sysMenu.children}" var="child" varStatus="childMenu">
                                                       	<c:choose>
                                                       		<c:when test="${child.children ==null || fn:length(child.children)==0}">
					                                                <a data-options='${child.sysMenuUrl}'>
					                                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
					                                                    <span>${child.sysMenuName}</span>
					                                                </a>
				                                            </c:when>
				                                            <c:otherwise>
				                                            	<a>
				                                                    <i class="fa fa-folder-o" aria-hidden="true"></i>
				                                                    <span>${child.sysMenuName}</span>
				                                                </a>
				                                                
				                                                <dl class="layui-nav-child">
				                                                    <c:forEach items="${child.children}" var="childs" varStatus="childsMenu">
				                                                        <dd style="margin-left:20px;">
				                                                            <a data-options='${childs.sysMenuUrl}'>
				                                                                <i class="fa fa-angle-right"></i>
				                                                                <span>${childs.sysMenuName}</span>
				                                                            </a>
				                                                        </dd>
				                                                    </c:forEach>
				                                                </dl>
				                                            </c:otherwise>
                                                       	</c:choose>
                                                    </c:forEach>
                                                </dl>
                                            </c:otherwise>
                                        </c:choose>
                                    </li>
                                </c:forEach>
                            </ul>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px 0px">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false,tabHeight:34">
        </div>
    </div>
    
    <script>
    
    layui.config({
        dir: '<%=contextPath %>/js/layui/'
    }).use(['element','layer']);
    
    function layuiInit(){
        var element = layui.element;
        
        $(".layui-nav-tree").find("a").each(function() {
            /* var t = $(this),
            n = void 0;
            t.hover(function() {
                n = layui.layer.tips($(this).children("span").text(), this)
            },
            function() {
                n && layui.layer.close(n)
            }) */
        });
        $(".layui-nav").find("a[data-options]").each(function() {
            var t = $(this),
            n = void 0;
            t.off("click").on("click",function(){
                var dataOpt, dataOpt = t.data("options");
                addTab(t.find("span").text(), dataOpt,true, null)
            });
        });
        
        if($("#westPanel").hasClass("side-folded")){
            $(".layui-nav-item span").hide();
        }else{
            $(".layui-nav-item span").show();
        }
    }
    window.onload=function(){
        layuiInit();
    }
    </script>
    <div id="tabsMenu" class="easyui-menu" style="width:120px;">  
        <div name="close">关闭</div>  
        <div name="Other">关闭其他</div>  
        <div name="All">关闭所有</div>
        <div name="closeleft">关闭左边</div>
        <div name="closeright">关闭右边</div>
    </div> 
</body>
</html>