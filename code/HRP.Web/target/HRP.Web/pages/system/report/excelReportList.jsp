<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
    <title>模板设置</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/excelReportList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center',split:false,border:false" style="border-width: 0px 0px 0px 0px">
                <div class="easyui-layout" data-options="fit:true" id="dataBlock">
                    <div data-options="region:'north',split:true,border:false" style="height:300px;border-width: 0px 0px 1px 1px">
                        <table id="reportGrid"></table>
                    </div>
                    <div data-options="region:'center',split:true,border:false" style="border-width: 1px 0px 0px 1px">
                        <table id="reportParamGrid"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
