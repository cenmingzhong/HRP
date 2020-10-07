/**
* zDialog 2.0
* 最后修正：2009-12-18
**/
var IMAGESPATH = contextPath + '/js/zDialog/images/skins/blue2/';  //图片路径配置
//var IMAGESPATH = 'http://www.5-studio.com/wp-content/uploads/2009/11/'; //图片路径配置
/*************************一些公用方法和属性****************************/
var isIE = navigator.userAgent.indexOf('MSIE') != -1;
var isIE6 = navigator.userAgent.indexOf('MSIE 6.0') != -1;
var isIE8 = !!window.XDomainRequest && !!document.documentMode;
var isShowBgIframe = false;
if (isIE)
    try { document.execCommand('BackgroundImageCache', false, true); } catch (e) { }

var $id = function (id) {
    return typeof id == "string" ? document.getElementById(id) : id;
};
//if (!$) var $ = $id;

Array.prototype.remove = function (s, dust) { //如果dust为ture，则返回被删除的元素
    if (dust) {
        var dustArr = [];
        for (var i = 0; i < this.length; i++) {
            if (s == this[i]) {
                dustArr.push(this.splice(i, 1)[0]);
            }
        }
        return dustArr;
    }
    for (var i = 0; i < this.length; i++) {
        if (s == this[i]) {
            this.splice(i, 1);
        }
    }
    return this;
}

var $topWindow = function () {
    var parentWin = window;
    while (parentWin != parentWin.parent) {
        if (parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0) break;
        parentWin = parentWin.parent;
    }
    return parentWin;
};
var $bodyDimensions = function (win) {
    win = win || window;
    var doc = win.document;
    var cw = doc.compatMode == "BackCompat" ? doc.body.clientWidth : doc.documentElement.clientWidth;
    var ch = doc.compatMode == "BackCompat" ? doc.body.clientHeight : doc.documentElement.clientHeight;
    var sl = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
    var st = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop); //考虑滚动的情况
    var sw = Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
    var sh = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight); //考虑滚动的情况
    var w = Math.max(sw, cw); //取scrollWidth和clientWidth中的最大值
    var h = Math.max(sh, ch); //IE下在页面内容很少时存在scrollHeight<clientHeight的情况
    return {
        "clientWidth": cw,
        "clientHeight": ch,
        "scrollLeft": sl,
        "scrollTop": st,
        "scrollWidth": sw,
        "scrollHeight": sh,
        "width": w,
        "height": h
    }
};

var fadeEffect = function (element, start, end, speed, callback) {//透明度渐变：start:开始透明度 0-100；end:结束透明度 0-100；speed:速度1-100
    if (!element.effect)
        element.effect = { fade: 0, move: 0, size: 0 };
    clearInterval(element.effect.fade);
    var speed = speed || 20;
    element.effect.fade = setInterval(function () {
        start = start < end ? Math.min(start + speed, end) : Math.max(start - speed, end);
        element.style.opacity = start / 100;
        element.style.filter = "alpha(opacity=" + start + ")";
        if (start == end) {
            clearInterval(element.effect.fade);
            if (callback)
                callback.call(element);
        }
    }, 20);
};

