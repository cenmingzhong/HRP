<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/sysMenuSelect.js?t=<%=version %>"></script>
	<style>
	   .layout-panel-west .panel-header{
	       border-width:0px 1px 1px 0px
	   }
       .layout-panel-center .panel-header{
           border-width:0px 0px 1px 1px
       }
	</style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',border:true,title:'模块列表',split:true,collapsible:false,tools:'#tt'" style="width: 200px;border-width:0px 1px 0px 0px">
        <ul id="moduleList" class="ztree">
        </ul>
    </div>
    
    <div data-options="region:'center',border:true,title:'菜单列表'" style="width:300px;border-width:0px 0px 0px 1px" >
        <ul id="menuList" class="ztree">
        </ul>
    </div>
</body>
</html>