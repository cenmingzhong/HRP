<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE">
    <% 
        String currentPath = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/")) ;
        String contextPath = request.getContextPath()=="/"?"":request.getContextPath();
        String version = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    %>
    <link rel="shortcut icon" type="image/ico" href="<%=contextPath %>/images/favicon.ico" />
    
    <script type="text/javascript">
        var contextPath = '<%=contextPath %>';
    </script>
    
    <style type="text/css">
    #loading-mask{
        background-color:white;
        height:100%;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        z-index:20000;
    }
    #loading{
        height:auto;
        position:fixed;
        left:50%;
        top:45%;
        padding:2px;
        z-index:20001;
        margin-left: -16px;
        margin-top: -20px;  
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
        margin:0;
        padding:3px;
        border:1px #cccccc solid;
        background:#F5FCE5;
        text-align:center;
    }
    #loading-msg {
        font-size: 12px;
        font-weight:normal;
    }
    .layui-table tbody tr:hover, .layui-table thead tr, .layui-table-click, .layui-table-header, .layui-table-hover, .layui-table-mend, .layui-table-patch, .layui-table-tool, .layui-table[lay-even] tr:nth-child(even) {
	    background-color: transparent;
	}
    </style>
    <div id="loading-mask" style="display:none"></div>
    <div id="loading" style="display:none">
        <div class="loading-indicator">
            <img src="<%=contextPath %>/images/progress.gif" width="20" height="20"/>
        </div>
    </div>
    <div id="messageBox" style="display:none;border:1px #eee solid;height:30px;position:fixed;top:45%;z-index:20002;left:50%;background:url(<%=contextPath %>/images/ok.png) #f7f7f7 no-repeat;padding-left:30px;padding-right:10px;background-position:5px center;border-radius: 5px 5px 5px 5px;-webkit-border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px;filter:alpha(opacity=100);-moz-opacity:1;opacity:1;margin-left: -48px;">
        <table style="height:30px">
            <tr>
                <td><div>操作成功</div></td>
            </tr>
        </table>
    </div>
    <link rel="stylesheet" href="<%=contextPath %>/css/style.css?t=<%=version %>" media="all" />
    <link rel="stylesheet" href="<%=contextPath %>/css/fontawesome-4.2.0_ie7/css/font-awesome.css" media="all" />
    <link rel="stylesheet" href="<%=contextPath %>/js/layui/css/layui.css?t=<%=version %>" media="all" />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/js/jquery-easyui-1.5.1/themes/gray/easyui.css?t=<%=version %>' />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/js/jquery-easyui-1.5.1/themes/icon.css' />
    <link rel="stylesheet"  type="text/css"  href='<%=contextPath %>/js/zTree_v3/css/zTreeStyle/zTreeStyle.css' />
    
    <script type="text/javascript" src="<%=contextPath %>/js/zDialog/zDrag.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/zDialog/zDialog.js?t=<%=version %>"></script>
    
    <script type="text/javascript" src='<%=contextPath %>/js/jquery-1.11.0.min.js' ></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-easyui-1.5.1/jquery.easyui.min.js?t=<%=version %>"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-easyui-1.5.1/easyui-extension.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-easyui-1.5.1/extension/jquery-easyui-datagridview/datagrid-scrollview.js"></script>
    
    <script type="text/javascript" src="<%=contextPath %>/js/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/zTree_v3/js/jquery.ztree.excheck-3.5.min.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery.validate/jquery.validate.js"></script>
    
    <script type="text/javascript" src="<%=contextPath %>/js/My97DatePicker/WdatePicker.js"></script>
    
    <link rel="stylesheet" type="text/css" href="<%=contextPath %>/js/jqgrid/ui.jqgrid.css?t=<%=version %>" />
    <script type="text/javascript" src="<%=contextPath %>/js/jqgrid/grid.locale-cn.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jqgrid/jquery.jqGrid.js?t=<%=version %>"></script>
    
    <script type="text/javascript" src="<%=contextPath %>/js/common.js?t=<%=version %>"></script>
    <script type="text/javascript" src='<%=contextPath %>/js/commonRefer.js?t=<%=version %>' ></script>
        <%-- <script type="text/javascript" src="<%=contextPath %>/js/commonPrint.js?t=<%=version %>"></script> --%>
    <script type="text/javascript" src="<%=contextPath %>/js/tab.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery.dropgrid.js?t=<%=version %>"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/jquery-ajaxfileupload.js"></script>
    <%-- <script type="text/javascript" src="<%=contextPath %>/js/commonRefer.js?t=<%=version %>"></script> --%>
    <script type="text/javascript" src="<%=contextPath %>/js/pinying.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/layui/layui.js"></script>
     <%-- <script type="text/javascript" src="<%=contextPath %>/js/LodopFuncs.js"></script> --%>
    <%-- <script type="text/javascript" src="<%=contextPath %>/js/layui/layui.all.js"></script> --%>

    <script src="<%=contextPath %>/js/chosen.jquery.min.js?t=<%=version %>" type="text/javascript"></script>
    <link rel="stylesheet" href="<%=contextPath %>/css/chosen.css?t=<%=version %>" />
    
    <script type="text/javascript">
        var isAjaxing = false;
        var isWindowLoad = true;
        var isLockScreen = true;
        window.onload = function () {
            window.setTimeout(function(){
                closeLocker(true);
            },10)    
            isWindowLoad = false;
            if(window.isCtrlOperAuth!=false){
                ctrlOperAuth();
            }
        }
        //处理键盘事件
        function cancelBackSpace(e) {
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement; //获取事件源
            var t = obj.type || obj.getAttribute('type'); //获取事件源类型
            if (ev.keyCode == 8) {
                if (t != "password" && t != "text" && t != "textarea") {
                    return false;
                }
                if (obj.readOnly == true || obj.disabled == true) {
                    return false;
                }
            }
    
        }
        var isHideList = [];
        
        function ctrlOperAuth(){
            var pathUrl = getCurrentLocation().substr(1) ;
            ajaxSubmit({
                url: contextPath + "/system/auth/operAuth/getCurUserOperAuthList.do",
                async:false,
                data: { 
                    pathUrl: pathUrl
                },
                success: function (result) {
                    if(result.isOk="Y"){
                        if(result.data.NoCtrl !="Y"){
                            var operationList = result.data.operationList;
                            if(operationList != null && operationList.length >0){
                                for(var i = 0 ; i < operationList.length ; i++){
                                    if(operationList[i].isAuth=="Y"){
                                        $("#tb").toolbar("hide", operationList[i].operCode)
                                        isHideList.push(operationList[i].operCode);
                                    }
                                }
                            }else{
                                $("#tb").height("26")
                            }
                        }
                    }
                }
            });
        }
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = cancelBackSpace;
        //禁止后退键  作用于IE、Chrome
        document.onkeydown = cancelBackSpace;
        
    </script>