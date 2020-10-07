<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>工作量档案</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/workloadItemList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
	    <table id="dataGrid"></table>
    </div>
	<div id="searchDiv" style="display:none;padding:5px 0px 0px 15px;">
	    <form id="infoForm">
	        <table>
	            <tr>
	                <td>编码：</td>
	                <td><input type="text" id="txt_itemCode" name="itemCode" /></td>
	            </tr>
	            <tr>
	                <td>名称：</td>
	                <td><input type="text" id="txt_itemName" name="nameInfo" /></td>
	            </tr>
	            <tr>
	                <td>工作量类型：</td>
	                <td>
						<input type="text" id="txt_typeName"/>
						<input type="hidden" id="txt_typeId" name="typeId"/>
					</td>
	            </tr>
	        </table>
	    </form>
	</div>
</body>
</html>
