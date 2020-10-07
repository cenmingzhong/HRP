<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<style>
        html, body, form
        {
            height:100%;
            padding:0px;
            margin:0px;
        }
        *
        {    
            FONT-SIZE: 12px; 
            font-family:宋体;
        }
        li{ 
            list-style-type:decimal;
            margin:5px 0px;
            font-size:12px;
        }
        .left
        {
            background:url(images/login/left.gif);
        }

        .center
        {
             width:951px;
             background:url(images/login/main.gif);
        }
        .right
        {
            background:url(images/login/right.gif);
        }
        .userName, .password
        {
            margin-left:23px; 
            margin-top:2px;
            width:175px !important;
            height:19px;
            line-height:19px;
            font-size:14px;
            background: transparent;
            border:0px #5A6875 solid !important;
        }
        
        table {
            border: 0;
            margin: 0px;
            padding:0px;
            _border-collapse: collapse;    
        }
        .actionError{
            color: red;
        }        
        
    </style>
    <script>
        $(function () {
            var loginSession = session.getLoginUser();
            if(loginSession != null){
                $('#txtLoginAccount').val(loginSession.sysUserAccount);
                $('#txtLoginDate').val(loginSession.loginDate);
                $('#txtLoginPassword').focus();
            }else{
                //$("#btnLogin").attr("disabled","disabled");
            }
            var loginClick =function(){
            	ajaxSubmit({
                    url:contextPath+"/reLogin.do",
                    data:{
                        loginAccount:$("#txtLoginAccount").val(),
                        loginPassword:$("#txtLoginPassword").val(),
                        loginDate:$("#txtLoginDate").val()
                    },
                    handlerError:false,
                    success:function(result){
                        if(result.isOk=="Y"){
                        	$("#lblErrorMsg").html("");
                            closeDialog();
//                         	ajaxSubmit({
//                                 url:contextPath+"/bm/setting/account/changeLoginAccount.do",
//                                 data:{
//                                 	id:session.account().id
//                                 },
//                                 success:function(result){
//                                     if(result.isOk=="Y"){
//                                     	$("#lblErrorMsg").html("");
//                                         closeDialog();
//                                     }else{
//                                     	$("#lblErrorMsg").html(result.message)
//                                     }
                                    
//                                 }
//                             });
                        }else{
                        	$("#lblErrorMsg").html(result.message)
                        }
                        
                    }
                });
            }
            $("#btnLogin").bind("click",function(){
            	loginClick();
            });
            $("#txtLoginDate").bind("click", function(){
                WdatePicker();
            });
            $('#txtLoginAccount').keydown(function (e) {
                if (e.which == 13) {
                    
                    if ($(this).val() != "") {
                        $("#txtLoginPassword").focus();
                    }
                }

            });
            $('#txtLoginPassword').keydown(function (e) {
                if (e.which == 13) {
                	loginClick();
                }

            });
            $("#btnReset").bind("click",function(){
                topWin.location.href = contextPath+"/toLogin.do";
                return false;
            });
            
        });

    </script>
</head>
<body srcoll="no" style="overflow:hidden;background:#E6EEF7">
    <form id="infoForm" runat="server" autocomplete="off">
        <div style="padding:0px auto">
            <table border="0" cellpadding="0" cellspacing="0" style="width:300px;margin:0px auto;">
                <tr style="height:60px;">
                    <td colspan="2" align="center" style="color: #4D81B2;font-size: 17px;font-weight: bold;">会话已过期, 请重新登录</td>
                </tr>
                <tr style="height:35px">
                    <td style="width:50px;text-align:right;padding-right:10px">用户名:</td>
                    <td>
                        <div style="background:url(images/login/bg_username.gif);width:201px;height:22px">
                            <input type="text" id="txtLoginAccount" name="sysLoginAccount" class="userName" tabindex="1"/>
                        </div>
                    </td>
                </tr>
                <tr style="height:35px">
                    <td style="width:50px;text-align:right;padding-right:10px" >密&nbsp;码:</td>
                    <td colspan="2">                            
                        <div style="background:url(images/login/bg_password.gif);width:201px;height:22px">
                            <input type="password" id="txtLoginPassword" name="sysLoginPassword" class="password" tabindex="2"/>
                        </div>
                    </td>
                </tr>
                <tr style="height:35px">
                    <td style="width:50px;text-align:right;padding-right:10px" >日&nbsp;期:</td>
                    <td colspan="2">                            
                        <div style="background:url(images/login/bg_validation.png);width:201px;height:22px">
                            <input type="text" class="userName" id="txtLoginDate" name="loginDate"  tabindex="3"/>
                        </div>
                    </td>
                </tr>
                <tr style="height:30px;">
                    <td style="width:50px;text-align:right;padding-right:10px"></td>
                    <td colspan="2"> 
                        <label id="lblErrorMsg" style="color:red"></label>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" >
                        <table border="0" cellpadding="0" cellspacing="0" style="width:100%;margin-top:12px;">
                            <tr>
                                <td align="center">
                                    <input type="button" style="width:100px;height:32px;background:#418AD0;color:#ffffff;border:1px #81C1FA solid;font-size:15px;font-weight:bold;" id="btnLogin" value="登  陆"/>
                                </td>
                                <td align="center">
                                    <input type="button" style="width:100px;height:32px;background:#F0AE35;color:#ffffff;border:1px #CB9839 solid;font-size:15px;font-weight:bold;" id="btnReset" value="退出系统"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
