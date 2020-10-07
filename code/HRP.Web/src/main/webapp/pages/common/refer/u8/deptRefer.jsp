<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>U8部门参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/deptRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:62px;">
        <div id="tb"></div>
        <form id="infoForm" class="layui-form">
            <div class="layui-block">
                <div class="layui-col-md6">
                    <label class="layui-form-label">部门名称：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_deptName" name="deptName" />
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <ul  id="zTree" class="ztree"></ul>
    </div>
    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table >
            </table>
        </form>
    </div>
</body>
</html>