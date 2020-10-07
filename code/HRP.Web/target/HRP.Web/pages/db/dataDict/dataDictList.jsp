<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据字典档案</title>
<%@include file="/pages/common/include/include.jsp"%>
<script type="text/javascript" src="<%=currentPath%>/dataDictList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 220px; border-width: 0px 1px 0px 0px">
        <ul id="dictTypeTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',split:false,border:false"
        style="border-width: 0px 0px 0px 1px">
        <table id="dataGrid"></table>
    </div>
    <div id="searchDiv" style="display: none;">
        <form id="infoForm" class="layui-form">
            <div class="layui-block">
                <div class="layui-col-md12" isInput="true" isRequired="true">
                    <label class="layui-form-label">数据编码</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_dictCode" name="dictCode" />
                    </div>
                </div>
                
                <div class="layui-col-md12" isInput="true" isRequired="true">
                    <label class="layui-form-label">数据名称</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_dictName" name="dictName" />
                    </div>
                </div>
            </div>
        </form>
    </div>
</body>
</html>
