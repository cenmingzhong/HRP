<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/vouchFormatList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px;padding: 0px">
        <ul id="vouchList" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width: 0px 0px 0px 1px;">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false,tabHeight:30">
            <div title="表头">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',border:false">
                        <div id="headGrid"></div>
                    </div>
                </div>
            </div>
            
            <div title="表体">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',border:false">
                        <div id="bodyGrid"></div>
                    </div>
                </div>
            </div>
            
            <div title="表尾">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',border:false">
                        <div id="footGrid"></div>
                    </div>
                    <div data-options="region:'east'"   style="width:80px">
                        <div id="footTb"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
