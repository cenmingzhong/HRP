<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/jqGridColSet.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',split:true,border:true" style="padding:0px;border-width:0px 1px 0px 0px">
        <table id="dataGrid"></table>
    </div>

    <div data-options="region:'east',split:true,border:true" style="width:300px;border-width:0px 0px 0px 1px">
        <form class="layui-form" id="infoForm">
            <div class="layui-block layui-block-min">
                <div class="layui-col-md12">
                    <label class="layui-form-label">编码：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_colCode" name="colId"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">字段：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_colField" name="colField"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">标题：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_colTitle" name="colTitle"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">列宽：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_colWidth" name="colWidth"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">对齐：</label>
                    <div class="layui-input-block">
                        <select type="text" id="txt_colAlign" name="colAlign">
                            <option value="left">靠左</option>
                            <option value="center">居中</option>
                            <option value="right">靠右</option>
                        </select>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">类型：</label>
                    <div class="layui-input-block">
                        <select type="text" id="txt_colType" name="colType">
                            <option value="text">文本</option>
                            <option value="number">数字</option>
                            <option value="date">日期</option>
                        </select>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">小数位：</label>
                    <div class="layui-input-block">
                        <input type="text" id="txt_colPrecision" name="colPrecision"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">是否汇总：</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="isSum" id="cb_isSum" style="width:auto" value="true"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">冻结：</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="frozen" id="cb_frozen" style="width:auto" value="true"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">排序：</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="sortable" id="cb_sortable" style="width:auto" value="true"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">过滤格式：</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="isExportFmt" id="cb_isExportFmt" style="width:auto" value="true"/>
                    </div>
                </div>
                <div class="layui-col-md12">
                    <label class="layui-form-label">会计格式：</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="formative" id="cb_formative" style="width:auto" value="Y"/>
                    </div>
                </div>
                <div class="layui-col-md12" style="height:auto;">
                    <label class="layui-form-label">格式化：</label>
                    <div class="layui-input-block" >
                        <div>function(value, rowOpts, rowData){</div>
                        <textarea id="txt_colFormatter" name="colFormatter" style="width:96%;height:60px"></textarea>
                        <div>}</div>
                    </div>
                </div>
            </div>
        </form>
                    
    </div>
</body>
</html>
