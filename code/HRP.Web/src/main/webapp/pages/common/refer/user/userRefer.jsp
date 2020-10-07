<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/userRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb">
        </div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" >
        <table id="sysUserGrid"></table>
    </div>

    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table>
                <tr>
                    <td>用户编码：</td>
                    <td><input type="text" id="txt_SysUserCode" name="sysUserCode" /></td>
                </tr>
                <tr>
                    <td>用户姓名：</td>
                    <td><input type="text" id="txt_SysUserName" name="sysUserName" /></td>
                </tr>
                <tr>
                    <td>用户角色：</td>
                    <td><select id="sel_SysRoleCode" name="sysRoleCode"></select></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
