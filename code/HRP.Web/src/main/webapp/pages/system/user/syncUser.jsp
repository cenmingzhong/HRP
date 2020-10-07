<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/syncUser.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="padding-right:10px">
                <form id="infoForm" class="layui-form">
                    <input type="hidden" id="txt_id" name="id" value='${param.id}' />
                    <div class="layui-block">
                        <div class="layui-col-md6" isrequired="true">
                            <label class="layui-form-label">员工姓名：</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_psnNum" name="psnNum" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div data-options="region:'west',iconCls:'icon-ok',border:true,split:true" style="padding:0px;width:200px;border-width:1px 1px 0px 0px">
                <ul id="deptTree" class="ztree"></ul>
            </div>
            <div data-options="region:'center',iconCls:'icon-ok',border:true" style="padding:0px;border-width:1px 0px 0px 1px">
                <table id="dataGrid"></table>
            </div>
        </div>
    </div>
    <div id="roleBlock" style="display:none">
        <form id="roleForm" class="layui-form">
            <div class="layui-block">
                <div class="layui-col-md12" isrequired="true">
                    <label class="layui-form-label">用户角色：</label>
                    <div class="layui-input-block" isrequired="true">
                        <select id="sel_role"></select>
                    </div>
                </div>
            </div>
        </form>
    </div>
</body>

</html>
