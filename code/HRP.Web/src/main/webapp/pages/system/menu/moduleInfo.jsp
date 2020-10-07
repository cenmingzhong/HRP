<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>模块信息</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/moduleInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <form id="infoForm">
            <input type="hidden" id="hid_SysMenuCode" name="sysMenuCode" />

            <table class="infoTable">
                <colgroup>
                    <col width="80px" />
                    <col width="400px" />
                </colgroup>
               <tbody>
                    <tr>
                        <td>
                           	 模块名称：
                        </td>
                        <td>
                            <input type="hidden" id="txt_SysMenuCode" name="sysMenuCode" />
                            <input type="text" id="txt_SysMenuName" name="sysMenuName" data-rule-required="true" data-msg-required="请输入模块名称"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                      	            是否显示：
                        </td>
                        <td>
                            <input type="checkbox" id="cb_SysMenuVisible" checked="checked" value="Y" name="sysMenuVisible" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            	是否可用：
                        </td>
                        <td>
                            <input type="checkbox" id="cb_SysMenuEnable" checked="checked" value="Y" name="sysMenuEnable" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            	模块描述：
                        </td>
                        <td>
                            <textarea id="txt_SysMenuDesc" name="sysMenuDesc" style="width:99%;"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form> 
    </div>
</body>
</html>