/*************************弹出框类实现****************************/
var topWin = $topWindow();
var topDoc = topWin.document;
var Dialog = function () {
    /****以下属性以大写开始，可以在调用show()方法前设置值****/
    this.ID = null;
    this.Width = null;
    this.Height = null;
    this.URL = null;
    this.OnLoad = null;
    this.InnerHtml = ""
    this.InvokeElementId = ""
    this.Top = "50%";
    this.Left = "50%";
    this.Title = "";
    this.OKEvent = null; //点击确定后调用的方法
    this.CancelEvent = null; //点击取消及关闭后调用的方法
    this.ShowButtonRow = false;
    this.MessageIcon = "window.gif";
    this.MessageTitle = "";
    this.Message = "";
    this.ShowMessageRow = false;
    this.Modal = true;
    this.Drag = true;
    this.AutoClose = null;
    this.ShowCloseButton = true;
    this.Animator = false;
    /****以下属性以小写开始，不要自行改变****/
    this.dialogDiv = null;
    this.bgDiv = null;
    this.parentWindow = null;
    this.innerFrame = null;
    this.innerWin = null;
    this.innerDoc = null;
    this.zindex = 900;
    this.cancelButton = null;
    this.okButton = null;
    this.ShowTop = true;

    if (!this.ID)
        this.ID = new Date().getTime();

};
Dialog._Array = [];
Dialog.bgDiv = null;
Dialog.setOptions = function (obj, optionsObj) {
    if (!optionsObj) return;
    for (var optionName in optionsObj) {
        obj[optionName] = optionsObj[optionName];
    }
};
Dialog.attachBehaviors = function () {
    if (isIE) {
        document.attachEvent("onkeydown", Dialog.onKeyDown);
        window.attachEvent('onresize', Dialog.resetPosition);
    } else {
        document.addEventListener("keydown", Dialog.onKeyDown, false);
        window.addEventListener('resize', Dialog.resetPosition, false);
    }
};

Dialog.prototype.getWindow = function () {
    var topWin = $topWindow();
    if (!this.ShowTop) {
        topWin = window;
    }
    return topWin;
};

