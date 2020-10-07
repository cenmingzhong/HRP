<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/itemRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;border-width:0px 0px 0px 1px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:true" style="border-width:0px 0px 1px 0px;height:28px;background:#efefef">
                <table>
                    <tr>
                        <td>关键字:</td>
                        <td><input type="text" id="txt_itemInfo" /></td>
                        <td><input type="button" value="过滤" id="btn_search"/></td>
                    </tr>
                </table>
            </div>
            <div data-options="region:'west',iconCls:'icon-ok',border:true,split:true," style="width:220px;border-width:0px 1px 0px 0px">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north',split:false,border:true" style="height:31px;border-width:0px 0px 1px 0px">
                        <table  style="width:100%">
                            <colgroup>
                                <col width="70px"/>
                                <col width="*"/>
                            </colgroup>
                            <tr>
                                <td>项目大类：</td>
                                <td><select id="sel_itemType" style="width:100%"></select></td>
                            </tr>
                        </table>
                    </div>
                    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
                        <ul id="itemClassTree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;border-width:0px 0px 0px 1px">
                <div id="dataGrid"></div>
            </div>
        </div>
    
    </div>
    
</body>
</html>
