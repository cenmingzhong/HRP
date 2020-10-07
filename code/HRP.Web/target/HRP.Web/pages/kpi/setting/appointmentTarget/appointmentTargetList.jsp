<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>岗位</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/appointmentTargetList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px; padding: 0px">
        <ul id="zTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
         <table id="dataGrid"></table>
    </div>
</body>
</html>
