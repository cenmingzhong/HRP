<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/importTemplateList.js?t=<%=version %>"></script>
    <style>
    #infoForm input{
       width:96%
    }
    #infoForm select{
       width:97%
    }
    
    </style>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',split:true,border:true" style="padding:0px;border-width:0px 1px 0px 0px">
        <table id="dataGrid"></table>
    </div>

    <div data-options="region:'east',split:true,border:true" style="width:300px;border-width:0px 0px 0px 1px">
        <form id="infoForm">
            <table style="width:100%" cellspacing="1" cellpadding="1" style="line-height:25px">
                <colgroup>
                    <col width="70px">
                    <col width="*">
                </colgroup>
                <tr>
                    <td>字段编码：</td>
                    <td><input type="text" id="txt_code" name="code"/></td>
                </tr>
                <tr>
                    <td>显示名称：</td>
                    <td><input type="text" id="txt_text" name="text"/></td>
                </tr>
                <tr>
                    <td>必填项：</td>
                    <td><input type="checkbox" name="isRequired" id="cb_isRequired" style="width:auto" value="true"/></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
