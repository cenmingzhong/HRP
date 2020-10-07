<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>文件上传</title>
<%@include file="/pages/common/include/include.jsp"%>
<script type="text/javascript" src="<%=currentPath%>/uploadFileList.js?t=<%=version%>"></script>
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
	    	padding-left:2%;
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
		<div class="easyui-layout" data-options="fit:true">
			<div id="filterBlock" data-options="region:'north',iconCls:'icon-ok',border:false" style="padding: 0px, height:330px">

				<form id="infoForm" class="layui-form" autocomplete="off">
					<div class="layui-block">
						<div class="layui-col-md1"></div>
						<div class="layui-col-md3" isrequired="true">
							<label class="layui-form-label">上传日期</label>
							<div class="layui-input-block" isrequired="true">
								<input type="text" id="txt_uploadTime" name="uploadTime"  onclick="WdatePicker({dateFmt:'yyyy-MM',onpicked:loadGrid})"/>
							</div>
						</div>
						<div class="layui-col-md1"></div>
						<div class="layui-col-md3"></div>
						<div class="layui-col-md4"></div>
						
						<div class="layui-col-md1">员工姓名</div>
						<div class="layui-col-md3" style="height: 150px;">
							<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_userList')" />
							<select size="4" multiple="multiple" id="sel_userList" class="form-control" style="height: 120px;">
							</select>
						</div>
						<div class="layui-col-md1 buttonstr">
							<button class="wtbtnsearch" style="width:45px;" type="button" id="btn_AddUser" title="添加" >
	                            	添加
	                        </button>
	                        <br />
	                        <br />
	                        <button class="wtbtnsearch" style="width:45px;" type="button" id="btn_RemoveUser" title="移除">
	                            	移除
	                        </button>
						</div>
						<div class="layui-col-md3" style="height: 150px;">
							<input type="text" id="listUserFilter" class="form-control-text" onkeyup="return OnFilter(this,'sel_selUserList')" />
							<select size="4"  multiple="multiple" id="sel_selUserList" class="form-control" style="height: 120px;">
							</select>
						</div>
						<div class="layui-col-md4" style="height: 100px;"></div>
						<div class="layui-col-md12">
	                    	<label class="layui-form-label"></label>
                     		<div style="font-size:22px!important;"><b>注意:</b> 上传文件以员工账号命名</div>
	                    </div>
					</div>
				</form>
			</div>

			<div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding: 0px">
				<table id='dataGrid'></table>
			</div>
			<div id="uploadDiv" style="display:none">
		        <form id="batchUploadRiskFileForm" action="" method="post"
				  enctype="multipart/form-data">
					<table style="margin-top:35px;height:50%;width:100%;font-size: 18px;" cellpadding="0" cellspacing="0" border="0">
						<tr>
							<td  valign="middle">
								<input type="file" style="width:100%;height:25px" name="ajaxUploadFile" id="ajax_upload_file" multiple/>
							</td>
						</tr>
					</table>
			  	</form>
		    </div>
		</div>
	</div>
	<script>
		initInputForm("infoForm")
	</script>

</body>
</html>