<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>物资参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/invRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="background:#eee">
                <form id="infoForm">
                    <table>
                        <tr>
                            <td>物资关键字：</td>
                            <td><input type="text" id="txt_invInfo" name="invInfo" style="width:80px" /></td>
                            <td>是否备库：</td>
                            <td>
                                <select id="sel_isPrepStock" name="isPrepStock" style="width:60px" >
                                    <option value="">--全部--</option>
                                    <option value="1">备库</option>
                                    <option value="0">非备库</option>
                                </select>
                            </td>
                            <td>是否收费：</td>
                            <td>
                                <select id="sel_chargeProperty" name="chargeProperty" style="width:40px" >
                                    <option value="" selected="selected"></option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>

            <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:1px 1px 0px 0px">
                <ul id="invClsTree" class="ztree"></ul>
            </div>

            <div data-options="region:'center',border:true" style="border-width:1px 0px 0px 1px">
                <table id="invGrid"></table>
            </div>
        </div>
    </div>
</body>
</html>
