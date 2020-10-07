var data = [];
var userCode = "";
//页面初始化
$(document).ready(function () {
	initToolBar();
	initGrid();
});

//初始化工具栏
function initToolBar() {
    $("#tb").toolbar({
        items: [{
            id: "exit",
            text: "<b style='font-size:14px'>退出</b>",
            iconCls: "icon-exit",
            handler: function () {
                closeTab();
            }
        }]
    });
}

function initGrid(){
	var id = getURLParameter("id");
	ajaxSubmit({
        url: "getOne.do",
        data : {
        	id:id
        },
        success: function (result) {
            if (result.isOk == "Y") {
            	$("#emb").attr("src",result.data.userFile.fileUrl);
            }
        }
    })
    
}

