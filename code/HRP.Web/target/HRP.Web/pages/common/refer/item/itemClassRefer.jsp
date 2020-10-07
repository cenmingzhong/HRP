<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/itemClassRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;border-width:0px 0px 0px 1px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:true" style="height:31px;border-width:0px 0px 1px 0px">
                <table>
                    <colgroup>
                        <col width="70px"/>
                        <col width="*"/>
                    </colgroup>
                    <tr>
                        <td>项目大类：</td>
                        <td><select id="sel_itemType" style="width:120px"></select></td>
                    </tr>
                </table>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
                <ul id="itemClassTree" class="ztree"></ul>
            </div>
        </div>
    </div>
</body>
</html>
