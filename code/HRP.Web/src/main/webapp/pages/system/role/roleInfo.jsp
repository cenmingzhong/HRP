<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>角色信息</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/roleInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false">
	    <div class="easyui-layout"  data-options="fit:true">
		    <div id="filterBlock" data-options="region:'north',iconCls:'icon-ok',border:false" style="padding:0px">
		        <form id="infoForm" class="layui-form">
		            <div class="layui-block">
		                <div class="layui-col-md11" isrequired="true">
		                    <label class="layui-form-label">角色编码</label>
		                    <div class="layui-input-block" isrequired="true">
		                        <input type="text" id="txt_sysRole_code" name="sysRoleCode" />
		                    </div>
		                </div>
		                <div class="layui-col-md11" isrequired="true">
		                    <label class="layui-form-label">角色名称</label>
		                    <div class="layui-input-block" isrequired="true">
		                        <input type="text" id="txt_sysRole_name" name="sysRoleName" />
		                    </div>
		                </div>
		                <div class="layui-col-md11">
		                    <label class="layui-form-label">角色描述</label>
		                    <div class="layui-input-block" isrequired="true">
		                        <input type="text" id="txt_sysRoleDesc" name="sysRoleDesc" />
		                    </div>
		                </div>
		            </div>
		        </form>
		    </div>
		    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
		        <table id='dataBlock'></table>
		    </div>
		</div>
        <div id="ifm" style="width:0px;height:0px;display:none"></div>
    </div>
    <script>
       initInputForm("infoForm");
    </script>
</body>
</html>