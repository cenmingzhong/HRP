<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/selectHeadItem.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',border:true,split:true,collapsible:true,tools:'#tt'" style="width: 300px;border-width:0px 1px 0px 0px">
        <div id="itemGrid"></div>
    </div>
            
    <div data-options="region:'center',border:true" style="width:300px;border-width:0px 0px 0px 1px" >
        <form id="infoForm">
            <table>
                <tr>
                    <td>项目标识：</td>
                    <td><input type="text" id="txt_itemName" name="itemName" readonly="readonly"/></td>
                </tr>
                <tr>
                    <td>显示文本：</td>
                    <td><input type="text" id="txt_itemContent" name="itemContent"/></td>
                </tr>
                <tr>
                    <td>左边距：</td>
                    <td><input type="text" id="txt_itemTop" name="itemTop"/></td>
                </tr>
                <tr>
                    <td>上边距：</td>
                    <td><input type="text" id="txt_itemLeft" name="itemLeft"/></td>
                </tr>
                <tr>
                    <td>宽度：</td>
                    <td><input type="text" id="txt_itemWidth" name="itemWidth"/></td>
                </tr>
                <tr>
                    <td>高度：</td>
                    <td><input type="text" id="txt_itemHeight" name="itemHeight"/></td>
                </tr>
                <tr>
                    <td>字体大小：</td>
                    <td><input type="text" id="txt_itemFontSize" name="itemFontSize"/></td>
                </tr>
                <tr>
                    <td>条形码：</td>
                    <td><input type="checkbox" id="cb_isBarCode" name="isBarCode" value="Y"/></td>
                </tr>
                <tr>
                    <td valign="top">格式化函数：</td>
                    <td>
                        <textarea id="txt_itemFormatter" name="itemFormatter" style="width:400px;height:200px"></textarea>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div id="positionBlock" style="display:none">
        <table>
            <tr>
                <td>字段名称：</td>
                <td><input type="text" id="txt_fieldText"/></td>
            </tr>
        </table>
    </div>
</body>
</html>
