<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>公告信息</title>
    <%@include file="/pages/common/include/editorInclude.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/sysNoticeInfo.js?t=<%=version %>>"></script>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding-top:2px">
        <div style="margin:0px auto;width:1000px;height:100%">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'north',split:false,border:false">
                    <form id="infoForm" class="layui-form">
                        <div class="layui-block">
                            <div class="layui-col-md12" isInput="true" isRequired="true">
                                <label class="layui-form-label">公共标题</label>
                                <div class="layui-input-block">
                                    <input type="text"  id="txt_noticeTitle" name="noticeTitle" />
                                </div>
                            </div>
                			<input type="text" id="fileUrl" name="fileUrl" hidden="true">
                			<input type="text" id="fileName" name="fileName" hidden="true">
                			<input type="text" id="filePath" name="filePath" hidden="true">
                            <div class="layui-col-md5" isInput="true" isRequired="true">
                        		<label class="layui-form-label">附件</label>
                        		<div class="layui-input-block">
                                    <table id="attachGrid"></table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div data-options="region:'center',split:false,border:false">
                    <script type="text/plain" id="txt_noticeContent" style="width:100%;height:100%;"></script>
                </div>
            </div>
        </div>
        
    </div>
    <div>
        
    </div>
    
            
    <script type="text/javascript">
    initInputForm("infoForm");
    
    document.onkeypress = null;
    document.onkeydown = null;
    </script> 
    
    <!-- 
    <div data-options="region:'north',iconCls:'icon-ok',border:false" style="height:31px">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',border:false" style="padding:0px 5px">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',iconCls:'icon-ok',border:false" >
                <form id="infoForm">
                    <div class="vouchFieldDiv">
                        <div colspan="2" isRequired="true">
                            <label>公告标题</label>
                            <input type="text"  id="Notice_Title" name="noticeTitle" />
                        </div>
                    </div>
                </form>
            </div>
            <div data-options="region:'center',border:false" margin:20px auto 40px;>
                <script type="text/plain" id="txt_noticeContent" style="width: 98%;height:300px"></script>
            </div>
        </div>
    </div>
    <script type="text/javascript">
    initInputForm("infoForm");
    
    document.onkeypress = null;
    document.onkeydown = null;
    </script>  -->
</body>
</html> 
