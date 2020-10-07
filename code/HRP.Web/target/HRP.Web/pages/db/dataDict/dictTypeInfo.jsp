<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>字典类型</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/dictTypeInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <form id="infoForm" class="layui-form">
            <div class="layui-block">
                <div class="layui-col-md12" isInput="true" isRequired="true">
                    <label class="layui-form-label">字典类型编码</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_dictTypeCode" name="dictTypeCode" />
                    </div>
                </div>
                
                <div class="layui-col-md12" isInput="true" isRequired="true">
                    <label class="layui-form-label">字典类型名称</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_dictTypeName" name="dictTypeName" />
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
