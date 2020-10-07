<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>部门参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/deptRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <ul  id="deptTree" class="ztree"></ul>
    </div>
    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table >
                <tr>
                    <td>部门名称：</td>
                    <td><input type="text" id="txt_deptName" name="deptName" /></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>