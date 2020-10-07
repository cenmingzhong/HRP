<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.gzhh.hrp.extension.spring.CustomizedPropertyConfigurer"%>
<%@page import="com.gzhh.hrp.tools.StringTools"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
    <% 
        response.setHeader("Pragma","No-cache");  
        response.setHeader("Cache-Control","no-cache");  
        response.setDateHeader("Expires", 0);  
        String currentPath = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/")) ;
        String contextPath = request.getContextPath()=="/"?"":request.getContextPath();
        String version = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    %>
    <link rel="shortcut icon" type="image/ico" href="<%=contextPath %>/images/favicon.ico">
    
    <script type="text/javascript">
        var contextPath = '<%=contextPath %>';
    </script>
    
    <style type="text/css">
    #loading-mask{
        background-color:white;
        height:100%;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        z-index:20000;
    }
    #loading{
        height:auto;
        position:fixed;
        left:50%;
        top:45%;
        padding:2px;
        z-index:20001;
        margin-left: -16px;
        margin-top: -20px;  
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
        margin:0;
        padding:3px;
        border:1px #cccccc solid;
        background:#F5FCE5;
        text-align:center;
    }
    #loading-msg {
        font-size: 12px;
        font-weight:normal;
    }
    </style>
    <div id="loading-mask" style="display:none"></div>
    <div id="loading" style="display:none">
        <div class="loading-indicator">
            <img src="<%=contextPath %>/images/progress.gif" width="20" height="20"/>
        </div>
    </div>
    <div id="messageBox" style="display:none;border:1px #eee solid;height:30px;position:fixed;top:45%;z-index:20002;left:50%;background:url(<%=contextPath %>/images/ok.png) #f7f7f7 no-repeat;padding-left:30px;padding-right:10px;background-position:5px center;border-radius: 5px 5px 5px 5px;-webkit-border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px;filter:alpha(opacity=100);-moz-opacity:1;opacity:1;margin-left: -48px;">
        <table style="height:30px">
            <tr>
                <td><div>操作成功</div></td>
            </tr>
        </table>
    </div>
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/pages/mobile/css/mui.min.css?t=<%=version %>' />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/pages/mobile/css/iconfont.css?t=<%=version %>' />
    <link rel="stylesheet"  type="text/css"  href="<%=contextPath %>/css/fontawesome-4.2.0_ie7/css/font-awesome.css" media="all" />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/pages/mobile/css/mui.picker.css?t=<%=version %>' />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/pages/mobile/css/mui.poppicker.css?t=<%=version %>' />
    <script type="text/javascript" src='<%=contextPath %>/js/jquery-1.11.0.min.js' ></script>
    <script type="text/javascript" src='<%=contextPath %>/js/jquery-jtemplates.js' ></script>
    <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mui.min.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mui.view.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mui.picker.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mui.poppicker.js"></script>
    <%-- <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mobileDialog.js"></script> --%>
    <script type="text/javascript" src="<%=contextPath %>/pages/mobile/js/mobileCommon.js?t=<%=version %>"></script>
    
    <script type="text/javascript">
        var isAjaxing = false;
        var isWindowLoad = true;
        var isLockScreen = true;
        window.onload = function () {
            window.setTimeout(function(){
                //closeLocker(true);
            },10)    
            isWindowLoad = false;
        }
        //处理键盘事件
        function cancelBackSpace(e) {
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement; //获取事件源
            var t = obj.type || obj.getAttribute('type'); //获取事件源类型
            if (ev.keyCode == 8) {
                if (t != "password" && t != "text" && t != "textarea") {
                    return false;
                }
                if (obj.readOnly == true || obj.disabled == true) {
                    return false;
                }
            }
        }
        
        //禁止后退键 作用于Firefox、Opera
        //document.onkeypress = cancelBackSpace;
        //禁止后退键  作用于IE、Chrome
        //document.onkeydown = cancelBackSpace;
        
    </script>