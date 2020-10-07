<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/selectWorkFlowItem.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',border:true" style="width:300px;border-width:0px 0px 0px 1px" >
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:true,split:false,collapsible:true,tools:'#tt'" style="background:#E6EEF8;border-width:0px 0px 1px 0px;overflow:hidden">
                <form id="tableForm">
                    <table>
                        <tr>
                            <td>左边距：</td>
                            <td><input type="text" id="txt_itemTop" name="itemTop" style="width:100px" value="0"/></td>
                            <td>上边距：</td>
                            <td><input type="text" id="txt_itemLeft" name="itemLeft" style="width:100px" value="0"/></td>
                            <td>宽度：</td>
                            <td><input type="text" id="txt_itemWidth" name="itemWidth" style="width:100px" value="600"/></td>
                            <td>高度：</td>
                            <td><input type="text" id="txt_itemHeight" name="itemHeight" style="width:100px" value="220"/></td>
                        </tr>
                        <tr>
                            <td>表格行高：</td>
                            <td><input type="text" id="txt_rowHeight" name="rowHeight" style="width:100px" value="22"/>PX</td>
                            <td>边框宽度：</td>
                            <td><input type="text" id="txt_borderWidth" name="borderWidth" style="width:100px" value="1px"/></td>
                            <td>字体大小：</td>
                            <td><input type="text" id="txt_fontSize" name="fontSize" style="width:100px" value="12"/>PX</td>
                        </tr>
                        <tr>
                            <td>跟随表体：</td>
                            <td><input type="checkbox" name="linkBody" value="Y" />
                            <input type="text" id="txt_linkSpace" name="linkSpace" style="width:50px" value="22"/>PX</td>
                            <!-- <td><input type="checkbox" name="floatText" value="Y" />浮动活动文本</td> -->
                        </tr>
                    </table>
                </form>
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
                            <td>列宽：</td>
                            <td><input type="text" id="txt_itemWidth   " name="itemWidth"/>px</td>
                        </tr>
                        <tr>
                            <td>对齐方式：</td>
                            <td>
                                <select id="sel_itemAlign" name="itemAlign">
                                    <option value="left">居左</option>
                                    <option value="center">居中</option>
                                    <option value="right">居右</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>是否换行：</td>
                            <td>
                                <label><input type="radio" id="rd_isWrap_Y" name="isWrap" value="Y"/>是</label>
                                <label><input type="radio" id="rd_isWrap_N" name="isWrap" value="N"/>否</label>
                            </td>
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
        </div>
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
