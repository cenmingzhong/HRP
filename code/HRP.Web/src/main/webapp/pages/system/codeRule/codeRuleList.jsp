<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>编码规则</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/codeRuleList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <table id="dataGrid"></table>
    </div>
    <br/>    <br/>    <br/>
        <div data-options="region:'south',iconCls:'icon-ok',border:false" style="padding:0px">
        <table id="dataGrid1"></table>
    </div>
</body>
</html>
