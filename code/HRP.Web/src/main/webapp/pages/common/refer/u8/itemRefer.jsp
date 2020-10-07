<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>项目参照</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/itemRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px;border-width:0px 0px 0px 1px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="height:32px;border-width: 0px 0px 1px 0px;background:#efefef">
                <form class="layui-form" id="infoForm">
                    <div class="layui-block">
                        <div class="layui-col-md10">
                            <label class="layui-form-label">项目关键字：</label>
                            <div class="layui-input-block">
                                <input id="txt_itemInfo" name="itemInfo"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div data-options="region:'west',iconCls:'icon-ok',border:false,split:true" style="width:200px;border-width:0px 1px 0px 0px;">
                <ul  id="zTree" class="ztree"></ul>
            </div>
        
            <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px;border-width:0px 0px 0px 1px;">
                <table id="dataGrid"></table>
            </div>
        </div>
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