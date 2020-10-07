<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>系统设置</title>
    <%@include file="/pages/common/include/include.jsp" %>
    <script type="text/javascript" src="<%=currentPath %>/sysOptionInfo.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    
    <div data-options="region:'center',iconCls:'icon-ok',border:false" style="padding:0px">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false">
            <!--系统界面  开始  -->
            <div title="系统界面" style="padding:10px;">
                <form id="sysForm">
                    <!-- <fieldset>
                        <legend>登录界面</legend>
                        <div>
                            <table>
                                <colgroup>
                                    <col width="90px" />
                                    <col width="320px" />
                                    <col width="300px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>界面标题：</td>
                                        <td><input type="text" style="width:300px;" id="txt_loginTitle" name="loginTitle"/></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>界面背景：</td>
                                        <td>
                                            <input type="hidden" id="txt_loginBgUrl" name="loginBgUrl"/>
                                            <img src="" style="height:166px;width:300px;" id="img_loginBg"/>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)" id="btn_uploadLoginBg">上传</a><br />(图片要求：分辨率为1024*566，格式为JPG)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
					-->
                    <fieldset>
                        <legend>主界面</legend>
                        <div>
                            <table>
                                <colgroup>
                                    <col width="90px" />
                                    <col width="320px" />
                                    <col width="300px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>界面标题：</td>
                                        <td><input type="text" style="width:300px;" id="txt_mainTitle" name="mainTitle"/></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>界面Logo：</td>
                                        <td>
                                            <input type="hidden" id="txt_mainLogoUrl" name="mainLogoUrl"/>
                                            <img src="" style="height:30px;width:300px;" id="img_mainLogo"/>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)" id="btn_uploadMainLogo">上传</a><br />(图片要求：分辨率为800*80，格式为JPG)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    <!--
                    <fieldset>
                        <legend>模块设置</legend>
                        <div>
                            <table>
                                <colgroup>
                                    <col width="90px" />
                                    <col width="320px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>是否启用供应商注册：</td>
                                        <td><input type="checkbox" value="Y" id="cb_isVenRegister" name="isVenRegister"/></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset> -->

                    <fieldset>
                        <legend>用户设置</legend>
                        <div>
                            <table>
                                <colgroup>
                                    <col width="150px" />
                                    <col width="320px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>新用户登录强制修改密码：</td>
                                        <td><input type="checkbox" value="Y" id="cb_isForcePassWord" name="isForcePassWord"/></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <div>
                            <table>
                                <colgroup>
                                    <col width="150px" />
                                    <col width="320px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>表格列自定义：</td>
                                        <td><input type="checkbox" value="Y" id="cb_gridColumnByUser" name="gridColumnByUser"/></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> -->
                    </fieldset>

                    <fieldset>
                        <legend>权限控制</legend>
                        <div>
                            <table>
                                <colgroup>
                                    <col width="150px" />
                                    <col width="320px" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>按钮权限控制：</td>
                                        <td><input type="checkbox" value="Y" id="checkbox1" name="isCtrlOperAuth"/></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                </form>
            </div>
            <!--系统界面  结束  -->
            <!--单据控制  开始  -->
            <!-- <div title="单据控制" style="padding:10px;">
                <form id="vouchForm">
                    <fieldset>
                        <legend>精度控制</legend>
                        <div>
                            <table>
                                <tr>
                                    <td>数量：</td>
                                    <td><input type="text" id="txt_QuantityPrecision" name="QuantityPrecision"/></td>
                                </tr>
                                <tr>
                                    <td>单价：</td>
                                    <td><input type="text" id="txt_PricePrecision" name="PricePrecision"/></td>
                                </tr>
                                <tr>
                                    <td>金额：</td>
                                    <td><input type="text" id="txt_AmountPrecision" name="AmountPrecision"/></td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>权限控制</legend>
                        <div>
                            <table>
                                <tr>
                                    <td><input type="checkbox" id="chk_CheckWhAuth" name="CheckWhAuth" value="Y"/>单据检查仓库权限</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="chk_CheckDeptAuth" name="CheckDeptAuth" value="Y"/>单据检查部门权限</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="chk_CheckPsnAuth" name="CheckPsnAuth" value="Y"/>单据检查人员权限</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="chk_CheckInvClsAuth" name="CheckInvClsAuth" value="Y"/>单据检查物资分类权限</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" id="chk_CheckInvAuth" name="CheckInvAuth" value="Y"/>单据检查物资权限</td>
                                </tr>
                            </table>
                        </div>
                    </fieldset>
                    <br />
                    <fieldset>
                         <legend>打印设置</legend>
                         <div>
                            <table>
                                <tr>
                                    <td>医院名称：<input type="text" id="txt_HospitalName" name="HospitalName"/></td>
                                </tr>
                               
                            </table>
                         </div>
                    </fieldset>
                </form>
            </div> -->
            <!--单据控制  结束  -->
        </div>
    </div>
</body>
</html>
