<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>用户管理</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/permissionManagerInfo.js?t=<%=version %>"></script>
    <style type="text/css">
        .layui-form-label{
            font-size:18px;
        }
        select,input,span{
            font-size:18px;
        }
        input::-ms-reveal{
            display: none;
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
                <div class="layui-block">


                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">教师编号</label>
                        <div class="layui-input-block" isrequired="true">
                            <input type="text" id="teacherNumber" name="teacherNumber" autocomplete="off" readonly="true"/>
                        </div>
                    </div>
                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">教师名字</label>
                        <div class="layui-input-block" isrequired="true">
                            <input type="text" id="teacherName" name="teacherName" autocomplete="off" readonly="true"/>
                        </div>
                    </div>

                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">权限编号</label>
                        <div class="layui-input-block">
                            <select id="permissionNumber" name="permissionNumber">
                                <option value="0">管理员</option>
                                <option value="1">教师</option>
                                <option value="2">主任</option>
                            </select>
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