<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/costItemRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
     <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false">
                <form id="infoForm">
                    <table>
                        <tr>
                            <td>费用项目名称：</td>
                            <td><input type="text" id="txt_costItemName" name="costItemName"/></td>
                            <td><input type="button" value="查询" id="btn_query"/></td>
                        </tr>
                    </table>
                </form>
            </div>

            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;">
                <table id="dataGrid"></table>
            </div>
        </div>
    </div>
</body>
</html>
