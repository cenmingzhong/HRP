<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>系统菜单</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/menuInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <form id="infoForm">
            <input type="hidden" id="hid_sysMenuModule" name="sysMenuModule"/>
            <input type="hidden" id="hid_sysMenuParent" name="sysMenuParent"/>
            <input type="hidden" id="hid_sysMenuCode" name="sysMenuCode"/>
            <table class="infoTable">
                <colgroup>
                    <col width="80px" />
                    <col width="400px" />
                </colgroup>
                <tbody>
                    <tr>
                        <td>菜单名称：</td>
                        <td>                        
                            
                            <input type="text" id="txt_sysMenuName" name="sysMenuName" data-rule-required="true" data-msg-required="请输入菜单名称"/>
                        </td>
                    </tr>
                    <tr>
                        <td>菜单路径：</td>
                        <td>
                            <input type="text" id="txt_sysMenuUrl" name="sysMenuUrl" style="width:98%;"/> 
                        </td>
                    </tr>
                    <tr>
                        <td>是否显示：</td>
                        <td>
                            <input type="checkbox" id="cb_sysMenuVisible" checked="checked" name="sysMenuVisible" value="Y" />
                        </td>
                    </tr>
                    <tr>
                        <td>是否可用： </td>
                        <td>
                            <input type="checkbox" id="cb_sysMenuEnable" checked="checked" name="sysMenuEnable" value="Y" />
                        </td>
                    </tr>
                    <tr>
                        <td>菜单描述：</td>
                        <td>
                            <textarea id="txt_sysMenuDesc" name="sysMenuDesc" style="width:98%;" rows="2"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form> 
    </div>
</body>
</html>
