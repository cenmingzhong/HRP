<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>常用菜单设置</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/menuFavoriteList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:5px 10px 10px 10px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'west',split:false,border:false" style="width:260px;">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north',split:false,border:false" style="height:25px;line-height:25px;font-weight:bold;">
                        <label>所有系统功能</label>
                    </div>
                    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px">
                        <ul id="menuTree" class="ztree"></ul>
                    </div>
                </div>
            </div>
            
            <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'west',split:false,border:false" style="width:40px;">
                        <table style="height:100%">
                            <tr>
                                <td align="center" style="line-height:50px">
                                    <input type="button" value=">" style="height:25px;width:30px" id="btn_addOften"/>
                                    <input type="button" value="<" style="height:25px;width:30px" id="btn_delOften"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'north',split:false,border:false" style="height:25px;line-height:25px;font-weight:bold;">
                                <label>已选功能</label>
                                <div style="position: absolute; right:0px;top:2px">
                                    <input type="button" value="∧" style="height:20px;width:30px" id="btn_upOften"/>
                                    <input type="button" value="∨" style="height:20px;width:30px" id="btn_downOften"/>
                                </div>
                            </div>
                            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px">
                                <table id="dataGrid"></table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div data-options="region:'south',split:false,border:false" style="padding-top:5px">
                <label style="color:blue">常用菜单最多可以设置 <label style="color:red;">20</label> 个</label>
            </div>
        </div>
    </div>
    
</body>
</html>
