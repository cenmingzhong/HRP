<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/fundSrcRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
   <div data-options="region:'north',split:false,border:false" style="height:62px;">
        <div id="tb"></div>
        <form id="infoForm" class="layui-form">
            <input type="hidden" id="txt_id" name="id" value='${param.id}' />
            <div class="layui-block">
                <div class="layui-col-md11" isrequired="true">
                    <label class="layui-form-label">资金来源名称：</label>
                    <div class="layui-input-block" isrequired="true">
                        <input type="text" id="txt_fundSrcInfo" name="fundSrcInfo" />
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="border-width:1px 0px 0px 0px  ">
        <table id="dataGrid"></table>
    </div>
</body>
</html>
