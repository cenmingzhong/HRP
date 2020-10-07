<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-colorpicker.js"></script>
	<script type="text/javascript" src="<%=currentPath %>/printTemplateList.js?t=<%=version %>"></script>
	<style>
        .panel-header
        {
            border-top-width: 0px !important
        }
    </style>
</head>

<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',border:true,split:true,collapsible:true,tools:'#tt'" style="width: 200px;;border-width:0px 1px 0px 0px">
        <ul id="templateList" class="ztree">
        </ul>
    </div>
            
    <div data-options="region:'center',border:true" style="width:300px;border-width:0px 0px 0px 1px" >
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false"style="height:31px;" >
                <div id="templateTb"></div>
            </div>
            <div data-options="region:'center',border:false" style="border-width:0px 0px 0px 0px;overflow:hidden" >
                <object id="LODOP2" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" style="width:100%;height:99%"> 
                    <param name="Caption" value="内嵌显示区域">
                    <param name="Border" value="0">
                    <param name="Color" value="#C0C0C0">
                    <embed id="LODOP_EM2" TYPE="application/x-print-lodop" style="width:100%;height:100%" PLUGINSPAGE="install_lodop.exe">
                </object> 
            </div>
        </div>
    </div>
    <div style="display:none" id="templateClassBlock">
        <form id="templateClassForm">
            <table>
                <tr>
                    <td>单据类型编号：</td>
                    <td><input type="text" name="templateClsCode" id="txt_templateClsCode" data-rule-required="true" data-msg-required="请输入单据类型编号"/></td>
                </tr>
                <tr>
                    <td>单据类型名称：</td>
                    <td><input type="text" name="templateClsName" id="txt_templateClsName" data-rule-required="true" data-msg-required="请输入单据类型名称"/></td>
                </tr>
                <tr>
                    <td>数据源：</td>
                    <td>
                        <select id="sel_vouchTableId" name="vouchTableId" data-rule-required="true" data-msg-required="请选择数据源"></select>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div style="display:none" id="templateBlock">
        <form id="templateForm">
            <input type="hidden" name="templateClsCode" id="txt_tempClsCode"/>
            <input type="hidden" name="templateCode" id="txt_templateCode"/>
            <table>
                <tr>
                    <td>模板名称：</td>
                    <td><input type="text" name="templateName" id="txt_templateName"/></td>
                </tr>
                <tr>
                    <td>是否默认：</td>
                    <td>
                       <label><input type="radio" name="isDefault" id="rd_isDefault_Y" value="true"/>是</label>
                       <label><input type="radio" name="isDefault" id="rd_isDefault_N" value="false"/>否</label>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div style="display:none" id="copyTemplateBlock">
        <form id="copyTemplateForm">
            <input type="hidden" name="templateClsCode" id="txt_copyTempClsCode"/>
            <input type="hidden" name="templateCode" id="txt_copyTemplateCode"/>
            <table>
                <tr>
                    <td>单据类型：</td>
                    <td>
                        <select id="sel_templateCls" name="templateClsCode" data-rule-required="true" data-msg-required="请选择单据类型"></select>
                    </td>
                </tr>
                <tr>
                    <td>模板名称：</td>
                    <td><input type="text" name="templateName" id="txt_copyTemplateName"/></td>
                </tr>
                <tr>
                    <td>是否默认：</td>
                    <td>
                       <label><input type="radio" name="IsDefault" id="rd_copyIsDefault_Y" value="true"/>是</label>
                       <label><input type="radio" name="IsDefault" id="rd_copyIsDefault_N" value="false"/>否</label>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    
    <div style="display:none" id="pageSizeBlock">
        <form id="pageSizeForm">
            <table>
                <tr>
                    <td>宽度：</td>
                    <td>
                        <input type="text" name="pageWidth" id="txt_pageWidth" value="800" style="width:80px"/>
                    </td>
                    <td>
                        <select id="sel_pageWidthUnit" name="pageWidthUnit" style="width:40px">
                            <option>px</option>
                            <option>mm</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>高度：</td>
                    <td>
                        <input type="text" name="pageHeight" id="txt_pageHeight" value="25" style="width:80px"/> 
                    </td>
                    <td>
                        <select id="sel_pageHeightUnit" name="pageHeightUnit" style="width:40px">
                            <option>px</option>
                            <option>mm</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
    </div>

    <div style="display:none" id="pageBlock">
        <form id="pageForm">
            <table>
                <tr>
                    <td>宽度：</td>
                    <td><input type="text" name="pageNumWidth" id="txt_pageNumWidth" value="150"/></td>
                </tr>
                <tr>
                    <td>高度：</td>
                    <td><input type="text" name="pageNumHeight" id="txt_pageNumHeight" value="25"/></td>
                </tr>
                <tr>
                    <td>标题：</td>
                    <td><input type="text" name="pageTitle" id="txt_pageTitle" value="总页数："/></td>
                </tr>
                <tr>
                    <td>样式：</td>
                    <td>
                        <label><input type="radio" name="pageStyle" id="rd_pageStyle_1" value="<span tdata='pageNo'>第###页</span>/<span tdata='pageCount' style='text-align:right'>共###页</span>" checked="checked"/>第1页/共10页</label>
                        <label><input type="radio" name="pageStyle" id="rd_pageStyle_2" value="<span tdata='pageNo'>###</span>/<span tdata='pageCount'>###</span>"/>1/10</label>
                    </td>
                </tr>
                <tr>
                    <td>字体颜色：</td>
                    <td><input type="text" name="pageNumColor" id="txt_pageNumColor" value="#000000" /></td>
                </tr>
                <tr>
                    <td>字体大小：</td>
                    <td><input type="text" name="pageNumSize" id="txt_pageNumSize" value="12"/>px</td>
                </tr>
                <tr>
                    <td>页数样式：</td>
                    <td>
                        <label><input type="radio" name="pageNumStyle" id="rd_pageNumStyle_1" value="ChineseNum"/>中文</label>
                        <label><input type="radio" name="pageNumStyle" id="rd_pageNumStyle_2" value="Num" checked="checked"/>数字</label>
                    </td>
                </tr>
            </table>
        </form>
    </div>


</body>
</html>
