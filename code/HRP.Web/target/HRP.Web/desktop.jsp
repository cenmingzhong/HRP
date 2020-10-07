<%@page import="com.gzhh.hrp.tools.JsonTools"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<link rel="stylesheet"  type="text/css"  href='css/desktop.css' />
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-jtemplates.js"></script>
	<script type="text/javascript" src="<%=currentPath %>/desktop.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px;background:#fff">
        <div class="container-fluid" style="height: 100%;background-color:#f4f4f4">
            <div class="ui-sortable" style="height: 100%; margin: 0px;margin-left:10px">
                <div class="ofenFun-column" data-index="0" style="width: 99%; padding-right: 0px;">
                    <div class="widget-box">
                        <div class="toolDelete" style="display: none;">
                            <a href="javascript:void(0)" data-action="close" class="menuClose"></a>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main">
                                <div style="width:100%;height:40px" class="widget-header widget-header-large">
                                    <div style="float:left"><h4 title="常用功能" style="margin-left:13px">常用功能</h4></div>
                                </div>
                                <div class="oftenfun">
                                    <ul>
                                        <c:forEach items="${favoriteList}" var="menu" varStatus="status">  
                                            <li url="${menu.sysMenu.sysMenuUrl }">
                                                <span style="cursor: pointer;">
                                                    <img src="${menu.iconUrl }"  title="${menu.sysMenu.sysMenuName }">
                                                </span>
                                                <a style="display: inline-block;height:28px;overflow:hidden"><div title="${menu.sysMenu.sysMenuName }" style="cursor: pointer;">${menu.sysMenu.sysMenuName }</div></a>
                                            </li>
                                        </c:forEach>
                                        <li>
                                            <span class="oftenAdd" style="margin:10px 0px"></span>
                                            <a><div title="新增" style="cursor: pointer;"></div></a>
                                        </li>
                                    </ul>
                                    <div style="clear:both;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="widget-column" data-index="0" style="width: 99%; padding-right: 0px;">
                    <div class="widget-box widget-user">
                        <div class="toolDelete" style="display: none;">
                            <a href="javascript:void(0)" data-action="close" class="menuClose"></a>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main message-main">
                                <div style="width:100%;height:40px" class="widget-header widget-header-large">
                                    <div style="float:left"><h4 title="通知公告" style="margin-left:13px">通知公告</h4></div>
                                </div>
                                <div>
                                    <ul style="inle-height:25px" id="noticeBlock">
                                    </ul>
                                    <textarea id="noticeTemplate" style="display:none;">
                                        {#foreach $T as record}
                                            <li><a href="system/sysNotice/viewNotice.do?id={$T.record.id }" target="blank" >{$T.record.noticeTitle }</a></li>
                                        {#/for}
                                    </textarea>
                                    <div style="clear:both;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</body>
</html>
