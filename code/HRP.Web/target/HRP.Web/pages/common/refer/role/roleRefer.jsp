<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<title>角色档案</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/roleRefer.js?t=<%=version %>"></script>
</head>

<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <table id="sysRoleGrid"></table>
    </div>
    
     <div id="searchDiv" style="display:none">
        <form id="infoForm">
            <div class="vouchFieldDiv">
                <div>
                     <label>角色编码</label>
                     <input type="text" id="txt_sysRoleCode" name="sysRoleCode" />
                </div>
                <div>
                    <label>角色名称</label>
                    <input type="text" id="txt_sysRoleName" name="sysRoleName" />
                </div>
            </div>
        </form>
    </div>
    
</body>
</html>