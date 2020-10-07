<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>供应商</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/venRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:0px 1px 0px 0px">
        <ul  id="venClsTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',split:false,border:true" style="border-width:0px 0px 0px 1px">
        <table id="dataGrid"></table>
    </div>
    <div id="searchDiv" style="display:none;padding:5px 0px 0px 15px;">
        <form id="infoForm">
          <table >
                <tr>
                    <td>供应商编码：
                    </td>
                    <td><input type="text" id="txt_venCode" name="venCode"/></td>
                </tr>
                <tr>
                <td>供应商名称：</td>
                <td><input type="text" id="txt_venName" name="venName"/></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
