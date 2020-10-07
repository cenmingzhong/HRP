<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>数据字典</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/dataDictInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:1px">
        <form id="infoForm" class="layui-form">
            <input type="hidden" id="txt_id" name="id"/>
            <input type="hidden" id="txt_dictTypeCode" name="dictTypeCode"/>
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
    <script>
    initInputForm("infoForm");
    </script>
</body>
</html>
