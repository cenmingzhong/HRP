<%@page import="com.gzhh.hrp.tools.StringTools"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <title>${sysNotice.noticeTitle}</title>
    <% 
        response.setHeader("Pragma","No-cache");  
        response.setHeader("Cache-Control","no-cache");  
        response.setDateHeader("Expires", 0);  
        String contextPath = request.getContextPath()=="/"?"":request.getContextPath();
    %>
	<link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/css/style.css' />
</head>
<body>
    <div style="width:800px;margin:0px auto;">
        <div>
            <div style="text-align:center;border-bottom:1px dashed  #ccc;padding:10px 0px">
                <div style="text-align:center;font-size:20px;font-weight:bold;line-height:50px">
                    ${sysNotice.noticeTitle}
                </div>
                <div>发布时间：<fmt:formatDate value="${sysNotice.releaseTime}" type="both"/></div>
            </div>
            <div>
                ${sysNotice.noticeContent}
            </div>
        </div>
    </div>
</body>
</html>
