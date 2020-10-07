<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>文件下载</title>
	<%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/userFileList.js?t=<%=version %>"></script>
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
    <div data-options="region:'center',iconCls:'icon-ok',border:false" >
    	<div class="easyui-layout"  data-options="fit:true">
	    	<div id="filterBlock" data-options="region:'north',iconCls:'icon-ok',border:false" style="padding:0px,height:330px">
		        <form id="infoForm" class="layui-form" autocomplete="off">
		            <div class="layui-block" >
		            	<div class="layui-col-md1"></div>
						<div class="layui-col-md3" datatype="date">
		                    <label class="layui-form-label">开始时间</label>
		                    <div class="layui-input-block">
		                        <input type="text" id="txt_startDate" name="startDate" />
		                    </div>
		                </div>
		                <div class="layui-col-md3" datatype="date">
		                    <label class="layui-form-label">结束时间</label>
		                    <div class="layui-input-block">
		                        <input type="text" id="txt_endDate" name="endDate" />
		                    </div>
		                </div>
		                <div class="layui-col-md5"></div>
		                <div class="layui-col-md5"  style="height: 160px">
		                	<fieldset>
			                	<legend>员工姓名</legend>
								<div class="layui-col-md5" style="height: 120px;">
									<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_userList')" />
									<select size="4" multiple="multiple" id="sel_userList" class="form-control" style="height: 100px;">
									</select>
								</div>
								<div class="layui-col-md2 buttonstr">
									<button class="wtbtnsearch" style="width:45px;" type="button" id="btn_AddUser" title="添加" >
			                            	添加
			                        </button>
			                        <br />
			                        <br />
			                        <button class="wtbtnsearch" style="width:45px;" type="button" id="btn_RemoveUser" title="移除">
			                            	移除
			                        </button>
								</div>
								<div class="layui-col-md5" style="height: 120px;">
									<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_selUserList')" />
									<select size="4"  multiple="multiple" id="sel_selUserList" class="form-control" style="height: 100px;">
									</select>
								</div>
							</fieldset>
		                </div>
		               	<div class="layui-col-md1" style="height: 160px"></div>
						<div class="layui-col-md5" style="height: 160px">
		                	<fieldset>
			                	<legend>部门名称</legend>
								<div class="layui-col-md5" style="height: 120px;">
									<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_deptCode')" />
									<select size="4" multiple="multiple" id="sel_deptCode" class="form-control" style="height: 100px;">
									</select>
								</div>
								<div class="layui-col-md2 buttonstr">
									<button class="wtbtnsearch" style="width:45px;" type="button" id="btn_AddDept" title="添加" >
			                            	添加
			                        </button>
			                        <br />
			                        <br />
			                        <button class="wtbtnsearch" style="width:45px;" type="button" id="btn_RemoveDept" title="移除">
			                            	移除
			                        </button>
								</div>
								<div class="layui-col-md5" style="height: 120px;">
									<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_selDeptCode')" />
									<select size="4"  multiple="multiple" id="sel_selDeptCode" class="form-control" style="height: 100px;">
									</select>
								</div>
							</fieldset>
		                </div>
		            </div>
		        </form>
		    </div>
	
			<div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
				<table id="dataGrid"></table>
			</div>
	
		</div>
        
    </div>
    
    <script>
    	initInputForm("infoForm")
    </script>
</body>
</html>