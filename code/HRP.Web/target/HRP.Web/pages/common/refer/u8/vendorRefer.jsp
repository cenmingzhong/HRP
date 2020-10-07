<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>U8单位参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/vendorRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:62px;">
        <div id="tb"></div>
        <form id="infoForm" class="layui-form">
            <div class="layui-block">
                <!-- <div class="layui-col-md6">
                    <label class="layui-form-label">单位编码：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_venCode" name="venCode" />
                    </div>
                </div> -->
                <div class="layui-col-md6">
                    <label class="layui-form-label">单位名称：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_venName" name="venName" />
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="border-width:1px 0px 0px 0px  ">
        <!-- <table id="dataGrid"></table> -->
        <ul id="ztree" class="ztree"></ul>
    </div>
</body>
</html>