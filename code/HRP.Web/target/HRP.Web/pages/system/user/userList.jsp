<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>用户管理</title>
	<%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/userList.js?t=<%=version %>"></script>
    <style type="text/css">
    	.layui-form-label,.layui-input-block{
    		font-size:18px;
    	}
    </style> 
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height: 35px;">
        <div id="tb">
        </div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" >
        <table id="sysUserGrid"></table>
    </div>
    
    <div id="filterBlock" style="display:none">
        <form id="infoForm" class="layui-form">
            <div class="layui-block">

               <div class="layui-col-md11">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-block">
                        <select id="sel_sysDeptCode" name="sysDeptCode"></select>
                    </div>
                </div>
                <div class="layui-col-md11">
                    <label class="layui-form-label">姓名</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_sysUserName" name="sysUserName" />
                    </div>
                </div>
 
            </div>
        </form>
    </div>
    <script>
    initInputForm("infoForm")
    </script>
</body>
</html>