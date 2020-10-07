<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/optionInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>

    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:10px">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:true">
            <!--业务控制  开始  -->
            <div title="数据控制" style="padding:10px;">
                <form id="busForm">
                    <table style="width:100%">
                        <tr>
                            <td>
                                <fieldset>
                                    <legend><label>数据来源</label></legend>
                                    <div>
                                        <table style="width:100%">
                                            <colgroup>
                                                <col width="100px" />
                                                <col width="*" />
                                                <col width="100px" />
                                                <col width="*" />
                                            </colgroup>
                                            <tr>
                                                <td>组织档案：</td>
                                                <td>
                                                    <select id="sel_OrgFrom" name="orgFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_OrgFrom_Value" name="orgFrom_Value"/>
                                                </td>
                                                <td>部门档案：</td>
                                                <td>
                                                    <select id="sel_DeptFrom" name="deptFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_DeptFrom_Value" name="deptFrom_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>人员类别档案：</td>
                                                <td>
                                                    <select id="sel_PsnTypeFrom" name="psnTypeFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_PsnTypeFrom_Value" name="psnTypeFrom_Value"/>
                                                </td>
                                                <td>人员档案：</td>
                                                <td>
                                                    <select id="sel_PsnFrom" name="psnFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_PsnFrom_Value" name="psnFrom_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>仓库档案：</td>
                                                <td>
                                                    <select id="sel_WhFrom" name="whFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_WhFrom_Value" name="whFrom_Value"/>
                                                </td>
                                                <td>货位档案：</td>
                                                <td>
                                                    <select id="sel_PosFrom" name="posFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_PosFrom_Value" name="posFrom_Value"/>
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <td>计量单位档案：</td>
                                                <td>
                                                    <select id="sel_UnitFrom" name="unitFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_UnitFrom_Value" name="unitFrom_Value"/>
                                                </td>
                                                <td>存货分类档案：</td>
                                                <td>
                                                    <select id="sel_InvClsFrom" name="invClsFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_InvClsFrom_Value" name="invClsFrom_Value"/>
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <td>存货档案：</td>
                                                <td>
                                                    <select id="sel_InvFrom" name="invFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_InvFrom_Value" name="invFrom_Value"/>
                                                </td>
                                                <td></td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>供应商分类档案：</td>
                                                <td>
                                                    <select id="sel_VenClsFrom" name="venClsFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_VenClsFrom_Value" name="venClsFrom_Value"/>
                                                </td>
                                                <td>供应商档案：</td>
                                                <td>
                                                    <select id="sel_VenFrom" name="venFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_VenFrom_Value" name="venFrom_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>资产分类档案：</td>
                                                <td>
                                                    <select id="sel_AssetClassFrom" name="assetClassFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_AssetClassFrom_Value" name="assetClassFrom_Value"/>
                                                </td>
                                                <td>资产档案：</td>
                                                <td>
                                                    <select id="sel_AssetFrom" name="assetFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_AssetFrom_Value" name="assetFrom_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>资产分组档案：</td>
                                                <td>
                                                    <select id="sel_AssetGroupFrom" name="assetGroupFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_AssetGroupFrom_Value" name="assetGroupFrom_Value"/>
                                                </td>
                                                 <td>资产状态档案：</td>
                                                <td>
                                                    <select id="sel_AssetStatusFrom" name="assetStatusFrom" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="AssetStatusFrom_Value" name="assetStatusFrom_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>工资类别档案：</td>
                                                <td>
                                                    <select id="sel_GzGrade" name="gzGrade" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_GzGrade_Value" name="gzGrade_Value"/>
                                                </td>
                                                <td>工资类别档案：</td>
                                                <td>
                                                    <select id="sel_GzTableSet" name="gzTableSet" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_GzTableSet_Value" name="gzTableSet_Value"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>工资类别项目：</td>
                                                <td>
                                                    <select id="sel_GzItem" name="gzItem" style="width:80px">
                                                        <option value="Local">本系统</option>
                                                        <option value="U8">U8</option>
                                                        <option value="Other">其他</option>
                                                    </select>
                                                    <input type="text" id="txt_GzItem_Value" name="gzItem_Value"/>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </div>
                                </fieldset>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <fieldset>
                                    <legend><label>业务控制</label></legend>
                                    <div>
                                        <table style="width:100%">
                                            <colgroup>
                                                <col width="100px" />
                                                <col width="*" />
                                            </colgroup>
                                            <tr>
                                                <td>同步物资档案：</td>
                                                <td>
                                                    <input type="checkbox" id="txt_SyncInv" name="syncInv" value="Y"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>同步药品档案：</td>
                                                <td>
                                                    <input type="checkbox" id="txt_SyncDrug" name="syncDrug" value="Y"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>同步仓库档案：</td>
                                                <td>
                                                    <input type="checkbox" id="txt_SyncWh" name="syncWh" value="Y"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>静态盘点：</td>
                                                <td>
                                                    <input type="checkbox" id="txt_IsLockWh" name="isLockWh" value="Y"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>物资编码序号位：</td>
                                                <td>
                                                    <input type="text" id="txt_InvCodeSeqLen" name="invCodeSeqLen" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>药品编码序号位：</td>
                                                <td>
                                                    <input type="text" id="txt_DrugCodeSeqLen" name="drugCodeSeqLen" />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </fieldset>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <!--业务控制  结束  -->

            <!--系统初始化 开始-->
            <div title="系统初始化" style="padding:10px;">
                <form id="initForm">
                    <fieldset>
                        <legend><label>清空数据</label></legend>
                        <table>
                            <colgroup>
                                <col width="200px"/>
                                <col width="200px"/>
                            </colgroup>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="BM" />预算模块</label></td>
                                <td><label><input type="checkbox" name="keyType" value="DB" />基础档案</label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="DMS" />采购平台</label></td>
                                <td><label><input type="checkbox" name="keyType" value="FA" />固定资产模块</label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="NE" />网上报销模块</label></td>
                                <td><label><input type="checkbox" name="keyType" value="RD" />物资管理模块</label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="RPT" />报表模块</label></td>
                                <td><label><input type="checkbox" name="keyType" value="SR" />科研管理模块</label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="SYS" />系统管理模块</label></td>
                                <td><label><input type="checkbox" name="keyType" value="WA" />薪资管理模块</label></td>
                            </tr>
                            <tr>
                                <td><label><input type="checkbox" name="keyType" value="XDB" />消毒包管理模块</label></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td >
                                    <input type="button" id="btn_ClearData" value="清空数据" style="width:80px"/>
                                </td>
                                <td >
                                    <input type="button" id="btn_Set" value="重置选择" style="width:80px"/>
                                </td>
                            </tr>
                        </table>
                    </fieldset>
                </form>
            </div>
            <!--系统初始化 结束-->
        </div>
    </div>
</body>
</html>