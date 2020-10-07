<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>人员离职申请单</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/personQuitInfo.js?t=<%=version%>"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:5px 20px 10px 20px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false">
                <form id="infoTopForm" action="#">
                    <input type="hidden" id="hid_Id" name="id" />
                    <table class="inputForm">
                        <colgroup>
                            <col width="80px"/>
                            <col width="200px"/>
                            <col width="80px"/>
                            <col width="200px"/>
                            <col width="80px"/>
                            <col width="200px"/>
                        </colgroup>
                        <tbody>
                            <tr>
                              <td colspan="6" style="text-align:center;font-size:large">人员离职申请单</td>
                            </tr>
                            <tr>
                                <td style="color:Gray;">申请单号：</td>
                                <td><input type="text" id="txt_VouchCode"  name="vouchCode" readonly="readonly" /></td>
                                <td class="needLabel">申请日期：</td>
                                <td><input type="text" id="txt_VouchDate"  name="vouchDate" readonly="readonly"  /></td>
                                <td class="needLabel">离职类别：</td>
                                <td>
                                    <select name=quitType >
                                       <option value="辞退">辞退</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="needLabel">离职原因：</td>
                                <td>                
                                    <input id="txt_Reason"  type="text" name="reason" />
                                </td>
                                <td>备注：</td>
                                <td>
                                	<input id="txt_Memo"  type="text" name="Memo" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:true">
                <table id="dataBlock"></table>
            </div>
            <div data-options="region:'south',split:false,border:false">
                <form id="infoEndForm" action="#">
                    <table class="inputForm">
                        <colgroup>
                            <col width="80px"/>
                            <col width="200px"/>
                            <col width="80px"/>
                            <col width="200px"/>
                            <col width="80px"/>
                            <col width="200px"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>制单人：</td>
                                <td><input type="text" id="txt_Creator" name="creator" readonly="readonly" /></td>
                                <td>提交人：</td>
                                <td><input type="text" id="txt_SubmitPerson" name="submitPerson" readonly="readonly" /></td>
                                <td>提交日期：</td>
                                <td><input type="text" id="txt_SubmitDate" name="submitDate" readonly="readonly" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</body>
</html>