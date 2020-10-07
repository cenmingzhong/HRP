<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>工作量类别</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/workloadTypeList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px; padding: 0px">
        <ul id="zTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
   		<table id="dataGrid"></table>
    </div>
    <div id="infoDiv" style="display:none;padding:2px 0px 0px 10px;">
		<div data-options="fit:true" id="filterBlock">
			<div data-options="region:'centen',split:false,border:false" style="border-width:0px 0px 1px 0px">
				<form class="layui-form" id="infoForm">
					<div class="layui-block layui-block-min">
						<div class="layui-col-md12">
							<label class="layui-form-label">类型名称</label>
							<div class="layui-input-block">
								<input id="txt_name" name="name"/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
