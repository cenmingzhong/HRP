<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>项目属性参照</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/inventoryRefer.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">     
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:1px 1px 0px 0px">
        <ul id="invClsTree" class="ztree"></ul>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
    	<table id="dataGrid"></table>
    </div>
    <div id="searchDiv" style="display:none;padding:2px 0px 0px 10px;height: auto">
       <form id="infoForm">
            <div class="vouchFieldDiv">
                <div isInput="true"   >
                    <label>物资编码</label>
                    <input type="text" id="txt_invClsCode" name="invClsCode"  />
                </div>
                <div isInput="true"   >
                    <label>物资名称</label>
                    <input type="text" id="txt_cInvInfo" name="invInfo"  />
                </div>
            </div>
        </form>
    </div>
    
</body>
</html>