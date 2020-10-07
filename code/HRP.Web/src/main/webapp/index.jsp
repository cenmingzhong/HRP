<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
   String loginDate = request.getAttribute("loginDate")==null? new SimpleDateFormat("yyyy-MM-dd").format(new Date()): request.getAttribute("loginDate").toString();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>管理系统登录页面</title>
    <% 
        response.setHeader("Pragma","No-cache");  
        response.setHeader("Cache-Control","no-cache");  
        response.setDateHeader("Expires", 0);  
        String currentPath = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/")) ;
        String contextPath = request.getContextPath()=="/"?"":request.getContextPath();
        String version = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    %>
    <link rel="stylesheet" href="css/supersized.css">
    <link rel="stylesheet" href="css/login.css?t=<%=version %>">
    <link rel="stylesheet" href="<%=contextPath %>/css/fontawesome-4.2.0_ie7/css/font-awesome.css" media="all" />
    <link rel="stylesheet" href="<%=contextPath %>/js/layui/css/layui.css?t=<%=version %>" media="all" />
    <script type="text/javascript" src="js/jquery-1.11.0.min.js?t=<%=version %>"></script>
    <script type="text/javascript" src="js/jquery.supersized.min.js?t=<%=version %>"></script>
    <script type="text/javascript" src="js/supersized-init.js"></script>
    <script type="text/javascript" src='js/My97DatePicker/WdatePicker.js' ></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript">
    $(document).ready(function () {
        $("#txtLoginDate").date("");
        $("a.resetBtn").bind("click",function(){
            $("#loginForm")[0].reset()
        });
        var name = localStorage.getItem("name");
        if(name!=null&&name!=""){
        	$("#txtLoginAccount").val(name);
        }
        $(".loginBtn").bind("click",function(){
        	localStorage.setItem("name",$("#txtLoginAccount").val());
        });
    });
    </script>
</head>
<body>
    <div class="loginMain">
        <div class="title">用户登录</div>
        <form  action="login.do" method="post" autocomplete="off" id="loginForm">
            <div class="loginBlock">
                <div class="loginRow">
                    <i class="fa fa-user"></i>
                    <input type="text" class="loginInput" id="txtLoginAccount" name="userName" tabindex="1" autocomplete="off"/>
                </div>
                <div class="loginRow">
                    <i class="fa fa-calculator"></i>
                    <input type="password" class="loginInput" id="txtLoginPassword" name="password" tabindex="2" autocomplete="off"/>
                </div>
                <div class="loginRow">
                    <i class="fa fa-calendar"></i>
                    <input type="text" class="loginInput" id="txtLoginDate" name="loginDate"  value="<%= loginDate%>"  tabindex="3" autocomplete="off"/>
                </div>
                <div class="buttonRow">
                    <button class="layui-btn loginBtn"><i class="fa fa-sign-in"></i>登 录</button>
                    <a class="layui-btn resetBtn layui-btn-warm"><i class="fa fa-undo"></i>重 置</a>
                </div>
                <div class="msgRow">
                    <label>${errorMsg }</label>
                </div>
            </div>
        </form>
    </div>
</body>
</html>