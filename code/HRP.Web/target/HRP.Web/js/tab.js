var Tab = function () {
    /****以下属性以大写开始，可以在调用show()方法前设置值****/
    this.URL = null;
    this.Title = null;
    this.Closable = true;
    this.IconCls = null;
    this.CallBack = null;
    this.OnLoad = null;
    this.InnerHtml = ""
    this.parentWindow = null;
    this.innerFrame = null;
    this.innerWin = null;
    this.innerDoc = null;
    this.Tab = null;
    if (!this.ID)
        this.ID = new Date().getTime();
};
Tab.prototype.displacePath = function () {
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
Tab.prototype.create = function () {
    var parentWin = window;
    while (parentWin != parentWin.parent) {
        if (parentWin.parent.document.getElementsByTagName("FRAMESET").length > 0) break;
        parentWin = parentWin.parent;
    }
    this.parentWindow = parentWin;

    var tt = parentWin.$('#tabs');
    if (tt.tabs('existURL', this.URL)) {//如果tab已经存在,则选中并刷新该tab          
        tt.tabs('selectURL', this.URL);
    } else {
        if (this.URL) {
            var content = '<iframe frameborder="0"  src="' + this.displacePath() + '" style="width:100%;height:100%;" id="_TabFrame_' + this.ID + '"></iframe>';
        } else {
            var content = '未实现';
        }

        tt.tabs('add', {
            title: this.Title,
            closable: this.Closable,
            content: content,
            iconCls: this.IconCls
        });

        this.Tab = tt.tabs('getSelected');
        this.Tab.URL = this.URL;
        this.Tab.TabObj = this;

        if (parentWin.$id("_TabFrame_" + this.ID)) {
            //this.innerFrame = topWin.$id("_TabFrame_" + this.ID);
            this.innerFrame = parentWin.$id("_TabFrame_" + this.ID);
        }

        var self = this;
        innerFrameOnload = function () {
            try {
                self.innerWin = self.innerFrame.contentWindow;
                self.innerDoc = self.innerWin.document;
                if (!self.Title && self.innerDoc && self.innerDoc.title) {
                    //tt.tabs('update', { tab: self.Tab, options: { title: self.innerDoc.title} });
                    parentWin.$('#tabs .tabs-selected .tabs-title').html(self.innerDoc.title)
                };
            } catch (e) {
                if (console && console.log) console.log("可能存在访问限制，不能获取到iframe中的对象。")
            }
            if (typeof (self.OnLoad) == "function") self.OnLoad();
            try {
                if (isIE) {
                    /*****释放引用，以便浏览器回收内存**/
                    if (self.innerFrame) self.innerFrame.detachEvent("onload", innerFrameOnload);
                    self.innerFrame = null;
                    CollectGarbage();
                }
            } catch (e) {
                if (console && console.log) console.log("可能存在访问限制，不能获取到iframe中的对象。")
            }

        };
        if (this.innerFrame.attachEvent) {
            this.innerFrame.attachEvent("onload", innerFrameOnload);
        } else {
            this.innerFrame.onload = innerFrameOnload;
        };

    }

};
Tab.prototype.show = function () {
    this.create();
};
Tab.prototype.close = function () {
    var tt = this.parentWindow.$('#tabs');
    var tab = tt.tabs('getSelected');
    var index = tt.tabs('getTabIndex', tab);
    tt.tabs('close', index)

    if (isIE) {
        /*****释放引用，以便浏览器回收内存**/
        if (this.innerFrame) this.innerFrame.detachEvent("onload", innerFrameOnload);
        this.innerFrame = null;
        this.parentWindow = null;
        CollectGarbage();
    }
    this.closed = true;
};


(function ($) {
    $.extend($.fn.tabs.methods, {
        existURL: function (jq, url) {
            var tabs = $(jq).tabs("tabs");

            for(var i = 0 ; i < tabs.length ; i++){
                if(tabs[i].URL == url){
                    return true;
                }
            }
            return false;
        },
        selectURL: function (jq, url) {
            var tabs = $(jq).tabs("tabs");

            for(var i = 0 ; i < tabs.length ; i++){
                if(tabs[i].URL == url){
                    $(jq).tabs('select', i);
                    return;
                }
            }
            return;
        }
    });
})(jQuery);