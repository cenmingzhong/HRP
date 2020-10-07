<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
    <script src="<%=contextPath%>/js/zTree_v3/js/jquery.ztree.exedit-3.5.min.js" type="text/javascript"></script>
    <style type="text/css">
    .panel-header{
        border-width:0px 1px 1px 1px !important;
    }
    </style>
	<script type="text/javascript" src="<%=currentPath %>/menuList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'west',border:true,title:'模块列表',split:true,collapsible:false,tools:'#tt'" style="width: 200px;">
                <ul id="moduleList" class="ztree">
                </ul>
            </div>
            
            <div data-options="region:'center',border:true,title:'菜单列表'" style="width:300px" >
                <ul id="menuList" class="ztree">
                </ul>
            </div>

            <div id="mm" class="easyui-menu" style="width: 120px;">
                <div data-options="name:'new'" id="m_add" >增加节点</div>
                <div data-options="name:'edit'" id="m_edit">修改节点</div>
                <div data-options="name:'delete'" id="m_delete">删除节点</div>
                <div data-options="name:'setRoleMenu'" id="m_setRoleMenu">设置角色菜单</div>
            </div>
            <div id="tt">
                <a href="javascript:void(0)" class="icon-add" onclick="javascript:addModule()"></a>
                <a href="javascript:void(0)" class="icon-edit" style onclick="javascript:editModule()"></a>
                <a href="javascript:void(0)" class="icon-remove" onclick="javascript:deleteModule()"></a>
            </div>
        </div>
    </div>
</body>
</html>
