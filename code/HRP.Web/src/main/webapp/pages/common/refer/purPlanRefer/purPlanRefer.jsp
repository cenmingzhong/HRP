<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/purPlanRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <table id="dataGrid"></table>
    </div>
    <div data-options="region:'south',iconCls:'icon-ok',border:true,split:true" style="height:320px;border-width:1px 0px 0px 0px">
        <table id="dataBodyGrid"></table>
    </div>
    <div id="searchDiv" style="display:none;padding:5px 0px 0px 15px;">
        <form id="infoForm">
            <table>
                <tr>
                    <td>单据编号：</td>
                    <td><input type="text" id="txt_startCode" name="startCode" /></td>
                    <td>到：</td>
                    <td><input type="text" id="txt_endCode" name="endCode"/></td>
                </tr>
                <tr>
                    <td>单据日期：</td>
                    <td><input type="text" id="txt_startPurPlanDate" name="startPurPlanDate"/></td>
                    <td>到：</td>
                    <td><input type="text" id="txt_endPurPlanDate" name="endPurPlanDate"/></td>
                </tr>
                <tr>
                    <td>计划人员：</td>
                    <td><input type="text" id="txt_personName" name="personName" /></td>
                    <td>计划科室：</td>
                    <td><input type="text" id="txt_deptName" name="deptName"/></td>
                </tr>
                <tr>
                    <td>计划类型：</td>
                    <td>
                        <select id="purPlanType" name="purPlanType" >
                            <option value="">--请选择--</option>
                            <option value="分析计划">分析计划</option>
                            <option value="需求计划">需求计划</option>
                            <option value="普通计划">普通计划</option>
                        </select>
                    </td>
                    <td>供应商：</td>
                    <td><input type="text" id="txt_venName" name="venName"/></td>
                </tr>
                <tr>
                    <td>备注：</td>
                    <td><input type="text" id="txt_memo" name="memo" /></td>
                    <td>审核人：</td>
                    <td><input type="text" id="txt_verifier" name="verifier"/></td>
                </tr>
                <tr>
                    <td>审核日期：</td>
                    <td><input type="text" id="txt_startVerifyDate" name="startVerifyDate"/></td>
                    <td>到：</td>
                    <td><input type="text" id="txt_endVerifyDate" name="endVerifyDate"/></td>
                </tr>
                <tr>
                    <td>物资编码：</td>
                    <td><input type="text" id="txt_invCode" name="invCode" /></td>
                    <td>物资名称：</td>
                    <td><input type="text" id="txt_invName" name="invName"/></td>
                </tr>  
            </table>
        </form>
    </div>
</body>
</html>
