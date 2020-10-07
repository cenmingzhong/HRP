<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>选择会计期间</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/accountPeriodRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'west',iconCls:'icon-ok',split:true,border:true" style="width:200px;border-width:0px 1px 0px 0px">
        <ul  id="yearList" class="ztree"></ul>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',split:true,border:true" style="padding:0px;border-width:0px 0px 0px 1px">
        <table id="dataGrid"></table>
    </div>
</body>
</html>
