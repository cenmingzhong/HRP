<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>用户资料修改</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/userModi.js?t=<%=version %>"></script>
    <style type="text/css">
    	#infoForm{
    		font-size:18px;
    	}
    </style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:35px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false">
                <form id="infoForm" class="layui-form">
                	<input type="text" id="aaa" style="visibility: hidden;" />   <!-- 过滤表单自动填写 -->
　　					<input type="password" id="aba" style="visibility: hidden;" />
                    <div class="layui-block" style="width:700px">
                       <div class="layui-col-md12" isrequired="true">
                            <label class="layui-form-label">部 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门</label>
                            <div class="layui-input-block" isrequired="true">
                               <select id="sel_sysDeptCode" name="sysDeptCode" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="layui-col-md12" isrequired="true">
                            <label class="layui-form-label">角 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</label>
                            <div class="layui-input-block" isrequired="true">
                                <select id="sel_sysRoleCode" name="sysRoleCode" disabled="disabled"></select>
                            </div>
                        </div>                           
                        <div class="layui-col-md12" isrequired="true">
                            <label class="layui-form-label">用户姓名</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_sysUser_name" name="sysUserName"  disabled="disabled"/>
                            </div>
                        </div>
                        <div class="layui-col-md12" isrequired="true">
                            <label class="layui-form-label">登录账号</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_sysUser_account" name="sysUserAccount"  disabled="disabled"/>
                            </div>
                        </div>
   
                        <div class="layui-col-md12">
                            <label class="layui-form-label">电 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_sysUser_phone" name="sysUserPhone" />
                            </div>
                        </div> 
                        <div class="layui-col-md12">
                            <label class="layui-form-label">邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_sysUser_email" name="sysUserEmail" />
                            </div>
                        </div>                                                                     
                        <div class="layui-col-md12">
                            <label class="layui-form-label">性  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
                            <div class="layui-input-block" isrequired="true" >
                            <input name="sysUserSex"  type="radio" id="txt_sysUser_sexman" value="0" disabled="disabled"/>
                                                  <span> 男</span>
                            <input name="sysUserSex" type="radio" id="txt_sysUser_sexgirl" value="1"  disabled="disabled"/>
                                                    <span>女</span>                            
                            </div>
                        </div>
                        <div class="layui-col-md12">
                            <label class="layui-form-label">用户描述</label>
                            <div class="layui-input-block" isrequired="true">
                                <input type="text" id="txt_sysUser_desc" name="sysUserDesc"  disabled="disabled"/> 
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
       initInputForm("infoForm");
    </script>
</body>
</html>