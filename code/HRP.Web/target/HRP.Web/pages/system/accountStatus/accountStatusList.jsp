<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>关帐处理</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/accountStatusList.js?t=<%=version %>"></script>
    <style type="text/css">
    	#infoForm,#passwordConfirm{
    		font-size:18px;
    	}
    </style>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:35px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',split:true,border:true" style="padding:0px;border-width:0px 0px 0px 1px">
    	<div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false">
                <form id="infoForm" class="layui-form" autocomplete="off">
                	<div class="layui-block">
                		<br/>
                		<div class="layui-col-md1"></div>
                		<div class="layui-col-md3">
	                        <label class="layui-form-label">关账日期</label>
	                        <div class="layui-input-block">
	                            <input type="text" id="txt_date" name="date" onclick="WdatePicker({dateFmt:'yyyy-MM',onpicked:loadGrid})"/>
	                        </div>
                        </div>
                        <div class="layui-col-md1"></div>
                        <div class="layui-col-md3">
	                        <label class="layui-form-label">是否已上传</label>
	                        <div class="layui-input-block">
	                            <select id="sel_isUpload" name="isUpload">
	                            	<option value='false' selected="selected">未上传</option>
	                            	<option value='true'>已上传</option>
	                            </select>
	                        </div>
                        </div>
                        <br/><br/>
                	</div>
               	</form>
			</div>
			<div data-options="region:'center',iconCls:'icon-ok',split:true,border:true" style="padding:0px;border-width:0px 0px 0px 1px">
		       	 <table id="dataGrid"></table>
		    </div>
		    
		    <div id="passwordConfirm" style="display:none;padding:5px 0px 0px 15px;">
		    	<span style="color: red">账目已关闭，是否重新开账？</span><br/>
		    	请输入密码：<input type="password" id="txt_password"  />
		    </div>
		</div>
    </div>
</body>
</html>
