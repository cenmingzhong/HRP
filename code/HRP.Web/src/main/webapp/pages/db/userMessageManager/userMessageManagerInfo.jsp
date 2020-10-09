<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/userMessageManagerInfo.js?t=<%=version%>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb">
        </div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 10px">
        <form action="#" id="infoForm" style="width: 100%; height: 100%;">
        <div class="easyui-tabs" data-options="fit:true,plain:true">
            <div title="教师信息" style="padding: 10px;">
                <table border="0">
                    <colgroup>
                        <col width="80px" />
                        <col width="200px" />
                        <col width="80px" />
                        <col width="200px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>
                                <label class="needLabel">教师编号：</label>
                            </td>
                            <td>
                                <input type="text" id="teacherNumber" name="teacherNumber" data-rule-required="true" data-msg-required="请输入教师编号" />
                            </td>
                            <td>
                                <label class="needLabel">教师姓名：</label>
                            </td>
                            <td>
                                <input type="text" id="teacherName" name="teacherName" data-rule-required="true" data-msg-required="请输入教师姓名" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label class="needLabel"> 岗位编号：</label>
                            </td>
                            <td>
                                <input type="text" id="positionNumber" name="positionNumber" data-rule-required="true" data-msg-required="请输入岗位编号" />
                            </td>
                            <td>教学岗位类型：</td>
                            <td>
                                <input type="text" id="teachPositionType" name="teachPositionType" readonly="readonly" />
                            </td>
                        </tr>
                        <tr>
                            <td>岗位级别：</td>
                            <td>
                                <input type="text" id="positionLevel" name="positionLevel" />
                            </td>
                            <td>权限编号：</td>
                            <td>
                                <input type="text" id="permissionNumber" name="permissionNumber" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </form>
    </div>
</body>
</html>
