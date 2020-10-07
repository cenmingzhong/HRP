$(document).ready(function () {
    initToolBar();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "search",
            text: "查询",
            iconCls: "icon-search",
            handler: function () {
                searchClick()
            }
        }, {
            id: "exit",
            text: "退出",
            iconCls: "icon-exit",
            handler: function () {
                closeTab();
            }
        }]
    });
}
function searchClick(){
    if(!validateForm("infoTopForm")){
        return ;
    }
    document.getElementById("infoTopForm").submit();
//    var data = $("#infoTopForm").form2json();
//    
//    var paramList = [];
//    for(var key in data){
//        paramList.push("&"+key+"="+data[key]);
//    }
//    $("#reportPage").attr("src",contextPath+"/ReportServer?reportlet="+reportFile+paramList.join(""))
}