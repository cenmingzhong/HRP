<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>人员档案</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/personRefer.js?t=<%=version %>"></script>
</head>

<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div class="easyui-layout"  data-options="fit:true">
            <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:0px 1px 0px 0px">
                <ul  id="deptTree" class="ztree"></ul>
            </div>
            <div data-options="region:'center',split:false,border:true" style="border-width:0px 0px 0px 1px" >
                <table id="dataGrid"></table>
            </div>
        </div>
    </div>

    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table>
                <tr>
                    <td>人员编码：</td>
                    <td><input type="text" id="txt_personCode" name="personCode"/></td>
                </tr>
                <tr>
                    <td>人员姓名：</td>
                    <td><input type="text" id="txt_personName" name="personName"/></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>