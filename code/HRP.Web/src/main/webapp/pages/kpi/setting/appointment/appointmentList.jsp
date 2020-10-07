<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>岗位</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/appointmentList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
         <table id="dataGrid"></table>
    </div>
    <div id="editDiv" style="display:none;padding:5px 0px 0px 15px;">
         <form id="infoForm">
             <table>
                 <tr>
                     <td>岗位</td>
                     <td><input type="text" id="txt_appointmentName" name="appointmentName" /></td>
                 </tr>
             </table>
         </form>
    </div>
   
</body>
</html>
