<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>文件上传</title>
<%@include file="/pages/common/include/include.jsp"%>
<script type="text/javascript" src="<%=currentPath%>/showFile.js?t=<%=version%>"></script>
<style>
		.hover li:hover {
			background: blue;
		}
		#infoForm{
			font-size : 18px;
		}
		button{
		    background-color: #F90;
		    border: 1px solid transparent;
		    border-radius: 4px;
		    border-bottom-left-radius: 4px;
		    border-bottom-right-radius: 4px;
		    border-top-left-radius: 4px;
		    border-top-right-radius: 4px;
		    height: 30px;
	    }
	    .buttonstr{
	    	padding-left:4%;
	    	padding-top:2%;
	    }
	    .form-control-text{
	    	display: block;
		    width: 100% !important;
		    padding-left: 2px !important;
		    height: 25px !important;
		    border: #e6e6e6 solid 1px !important;
		    border-radius: 2px;
		    box-sizing: border-box;
		    -webkit-box-sizing: border-box;
	    }
	</style>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',split:false,border:false" style="height: 35px;">
		<div id="tb"></div>
	</div>
	<div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px">
		<div>
			<embed src="" width="600" height="300" id="emb"></embed>
		</div>
	</div>
</body>
</html>