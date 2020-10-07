<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>岗位类别</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/appointmentTypeList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tbType"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
    	<div class="easyui-layout"  data-options="fit:true">
            <div data-options="region:'west',split:true,border:true" style="width: 350px;border-width:0px 1px 0px 0px">
		       	<table id="dataGridType"></table>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width:0px 0px 0px 1px">
            	<div class="easyui-layout"  data-options="fit:true">
            		<div data-options="region:'north',split:false,border:false" style="height:31px;">
				        <div id="tbLevel"></div>
				    </div>
				    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width:0px 0px 0px 1px">
                		<table id="dataGridLevel"></table>
				    </div>
            	</div>
            </div>
        </div>
    </div>
</body>
</html>
