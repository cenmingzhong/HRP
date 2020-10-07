<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/userRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="padding-right:10px">
                <form id="infoForm" class="layui-form">
                    <input type="hidden" id="txt_itemMember" name="itemMember" value='Y' />
                    <div class="layui-block">
                        <div class="layui-col-md11" isrequired="true">
                            <label class="layui-form-label">用户姓名：</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_userInfo" name="userInfo" />
                            </div>
                        </div>
                        <!-- <div class="layui-col-md6" isrequired="true">
                            <label class="layui-form-label">部门名称：</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_deptCode" name="deptCode" />
                            </div>
                        </div> -->
                    </div>
                </form>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;border-width:1px 0px 0px 0px">
                <table id="sysUserGrid"></table>
            </div>
        </div>
    </div>
    
</body>
</html>
