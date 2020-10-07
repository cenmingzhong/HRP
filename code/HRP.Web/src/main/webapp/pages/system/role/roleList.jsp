<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>角色管理</title>
	<%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/roleList.js?t=<%=version %>"></script>
    <style type="text/css">
    	#filterBlock{
    		font-size:18px;
    	}
    </style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:35px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <table id='dataBlock'></table>
    </div>
    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table>
                <tr>
                 <td>角色名称：</td>
                    <td><input type="text" id="txt_SysRoleName" name="sysRoleName" /></td>
                </tr>
            </table>
        </form>
    </div>
    <div id="userBlock" style="display:none;padding:0px;height:100%">
        <table id="userGrid"></table>
    </div>
</body>
</html>