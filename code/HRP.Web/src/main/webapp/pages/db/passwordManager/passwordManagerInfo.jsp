<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>密码管理</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/passwordManagerInfo.js?t=<%=version %>"></script>
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
                            <input type="text" id="teacherNumber" name="teacherNumber" autocomplete="true"/>
                        </div>
                    </div>

                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">用户姓名</label>
                        <div class="layui-input-block" isrequired="true">
                            <input type="text" id="teacherName" name="teacherName" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">用户账户</label>
                        <div class="layui-input-block" isrequired="true">
                            <input type="text" id="teacherAccount" name="teacherAccount" autocomplete="off" />
                        </div>
                    </div>
                    <div class="layui-col-md6" isrequired="true">
                        <label class="layui-form-label">用户密码</label>
                        <div class="layui-input-block" isrequired="true">
                            <input type="password" id="teacherPassword" name="teacherPassword" autocomplete="off"/>
                        </div>
                    </div>
                    <div class="layui-col-md6">
                        <label class="layui-form-label">创建时间</label>
                        <div class="layui-input-block">
                            <input type="text" id="createTime" name="createTime" readonly="readonly"/>
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