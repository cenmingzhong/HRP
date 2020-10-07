var internal_msg=5*60*1000;
//页面初始化
$(document).ready(function () {
    initPage();
});

function initPage(){
    $(".oftenAdd").bind("click",function(){
        addOftenClick()
    });
    $(".oftenfun li").bind("click",function(){
        var url = $(this).attr("url");
        var title = $("a div",this).text();
        if(url != null && !isNullorEmpty(title)){
            openTab({
                url:url,
                title:title
            });
        }
    });
    calculateWidth();
    window.onresize = function(){
        window.setTimeout(function(){
            calculateWidth();
        },100)
    }
    //loadNoticeList();
}

function calculateWidth(){
    var allWidth = ($("body").width()-10)*0.99-3;
    var width = allWidth/3;
    if(width<400){
        width = allWidth/2;
    }
    if(width<400){
        width = allWidth;
    }
    $(".widget-user").height($("body").height()-$(".oftenfun").height()-30-40)
    //$(".widget-column").width(width)
}

function addOftenClick(){
    openDialog({
        url:contextPath+"/system/menuFavorite/toList.do",
        dialogHeight:450,
        dialogWidth:600,
        dialogCallBack:function(returnVal){
            if(returnVal){
                location.reload(); 
            }
        }
    });
}


function openVouch(vouchUrl,title){
    openTab({
       url:contextPath+vouchUrl,
       title:title,
       tabCallBack:function(){
           loadMessgeRemindList(true)
       }
    })
}

function loadNoticeList(){
	ajaxSubmit({
        url:contextPath+"/system/sysNotice/getTopNoticeList.do",
        success: function (result) {
            if (result.isOk == "Y") {
                $("#noticeBlock").setTemplateElement("noticeTemplate");
                $("#noticeBlock").processTemplate(result.data.noticeList);
            }
        }
    })
}

