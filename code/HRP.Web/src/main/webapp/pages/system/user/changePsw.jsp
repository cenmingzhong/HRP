<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/changePsw.js?t=<%=version %>"></script>
    <style type="text/css">
    	input,td{
    		font-size:18px;
    	}
    </style>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:35px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:10px">
        <form id="infoForm">
        <table>
        <tr><td><h1>更改安全密码：</h1></td></tr>
            <tr>
                <td><b style='font-size:18px'>旧 &nbsp;密 &nbsp;码：</b></td>
                <td><input type="password" id="txt_oldPsw" name="oldPsw"  data-rule-required="true" data-msg-required="请输入旧密码"/></td>
            </tr>
            <tr>
                <td><b style='font-size:18px'>新 &nbsp;密 &nbsp;码：</b></td>
                <td><input type="password" id="txt_newPsw" name="newPsw"  data-rule-required="true" data-msg-required="请输入新密码"/></td>
            </tr>
            <tr>
                <td><b style='font-size:18px'>确认密码：</b></td>
                <td><input type="password" id="txt_confirmPsw" name="confirmPsw"  
                    data-rule-required="true" data-msg-required="请输入确认密码" 
                    data-rule-equalTo="#txt_newPsw" data-msg-equalTo="两次输入的密码不一致" /></td>
            </tr>
        </table>
        </form>
    </div>
</body>
</html>
