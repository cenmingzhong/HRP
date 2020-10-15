<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>密码管理</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/passwordManagerList.js?t=<%=version %>"></script>
    <style type="text/css">
        .layui-form-label,.layui-input-block{
            font-size:18px;
        }
    </style>
</head>
<body class="easyui-layout">
<div data-options="region:'north',split:false,border:false" style="height: 35px;">
    <div id="tb">
    </div>
</div>
<div data-options="region:'center',iconCls:'icon-ok',border:false" >
    <table id="sysUserGrid"></table>
</div>

<div id="filterBlock" style="display:none">


</div>

</body>
</html>