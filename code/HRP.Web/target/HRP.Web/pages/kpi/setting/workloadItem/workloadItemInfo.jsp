<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/workloadItemInfo.js?t=<%=version%>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb">
        </div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 10px">
        <form action="#" id="infoForm" style="width: 100%; height: 100%;">
			<table border="0">
			    <colgroup>
			        <col width="80px" />
			        <col width="200px" />
			    </colgroup>
			    <tbody>
			        <tr>
			            <td>
			                <label class="needLabel">编码：</label>
			            </td>
			            <td>
			                <input type="text" id="txt_itemCode" name="itemCode" data-rule-required="true" data-msg-required="请输入名称" />
			            </td>
			        </tr>
			        <tr>
			        	<td>
			                <label class="needLabel">名称：</label>
			            </td>
			            <td>
			                <input type="text" id="txt_itemName" name="itemName" data-rule-required="true" data-msg-required="请输入名称" />
			            </td>
			        </tr>
			        <tr>
			        	<td>
			                <label class="needLabel">工作量类型：</label>
			            </td>
			            <td>
			                <input type="text" id="txt_typeName" name="typeName"/>
			                <input type="hidden" id="txt_typeId" name="typeId" data-rule-required="true" data-msg-required="请选择工作量类型" />
			            </td>
			        </tr>
			        <tr>
			            <td>
			                <label class="needLabel">绩点：</label>
			            </td>
			            <td>
			                <input type="text" id="txt_score" name="score" data-rule-required="true" data-msg-required="请输入绩点" />
			            </td>
			        </tr>
			    </tbody>
			</table>
        </form>
    </div>
</body>
</html>
