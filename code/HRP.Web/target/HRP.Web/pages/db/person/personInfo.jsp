<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/personInfo.js?t=<%=version%>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb">
        </div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 10px">
        <form action="#" id="infoForm" style="width: 100%; height: 100%;">
        <div class="easyui-tabs" data-options="fit:true,plain:true">
            <div title="基本属性" style="padding: 10px;">
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
                                <label class="needLabel">人员编码：</label>
                            </td>
                            <td>
                                <input type="text" id="txt_person_code" name="personCode" data-rule-required="true" data-msg-required="请输入人员编码" />
                            </td>
                            <td>
                                <label class="needLabel">人员姓名：</label>
                            </td>
                            <td>
                                <input type="text" id="txt_person_name" name="personName" data-rule-required="true" data-msg-required="请输入人员姓名" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label class="needLabel"> 部门编码：</label>
                            </td>
                            <td>
                                <input type="text" id="txt_dept_code" name="deptCode" data-rule-required="true" data-msg-required="请输入部门编码" />
                            </td>
                            <td>部门名称：</td>
                            <td>
                                <input type="text" id="txt_DeptName" name="deptName" readonly="readonly" />
                            </td>
                        </tr>
                        <tr>
                            <td>岗位类别编码：</td>
                            <td>
                                <input type="text" id="txt_postTypeCode" name="postTypeCode" />
                            </td>
                            <td>岗位类别名称：</td>
                            <td>
                                <input type="text" id="txt_postTypeName" name="postTypeName" />
                            </td>
                        </tr>
                        <tr>
                            <td>岗位编码：</td>
                            <td>
                                <input type="text" id="txt_postCode" name="postCode" />
                            </td>
                            <td>岗位名称：</td>
                            <td>
                                <input type="text" id="txt_postName" name="postName" />
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
