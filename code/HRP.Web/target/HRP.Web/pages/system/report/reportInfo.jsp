<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>报表定义</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/reportInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'center',split:true,border:false" style="padding:0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false">
                <form id="reportForm" class="layui-form">
                    <input type="hidden" id="txt_reportClsCode" name="reportClsCode">
                    <input type="hidden" id="txt_excelReportCls" name="excelReportCls">
                    <div class="layui-block">
                        <div class="layui-col-md4" isInput="true" isRequired="true">
                            <label class="layui-form-label">报表名称</label>
                            <div class="layui-input-block">
                                <input type="text" id="txt_reportName" name="reportName" />
                            </div>
                        </div>
                        
                        <div class="layui-col-md4" isInput="true" isRequired="true">
                            <label class="layui-form-label">报表模版</label>
                            <div class="layui-input-block">
                                <select id="sel_reportTemplate" name="reportTemplate">
                                    <option value="commonTemplate">常用模版</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="layui-col-md4" isInput="true" isRequired="true">
                            <label class="layui-form-label">是否分页</label>
                            <div class="layui-input-block">
                                <select id="sel_pageable" name="pageable">
                                    <option value="true">分页</option>
                                    <option value="false">不分页</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="layui-col-md12" isInput="true" isRequired="true">
                            <label class="layui-form-label">报表文件</label>
                            <div class="layui-input-block">
                                <a href="javascript:void(0)" id="lbl_fileName" style="width:auto;display:block;color:blue;line-height:26px;"></a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div data-options="region:'center',split:true,border:true" style="padding:0px;border-width:1px 0px 0px 0px">
                <div class="easyui-tabs" data-options="fit:true,border:false,plain:false">   
                    <div title="查询条件">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:true,border:true" style="padding:0px;border-width:0px 1px 0px 0px">
                                <table id="dataGrid"></table>
                            </div>
                            <div data-options="region:'east',split:true,border:true" style="width:330px;border-width:0px 0px 0px 1px">
                                <form id="infoForm" class="layui-form">
                                    <div class="layui-block">
                                        <div class="layui-col-md12" isInput="true" isRequired="true">
                                            <label class="layui-form-label">参数编码：</label>
                                            <div class="layui-input-block">
                                                <input type="text" id="txt_code" name="code" />
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true">
                                            <label class="layui-form-label">显示文本：</label>
                                            <div class="layui-input-block">
                                                <input type="text" id="txt_text" name="text" />
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true">
                                            <label class="layui-form-label">显示宽度：</label>
                                            <div class="layui-input-block">
                                                <select id="sel_width" name="width">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true">
                                            <label class="layui-form-label">参数类型：</label>
                                            <div class="layui-input-block">
                                                <select id="sel_dataType" name="dataType">
                                                    <option value=""></option>
                                                    <option value="text">文本</option>
                                                    <option value="number">数字</option>
                                                    <option value="date">日期</option>
                                                    <option value="listValue">枚举</option>
                                                    <option value="refer">参照</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true" id="referTo" style="display:none">
                                            <label class="layui-form-label">参照档案：</label>
                                            <div class="layui-input-block">
                                                <select id="sel_referTo" name="referTo">
                                                    <option value=""></option>
                                                    <option value="department">部门</option>
                                                    <option value="warehouse">仓库</option>
                                                    <option value="vendor">供应商</option>
                                                    <option value="inventory">物资</option>
                                                    <option value="inventoryClass">物资分类</option>
                                                    <option value="budgetItem">预算项目</option>
                                                    <option value="assetClass">资产类别</option>
                                                    <option value="accountScheme">核算方案</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true" id="referParam" style="display:none">
                                            <label class="layui-form-label">参照参数：</label>
                                            <div class="layui-input-block">
                                                <textarea type="text" id="txt_referParam" name="referParam"></textarea>
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true" id="listValue" style="display:none">
                                            <label class="layui-form-label">枚举列表：</label>
                                            <div class="layui-input-block">
                                                <table style="width:100%;" cellspacing="0" cellpadding="0">
                                                    <colgroup>
                                                        <col width="*">
                                                        <col width="24px">
                                                    </colgroup>
                                                    <tr>
                                                        <td><select id="sel_listValue"></select></td>
                                                        <td align="right"><a href="javascript:void(0)" id="btn_editListValue"><i class="fa fa-edit blue" style="font-size:18px"></i></a></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        
                                        <div class="layui-col-md12" isInput="true" isRequired="true" id="dateFilter" style="display:none">
                                            <label class="layui-form-label">日期格式：</label>
                                            <div class="layui-input-block">
                                                <textarea type="text" id="txt_dateFilter" name="dateFilter"></textarea>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div title="自定义脚本">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:true,border:false">
                                <textarea class="layui-textarea" id="txt_reportScript" style="font-size:14px;height:100% !important;border-width:0px !important;"></textarea>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:none;widht:100%;height:100%" id="listValueBlock">
        <table id="listValueGrid" ></table>
    </div>
</body>
</html>
