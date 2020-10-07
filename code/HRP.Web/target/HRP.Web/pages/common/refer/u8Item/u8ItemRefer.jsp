<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>预警口径参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/u8ItemRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <ul  id="zTree" class="ztree"></ul>
    </div>
    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table >
                <tr>
                    <td>项目名称：</td>
                    <td><input type="text" id="txt_nodeName" name="nodeName" /></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>