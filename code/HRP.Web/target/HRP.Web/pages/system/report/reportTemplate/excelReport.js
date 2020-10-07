$(document).ready(function () {
	searchClick();
});

function searchClick(){
    if(!validateForm("infoTopForm")){
        return ;
    }
    document.getElementById("infoTopForm").submit();
}