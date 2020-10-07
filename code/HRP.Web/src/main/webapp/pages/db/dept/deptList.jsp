<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>部门管理</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/deptList.js?t=<%=version %>" charset="utf-8"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px; padding: 0px">
        <ul id="deptTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding: 0px; border-width: 0px 0px 0px 1px;">
        <div class="easyui-tabs" data-options="fit:true,plain:true,border:false" id="tabs">
            <div title="基本属性" style="padding: 10px;">
                <form id="infoForm">
                    <table>
                        <tr>
                            <td><label class="needLabel"> 部门编码：</label></td>
                            <td><input type="text" id="txt_deptCode" name="deptCode"
                                data-rule-required="true" data-msg-required="请输入部门编码" /></td>
                        </tr>
                        <tr>
                            <td><label class="needLabel">部门名称：</label></td>
                            <td><input type="text" id="txt_deptName" name="deptName"
                                data-rule-required="true" data-msg-required="请输入部门名称" /></td>
                        </tr>
                        <tr>
                            <td><label>部门别名：</label></td>
                            <td><input type="text" id="txt_deptAlias" name="deptAlias" />
                            </td>
                        </tr>
                        <tr>
                            <td><label>部门类别：</label></td>
                            <td><select id="sel_deptProp" name="deptProp"></select></td>
                        </tr>
                        <tr>
                            <td><label> 输入码：</label></td>
                            <td><input type="text" id="txt_inputCode" name="inputCode" />
                            </td>
                        </tr>
                        <tr>
                            <td><label> 部门负责人：</label></td>
                            <td><input type="hidden" id="txt_deptPerson" name="deptPerson" /> 
                                <input type="text" id="txt_deptPersonName" name="deptPersonName" /></td>
                        </tr>
                        <tr>
                            <td><label>分管领导：</label></td>
                            <td><input type="hidden" id="txt_deptMgr" name="deptMgr" />
                                <input type="text" id="txt_deptMgrName" name="deptMgrName" />
                            </td>
                        </tr>
                        <tr>
                            <td><label>电子邮箱：</label></td>
                            <td><input type="text" id="txt_deptEmail" name="deptEmail" />
                            </td>
                        </tr>
                        <tr>
                            <td><label>联系电话：</label></td>
                            <td><input type="text" id="txt_deptPhone" name="deptPhone" />
                            </td>
                        </tr>
                        <tr>
                            <td><label class="needLabel">成立日期：</label></td>
                            <td><input type="text" id="txt_startDate" name="startTime"
                                data-rule-required="true" data-msg-required="请输入成立日期" /></td>
                        </tr>
                        <tr>
                            <td><label>撤销日期：</label></td>
                            <td><input type="text" id="txt_endDate" name="endTime" />
                            </td>
                        </tr>
                        <tr>
                            <td>备注：</td>
                            <td><input type="text" id="txt_deptMemo" name="deptMemo" />
                            </td>
                        </tr>
                        <tr>
                            <td><label>部门序号：</label></td>
                            <td><input type="text" id="txt_deptOrder" name="deptOrder" />
                            </td>
                        </tr>
                        <tr>
                            <td>编码规则：</td>
                            <td><label id="lb_codeRule"> </label></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div title="联系方式">
                <div class="easyui-layout" data-options="fit:true,plain:true">
                    <div data-options="region:'center',iconCls:'icon-ok',border:false">
                        <table id="dataGrid"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="searchDiv" style="display: none; padding: 5px 0px 0px 15px;">
        <form id="searchForm">
            <table>
                <tr>
                    <td>部门名称：</td>
                    <td><input type="text" id="txt_deptNameSearch" name="deptName" />
                    </td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>