Dialog.prototype.attachBehaviors = function () {
    if (this.Drag && this.getWindow().Drag) this.getWindow().Drag.init(this.getWindow().$id("_Draghandle_" + this.ID), this.getWindow().$id("_DialogDiv_" + this.ID)); //注册拖拽方法
    if (!isIE && this.URL) { //非ie浏览器下在拖拽时用一个层遮住iframe，以免光标移入iframe失去拖拽响应
        var self = this;
        var topWin = this.getWindow();
        this.getWindow().$id("_DialogDiv_" + this.ID).onDragStart = function () {
            topWin.$id("_Covering_" + self.ID).style.display = ""
        }
        this.getWindow().$id("_DialogDiv_" + this.ID).onDragEnd = function () {
            topWin.$id("_Covering_" + self.ID).style.display = "none"
        }
    }
};
Dialog.prototype.displacePath = function () {
    if (this.URL.substr(0, 7) == "http://" || this.URL.substr(0, 1) == "/" || this.URL.substr(0, 11) == "javascript:") {
        return this.URL;
    } else {
        var thisPath = this.URL;
        var locationPath = window.location.href;
        locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
        while (thisPath.indexOf('../') >= 0) {
            thisPath = thisPath.substring(3);
            locationPath = locationPath.substring(0, locationPath.lastIndexOf('/'));
        }
        return locationPath + '/' + thisPath;
    }
};
Dialog.prototype.setPosition = function () {
    var bd = $bodyDimensions(this.getWindow());
    var thisTop = this.Top,
        thisLeft = this.Left,
        thisdialogDiv = this.getDialogDiv();
    if (typeof this.Top == "string" && this.Top.substring(this.Top.length - 1, this.Top.length) == "%") {
        var percentT = this.Top.substring(0, this.Top.length - 1) * 0.01;
        thisTop = bd.clientHeight * percentT - thisdialogDiv.scrollHeight * percentT + bd.scrollTop;
    }
    if (typeof this.Left == "string" && this.Left.substring(this.Left.length - 1, this.Left.length) == "%") {
        var percentL = this.Left.substring(0, this.Left.length - 1) * 0.01;
        thisLeft = bd.clientWidth * percentL - thisdialogDiv.scrollWidth * percentL + bd.scrollLeft;
    }
    thisdialogDiv.style.top = Math.round(thisTop) + "px";
    thisdialogDiv.style.left = Math.round(thisLeft) + "px";
};
Dialog.setBgDivSize = function (topWin) {
    var bd = $bodyDimensions(topWin);
    if (Dialog.bgDiv) {
        if (isIE6) {
            Dialog.bgDiv.style.height = bd.clientHeight + "px";
            Dialog.bgDiv.style.top = bd.scrollTop + "px";
            Dialog.bgDiv.childNodes[0].style.display = "none"; //让div重渲染,修正IE6下尺寸bug
            Dialog.bgDiv.childNodes[0].style.display = "";
        } else {
            Dialog.bgDiv.style.height = bd.scrollHeight + "px";
        }
    }
};
Dialog.resetPosition = function (topWin) {
    if (typeof Dialog != "undefined") {
        Dialog.setBgDivSize(topWin);
        for (var i = 0, len = this.getWindow().Dialog._Array.length; i < len; i++) {
            topWin.Dialog._Array[i].setPosition();
        }
    }
};
Dialog.prototype.create = function () {
    var bd = $bodyDimensions(this.getWindow());
    if (typeof (this.OKEvent) == "function") this.ShowButtonRow = true;
    if (!this.Width) this.Width = Math.round(bd.clientWidth * 4 / 10);
    if (!this.Height) this.Height = Math.round(this.Width / 2);
    if (this.MessageTitle || this.Message) this.ShowMessageRow = true;
    var DialogDivWidth = this.Width + 8 + 8;
    var DialogDivHeight = this.Height + 27 + 8 + (this.ShowButtonRow ? 40 : 0) + (this.ShowMessageRow ? 50 : 0);

    if (DialogDivWidth > bd.clientWidth) this.Width = Math.round(bd.clientWidth - 16);
    if (DialogDivHeight > bd.clientHeight) this.Height = Math.round(bd.clientHeight - 35 - (this.ShowButtonRow ? 40 : 0) - (this.ShowMessageRow ? 50 : 0));

    var html = '\
        <div id="_DialogTable_' + this.ID + '" style="width:'+(this.Width)+'px;height:'+(this.Height+35)+'px;background-color: #E1E1E1;box-shadow: 1px 1px 50px rgba(0,0,0,.3);">\
            <div id="_Draghandle_' + this.ID + '" style="' + (this.Drag ? "cursor: move;" : "") + ';height:32px;border-bottom:1px #ddd solid;">\
                <div style="padding: 6px 0 0 6px; float: left; color:#0E2D5F;"><img id="_DialogIcon_' + this.ID + '" align="absmiddle" src="' + IMAGESPATH + 'loading.gif;" style="width:15px;height:15px"/><span id="_Title_' + this.ID + '" style="padding:1px 0px 0px 3px">' + this.Title + '</span></div>\
                <div id="_ButtonClose_' + this.ID + '" onmouseout="this.style.backgroundImage=\'url(' + IMAGESPATH + 'dialog_closebtn.png)\'" onmouseover="this.style.backgroundImage=\'url(' + IMAGESPATH + 'dialog_closebtn_over.png)\'" style="margin-top:3px;margin-right:5px; position: relative; cursor: pointer; float: right; height:26px; width: 26px;background-position:center center; background-image: url(' + IMAGESPATH + 'dialog_closebtn.png);' + (this.ShowCloseButton ? "" : "display:none;") + '"></div>\
                <div id="_ButtonMax_' + this.ID + '" style="margin-top:3px;margin-right:5px; position: relative; cursor: pointer; float: right; height:26px; width: 26px;background-position:center center; background-repeat:no-repeat;background-image: url(' + IMAGESPATH + 'dialog_max.png);' + (this.ShowMaxButton ? "" : "display:none;") + '"></div>\
            </div>\
            <div id="_Container_' + this.ID + '" style="background:#ffffff;position: relative; width: ' + this.Width + 'px; height: ' + (this.Height+2) + 'px;text-align:left;overflow:auto;padding:0px">\
            <div style="position: absolute; height: 100%; width: 100%; display: none; background-color:#fff; opacity: 0.5;" id="_Covering_' + this.ID + '">&nbsp;</div>\
            ' + (function (obj) {
                if (obj.InnerHtml) return obj.InnerHtml;
                if (obj.URL) return '<iframe frameborder="0" style="border:none 0;width:100%;height:100%;display: block;margin:0px;padding:0px;" allowtransparency="true" id="_DialogFrame_' + obj.ID + '" src="' + obj.displacePath() + '"></iframe>';
                return "";
            })(this) + '\
            </div>\
            <div id="_ButtonRow_' + this.ID + '" style="' + (this.ShowButtonRow ? "" : "display:none") + '">\
            <div id="_DialogButtons_' + this.ID + '" style="border: 1px solid #95B8E7;border-width:0px; padding: 4px 10px; text-align: right; background-color:#f6f6f6;">\
                <input type="button" class="layui-btn layui-btn-mini" value="确 定" id="_ButtonOK_' + this.ID + '" style="margin:0px 10px;width:55px"/>\
                <input type="button" class="layui-btn layui-btn-warm layui-btn-mini" value="取 消" id="_ButtonCancel_' + this.ID + '" style="margin: 0px 10px;width:55px"/>\
              </div>\
          </div>\
        </div>\
    '
    var div = this.getWindow().$id("_DialogDiv_" + this.ID);

    if (!div) {
        div = this.getWindow().document.createElement("div");
        div.id = "_DialogDiv_" + this.ID;
        div.style.border = "1px #ccc solid";
        this.getWindow().document.getElementsByTagName("BODY")[0].appendChild(div);
    }
    div.style.position = "absolute";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    div.innerHTML = html;
    if (this.InvokeElementId) {
        var element = $id(this.InvokeElementId);
        element.style.position = "";
        element.style.display = "";

        if (!this.ShowTop) {
            this.getWindow().$id("_Covering_" + this.ID).parentNode.appendChild(element)
        } else {
            if (isIE) {
                var fragment = this.getWindow().document.createElement("div");
                fragment.innerHTML = element.outerHTML;
                element.outerHTML = "";
                this.getWindow().$id("_Covering_" + this.ID).parentNode.appendChild(fragment)
            } else {
                this.getWindow().$id("_Covering_" + this.ID).parentNode.appendChild(element)
            }
        }
    }
    this.parentWindow = window;
    if (this.URL) {
        if (this.getWindow().$id("_DialogFrame_" + this.ID)) {
            this.innerFrame = this.getWindow().$id("_DialogFrame_" + this.ID);
        };
        var self = this;
        innerFrameOnload = function () {
            try {
                self.innerWin = self.innerFrame.contentWindow;
                self.innerWin.parentDialog = self;
                self.innerDoc = self.innerWin.document;
                if (!self.Title && self.innerDoc && self.innerDoc.title) {
                    if (self.innerDoc.title) self.getWindow().$id("_Title_" + self.ID).innerHTML = self.innerDoc.title;
                }
                if(self.getWindow().$id("_DialogIcon_" + self.ID)){
                    self.getWindow().$id("_DialogIcon_" + self.ID).src = IMAGESPATH+"icon_dialog.gif";
                }
            } catch (e) {
                if (console && console.log) console.log(e)
            }
            if (typeof (self.OnLoad) == "function") self.OnLoad();
            self.innerWin.document.body.focus();
        };
        if (this.innerFrame.attachEvent) {
            this.innerFrame.attachEvent("onload", innerFrameOnload);
        } else {
            this.innerFrame.onload = innerFrameOnload;
        };
    }else{
        if(this.getWindow().$id("_DialogIcon_" + this.ID)){
            this.getWindow().$id("_DialogIcon_" + this.ID).src = IMAGESPATH+"icon_dialog.gif";
        }
        var thisWin =this.getWindow();
//        window.setTimeout(function(){
//            var inputs = $("input[type='text']",thisWin.$id("_Container_" + this.ID));
//            if(inputs.length>0){
//                $(inputs[0]).focus();
//            }
//        },10)
        
    }
    this.getWindow().$id("_DialogDiv_" + this.ID).dialogId = this.ID;
    this.getWindow().$id("_DialogDiv_" + this.ID).dialogInstance = this;
    this.attachBehaviors();
    this.okButton = this.getWindow().$id("_ButtonOK_" + this.ID);
    this.cancelButton = this.getWindow().$id("_ButtonCancel_" + this.ID);
    this.closeButton = this.getWindow().$id("_ButtonClose_" + this.ID);
    this.maxButton = this.getWindow().$id("_ButtonMax_" + this.ID);

    var topWin = this.getWindow();
    var id = this.ID;
    var self = this;
    $(this.cancelButton).bind("click", function () {
        self.close();
    });
    $(this.closeButton).bind("click", function () {
        if (self.CallBack != null) {
             self.CallBack(null)
        }
        self.close();
    });
    $(this.maxButton).bind("click", function () {
        self.maxAndReset();
        if (self.MaxCallBack != null) {
             self.MaxCallBack(null)
        }
    });
    div = null;
};
Dialog.prototype.setSize = function (w, h) {
    if (w && w > 20) {
        this.Width = w;
        this.getWindow().$id("_Container_" + this.ID).style.width = this.Width + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.width = this.Width+ "px";
    }
    if (h && +h > 10) {
        this.Height = +h;
        this.getWindow().$id("_Container_" + this.ID).style.height = (this.Height-66) + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.height = (this.Height)+ "px";
    }
    this.setPosition();
};
Dialog.prototype.maxAndReset = function () {
    if(this.maxed == null || this.maxed !=true){
    	this.orgWidth = this.Width;
        this.orgHeight = this.Height;
        this.maxed =true;
        
        var bd = $bodyDimensions(this.getWindow());
        this.Width = Math.round(bd.clientWidth - 10);
        this.Height = Math.round(bd.clientHeight - 35 - (this.ShowButtonRow ? 40 : 0) - (this.ShowMessageRow ? 50 : 0));
        
        this.getWindow().$id("_Container_" + this.ID).style.width = this.Width + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.width = this.Width+ "px";
        
        this.getWindow().$id("_Container_" + this.ID).style.height = (this.Height) + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.height = (this.Height-66)+ "px";
    }else{
        this.Width = this.orgWidth;
        this.Height = this.orgHeight;
        this.maxed = null;
        
        this.getWindow().$id("_Container_" + this.ID).style.width = this.Width + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.width = this.Width+ "px";
        
        this.getWindow().$id("_Container_" + this.ID).style.height = (this.Height) + "px";
        this.getWindow().$id("_DialogTable_" + this.ID).style.height = (this.Height-66)+ "px";
    }
    this.setPosition();
};
Dialog.prototype.show = function () {
    this.create();
    var bgdiv = Dialog.getBgdiv(this.getWindow()),
        thisdialogDiv = this.getDialogDiv();
    this.zindex = thisdialogDiv.style.zIndex = parseInt(this.getWindow().Dialog.bgDiv.style.zIndex) + 1;

    if (this.getWindow().Dialog._Array.length > 0) {
        this.zindex = thisdialogDiv.style.zIndex = this.getWindow().Dialog._Array[this.getWindow().Dialog._Array.length - 1].zindex + 2;
    } else {
        var topWinBody = this.getWindow().document.getElementsByTagName(this.getWindow().document.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
        //topWinBody.styleOverflow = topWinBody.style.overflow; 去除滚动条
        //topWinBody.style.overflow = "hidden"; 去除滚动条
        bgdiv.style.display = "none";
    }
    this.getWindow().Dialog._Array.push(this);
    if (this.Modal) {
        bgdiv.style.zIndex = this.getWindow().Dialog._Array[this.getWindow().Dialog._Array.length - 1].zindex - 1;
        Dialog.setBgDivSize(this.getWindow());
        if (bgdiv.style.display == "none") {
            if (this.Animator) {
                var bgMask = this.getWindow().$id("_DialogBGMask");
                bgMask.style.opacity = 0;
                bgMask.style.filter = "alpha(opacity=0)";
                bgdiv.style.display = "";
                fadeEffect(bgMask, 0, 40, isIE6 ? 20 : 10);
                bgMask = null;
            } else {
                bgdiv.style.display = "";
            }
        }
    }
    this.setPosition();
    if (this.CancelEvent) {
        this.cancelButton.onclick = this.CancelEvent;
        if (this.ShowButtonRow) this.cancelButton.focus();
    }
    if (this.OKEvent) {
        this.okButton.onclick = this.OKEvent;
        if (this.ShowButtonRow) this.okButton.focus();
    }
    if (this.AutoClose && this.AutoClose > 0) this.autoClose();
    this.opened = true;
    bgdiv = null;
};
Dialog.prototype.close = function () {
    var thisdialogDiv = this.getDialogDiv();
    if (this == this.getWindow().Dialog._Array[this.getWindow().Dialog._Array.length - 1]) {
        var isTopDialog = this.getWindow().Dialog._Array.pop();
    } else {
        this.getWindow().Dialog._Array.remove(this)
    }
    if (this.InvokeElementId) {
        var innerElement = this.getWindow().$id(this.InvokeElementId);
        innerElement.style.display = "none";

        if (!this.ShowTop) {
            document.getElementsByTagName("BODY")[0].appendChild(innerElement)
        } else {
            if (isIE) {
                //ie下不能跨窗口拷贝元素，只能跨窗口拷贝html代码
                var fragment = document.createElement("div");
                fragment.innerHTML = innerElement.outerHTML;
                innerElement.outerHTML = "";
                document.getElementsByTagName("BODY")[0].appendChild(fragment)
            } else {
                document.getElementsByTagName("BODY")[0].appendChild(innerElement)
            }
        }
    }
    if (this.getWindow().Dialog._Array.length > 0) {
        if (this.Modal && isTopDialog) this.getWindow().Dialog.bgDiv.style.zIndex = parseInt(this.getWindow().Dialog._Array[this.getWindow().Dialog._Array.length - 1].zindex) - 1;
    } else {
        this.getWindow().Dialog.bgDiv.style.zIndex = "900";
        this.getWindow().Dialog.bgDiv.style.display = "none";
        var topWinBody = this.getWindow().document.getElementsByTagName(this.getWindow().document.compatMode == "BackCompat" ? "BODY" : "HTML")[0];
        //if (topWinBody.styleOverflow != undefined) topWinBody.style.overflow = topWinBody.styleOverflow; 去除滚动条
    }
    if (isIE) {
        /*****释放引用，以便浏览器回收内存**/
        thisdialogDiv.dialogInstance = null;
        if (this.innerFrame) this.innerFrame.detachEvent("onload", innerFrameOnload);
        this.innerFrame = null;
        this.parentWindow = null;
        this.bgDiv = null;
        if (this.CancelEvent) { this.cancelButton.onclick = null; };
        if (this.OKEvent) { this.okButton.onclick = null; };
        this.getWindow().$id("_DialogDiv_" + this.ID).onDragStart = null;
        this.getWindow().$id("_DialogDiv_" + this.ID).onDragEnd = null;
        this.getWindow().$id("_Draghandle_" + this.ID).onmousedown = null;
        this.getWindow().$id("_Draghandle_" + this.ID).root = null;
        /**end释放引用**/
        thisdialogDiv.outerHTML = "";
        if(typeof(CollectGarbage)=="function"){
            CollectGarbage();
        }
        
    } else {
        var RycDiv = this.getWindow().$id("_RycDiv");
        if (!RycDiv) {
            RycDiv = this.getWindow().document.createElement("div");
            RycDiv.id = "_RycDiv";
        }
        RycDiv.appendChild(thisdialogDiv);
        RycDiv.innerHTML = "";
        RycDiv = null;
    }
    thisdialogDiv = null;
    this.closed = true;
};
Dialog.prototype.autoClose = function () {
    if (this.closed) {
        clearTimeout(this._closeTimeoutId);
        return;
    }
    this.AutoClose -= 1;
    this.getWindow().$id("_Title_" + this.ID).innerHTML = this.AutoClose + " 秒后自动关闭";
    if (this.AutoClose <= 0) {
        this.close();
    } else {
        var self = this;
        this._closeTimeoutId = setTimeout(function () {
            self.autoClose();
        },
        1000);
    }
};
Dialog.getInstance = function (topWin, id) {
    var dialogDiv = topWin.$id("_DialogDiv_" + id);
    if (!dialogDiv) alert("没有取到对应ID的弹出框页面对象");
    try {
        return dialogDiv.dialogInstance;
    } finally {
        dialogDiv = null;
    }
};
Dialog.prototype.addButton = function (id, txt, func) {
    this.getWindow().$id("_ButtonRow_" + this.ID).style.display = "";
    this.ShowButtonRow = true;
    var button = this.getWindow().document.createElement("input");
    button.id = "_Button_" + this.ID + "_" + id;
    button.type = "button";
    button.style.cssText = "margin:0px 10px;padding:0px 10px;";
    button.value = txt;
    button.onclick = func;
    button.className = "layui-btn layui-btn-mini layui-btn-normal";
    var input0 = this.getWindow().$id("_DialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
    input0.parentNode.insertBefore(button, input0);
    return button;
};
Dialog.prototype.removeButton = function (btn) {
    var input0 = this.getWindow().$id("_DialogButtons_" + this.ID).getElementsByTagName("INPUT")[0];
    input0.parentNode.removeChild(btn);
};
Dialog.getBgdiv = function (topWin) {
    if (topWin.Dialog.bgDiv) return topWin.Dialog.bgDiv;
    var bgdiv = topWin.$id("_DialogBGDiv");
    if (!bgdiv) {
        bgdiv = topWin.document.createElement("div");
        bgdiv.id = "_DialogBGDiv";
        bgdiv.style.cssText = "position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:900";
        var bgIframeBox = '<div style="position:relative;width:100%;height:100%;">';
        var bgIframeMask = '<div id="_DialogBGMask" style="position:absolute;background-color:#000;opacity:0.2;filter:alpha(opacity=20);width:100%;height:100%;"></div>';
        var bgIframe = isIE || isShowBgIframe ? '<iframe src="about:blank" style="filter:alpha(opacity=0);border:none 0;" width="100%" height="100%" ></iframe>' : '';
        bgdiv.innerHTML = bgIframeBox + bgIframeMask + bgIframe + '</div>';
        topWin.document.getElementsByTagName("BODY")[0].appendChild(bgdiv);

        if (isIE6) {
            var bgIframeDoc = bgdiv.getElementsByTagName("IFRAME")[0].contentWindow.document;
            bgIframeDoc.open();
            bgIframeDoc.write("<body style='background-color:#000' oncontextmenu='return false;'></body>");
            bgIframeDoc.close();
            bgIframeDoc = null;
        }
    }
    topWin.Dialog.bgDiv = bgdiv;
    bgdiv = null;
    return topWin.Dialog.bgDiv;
};
Dialog.prototype.getDialogDiv = function () {
    var dialogDiv = this.getWindow().$id("_DialogDiv_" + this.ID)
    if (!dialogDiv) alert("获取弹出层页面对象出错！");
    try {
        return dialogDiv;
    } finally {
        dialogDiv = null;
    }
};
Dialog.onKeyDown = function (event) {
    if (event.shiftKey && event.keyCode == 9) { //shift键
        if (topWin.Dialog._Array.length > 0) {
            stopEvent(event);
            return false;
        }
    }
    if (event.keyCode == 27) { //ESC键
        Dialog.close();
    }
};
Dialog.close = function (topWin,id) {
    if (topWin.Dialog._Array.length > 0) {
        var diag = topWin.Dialog._Array[topWin.Dialog._Array.length - 1];
        diag.cancelButton.onclick.apply(diag.cancelButton, []);
    }
};
Dialog.alert = function (msg, func, w, h, title) {
    var w = w || 300,
        h = h || 80;
    var title = title || "系统提示";
    var diag = new Dialog();
    diag.Width = w;
    diag.Height = h;
    diag.ShowButtonRow = true;
    diag.ShowCloseButton = false;
    diag.Title = title;
    diag.ShowTop = false;
    diag.OKEvent = function () {
        diag.close();
        if (func) func();
    };
    diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0" width="100%">\
        <tr><td align="center" style="width:50px;padding:0px"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_alert.png" width="34" height="34" align="absmiddle"></td>\
            <td align="left" id="Message_' + this.ID + '" style="font-size:12px;padding:2px;"><div style="height:'+(diag.Height-4)+'px;overflow:auto;display:table"><div style="vertical-align:middle;display:table-cell;">' + msg + '</div></div></td></tr>\
    </table>';
    diag.show();
    diag.okButton.parentNode.style.textAlign = "center";
    diag.okButton.value = "确 定";
    diag.okButton.focus();
    diag.cancelButton.style.display = "none";
};
Dialog.error = function (msg, func, w, h, title) {
    var w = w || 330,
        h = h || 100;
    var title = title || "系统提示";
    var diag = new Dialog();
    diag.Width = w;
    diag.Height = h;
    diag.ShowButtonRow = true;
    diag.ShowCloseButton = false;
    diag.isShowBgIframe =true;
    diag.Title = title;
    diag.ShowTop = false;
    diag.OKEvent = function () {
        diag.close();
        if (func) func();
    };
    diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0" width="100%">\
        <tr><td align="center" style="width:50px;padding:0px"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_error.png" width="34" height="34" align="absmiddle"></td>\
            <td align="left" id="Message_' + this.ID + '" style="font-size:12px;padding:2px;"><div style="height:'+(diag.Height-4)+'px;overflow:auto;"><table cellpadding="0" cellspacing="0" style="widht:100%;height:100%;border-width:0px"><tr><td>'+msg+'</td></tr></table></div></td></tr>\
    </table>';
    diag.show();
    diag.okButton.parentNode.style.textAlign = "center";
    diag.okButton.value = "确 定";
    diag.okButton.focus();
    diag.cancelButton.style.display = "none";
};
Dialog.confirm = function (msg, funcOK, funcCal, w, h, title) {
    var w = w || 300,
        h = h || 80;

    var title = title || "信息确认";
    var diag = new Dialog();
    diag.Width = w;
    diag.Height = h;
    diag.ShowButtonRow = true;
    diag.ShowCloseButton = false;
    diag.ShowTop = false;
    diag.Title = title;
    diag.CancelEvent = function () {
        if (funcCal) {
            funcCal();
        }
    };
    diag.OKEvent = function () {
        diag.close();
        if (funcOK) {
            funcOK();
        }
    };
    diag.InnerHtml = '<table height="100%" border="0" align="center" cellpadding="10" cellspacing="0" width="100%">\
        <tr><td align="center" style="width:50px;padding:0px"><img id="Icon_' + this.ID + '" src="' + IMAGESPATH + 'icon_query.gif" width="34" height="34" align="absmiddle"></td>\
            <td align="left" id="Message_' + this.ID + '" style="font-size:12px;padding:2px;"><div style="height:'+(diag.Height-4)+'px;overflow:auto;"><table cellpadding="0" cellspacing="0" style="widht:100%;height:100%;border-width:0px"><tr><td>'+msg+'</td></tr></table></div></td></tr>\
    </table>';
    diag.show();
    diag.okButton.parentNode.style.textAlign = "center";
    diag.okButton.focus();
};
Dialog.open = function (arg) {
    var diag = new Dialog(arg);
    diag.show();
    return diag;
};
if (isIE) {
    //window.attachEvent("onload", Dialog.attachBehaviors);
} else {
    //window.addEventListener("load", Dialog.attachBehaviors, false);
}