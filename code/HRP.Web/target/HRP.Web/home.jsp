<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <style>
    .metro {
        width: 940px;
        margin: 0 auto 0;
    }
    .metro li {
        -webkit-transform: perspective(690px);
        -webkit-transform-style: preserve-3d;
        -webkit-transform-origin-x: 50%;
        -webkit-transform-origin-y: 50%;
        -ms-transform: perspective(690px);
        -ms-transform-style: preserve-3d;
        -ms-transform-origin-x: 50%;
        -ms-transform-origin-y: 50%;
        transform: perspective(690px);
        transform-style: preserve-3d;
        transform-origin-x: 50%;
        transform-origin-y: 50%;
        cursor: default;
        position: relative;
        text-align: center;
        margin: 0 20px 20px 0;
        width: 300px;
        height: 150px;
        color: #ffffff;
        float: left;
        -webkit-transition: .2s -webkit-transform, 1s opacity;
        -ms-transition: .2s -ms-transform, 1s opacity;
        transition: .2s transform, 1s opacity;
        cursor:pointer;
    }
    
    .metro li i {
        font-size: 56px;
        margin: 32px 0 0;
    }
    
    .metro li span {
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        position: absolute;
        left: 15px;
        bottom: 24px;
        font-size: 18px;
        width: 85%;
        display:block;
    }
    
    .metro li:first-child {
        background: #00b6de;
        font-size: 20px;
        width:620px;
    }
    
    .metro li:first-child  span{
        left: 21px;
        width: 90%;
    }
    
    .metro li:nth-child(2) {
        /* background: #ff7659; */
        background: #9e7ac2;
        font-size: 12px;
        margin-right:0px;
    }
    
    .metro li:nth-child(3) {
        background: #56dea7;
    }
    
    .metro li:nth-child(4) {
        background: #f26175;
    }
    
    .metro li:nth-child(5) {
        background: #9e7ac2;
    }
    
    .metro li:last-child {
        background: #5ca7df;
        margin-right:0px;
    }
    
    .metro li:nth-child(5):active, .metro li:first-child:active {
        -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
    }
    
    .metro li:nth-child(7):active, .metro li:nth-child(2):active {
        -webkit-transform: perspective(600px) rotate3d(1, 0, 0, -10deg);
        -ms-transform: perspective(600px) rotate3d(1, 0, 0, -10deg);
        transform: perspective(600px) rotate3d(1, 0, 0, -10deg);
    }
    
    .metro li:nth-child(3):active {
        -webkit-transform: perspective(600px) rotate3d(0, 1, 0, 10deg);
        -ms-transform: perspective(600px) rotate3d(0, 1, 0, 10deg);  
        transform: perspective(600px) rotate3d(0, 1, 0, 10deg); 
    }
    
    .metro li:nth-child(4):active {
        -webkit-transform: perspective(600px) rotate3d(0, 1, 0, -10deg);
        -ms-transform: perspective(600px) rotate3d(0, 1, 0, -10deg);
        transform: perspective(600px) rotate3d(0, 1, 0, -10deg);
    }
    
    .metro li:nth-child(6):active {
        -webkit-transform: perspective(600px) rotate3d(1, 0, 0, 10deg);
        -ms-transform: perspective(600px) rotate3d(1, 0, 0, 10deg);
        transform: perspective(600px) rotate3d(1, 0, 0, 10deg);
    }
    </style>
</head>
<body class="easyui-layout">   
    <ul class="metro">
        <li>
            <i class="fa fa-cog"></i>
            <span>系统管理</span>
        </li>
    </ul>
</body>
</html>
