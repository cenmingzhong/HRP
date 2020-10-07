<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/filterSetList.js?t=<%=version %>"></script>
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
            <table style="width:100%" cellspacing="1" cellpadding="1">
                <colgroup>
                    <col width="70px">
                    <col width="*">
                </colgroup>
                <tr>
                    <td>编码：</td>
                    <td><input type="text" id="txt_colCode" name="code"/></td>
                </tr>
                <tr>
                    <td>字段：</td>
                    <td><input type="text" id="txt_colField" name="field"/></td>
                </tr>
                <tr>
                    <td>标题：</td>
                    <td><input type="text" id="txt_colTitle" name="text"/></td>
                </tr>
                <tr>
                    <td>类型：</td>
                    <td>
                        <select type="text" id="txt_colType" name="dataType">
                            <option value="text">文本</option>
                            <option value="number">数字</option>
                            <option value="date">日期</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>参照档案：</td>
                    <td><input type="text" id="txt_referTo" name="referTo"/></td>
                </tr>
                <tr>
                    <td>参照字段：</td>
                    <td><input type="text" id="txt_referField" name="referField"/></td>
                </tr>
                <tr>
                    <td valign="top">html：</td>
                    <td><input type="text" id="txt_fieldHtml" name="fieldHtml"/></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
