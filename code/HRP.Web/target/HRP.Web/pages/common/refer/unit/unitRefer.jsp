<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/unitRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb">
        </div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" >
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="height: 32px;line-height: 25px;">
                <form id="infoForm">
                    <table>
                        <tr>
                            <td>单位编码：</td>
                            <td><input type="text" id="txt_UnitCode" name="unitCode" /></td>
                            <td>单位名称：</td>
                            <td><input type="text" id="txt_UnitName" name="unitName" /></td>
                        </tr>
                    </table>
                </form>
            </div>
            
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width:1px 0px 0px 0px">
                <table id="dataGrid"></table>
            </div>
        </div>
        
    </div>
</body>
</html>
