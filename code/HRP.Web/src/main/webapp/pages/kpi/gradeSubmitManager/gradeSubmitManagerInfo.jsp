<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/gradeSubmitManagerInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'north',split:false,border:false" style="height: 31px;">
    <div id="tb">
    </div>
</div>
<div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',split:false,border:false">
            <form id="infoTopForm" action="#">
                <input type="hidden" id="hid_Id" name="Id" />
                <table class="inputForm">
                    <colgroup>
                        <col width="80px" />
                        <col width="200px" />
                        <col width="80px" />
                        <col width="200px" />
                    </colgroup>
                    <tbody>
                    <tr>
                        <td>
                            申报编号：
                        </td>
                        <td>
                            <input type="text" id="submitNumber" name="submitNumber" />
                        </td>
                        <td>
                            教师编号：
                        </td>
                        <td>
                            <input type="text" id="teacherNumber" name="teacherNumber" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            教师名字：
                        </td>
                        <td>
                            <input type="text" id="teacherName" name="teacherName" />

                        </td>

                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px">
            <div class="easyui-tabs" data-options="fit:true,plain:true" id="tabs">
                <div title="表头项目" style="padding: 0px;">
                    <div class="easyui-layout" data-options="fit:true,plain:true">
                        <div data-options="region:'center',iconCls:'icon-ok',border:false">
                            <div id="headGrid">
                            </div>
                        </div>
                    </div>
                </div>
                <div title="表体项目" style="padding: 0px;">
                    <div class="easyui-layout" data-options="fit:true,plain:true">
                        <div data-options="region:'center',iconCls:'icon-ok',border:false">
                            <div id="bodyGrid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
