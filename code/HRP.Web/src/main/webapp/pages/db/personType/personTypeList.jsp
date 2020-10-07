<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>人员类型档案</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/personTypeList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'north',split:false,border:false" style="height:31px;">
    <div id="tb"></div>
</div>

<div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
    <div class="easyui-layout"  data-options="fit:true">
        <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:0px 1px 0px 0px ">
            <ul id="deptTree" class="ztree"></ul>
        </div>
        <div data-options="region:'center',split:false,border:false" style="border-width:0px 0px 0px 1px">
            <table id="dataGrid"></table>
        </div>
        <div id="searchDiv" style="display:none;padding:5px 0px 0px 15px;">
            <form id="infoForm">
                <table>
                    <tr>
                        <td>人员类型编码：</td>
                        <td><input type="text" id="txt_PersonCode" name="personTypeCode" /></td>

                    </tr>


                </table>
            </form>
        </div>
    </div>
</div>
</body>
</html>
