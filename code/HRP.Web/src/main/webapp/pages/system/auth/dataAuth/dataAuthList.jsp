<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>数据权限设置</title>
	<%@include file="/pages/common/include/include.jsp" %>
	<script type="text/javascript" src="<%=currentPath %>/dataAuthList.js?t=<%=version %>"></script>
</head>
<body class="easyui-layout">   
    <div data-options="region:'north',split:false,border:false" style="height:31px;">
        <div id="tb"></div>
    </div>
    
    <div data-options="region:'west',split:true,border:true" style="width:200px;border-width:0px 1px 0px 0px;">
        <ul id="authTree" class="ztree"></ul>
    </div>
    <div data-options="region:'center',split:true,border:true"  style="border-width:0px 0px 0px 1px;">
        <div class="easyui-tabs" data-options="fit:true,plain:true,border:false" id="tabs"  style="border-width:0px 0px 0px 0px;">
             <div title="角色">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbRole"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="roleGrid"></div>
                    </div>
                </div>
            </div>
            <!-- <div title="组织机构">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbOrg"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="orgGrid"></div>
                    </div>
                </div>
            </div>
            <div title="仓库">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbWh"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="whGrid"></div>
                    </div>
                </div>
            </div>
            <div title="部门">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbDept"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="deptGrid"></div>
                    </div>
                </div>
            </div>
            <div title="人员">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbPsn"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="psnGrid"></div>
                    </div>
                </div>
            </div>
            <div title="物资分类" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbInvCls"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="invClsGrid"></div>
                    </div>
                </div>
            </div>
            <div title="物资" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbInv"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="invGrid"></div>
                    </div>
                </div>
            </div>
            <div title="药品分类">
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbDrugCls"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="drugClsGrid"></div>
                    </div>
                </div>
            </div>
            <div title="药品" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbDrug"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="drugGrid"></div>
                    </div>
                </div>
            </div>
            <div title="资产组" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbAssetGroup"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="assetGroupGrid"></div>
                    </div>
                </div>
            </div>
            <div title="资产类别" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbAssetCls"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="assetClsGrid"></div>
                    </div>
                </div>
            </div>
            <div title="管理部门" >
                <div class="easyui-layout" data-options="fit:true,plain:true" >
                    <div data-options="region:'north',split:false,border:false" style="height:31px;">
                        <div id="tbManageDept"></div>
                    </div>
                    <div  data-options="region:'center',iconCls:'icon-ok',border:false" >
                        <div id="manageDeptGrid"></div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <div id="filterBlock" style="display:none">
        <form id="infoForm">
            <table >
                <tr>
                    <td>查询名称：</td>
                    <td><input type="text" id="txt_SysUserName" name="SysUserName" /></td>
                </tr>
            </table>
        </form>
    </div>
</body>
</html>
