<%@page import="com.gzhh.hrp.tools.JsonTools"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <title>${report.reportName}</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/excelReport.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div class="easyui-layout" data-options="fit:true">
            <%-- <c:if test="${reportParamList.size()>0 }"> --%>
            <%-- 搜索栏条件栏已隐藏 --%>
                <div data-options="region:'north',split:false,border:false" hidden="">
                    <form id="infoTopForm" class="layui-form" action="openReport.do?reportId=${report.id}" method="post" target="reportPage">
                        <div class="layui-block">
                            <div class="layui-col-md4" referParam='' isRequired="" isInput="true" dataType="text" referTo="">
                                    <label class="layui-form-label">id</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="id" name="id" value="${vouchId}"/>
                                    </div>
                            </div>
                            <c:forEach items="${reportParamList}" var="field" varStatus="status">  
                                <div class="layui-col-md${field.width }" referParam='${field.referParam }' isRequired="${field.isRequired}" isInput="true" dataType="${field.dataType}" referTo="${field.referTo}">
                                    <label class="layui-form-label">${field.text }</label>
                                    <div class="layui-input-block">
                                        ${field.fieldHtml }
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </form>
                </div>
            <%-- </c:if> --%>
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width:0px 0px 0px 0px">
                <c:if test="${reportParamList.size()==0 }">
                    <form id="infoTopForm" style="display:none;height:0px" action="openReport.do?reportId=${report.id}" method="post" target="reportPage">
                    </form>
                </c:if>
                <iframe frameborder="0" src="" style="width:100%;height:100%;display:block" id="reportPage" name="reportPage"></iframe>
            </div>
        </div>
    </div>
    <script>
       initInputForm("infoTopForm");
    </script>
</body>
</html>
