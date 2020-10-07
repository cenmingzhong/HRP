<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>未命名</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/codeFormatList.js?t=<%=version %>"></script>
	<style>
        .fieldBlock{
            border-top: 1px #ccc solid; 
            border-left: 0px #ccc solid; 
            border-right: 0px #ccc solid; 
            border-bottom: 0px #ccc solid; 
            padding:0px 0px 0px 0px;
            margin:0px 10px 0px 10px;
        }
        .fieldBlock legend{
            padding:0px;
            margin-left:12px;
            font-weight:bold;
            color:blue;
        }
    </style>
</head>
<body class="easyui-layout">
    <!-- <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px;padding: 0px">
        <ul id="vouchList" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width: 0px 0px 0px 1px;padding:10px 16px">
        <div style="border:1px #ccc solid;padding:10px;">
            <form id="infoForm">
                <table>
                    <colgroup>
                        <col width="80px">
                        <col width="150px">
                        <col width="40px">
                        <col width="50px">
                        <col width="80px">
                    </colgroup>
                    <tr>
                        <td align="right">编码方式：</td>
                        <td>
                            <select id="sel_CodeMode">
                                <option value="1">自动编号</option>
                                <option value="0">手动编号</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">前缀一：</td>
                        <td >
                            <select id="sel_codePre1" name="codePre1" idx="1"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                        <td ><input type="checkbox" name="isAccording1"  value="1"/>流水依据</td>
                    </tr>
                    <tr>
                        <td align="right">前缀二：</td>
                        <td >
                            <select id="sel_codePre2" name="codePre2" idx="2"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                        <td><input type="checkbox" name="isAccording2" value="1"/>流水依据</td>
                    </tr>
                    <tr>
                        <td align="right">前缀三：</td>
                        <td >
                            <select id="sel_codePre3" name="codePre3" idx="3"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                        <td><input type="checkbox"  name="isAccording3" value="1"/>流水依据</td>
                    </tr>
                    <tr>
                        <td align="right">流水号长度：</td>
                        <td >
                            <input type="text" name="snLen"/>
                        </td>
                        <td>起始值</td>
                        <td><input type="text" style="width:40px" name="snStart"/></td>
                        <td><input type="checkbox" name="isEdit" value="1"/>编码可改</td>
                    </tr>
                    <tr>
                        <td align="right">分隔符:</td>
                        <td>
                            <select id="sel_codeSep" name="codeSep">
                                <option value="">无</option>
                                <option value="-">-</option>
                                <option value=".">.</option>
                            </select>
                        </td>
                        <td colspan="2">断号补号</td>
                        <td><input type="checkbox"  name="is" value="1"/></td>
                    </tr>
                </table>
            </form>
        </div>
    </div> -->
    
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    <div data-options="region:'west',split:true,border:true" style="width: 260px; border-width: 0px 1px 0px 0px;padding: 0px">
        <ul id="vouchList" class="ztree"></ul>
    </div>
    <div data-options="region:'center',iconCls:'icon-ok',border:true" style="border-width: 0px 0px 0px 1px;padding:10px 16px">
        <div style="border:1px #ccc solid;padding:10px;">
            <form id="infoForm">
                <table>
                    <colgroup>
                        <col width="80px">
                        <col width="120px">
                        <col width="60px">
                        <col width="80px">
                    </colgroup>
                    <tr>
                        <td align="right">编码方式：</td>
                        <td>
                            <select id="sel_CodeMode">
                                <option value="1">自动编号</option>
                                <option value="0">手动编号</option>
                            </select>
                        </td>
                        <td>断号补号</td>
                        <td><input type="checkbox"  name="isFill" value="1"/></td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <fieldset class="fieldBlock">
                                <legend>前缀</legend>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">前缀一：</td>
                        <td >
                            <select id="sel_codePre1" name="codePre1" idx="1"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">前缀二：</td>
                        <td >
                            <select id="sel_codePre2" name="codePre2" idx="2"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">前缀三：</td>
                        <td >
                            <select id="sel_codePre3" name="codePre3" idx="3"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">分隔符:</td>
                        <td>
                            <select id="sel_codeSep" name="codeSep">
                                <option value="">无</option>
                                <option value="-">-</option>
                                <option value=".">.</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <fieldset class="fieldBlock">
                                <legend>流水依据</legend>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">依据一：</td>
                        <td >
                            <select id="sel_according1" name="according1" idx="1"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">依据二：</td>
                        <td >
                            <select id="sel_according2" name="according2" idx="2"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">依据三：</td>
                        <td >
                            <select id="sel_according3" name="according3" idx="3"></select>
                        </td>
                        <td name="codeContext" colspan="2"></td>
                    </tr>
                    <tr>
                        <td align="right">流水号长度：</td>
                        <td >
                            <input type="text" name="snLen"/>
                        </td>
                    </tr>
	            </table>
	        </form>
        </div>
    </div>
</body>
</html>
