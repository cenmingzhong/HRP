function ajaxSubmit(params) {
    var settings = $.extend({
        url: null,
        data: null,
        type: "post",
        dataType: "json",
        async: true,
        beforeSend: null,
        success: null,
        error: null,
        formId: null,
        lockScreen: true,
        handlerError:true
    }, params);

    if (!settings.lockScreen) {
        isLockScreen = settings.lockScreen;
    }
    return jQuery.ajax({
        url: settings.url,
        data: settings.data,
        type: settings.type,
        async: settings.async,
        dataType: settings.dataType,
        beforeSend: function () {
            if (typeof (settings.beforeSend) == "function") if (settings.beforeSend() == false) return false;
            if (settings.lockScreen) {
                showLocker();
            }
        },
        success: function (data) {
            closeLocker();
            if(data.entity=="TimeOut"){
                if(topWin.$id("_DialogDiv_ReLoginDialog")== null){
                    openDialog({
                        url:contextPath + "/toReLogin.do",
                        dialogTitle:"重新登录",
                        id:"ReLoginDialog",
                        dialogWidth:350,
                        dialogHeight:280
                    });
                }
            }else{
                if(settings.handlerError && data != null && data.isOk=="N" && !isNullorEmpty(data.message)){
                    alertError(data.message)
                }
                if (typeof (settings.success) == "function") settings.success(data);
            }
        },
        error: function (XMLHttpRequest,textStatus) {
            if (settings.lockScreen) {
                closeLocker();
            }

            if(XMLHttpRequest.readyState!=0){
                alertError(XMLHttpRequest.responseText);
                if (typeof (settings.error) == "function") settings.error();
            }
        }
    });
}
function showLocker() {
    if(window.ajaxCount ==null){
        window.ajaxCount = 0;
    }
    window.ajaxCount ++;

    if(!isWindowLoad){
        $("#loading-mask").css("opacity", 0.5);
        $("#loading-mask").css("filter", "alpha(opacity=50)");
    }

    $("#loading-mask").show();
    $("#loading").show();
}

function closeLocker(isWinLoad) {
    
    if(isWinLoad){
        if(window.ajaxCount == null){
            window.ajaxCount = 0;
        }
    }else{
        if(window.ajaxCount == null){
            window.ajaxCount = 1;
        }
        if(window.ajaxCount>0){
            window.ajaxCount--;
        }
    }
    if(window.ajaxCount==0){
        $("#loading-mask").hide();
        $("#loading").hide();
    }
}

function getCurrentLocation() {
    var pathName = document.location.pathname;

    if (contextPath == "" || contextPath == "/") {
        return pathName;
    }
    return pathName.substring(pathName.indexOf(contextPath) + contextPath.length);
}

function log(message){
    if(window.console && console.log){
        console.log(message);
    }
}

//弹出框
var openDialog = function (params) {

  var settings = $.extend({
      url: null,
      obj: window,
      dialogWidth: 550,
      dialogHeight: 400,
      dialogLeft: null,
      dialogTop: null,
      dialogTitle: "",
      center: "yes",
      help: "no",
      resizable: "no",
      status: "no",
      scroll: "yes",
      location: "no",
      callBack: null,
      dialogCallBack: null,
      elementId: null,
      dialogParams: null,
      ShowButtonRow: false,
      showMax:false,
      id:null
  }, params);

  if (settings.url != null) {
      if (settings.url.indexOf("?") < 0) {
          settings.url = settings.url + "?moduleId=" + getURLParameter("moduleId") + "&t=" + new Date().getTime();
      } else {
          settings.url = settings.url + "&moduleId=" + getURLParameter("moduleId") + "&t=" + new Date().getTime();
      }

      var diag = new Dialog();
      if(settings.id != null){
          diag.ID = settings.id;
      }
      diag.Width = settings.dialogWidth;
      diag.Height = settings.dialogHeight;
      diag.Title = settings.dialogTitle;
      diag.URL = settings.url;
      diag.ShowTop = settings.showTop == null ? true : settings.showTop;
      diag.CallBack = settings.dialogCallBack;
      diag.dialogParams = JSON.stringify(settings.dialogParams);
      diag.show();

      return diag;
  } else if (settings.elementId != null) {

      var diag = new Dialog();
      diag.Width = settings.dialogWidth;
      diag.Height = settings.dialogHeight;
      diag.ShowTop = settings.showTop == null ? false : settings.showTop;
      diag.Title = settings.dialogTitle == null ? "查询条件" : settings.dialogTitle;
      diag.InvokeElementId = settings.elementId;
      diag.ShowButtonRow = settings.ShowButtonRow;
      diag.OKEvent = function () {
          var isClose = true;
          if (typeof (settings.dialogCallBack) == "function") {
              var rel = settings.dialogCallBack();
              if (rel === undefined) {
              }
              else {
                  isClose = rel;
              }
          }
          if (isClose) {
              diag.close();
          }
      };
      diag.show();
      return diag;
  }
}

//获取弹出框传递参数
function getDialogParams() {
    if (typeof(parentDialog)!="undefined" &&parentDialog && parentDialog.dialogParams) {
        //return $.extend(true, {}, parentDialog.dialogParams);
        return $.parseJSON(parentDialog.dialogParams);
    }
    return null;
}

//关闭弹出框
function closeDialog(returVal) {
  if (typeof (parentDialog) == 'undefined') {
      window.close()
  } else {
      window.setTimeout(function () {
          if (parentDialog.CallBack != null) {
              var returnVal = parentDialog.CallBack(returVal)

              if (!returnVal) {
                  parentDialog.close();
              }

          } else {
              parentDialog.close();
          }
      }, 50);
  }
}

function absolutizeURI(href) {// RFC 3986
  function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    // authority = '//' + user + ':' + pass '@' + hostname + ':' port
    return (m ? {
      href     : m[0] || '',
      protocol : m[1] || '',
      authority: m[2] || '',
      host     : m[3] || '',
      hostname : m[4] || '',
      port     : m[5] || '',
      pathname : m[6] || '',
      search   : m[7] || '',
      hash     : m[8] || ''
      } : null);
   }
  function removeDotSegments(input) {
    var output = [];
    input.replace(/^(\.\.?(\/|$))+/, '')
         .replace(/\/(\.(\/|$))+/g, '/')
         .replace(/\/\.\.$/, '/../')
         .replace(/\/?[^\/]*/g, function (p) {
      if (p === '/..') {
        output.pop();
      } else {
        output.push(p);
      }
    });
    return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
  }
  var base = location.href;
  href = parseURI(href || '');
  base = parseURI(base || '');

  return !href || !base ? null : (href.protocol || base.protocol) +
         (href.protocol || href.authority ? href.authority : base.authority) +
         removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
         (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
         href.hash;
}
//打开新的页签
var openTab = function (params) {

  var settings = $.extend({
      url: null,
      title: null,
      closable: true,
      iconCls: null,
      tabCallBack: null,
      parentTab: null,
      tabParams:null
  }, params);

  if (settings.url.indexOf("?") < 0) {
      settings.url = settings.url + "?moduleId=" + getURLParameter("moduleId");
  } else {
      settings.url = settings.url + "&moduleId=" + getURLParameter("moduleId");
  }
  var url = absolutizeURI(settings.url);
  
  var tab = new Tab();
  tab.Title = settings.title;
  tab.URL = url;
  tab.Closable = settings.closable;
  tab.IconCls = settings.iconCls;
  tab.CallBack = settings.tabCallBack;
  tab.parentTab = settings.parentTab;
  tab.tabParams = JSON.stringify(settings.tabParams);
  tab.show();

  return tab;
}

//关闭页签
function closeTab(returnVal) {
  //var tt = topWin.$('#tabs');
  var tt = window.parent.$('#tabs');
  var tab = tt.tabs('getSelected');
  var index = tt.tabs('getTabIndex', tab);

  if (typeof (tab.TabObj) == null) {        
      tt.tabs('close', index)
  } else {
      window.setTimeout(function () {
          try {
              if (tab.TabObj.CallBack != null) {
                  if (tab.TabObj.parentTab != null) {
                      var parentIndex = tt.tabs('getTabIndex', tab.TabObj.parentTab);
                      tt.tabs("select", parentIndex);
                      tab.TabObj.CallBack(returnVal);
                  }
                  else {
                      tab.TabObj.CallBack(returnVal);
                  }
              }
              tt.tabs('close', index)
          } catch (error) {
              tt.tabs('close', index)
          }
      }, 10);
  }
}

//获取页签参数
function getTabParams() {
  var tt = topWin.$('#tabs');
  var tab = tt.tabs('getSelected');
  if (tab && tab.TabObj) {
      //return $.extend(true, {}, tab.TabObj.urlJsonParams);
      return $.parseJSON(tab.TabObj.tabParams);
  }
  return null;
}

//获取URL参数
function getURLParameter(name) {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
  var r;

  if (r = window.location.href.match(reg))
      return unescape(r[2]);
  return null;
}

//jquery绑定div的resize事件
(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 0;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                if(r != null){
                    r.w = o !== c ? o: q.width();
                    r.h = p !== c ? p: q.height();
                    n.apply(this, arguments);
                }
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function() {
                a.each(function() {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);


function nullToEmpty(value) {
    return value == null ? "" : value;
}
function isNullorEmpty(value) {
    return nullToEmpty(value) ==="";
}
(function ($) {
    function Fill() {
        this.defaults = {
            styleElementName: 'object', // object | none
            dateFormat: 'mm/dd/yy',
            debug: false,
            elementsExecuteEvents: ['checkbox', 'radio', 'select-one']
        };
    };

    $.extend(Fill.prototype, {
        setDefaults: function (settings) {
            this.defaults = $.extend({}, this.defaults, settings);
            return this;
        },

        fill: function (obj, _element, settings) {
            options = $.extend({}, this.defaults, settings);
            _element.find("*").each(function (i, item) {
                if ($(item).is("input") || $(item).is("select") || $(item).is("span") || $(item).is("textarea")) {
                    if($(item).attr("name") !=null){
                    
                    try {
                        var objName;
                        var arrayAtribute;
                        var value;
                        try {
                            objName = $(item).prop("name");
                            if(objName.indexOf(".")!=-1){
                                var tempName = objName.split(".")[0];
                                var propName = objName.split(".")[1];
                                
                                var tempObj = obj[tempName]
                                if(tempObj==null){
                                    tempObj={};
                                }
                                value = $.trim(tempObj[propName]);
                            }else{
                                value = $.trim(obj[objName]);
                            }
                            
                        } catch (e) {
                            if (options.debug) {
                                debug(e.message);
                            }
                        }
                        
                        if (value != null) {
                            if ($(item).is("select")) {
                                if (value) {
                                    initDropDown(item,value);
                                }
                            } else if($(item).is("span")){
                                $(item).html(value)
                            } else {
                                switch ($(item).prop("type")) {
                                    case "hidden":
                                    case "password":
                                    case "textarea":
                                        $(item).val(value);
                                        break;

                                    case "text":
                                        if ($(item).hasClass("hasDatepicker")) {
                                            var re = /^[-+]*[0-9]*$/;
                                            var dateValue = null;
                                            if (re.test(value)) {
                                                dateValue = new Date(parseInt(value));
                                                var strDate = dateValue.getUTCFullYear() + '-' + (dateValue.getUTCMonth() + 1) + '-' + dateValue.getUTCDate();
                                                dateValue = $.datepicker.parseDate('yy-mm-dd', strDate);
                                            } else if (value) {
                                                dateValue = $.datepicker.parseDate(options.dateFormat, value);
                                            }
                                            $(item).datepicker('setDate', dateValue);
                                        } else if ($(item).prop("alt") == "double") {
                                            $(item).val(value.toFixed(2));
                                        } else {
                                            $(item).val(value);
                                        }
                                        break;

                                    case "select-one":
                                        if (value) {
                                            $(item).val(value);
                                        }
                                        break;
                                    case "radio":
                                        $(item).each(function (i, radio) {
                                            if ($(radio).val().toString() == value) {
                                                $(radio).prop("checked", "checked");
                                            }
                                        });
                                        break;
                                    case "checkbox":
                                        if ($.isArray(value)) {
                                            $.each(value, function (i, arrayItem) {
                                                if (typeof (arrayItem) == 'object') {
                                                    arrayItemValue = eval("arrayItem." + arrayAtribute);
                                                } else {
                                                    arrayItemValue = arrayItem;
                                                }
                                                if ($(item).val() == arrayItemValue) {
                                                    $(item).prop("checked", "checked");
                                                }
                                            });
                                        } else {
                                            if(value=="true"){
                                                $(item).prop("checked", "checked");
                                            }else if ($(item).val() == value) {
                                                $(item).prop("checked", "checked");
                                            }else{
                                                if(item.checked){
                                                    item.checked = false;
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                            executeEvents(item);
                        }
                    } catch (e) {
                        if (options.debug) {
                            debug(e.message);
                        }
                    }
                    }
                }

            });
        }
    });

    $.fn.fill = function (obj, settings) {
        var data = $.extend(true, settings, {});
        $.fill.fill(obj, $(this), data);
        return this;
    };

    $.fill = new Fill();

    function executeEvents(element) {
        if (jQuery.inArray($(element).prop('type'), $.fill.defaults.elementsExecuteEvents)) {
            //if (typeof($(element).change())=="function") {
                //$(element).change();
            //}

        }
    };

    function debug(message) {
        // Throws error messages in the browser console.
        if (window.console && window.console.log) {
            window.console.log(message);
        }
    };
})(jQuery);

$.fn.form2json = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        //        if (o[this.name]) {
        //            o[this.name].push(this.value || '');
        //        } else {
        //            o[this.name] = this.value || '';
        //        }

        var name = this.name;

        if (name.indexOf(".") != -1) {
            var objName = name.split(".")[0];
            var propName = name.split(".")[1];
            
            if(this.value != ""){
                if (o[objName] == null) {
                    o[objName] = {}
                }
                o[objName][propName] = this.value
            }
        } else {
            if (this.type == "checkbox" && this.value == "on") {
                o[name] = this.check;
            } else {
                o[name] = this.value || '';
            }
        }
    });
    return o;
}

$.fn.form2Filter = function () {
    var filterList = [];
    $(this).find("*").each(function (i, item) {
        if ($(item).is("input") || $(item).is("select") || $(item).is("textarea")) {
            var name = $(this).attr("name");
            var operator = $(this).attr("operator");
            if(name != null){
                if (this.type == "checkbox" && this.value == "on") {
                    filterList.push({
                        name:name,
                        value:this.checked,
                        operator:operator
                    })
                } else {
                    filterList.push({
                        name:name,
                        value:this.value || '',
                        operator:operator
                    })
                }
            }
        }
    });
    return filterList;
}

function pagerFilter(data) {
    if (!data) {
        data = [];
    }
    if (typeof data.length == 'number' && typeof data.splice == 'function') {    // is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');

    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        },
        onRefresh: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);

        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}
function disabledForm(formId) {
    var form = document.getElementById(formId)

    if (form == null) return false;

    for (var i = 0; i < form.elements.length; i++) {
        if(form.elements[i].originDisabled ==null){
            form.elements[i].originDisabled = form.elements[i].disabled;
        }
        form.elements[i].disabled = true;
    }
}
function enableForm(formId) {
    var form = document.getElementById(formId);

    if (form == null) return false;

    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].originDisabled != null) {
            form.elements[i].disabled = form.elements[i].originDisabled;
            form.elements[i].originDisabled = null;
        } else {
            form.elements[i].disabled = false;
        }
    }
}

function readOnlyForm(formId) {
    var form = document.getElementById(formId)

    if (form == null) return false;

    $("#" + formId).find("*").each(function (i, item) {
        if ($(item).is("input") || $(item).is("select") || $(item).is("textarea")) {
            if ($(item).is("select")) {
                $(item).attr("disabled", "disabled")
            } else {
                switch ($(item).prop("type")) {
                    case "hidden":
                    case "password":
                    case "textarea":
                    case "text":
                        $(item).attr("readonly", "readonly");
                        $(item).attr("isEditable", "false")
                        break;
                    case "select-one":
                    case "radio":
                    case "checkbox":
                        $(item).attr("disabled", "disabled")
                        break;
                        break;
                }
            }
        }

    });
}

function unReadOnlyForm(formId) {
    var form = document.getElementById(formId)

    if (form == null) return false;
    $("#" + formId).find("*").each(function (i, item) {
        if ($(item).is("input") || $(item).is("select") || $(item).is("textarea")) {
            if ($(item).is("select")) {
                $(item).removeAttr("disabled")
            } else {
                switch ($(item).prop("type")) {
                    case "hidden":
                    case "password":
                    case "textarea":
                    case "text":
                        $(item).removeAttr("isEditable");
                        if($(item).attr("isInput")== null || $(item).attr("isInput")=="true"){
                            $(item).removeAttr("readonly")
                        }
                        break;

                    case "select-one":
                    case "radio":
                        $(item).removeAttr("disabled")
                    case "checkbox":
                        $(item).removeAttr("disabled")
                        break;
                        break;
                }
            }
        }
    });
}

function enableBlock(blockId) {
    var block = document.getElementById(blockId)

    if (block == null) return false;

    $("#" + blockId).find("*").each(function (i, item) {
        if ($(item).is("input") || $(item).is("select") || $(item).is("textarea")) {
            if ($(item).is("select")) {
                $(item).removeAttr("disabled");         
            } else {
                switch ($(item).prop("type")) {
                    case "hidden":
                    case "password":
                    case "textarea":
                    case "text":
                        $(item).removeAttr("disabled");
                        break;

                    case "select-one":
                    case "radio":
                    case "checkbox":
                        $(item).removeAttr("disabled");
                        break;
                        break;
                }
            }
        }

    });
}


function disabledBlock(blockId) {
    var block = document.getElementById(blockId)

    if (block == null) return false;

    $("#" + blockId).find("*").each(function (i, item) {
        if ($(item).is("input") || $(item).is("select") || $(item).is("textarea")) {
            if ($(item).is("select")) {
                $(item).prop("disabled", true);
            } else {
                switch ($(item).prop("type")) {
                    case "hidden":
                    case "password":
                    case "textarea":
                    case "text":
                        $(item).prop("disabled", true)
                        break;

                    case "select-one":
                    case "radio":
                    case "checkbox":
                        $(item).prop("disabled", true)
                        break;
                        break;
                }
            }
        }

    });
}
function initInputForm(formId){
    var form = document.getElementById(formId);

    if (form == null) return false;
    $("#" + formId).find("div.vouchFieldDiv div,div[class^='layui-col']").each(function (i, item) {
        var divObj = this;
        if($(divObj).attr("isBlank")=="true"){
            $(divObj).html("<label>&nbsp;</label><input type='text' style='visibility: hidden;'/>")
        }
        $("input", divObj).attr("isInput", $(divObj).attr("isInput")).attr("autocomplete","off");
        $("label", divObj).attr("title", $("label", divObj).text());
        $("input,select", divObj).attr("title", $("label", divObj).text());
        
        var isRequired=$(divObj).attr("isrequired");
        if(isRequired!=null && isRequired=="true"){
            
            $("label", divObj).addClass("needLabel")
            var labelText = "["+$("label", divObj).text()+"]"+" 不能为空";
            if($("input[type='hidden']", divObj).length>0){
                $("input[type='hidden']", divObj).attr("data-rule-required", "true");
                $("input[type='hidden']", divObj).attr("data-msg-required", labelText);
            }else{
                $("input[type='text']", divObj).attr("data-rule-required", "true");
                $("input[type='text']", divObj).attr("data-msg-required", labelText);
                
                
                $("select", divObj).attr("data-rule-required", "true");
                $("select", divObj).attr("data-msg-required", labelText);
            }
        }
        var colSpan = $(divObj).attr("colSpan");
        if(!isNullorEmpty(colSpan)){
            var divWidth = $(divObj).width()
            $(divObj).width($(divObj).width()*colSpan);
            $("input", divObj).width(divWidth*(colSpan-1)+$("input", divObj).width());
            $("textarea", divObj).width(divWidth*(colSpan-1)+$("textarea", divObj).width());
        }
        var referTo = $(divObj).attr("referto");
        /*var authFilter = $(divObj).attr("authfilter");
        if(!isNullorEmpty(referTo)){
            bindReferEvent(referTo,$(divObj), $("input[type='text']", divObj), $("input[type='hidden']", divObj), authFilter);
        }*/
        var dataType = $(divObj).attr("datatype");
        
        if(!isNullorEmpty(dataType)){
            if(dataType=="date"){
                $("input[type='text']", divObj).date("",$(divObj).attr("dateFmt"))
            }else if(dataType=="number"){
            	var dateFmt = {};
            	if($(divObj).attr("dateFmt")!=null){
            		dateFmt = {precision:$(divObj).attr("dateFmt")}
            	}
                $("input[type='text']", divObj).number(dateFmt);
            }else if(dataType=="int"){
                $("input[type='text']", divObj).integer();
            }
        }
    });
    
    $("#"+formId+" input:text").keypress(function(e) {  
        if (e.which == 13 && $(this).attr("isrefer") != "true") {// 判断所按是否回车键  
            var inputs = $("#"+formId).find(":text"); // 获取表单中的所有输入框  
            var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
            if (idx != inputs.length - 1) {// 判断是否是最后一个输入框
                inputs[idx + 1].focus(); // 设置焦点  
                inputs[idx + 1].select(); // 选中文字  
            }  
            return false;// 取消默认的提交行为  
        }  
    });  
}

function setFormInput(formId){
    $("#"+formId+" input:text").keypress(function(e) {  
        if (e.which == 13 && $(this).attr("isrefer") != "true") {// 判断所按是否回车键  
            var inputs = $("#"+formId).find(":text"); // 获取表单中的所有输入框  
            var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
            if (idx != inputs.length - 1) {// 判断是否是最后一个输入框
                inputs[idx + 1].focus(); // 设置焦点  
                inputs[idx + 1].select(); // 选中文字  
            }  
            return false;// 取消默认的提交行为  
        }  
    });  
}

var bindReferEvent = function(referTo,divObj, inputObj, hidenObj, authFilter, callBackFun){
    if(inputObj.length==0){
        return;
    }
    if(authFilter == null){
        authFilter = false;
    }
    inputObj.attr("autocomplete","off");
    var setInputValue= function(returnVal){
        var referText = inputObj.attr("referField");
        if(referText == null){
           referText = divObj.attr("referField");
        }
        if(isNullorEmpty(referText)){
            if(inputObj.attr("name").indexOf(".")>-1){
                referText = inputObj.attr("name").split(".")[1];
            }else{
                referText = inputObj.attr("name");
            }
        }
        var referCode = "";
        if(hidenObj.length !=0){
            referCode = hidenObj.attr("referField");
            if(referCode == null){
                if( hidenObj.attr("name").indexOf(".")>-1){
                    referCode = hidenObj.attr("name").split(".")[1]
                }else{
                    referCode = hidenObj.attr("name")
                }
                
            }
        }
        $(inputObj).val(returnVal[referText]);
        $(hidenObj).val(returnVal[referCode]);
        if (typeof (callBackFun) == "function") {
            callBackFun(returnVal);
        }
    }
    if(referTo =="itemLevel"){
        Refer.ItemLevel({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="itemProp"){
        Refer.ItemProp({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="u8Department"){
        Refer.U8Department({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="assetAddOrigin"){
        Refer.AssetOrigin({
            inputObj:inputObj,
            originType:"A",
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="assetAddOrigin"){
        Refer.AssetOrigin({
            inputObj:inputObj,
            originType:"D",
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="inventory"){
        Refer.Inv({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="inventoryClass"){
        Refer.InvCls({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="department"){
        Refer.Department({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="warehouse"){
        Refer.Warehouse({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="person"){
        Refer.Person({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="vendor"){
        Refer.Vendor({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="organ"){
        Refer.Org({
            inputObj:inputObj,
            authFilter:authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="fundSrc"){
        Refer.fundSrc({
            inputObj: inputObj,
            authFilter: authFilter,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="unit"){
        Refer.Unit({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="itemCostByItemClass"){
        Refer.itemCostByItemClass({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="contractClass"){
        Refer.ContractClass({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="U8User"){
        Refer.U8User({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="U8Person"){
        Refer.U8Person({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="budgetItem"){
        Refer.BudgetItem({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="item"){
        Refer.BudgetItem({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }else if(referTo =="subject"){
        Refer.BudgetItem({
            inputObj:inputObj,
            referCallBack:function(returnVal){
                if(returnVal != null){
                    setInputValue(returnVal);
                }
            }
        });
    }
}

function ajaxPageSubmit(params) {
    var settings = $.extend({
        url: null,
        data: null,
        type: "post",
        dataType: "json",
        async: true,
        beforeSend: null,
        success: null,
        error: null,
        formId: null,
        lockScreen: true,
        gridId: null,
        pageNum: 1
    }, params);

    var opts = $('#' + settings.gridId).datagrid('options');    
    $('#' + settings.gridId).datagrid({
        onSortColumn:function(sort,order){
            var pageObj = JSON.parse(settings.data.page);
            pageObj.orderBy = $('#' + settings.gridId).datagrid('getColumnOption', sort).columnName;
            pageObj.orderSort = order;
            settings.data.page = JSON.stringify(pageObj);
            ajaxSubmit(settings)
        }
    });

    var pager = $('#' + settings.gridId).datagrid('getPager');

    if (settings.data == null) {
        settings.data = {
            page: JSON.stringify({
                PageSize: opts.pageSize,
                CurPage: settings.pageNum == null ? 1 : settings.pageNum
            })
        }
    } else {
        settings.data.page = JSON.stringify({
            PageSize: opts.pageSize,
            CurPage: settings.pageNum == null ? 1 : settings.pageNum
        })
    }
    if (typeof (settings.success) == "function") {
        settings.success = function (data) {
            params.success(data);
            if (data.IsOK == "Y" && data.Page != null) {
                pager.pagination({
                    total: data.Page.TotalCount,
                    pageNumber: data.Page.CurPage
                })
            }
        }
    }
    //获取当前页
    //alert($("#" + settings.gridId).datagrid('getPager').data("pagination").options.pageNumber);
    pager.pagination({
        pageNumber: settings.pageNum == null ? 1 : settings.pageNum,
        onSelectPage: function (pageNum, pageSize) {
            settings.data.page = JSON.stringify($.extend(JSON.parse(settings.data.page),{
                pageSize: pageSize,
                curPage: pageNum
            }))
            ajaxSubmit(settings)
        },
        onRefresh: function (pageNum, pageSize) {
            settings.data.page = JSON.stringify($.extend(JSON.parse(settings.data.page),{
                pageSize: pageSize,
                curPage: pageNum
            }))
            //ajaxSubmit(params)
        }
    });

    ajaxSubmit(settings)
}
function validateForm(formId) {
    $("#" + formId).validate({
        showErrors: function (errorMap, errorList) {
            var msg = "";
            $.each(errorList, function (i, v) {
                msg += (v.message + "<br/>"); 
            });
            if (msg != "") alertError(msg);
        },
        onfocusout: null,
        onfocusin: null,
        onkeyup: null,
        onclick: null
    });   
    return $("#" + formId).valid();
}
function validateGrid(dataList, colList) {
    var valid = true;
    var reqColList = $.grep(colList,function(obj,i){
       return obj.isRequired ==true
    });
    
    if(reqColList.length != 0 && dataList.length !=0){
        var msg = "";
        for(var i=0; i < dataList.length; i++){
            var rowIdx = i+1;
            for(var j =0; j < reqColList.length; j++){
                if(isNullorEmpty($.jgrid.getAccessor(dataList[i],reqColList[j].code))){
                    valid =false;
                    msg += "第"+rowIdx+"行["+ reqColList[j].text + "]不能为空<br/>"; 
                }
            }
        }
        if(msg !=""){
            alertError(msg);
        }
    }
    return valid;
}
function bindDropDown(selObj, jsonData, text, value, isBlank,blankText) {
    if (typeof (selObj) != "object") {
        selObj = document.getElementById(selObj);
    }

    if(blankText==null){
        blankText="--请选择--"
    }
    if (selObj == null || selObj.tagName != "SELECT") {
        alert("加载下拉框失败");
        return;
    }
    selObj.options.length = 0;

    if (isBlank)
        selObj.options.add(new Option(blankText, ""));

    if (jsonData == null) return;
    for (var i = 0; i < jsonData.length; i++) {
        selObj.options.add(new Option(jsonData[i][text], jsonData[i][value]));
    }
}

function disabledForm(formId) {
    var form = document.getElementById(formId)

    if (form == null) return false;

    for (var i = 0; i < form.elements.length; i++) {
        if(form.elements[i].originDisabled ==null){
            form.elements[i].originDisabled = form.elements[i].disabled;
        }
        form.elements[i].disabled = true;
    }
}
function enableForm(formId) {
    var form = document.getElementById(formId);

    if (form == null) return false;

    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].originDisabled != null) {
            form.elements[i].disabled = form.elements[i].originDisabled;
            form.elements[i].originDisabled = null;
        } else {
            form.elements[i].disabled = false;
        }
    }
}

function initDropDown(selObj, value) {

    if (typeof (selObj) != "object") {
        selObj = document.getElementById(selObj);
    }
    selObj.value = value;
}

function setCheckboxListSingle(name) {
    $("input[name='"+name+"']").each(function () {
        $(this).change(function () {
            var curObj = this;
            $("input[name='"+name+"']").each(function () {
                if (curObj != this) {
                    $(this).attr("checked", false);
                }
            });
        })
    })
}

function bindCheckboxList(blockObj, jsonData, name, value, desc) {
    if (typeof (blockObj) != "object") {
        blockObj = document.getElementById(blockObj);
    }

    if (jsonData == null) return;

    var html = "";
    for (var i = 0; i < jsonData.length; i++) {
        html += "<label><input type='checkbox' name='" + name + "' value='" + jsonData[i][value] + "'/>" + jsonData[i][desc] + "</label>"
    }
    blockObj.innerHTML = html
}

function initCheckboxList(name, valueList) {
    if (valueList == null || valueList == '')
        return;
    $("input[name='" + name + "']").each(function () {
        //name中含有itime这个变量值的则置为选中

        var chkObj = this;
        var val = $(chkObj).val()
        chkObj.checked = false;
      //  $(chkObj).attr("checked", false);

        $.each(valueList, function (index, obj) {
            if (obj.PropValue == val) {
                chkObj.checked = true
                //$(chkObj).attr("checked", true);
                return false;
            }
        });
    });
}
function getCodeRuleChar(rule){
    var charStr= "";
    for(var i = 0 ; i < rule.length; i++){
        var len = parseInt(rule.substring(i,i+1));
        for(var j = 0 ; j < len; j++){
            charStr +="*";
        }
        charStr +="&nbsp;";
    }
    return charStr;
}

//获取URL参数
function getURLParameter(name) {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
  var r;

  if (r = window.location.href.match(reg))
      return unescape(r[2]);
  return null;
}

//获取URL参数(Json格式)
function GetRequestParam() {
  var url = window.location.href;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.split("?")[1];
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
  }
  return theRequest;
}

function uploadFile(options) {
    var settings = {
        dom: "",
        action: contextPath + "/upload.do",
        fileName: "file",
        params: {},
        allImgExt: ".jpg|.jpeg|.gif|.bmp|.png|",
        isImage:true,
        ieSubmitBtnText: "上传",
        dataType:"text",
        complete: null,
        submit: null
    }
    settings = $.extend(settings, options);
    var text = '<table style="height:100%;width:100%;font-size: 18px;" cellpadding="0" cellspacing="0" border="0"><tr><td  valign="middle"><input type="file" style="width:100%;height:30px" name="ajaxUploadFile" id="ajax_upload_file"/></td></tr></table>'
    	+'<script>'
        +'</script>';
    
    var diag = new Dialog();
    diag.Width = 400;
    diag.Height = 100;
    diag.Title = "上传附件";
    diag.InnerHtml = text;
    diag.OKEvent = function () {

        var val = $("#ajax_upload_file", topDoc).val();
        if (val == "") {
            alert("请选择文件");
            return;
        }
        var fileExt = /.[^.]+$/.exec(val.toLowerCase());
        if (settings.isImage) {
            if (settings.allImgExt.indexOf(fileExt + "|") == -1) {
                alert("该文件类型不允许上传。请上传" + settings.allImgExt + "类型的文件");
                return;
            }
        }

        topWin.$.ajaxFileUpload({
            url: settings.action,
            secureuri: false,
            fileElementId: "ajax_upload_file",
            dataType: 'json',
            success: function (result) {
                if (typeof (settings.success) == "function") settings.success(result);
                diag.close();
            },  
            error: function (result, status, e) {
                if (typeof (settings.error) == "function") {
                    settings.error(result);
                } else {
                    alert(e.message);
                }
            }
        });

    };          //点击确定后调用的方法
    diag.show();    
}

function loadFile(options) {
	var settings = {
			dom: "",
			action: contextPath + "/loadExcel.do",
			fileName: "file",
			params: {},
			allImgExt: ".xls|.xlsx|",
			ieSubmitBtnText: "上传",
			dataType:"text",
			complete: null,
			submit: null
	}
	settings = $.extend(settings, options);
	var text = '<table style="height:100%;width:100%;font-size: 18px;" cellpadding="0" cellspacing="0" border="0"><tr><td  valign="middle"><input type="file" style="width:100%;height:30px" name="ajaxUploadFile" id="ajax_upload_file"/></td></tr></table>'
		+'<script>'
		+'</script>';
	
	var diag = new Dialog();
	diag.Width = 400;
	diag.Height = 100;
	diag.Title = "上传附件";
	diag.InnerHtml = text;
	diag.OKEvent = function () {
		var val = $("#ajax_upload_file", topDoc).val();
		if (val == "") {
			alert("请选择文件");
			return;
		}
		var fileExt = /.[^.]+$/.exec(val.toLowerCase());
		if (settings.isImage) {
			if (settings.allImgExt.indexOf(fileExt + "|") == -1) {
				alert("该文件类型不允许上传。请上传" + settings.allImgExt + "类型的文件");
				return;
			}
		}
		topWin.$.ajaxFileUpload({
			url: settings.action,
			secureuri: false,
			fileElementId: "ajax_upload_file",
			dataType: 'json',
			success: function (result) {
				if (typeof (settings.success) == "function") settings.success(result);
				diag.close();
			},  
			error: function (result, status, e) {
				if (typeof (settings.error) == "function") {
					settings.error(result);
				} else {
					alert(e.message);
				}
			}
		});
	};          //点击确定后调用的方法
	diag.show();    
}

function uploadFileList(options) {
    var settings = {
        dom: "",
        action: contextPath + "/upload.do",
        fileName: "file",
        params: {},
        allImgExt: ".jpg|.jpeg|.gif|.bmp|.png|",
        ieSubmitBtnText: "上传",
        dataType:"text",
        complete: null,
        submit: null
    }
    settings = $.extend(settings, options);
    
    var diag = new Dialog();
    diag.Width = 400;
    diag.Height = 100;
    diag.Title = "上传附件";
    diag.InnerHtml = '<table style="height:100%;width:100%;font-size: 18px;" cellpadding="0" cellspacing="0" border="0"><tr><td  valign="middle"><input type="file" style="width:100%;height:25px" name="ajaxUploadFile" id="ajax_upload_file" multiple/></td></tr></table>'
    diag.OKEvent = function () {

        var val = $("#ajax_upload_file", topDoc).val();
        if (val == "") {
            alert("请选择文件");
            return;
        }
        var fileExt = /.[^.]+$/.exec(val.toLowerCase());
        if (settings.isImage) {
            if (settings.allImgExt.indexOf(fileExt + "|") == -1) {
                alert("该文件类型不允许上传。请上传" + settings.allImgExt + "类型的文件");
                return;
            }
        }
        topWin.$.ajaxFileUpload({
            url: settings.action,
            secureuri: false,
            fileElementId: "ajax_upload_file",
            dataType: 'json',
            success: function (result) {
                if (typeof (settings.success) == "function") settings.success(result);
                diag.close();
            },  
            error: function (result, status, e) {
                if (typeof (settings.error) == "function") {
                    settings.error(result);
                } else {
                    alert(e.message);
                }
            }
        });

    };          //点击确定后调用的方法
    diag.show();    
}

function downloadFile(options) {
    var settings = {
        isFull: "N",
        fullFileName: "",
        fileName: "",
        downName:""
    }
    settings = $.extend(settings, options);
    var iframeHtml = '<iframe id="downloadiframe" name="downloadiframe" style="position:absolute; top:-9999px; left:-9999px" ></iframe>';
    if ($("iframe[name=downloadiframe]").length == 0) {
        $(iframeHtml).appendTo(document.body);
    }
    var formHtml = '<form action="" method="POST" name="downloadform" target="downloadiframe"  enctype="multipart/form-data" accept-charset="utf-8"></form>';
    if ($("form[name=downloadform]").length == 0) {
        $(formHtml).appendTo(document.body);
    }
    $form = $("form[name=downloadform]");
    $form.attr("action", contextPath + "/system/export/downloadFile.do?isFull=" + settings.isfull + "&fileName=" + settings.fileName + "&fullFileName=" + settings.fullFileName + "&downName=" + settings.downName);
    $form.submit();
}

function downloadUserFile(options) {
    var settings = {
        fileList:""
    }
    settings = $.extend(settings, options);
    var iframeHtml = '<iframe id="downloadiframe" name="downloadiframe" style="position:absolute; top:-9999px; left:-9999px" ></iframe>';
    if ($("iframe[name=downloadiframe]").length == 0) {
        $(iframeHtml).appendTo(document.body);
    }
    var formHtml = '<form action="" method="POST" name="downloadform" target="downloadiframe"  enctype="multipart/form-data" accept-charset="utf-8"></form>';
    if ($("form[name=downloadform]").length == 0) {
        $(formHtml).appendTo(document.body);
    }
    $form = $("form[name=downloadform]");
    $form.attr("action", contextPath + "/system/userFile/downloadFile.do?fileList="+settings.fileList);
    $form.submit();
}

function alertSuccess(msg){
    $("#messageBox div").html(msg)
    $("#messageBox").show().delay(500).fadeOut(1200);; 
}
function alertMsg(msg, func, w, h, title){
    Dialog.alert(msg, func, w, h, title)
}
function alertError(msg, func, w, h, title){
    Dialog.error(msg, func, w, h, title)
}
function confirmMsg(msg, funcOK, funcCal, w, h, title){
    Dialog.confirm(msg, funcOK, funcCal, w, h, title)
}


(function ($) {
    $.fn.date = function (value,format) {
        if(value == null && (this.value ==""|| this.value ==null)){
            $(this).val(formatDate(new Date(), format || "yyyy-MM-dd"));
        }
        
        //$(this).attr("readonly","readonly"); 
        $(this).bind("click", function(){
            if(($(this).attr("isInput") != null && $(this).attr("isInput") != "true") 
                || ($(this).attr("isEditable")!= null && $(this).attr("isEditable")!="true")){
                return;
            }
            $(this).addClass("input_date"); 
            if(format)
            { 
                WdatePicker({dateFmt:(format || "yyyy-MM-dd")});
            }
            else
            {
                WdatePicker();
            }
        });
        $(this).bind("focus",function(){
            if(($(this).attr("isInput") != null && $(this).attr("isInput") != "true") 
                || ($(this).attr("isEditable")!= null && $(this).attr("isEditable")!="true")){
                return;
            }
            $(this).addClass("input_date"); 
            if(format)
            { 
                WdatePicker({dateFmt:(format || "yyyy-MM-dd")});
            }
            else
            {
                WdatePicker();
            }
        })
        $(this).bind("blur", function(){
            $(this).removeClass("input_date");
        });
        return this;
    };
})(jQuery);


function formatDate(dateValue, format){
    if(isNullorEmpty(dateValue)){
        return "";
    }
    if(typeof(dateValue)=="string"){
        dateValue = new Date(Date.parse(dateValue.replace(/-/g, "/")));
    }
    var o = {
        "M+": dateValue.getMonth() + 1, //month 
        "d+": dateValue.getDate(), //day 
        "h+": dateValue.getHours(), //hour 
        "m+": dateValue.getMinutes(), //minute 
        "s+": dateValue.getSeconds(), //second 
        "q+": Math.floor((dateValue.getMonth() + 3) / 3), //quarter 
        "S": dateValue.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dateValue.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


$.fn.enterToTab = function () {
    var $target = $(this);
    $target.bind('keydown', function (e) {
        var key = e.which;
        if (key == 13) {
            e.preventDefault();
            var nxtIdx = $target.index(this) + 1;
            if ($target.eq(nxtIdx).attr("type") == "submit") {
                $target.eq(nxtIdx).click();
            } else {
                $target.eq(nxtIdx).focus();
            }
        }
    });
}

function getTreeSelections(treeId){
    return $.fn.zTree.getZTreeObj(treeId).getSelectedNodes();
}

function newJgGrid(gridId,params){
    var columns = params.columns;
    var bindEvent = params.bindEvent;
    var formatter = params.formatter;
    var cellEditOpt = params.cellEditOption;
    var colModel = [];
    var sumColList = [];
    var loadComplate = null;
    for(var i=0;i < columns.length; i++){
        if(params.showCol || columns[i].isShow){
            var col = {
                name: columns[i].code,
                label:columns[i].text,
                isRequired:columns[i].isRequired,
                width:columns[i].width,
                editable:columns[i].isInput,
                align:columns[i].align==null?"left":columns[i].align,
                hidden:columns[i].hidden==null?false:columns[i].hidden,
                sortable:columns[i].sortable==null?true:columns[i].sortable,
                resizable: columns[i].resizable == null? true:columns[i].resizable,
                frozen:columns[i].frozen == null? false:columns[i].frozen
            };
            if(bindEvent !=null && bindEvent[columns[i].code]!=null){
                col.editoptions ={};
                col.editoptions.dataInit = bindEvent[columns[i].code];
            }else if(bindEvent !=null && bindEvent[columns[i].code]==null && columns[i].isInput && columns[i].dataType=="date" && !columns[i].isSystem){
                col.editoptions ={};
                col.editoptions.dataInit = function(obj,rowOpts, rowData){
                    $(obj).date("");
                };
            }
            
            if(cellEditOpt != null && cellEditOpt[columns[i].code]!=null){
                col.edittype = cellEditOpt[columns[i].code].editType;
                col.editoptions = $.extend(col.editoptions,cellEditOpt[columns[i].code].editOptions);
            }
            
            if(columns[i].dataType=="number"){
                var precision = columns[i].decimalPlaces == null?2:columns[i].decimalPlaces;
                col.formatter = "number";
                col.formatoptions = {
                    decimalPlaces : precision
                }
                if(columns[i].formative=="Y"){
                    col.formatoptions.thousandsSeparator=","
                }
            }
            if(!isNullorEmpty(columns[i].formatter)){
                eval("col.formatter = function(value, rowOpts, rowData){"+columns[i].formatter+"}")
            }else if(formatter !=null && formatter[columns[i].code]!=null ){
               col = $.extend(col,formatter[columns[i].code]);
               var formatterFun = col.formatter;
               columns[i].formatter = formatterFun.toString().substring(formatterFun.toString().indexOf("{")+1,formatterFun.toString().lastIndexOf("}"))
            }
            if(columns[i].isSum){
                sumColList.push(columns[i].code);
            }
            colModel.push(col)
        }
    }
    var resizeStop = null;
    if(params.saveColWidth){
        resizeStop = function(colModel, width,idx){
            ajaxSubmit({
                url: contextPath + "/system/gridColumn/saveGridColumnWidth.do",
                lockScreen:false,
                data: {
                    pathUrl: params.pathUrl!= null? params.pathUrl:getCurrentLocation(),
                    gridId: gridId,
                    colId: colModel.name,
                    width:width
                }
            });
        }
    }
    var loadComplete = null;
    if(sumColList.length>0){
        params.footerrow=true;
        var completeFun = params.loadComplete;
        params.loadComplete =function(){
            var totalData ={"cb": ''}
            for(var i = 0 ; i < sumColList.length; i++){
                totalData[sumColList[i]] = $("#"+gridId).getCol(sumColList[i],false,'sum');
            }
            $("#"+gridId).footerData('set', totalData);
            if(completeFun!= null){
                completeFun();
            }
            
        }
    }
    
    var settings = $.extend({
        data: [],
        localReader:{
            id:"jqRowId_"
        },
        datatype : "local",
        colModel : colModel,
        rowNum:2000,
        multiselect: true,
        pagination:false,
        mtype : "post",
        scroll:1,
        viewrecords : true,
        cellEdit:true, 
        shrinkToFit:false,
        rownumbers:true,
        width:'auto',
        resizeStop:resizeStop
    }, params);

    var grid = $("#"+gridId).jqGrid(settings);
    $("#"+gridId).jqGrid("setGridParam",{gridSetting:params});
    return grid;
}

function newDataGrid(gridId,params){
    var columns = params.columns;
    var colModel = [];
    
    for(var i=0;i < columns.length; i++){
        var col = {
            field: columns[i].code,
            title:columns[i].text,
            width:columns[i].width,
            halign:"center",
            align:columns[i].align==null?"left":columns[i].align
        };
        colModel.push(col)
    }
    params.columns = [colModel];
    
    var settings = $.extend({
        locale: "zh_CN",
        nowrap: false,
        singleSelect: false,
        striped: true, //使用分隔行
        collapsible: true, //是否可折叠的  
        width:"100%",
        height:"auto",
        remoteSort: false, //设置页面排序
        border: false,
        data: [],
        columns: [colModel],
        pageList: [50, 100, 150, 200],
        pageSize: 100,
        pagination: false,
        rownumbers: true,
        fitColumns: false
    }, params);
    
    $("#"+gridId).datagrid(settings);
}

function inputToDropDown(inputId, selId,selCallBack){
    var inputObj = $(inputId);
    var selObj = $(selId);
    if(typeof(inputId) =="string"){
        inputObj = $("#"+inputId);
    }
    if(typeof(selId) =="string"){
        selObj = $("#"+selId);
    }
    selObj.hide();
    inputObj.bind("focus",function(){
        if(($(inputObj).attr("isInput") != null && $(inputObj).attr("isInput") != "true") 
            || ($(inputObj).attr("isEditable")!= null && $(inputObj).attr("isEditable")!="true")){
            return;
        }
        if(!selObj.prop("disabled")){
            var width = inputObj.width();
            selObj.css("width", width+3);
            selObj.css("padding", 0);
            selObj.show();
            inputObj.hide();
            inputObj.attr("readonly","readonly");
            selObj.find("option").filter(function(){return $(this).text()==inputObj.val();}).prop("selected",true);
        }
    });
    selObj.bind("blur",function(){
        selObj.hide();
        inputObj.show();
    });
    selObj.data("last", selObj.val()).bind("change",function(){
        if (typeof (selCallBack) == "function"){
            var resultVal = selCallBack(selObj);
            if(resultVal ==false){
                selObj.hide();
                inputObj.show();
                return;
            }
        }
        inputObj.val(selObj.find("option:selected").text());
        selObj.hide();
        inputObj.show();
        selObj.data("last", selObj.val());
    });
    selObj.appendTo(inputObj.parent())
}

//文本框只能输入数字(不包括小数)，并屏蔽输入法和粘贴 
$.fn.integer = function (option) {
    var settings = $.extend({
        textAlign: "right"
    }, option);
    $(this).css("ime-mode", "disabled");
    $(this).css("text-align", settings.textAlign);
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which); //兼容火狐 IE 
        if (isIE && (e.keyCode == 0x8)) { //火狐下不能使用退格键 
            return;
        }
        return code >= 48 && code <= 57;
    });
    this.bind("paste", function () {
        return false;
    });
    this.bind("keyup", function () {
        if (!/^[0-9]*$/.test(this.value)) {
            this.value = this.value.replace(/[^0-9.]/gi,"")
        }
    });
    this.bind("input", function () {
    	if (!/^[0-9]*$/.test(this.value)) {
            this.value = this.value.replace(/[^0-9.]/gi,"")
        }
    });
};

$.fn.number = function (option) {
    var settings = $.extend({
        textAlign: "right",
        precision: 2,
        groupSeparator: ","
    }, option);

    $(this).css("ime-mode", "disabled");
    $(this).css("text-align", settings.textAlign);
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which); //兼容火狐 IE 
        if (isIE && (e.keyCode == 0x8)) { //火狐下不能使用退格键 
            return;
        }
        if(this.value ==""){
            return (code >= 48 && code <= 57) || (code == 45);
        } else if (code == 45) {
            return this.value.indexOf("-") == -1;
        } else if (code == 46) {
            return this.value.indexOf(".") == -1;
        } else {
            return code >= 48 && code <= 57
        }
    });
    this.bind("paste", function () {
        return true;
    });
    this.bind("keyup", function () {
        if (this.value.slice(0, 1) == ".") {
            this.value = "0.";
        }
        if(this.value=="-"){
            return ;
        }
        if (this.value.indexOf("-") > 0) {
            this.value = this.value.replace('-', '');
        }
        if (this.value.indexOf(",") > 0) {
            this.value = this.value.replace(',', '');
        }
        var reg = /^(\-)?[0-9]+.?[0-9]*$/;
        if(!reg.test(this.value)){
            this.value=""
        }
    });
    this.bind("input", function () {
    	if (this.value.slice(0, 1) == ".") {
    		this.value = "0.";
    	}
    	if(this.value=="-"){
    		return ;
    	}
    	if (this.value.indexOf("-") > 0) {
    		this.value = this.value.replace('-', '');
    	}
    	if (this.value.indexOf(",") > 0) {
    		this.value = this.value.replace(',', '');
    	}
    	var reg = /^(\-)?[0-9]+.?[0-9]*$/;
    	if(!reg.test(this.value)){
    		this.value=""
    	}
    });
    $(this).unbind("blur.number");
    this.bind("blur.number", function () {
        if (this.value == "-") {
            this.value = "";
            return;
        }
        if (this.value.slice(-1) == ".") {
            this.value = this.value.slice(0, this.value.length - 1);
        }
        if (settings.precision != null&& settings.precision != "") {
            if (this.value != "") {
                var reg = /^(\-)?[0-9]+.?[0-9]*$/;
                if(reg.test(this.value)){
                    this.value = parseFloat(this.value).toFixed(settings.precision)
                }
            }
        }
//        if (settings.groupSeparator != "") {
//            if (this.value != "") {
//                this.value = obj2money(this.value);
//            }
//        }
    });
    $(this).unbind("focus.number");
    this.bind("focus.number", function () {

        if (settings.groupSeparator != "") {
            if (this.value != "") {
                this.value = this.value.replace(/,/gi, '');
            }
        }
        $(this).select();
    });
    this.blur();

    if (settings.groupSeparator != "") {
        $(this).prop("groupSeparator", true);
    }
};


function addFun(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (mulFun(m,arg1) + mulFun(m,arg2)) / m
}

function mulFun(arg1, arg2, precision) {
    if(arg1 == null || arg2==null){
        return null;
    }
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    var result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    if (precision != null) {
        result = result.toFixed(precision);
    }
    return result
}

function divFun(arg1, arg2, precision) {
    if(isNullorEmpty(arg1)|| isNullorEmpty(arg2)){
        return null;
    }
    if(isNaN(arg1) || isNaN(arg2)){
        return null;
    }
    var t1=0,t2=0,r1,r2;  
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    
    r1=Number(arg1.toString().replace(".",""))  
    r2=Number(arg2.toString().replace(".",""))  
    var result = (r1/r2)*Math.pow(10,t2-t1);  
    if (precision != null) {
        result = result.toFixed(precision);
    }
    return result
}

function formatNumber(value, precision) {
    if(isNullorEmpty(value)){
        return "";
    }
    var reg = /^(\-)?[0-9]+.?[0-9]*$/;
    if(reg.test(value)){
        return parseFloat(value).toFixed(precision);
    }
    else {
        return value;
    }
}

function GetAppSetting(){
    var appSetting = topWin.appSetting;
    if(appSetting == null){
        ajaxSubmit({
            url: contextPath + "/getUserInit.do",
            async:false,
            success: function (result) {
                if (result.isOk == "Y") {
                    appSetting = result.data.appSetting;
                    topWin.appSetting = appSetting;
                } 
            }
        });
        
    }
    return appSetting;
}

var sysAppSetting = {
    "getQuantityPrecision": function () {
        var rdSetting = GetAppSetting().RD;

        if (rdSetting != null && rdSetting.QuantityPrecision != null) {
            return parseInt(rdSetting.QuantityPrecision);
        }
        return 2;
    },
    "getPricePrecision": function () {
        var rdSetting = GetAppSetting().RD;

        if (rdSetting != null && rdSetting.PricePrecision != null) {
            return parseInt(rdSetting.PricePrecision);
        }
        return 2;
    },
    "getAmountPrecision": function () {
        var rdSetting = GetAppSetting().RD;

        if (rdSetting != null && rdSetting.AmountPrecision != null) {
            return parseInt(rdSetting.AmountPrecision);
        }
        return 2;
    }
}

function getAppSetting(propName){
    var appSetting = GetAppSetting();
    if(appSetting == null){
        return null;
    }
    return getDataFromJson(appSetting,propName)
}
var vouchFPNL = { First: "F", Prev: "P", Next: "N", Last: "L" };


function showDataGridCol(gridId, pathUrl) {

    var dg = $('#' + gridId);
    var columnFileds = dg.datagrid('getColumnFields');

    var columnsOptions = [];
    for (var i = 0; i < columnFileds.length; i++) {
        columnsOptions.push(dg.datagrid('getColumnOption', columnFileds[i]));
    }
    dg.datagrid('options').originalColumns=columnsOptions;

    var options = dg.datagrid('options');
    var cols = [];

    ajaxSubmit({
        url: contextPath + "/system/gridColumn/getGridColumnList.do",
        async: false,
        data: {
            pathUrl: pathUrl!= null? pathUrl:getCurrentLocation(),
            gridId: gridId
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var colList = result.data.colList;
                if(colList.length ==0){
                    return;
                }
                
                var dataList = dg.datagrid("getData");

                if(columnsOptions[0].checkbox){
                    cols.push(columnsOptions[0]);
                }
                for (var j = 0; j < colList.length; j++) {
                    for (var i = 0; i < columnFileds.length; i++) {
                        var colOpt = dg.datagrid('getColumnOption', columnFileds[i]); 
                        if (columnFileds[i] == colList[j].colId) {
                            
                            if(!colList[j].isHidden){
                                var title = colList[j].colTitle;
                                if (colList[j].isRequired) {
                                    title = '<span class="needLabel">' + title + '</span>'
                                }

                                colOpt.title = title;
                                colOpt.width = colList[j].colWidth;
                                colOpt.align = colList[j].colAlign;
                                colOpt.hidden = colList[j].isHidden;
                                colOpt.sortable = colList[j].isSortable==null?false:colList[j].isSortable;
                            
                                cols.push(colOpt);
                            }
                        }
                    }
                }
                options.columns[0]= cols;
                dg.datagrid(options);
                dg.datagrid('loadData', dataList);
            }
        }
    });
}
function setDataGridCol(gridId, pathUrl) {
    
    var dg = $('#' + gridId);
    var columnsOptions = dg.datagrid('options').originalColumns;
    var options = dg.datagrid('options');
    var cols = [];
    
    openDialog({
        url: contextPath + "/pages/common/colSet/colSet.jsp",
        dialogWidth:800,
        dialogHeight:600,
        dialogParams: {
            colOpts: columnsOptions,
            gridId: gridId,
            pathUrl: pathUrl != null ? pathUrl : getCurrentLocation()
        },
        dialogCallBack: function (returnVal) {
            dg = $('#' + gridId);
            if(dg.length ==0){
                return ;
            }
            if (returnVal != null) {
                var newColOpts = returnVal;

                
                var dataList = dg.datagrid("getData");
                
                if(columnsOptions[0].checkbox){
                    cols.push(columnsOptions[0]);
                }
                for (var i = 0; i < newColOpts.length; i++) {
                    for(var j = 0; j < columnsOptions.length; j++){
                        if(newColOpts[i].colId ==columnsOptions[j].field){
                            if(!newColOpts[i].isHidden){
                                var title = newColOpts[i].colTitle;
                                if (newColOpts[i].isRequired) {
                                    title = '<span class="needLabel">' + title + '</span>'
                                }
                                var colOpt = columnsOptions[j];
                                colOpt.title = title;
                                colOpt.width = newColOpts[i].colWidth;
                                colOpt.align = newColOpts[i].colAlign;
                                colOpt.hidden = newColOpts[i].isHidden;
                                colOpt.sortable = newColOpts[i].IsSortable==null?false:newColOpts[i].IsSortable;

                                cols.push(colOpt);
                            }
                        }
                    }
                }
                options.columns[0] = cols;
                dg.datagrid(options);
                dg.datagrid('loadData', dataList);
            }
        }
    })
}

function showJgGridCol(gridId, pathUrl) {

    var dg = $('#' + gridId);
    var gridSetting = dg.jqGrid("getGridParam","gridSetting");
    var cols = [];
    ajaxSubmit({
        url: contextPath + "/system/gridColumn/getGridColumnList.do",
        async: false,
        data: {
            pathUrl: pathUrl!= null? pathUrl:getCurrentLocation(),
            gridId: gridId
        },
        success: function (result) {
            if (result.isOk == "Y") {
                var colList = result.data.colList;
                if(colList.length ==0){
                    return;
                }
                var dataList = $.extend([],dg.jqGrid("getData"),true);
                var flag = false;
                for (var i = 0; i < colList.length; i++) {
                	if(colList[i].frozen==true){
                		flag = true;
                	}
                    cols.push({
                        code:colList[i].colId,
                        col:colList[i].colField,
                        text:colList[i].colTitle,
                        width:colList[i].colWidth,
                        align:colList[i].colAlign,
                        hidden:colList[i].isHidden,
                        dataType:colList[i].colType,
                        decimalPlaces:colList[i].colPresicion,
                        formatter:colList[i].colFormatter,
                        isSum:colList[i].isSum==null? false:colList[i].isSum,
                		frozen:colList[i].frozen==null? false:colList[i].frozen,
        				isExportFmt:colList[i].isExportFmt==null? false:colList[i].isExportFmt,
						sortable:colList[i].sortable==null? false:colList[i].sortable,
						formative:colList[i].formative
                    });
                }
                var groupHeaders = $('#' + gridId)[0].p.groupHeader;
                //复制groupHeaders
                var newGroupHeaders = {}
                if(groupHeaders!=null&&groupHeaders.length>0){
                	jQuery.extend(true, newGroupHeaders, groupHeaders[0]);
                }
                window.setTimeout(function(){
                    $.jgrid.gridUnload(gridId);
                    gridSetting.columns = cols;
                    gridSetting.saveColWidth =true;
                    
                    newJgGrid(gridId, gridSetting);
                    if(!jQuery.isEmptyObject(newGroupHeaders)){
                    	$('#' + gridId).jqGrid('setGroupHeaders',newGroupHeaders)
                    }
                    if(flag){
                    	$('#' + gridId).jqGrid('setFrozenColumns');
                    }
                    $('#' + gridId).jqGrid("loadData",dataList);
                },30)
                
            }
        }
    });
}

function setjqGridCol(gridId, pathUrl) {
    
    var dg = $('#' + gridId);
    var gridSetting = dg.jqGrid("getGridParam","gridSetting");
    var cols = [];
    
    openDialog({
        url: contextPath + "/pages/common/colSet/jqGridColSet.jsp",
        dialogWidth:700,
        dialogHeight:500,
        dialogParams: {
            columnList: gridSetting.columns,
            gridId: gridId,
            pathUrl: pathUrl != null ? pathUrl : getCurrentLocation()
        },
        dialogCallBack: function (returnVal) {
            dg = $('#' + gridId);
            if(dg.length ==0){
                return ;
            }
            if (returnVal != null) {
                var newColOpts = returnVal;

                var dataList = $.extend([],dg.jqGrid("getData"),true);
                var flag = false;
                for (var i = 0; i < newColOpts.length; i++) {
                	if(newColOpts[i].frozen){
                		flag = true
                	}
                    cols.push({
                        code:newColOpts[i].colId,
                        col:newColOpts[i].colField,
                        text:newColOpts[i].colTitle,
                        width:newColOpts[i].colWidth,
                        align:newColOpts[i].colAlign,
                        hidden:newColOpts[i].isHidden,
                        dataType:newColOpts[i].colType,
                        decimalPlaces:newColOpts[i].colPresicion,
                        formatter:newColOpts[i].colFormatter,
                        isSum:newColOpts[i].isSum==null? false:newColOpts[i].isSum,
                		frozen:newColOpts[i].frozen==null? false:newColOpts[i].frozen,
        				isExportFmt:newColOpts[i].isExportFmt==null? false:newColOpts[i].isExportFmt,
						sortable:newColOpts[i].sortable==null? false:newColOpts[i].sortable,
						formative:newColOpts[i].formative
                    });
                }
                var groupHeaders = $('#' + gridId)[0].p.groupHeader;
                //复制groupHeaders
                var newGroupHeaders = {}
                if(groupHeaders!=null&&groupHeaders.length>0){
                	jQuery.extend(true, newGroupHeaders, groupHeaders[0]);
                }
                gridSetting.columns = cols;
                window.setTimeout(function(){
                $.jgrid.gridUnload(gridId);
                gridSetting.data = dataList;
                newJgGrid(gridId, gridSetting);
                if(!jQuery.isEmptyObject(newGroupHeaders)){
                	$('#' + gridId).jqGrid('setGroupHeaders',newGroupHeaders)
                }
                if(flag){
                	$('#' + gridId).jqGrid('setFrozenColumns');
                }
                },30)
            }
        }
    })
}
function getDataFromJson(obj, expr){
    var ret,p,prm = [], i;
    if( typeof expr === 'function') { return expr(obj); }
    ret = obj[expr];
    if(ret===undefined) {
        try {
            if ( typeof expr === 'string' ) {
                prm = expr.split('.');
            }
            i = prm.length;
            if( i ) {
                ret = obj;
                while (ret && i--) {
                    p = prm.shift();
                    ret = ret[p];
                }
            }
        } catch (e) {}
    }
    return ret;
}

function setDataForJson(obj, expr, value){
    if(obj == null){
        return;
    }
    var prm = expr.split('.');
    var i = prm.length;
    var p, ret = obj;
    if( i ) {
        while (i--) {
            p = prm.shift();
            if(ret[p] == null){
                ret[p] = {}
            }
            if(i==0){
                ret[p] =value
            }else{
                ret = ret[p];
            }
        }
    }
}
function isRepeatArray(array){
    return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test("\x0f"+array.join("\x0f\x0f") +"\x0f");
}


var session = {
    "getLoginUser": function () {
        var loginUser = topWin.loginUser;

        if (loginUser == null) {
            return null;
        }
        return loginUser;
    },
    "getUserCode": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.sysUserCode;
        }
        return "";
    },
    "getUserName": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.SysUserName;
        }
        return "";
    },
    "getPersonCode": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.PersonCode;
        }
        return "";
    },
    "getPersonName": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.personName;
        }
        return "";
    },
    "getDeptCode": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null && loginUser.dept) {
            return loginUser.dept.deptCode;
        }
        return "";
    },
    "getDeptName": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.deptName;
        }
        return "";
    },
    "getRoleName": function () {
        var loginUser = session.getLoginUser();

        if (loginUser != null) {
            return loginUser.sysRoleName;
        }
        return "";
    }
}

function contextPopup(menuData) {
    // Define default settings
    var settings = {
        contextMenuClass: 'contextMenuPlugin',
        gutterLineClass: 'gutterLine',
        headerClass: 'header',
        seperatorClass: 'divider',
        title: '',
        event:null,
        items: []
    };
    
    // merge them
    $.extend(settings, menuData);

    // Build popup menu HTML
    function createMenu(e) {
        var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
            .appendTo(document.body);
        if (settings.title) {
        $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
        }
        settings.items.forEach(function(item) {
            if (item) {
                var rowCode = '<li><a href="#"><span></span></a></li>';
                // if(item.icon)
                //   rowCode += '<img>';
                // rowCode +=  '<span></span></a></li>';
                var row = $(rowCode).appendTo(menu);
                if(item.icon){
                    var icon = $('<img>');
                    icon.attr('src', item.icon);
                    icon.insertBefore(row.find('span'));
                }
                row.find('span').text(item.label);
                var enable = true;
                if(typeof (item.enable) == "function"){
                    enable = item.enable()
                }
                if(enable){
                    if (item.action) {
                        row.find('a').click(function(){ item.action(e); });
                    }
                }else{
                    row.find('a').attr("disabled",true).css("color","#ccc")
                }
                
                
            } else {
                $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
            }
        });
        menu.find('.' + settings.headerClass ).text(settings.title);
        return menu;
    }
    $("."+settings.contextMenuClass).remove();
    var menu = createMenu(settings.event).show();
    var left = settings.event.pageX + 5, /* nudge to the right, so the pointer is covering the title */
        top = settings.event.pageY;
    if (top + menu.height() >= $(window).height()) {
        top -= menu.height();
    }
    if (left + menu.width() >= $(window).width()) {
        left -= menu.width();
    }

    // Create and show menu
    menu.css({zIndex:1000001, left:left, top:top})
      .bind('contextmenu', function() { return false; });

    // Cover rest of page with invisible div that when clicked will cancel the popup.
    $(document.body).bind('contextmenu click', function() {
        // If click or right click anywhere else on page: remove clean up.
      window.setTimeout(function(){
          menu.remove();
      },1)
    });

    // When clicking on a link in menu: clean up (in addition to handlers on link already)
    menu.find('a').click(function() {
      menu.remove();
    });
    return false;
};

function outputExcel(action, data) {
    var $form = $('<form action="" name="outputExcelForm" method="post"/>');
    $form.appendTo(document.body);
    if (data) {
        for (var prop in data) {
            var temp = $("<input type='hidden' name='" + prop + "' value=''/>");
            temp.val(data[prop]);
            temp.appendTo($form);
        }
    }
    $form.attr('method', "post");
    $form.attr('action', action);
    $form.attr('enctyped', 'multipart/form-data');
    $form.submit();
}

function outDtExcel(options) {
    var settings = {
        fileName: "新建工作簿1",
        sheetName: "sheet1"
    }
    settings = $.extend(settings, options);
    var action = contextPath + "/system/export/exportExcel.do";

    outputExcel(action, settings);
}
function resetForm(formId){
    $("#"+formId)[0].reset();
    $("#"+formId+" input").val("");
}

function currencyFormatter(value, row, index) {
    if(value ==="" || value === null||value == null){
        return "";
    }
    return $.fmatter.util.NumberFormat(value, { thousandsSeparator: ',', decimalPlaces: 2 })
}

function dataGridOutExcel(dataGridId,options,myCols){
     var dataList = options.dataList;
     if(dataList == null){
       dataList = $('#'+dataGridId).datagrid("getRows");
    }
    var gridSetting = $('#'+dataGridId).datagrid("options");
    
    var colList = [];
    
    var frozenColumns = gridSetting.frozenColumns[0];
    
    for (var i = 0; i < frozenColumns.length; i++) {
        if(typeof(frozenColumns[i].field) != undefined && frozenColumns[i].field!=null){
            colList.push({
                colId: frozenColumns[i].field,
                colTitle: frozenColumns[i].title,
                colWidth: frozenColumns[i].width==null?50:frozenColumns[i].width,
                colAlign: frozenColumns[i].align==null?"left":frozenColumns[i].align,
                colType:frozenColumns[i].dataType==null?"text":frozenColumns[i].dataType,
                colPrecision:frozenColumns[i].decimalPlaces,
                isHidden:frozenColumns[i].hidden==null?false:frozenColumns[i].hidden,
                colFormatter:frozenColumns[i].formatter
            })
        }
    }
    
    
    var cols = gridSetting.columns[0];
    
   
   
    for (var i = 0; i < cols.length; i++) {
        if(typeof(cols[i].field) != undefined && cols[i].field!=null){
            colList.push({
                colId: cols[i].field,
                colTitle: cols[i].title,
                colWidth: cols[i].width==null?50:cols[i].width,
                colAlign: cols[i].align==null?"left":cols[i].align,
                colType:cols[i].dataType==null?"text":cols[i].dataType,
                colPrecision:cols[i].decimalPlaces,
                isHidden:cols[i].hidden==null?false:cols[i].hidden,
                colFormatter:cols[i].formatter
            })
        }
    }
   
    if(gridSetting.columns[1]!=null){
         var cols1 = gridSetting.columns[1];
         for (var i = 0; i < cols1.length; i++) {
             if(typeof(cols1[i].field) != undefined && cols1[i].field!=null){
                 if(typeof(cols1[i].isExport) == undefined || cols1[i].isExport ==null || cols1[i].isExport=="true")
                 colList.push({
                     colId: cols1[i].field,
                     colTitle: cols1[i].title,
                     colWidth: cols1[i].width==null?50:cols1[i].width,
                     colAlign: cols1[i].align==null?"left":cols1[i].align,
                     colType:cols1[i].dataType==null?"text":cols1[i].dataType,
                     colPrecision:cols1[i].decimalPlaces,
                     isHidden:cols1[i].hidden==null?false:cols1[i].hidden,
                     colFormatter:cols1[i].formatter
                 })
             }
         }
    }
    outDtExcel({
        fileName:options.fileName,
        sheetName:options.sheetName,
        titleList:JSON.stringify(colList),
        dataList:JSON.stringify(dataList)
    });
}


function jqGridMerge(gridId, mergeBy, mergeNameList) {
    var trs = $("#"+gridId+">tbody>tr:gt(0),#dataGrid_frozen>tbody>tr:gt(0)");
    
    var mergeByBg = trs.eq(0).children("[aria-describedby='"+gridId+"_" + mergeBy + "']"),
    rowsp = 1;

    trs.slice(1).each(function (ind2, tr) {
        var mergeByCur = $(tr).children("[aria-describedby='"+gridId+"_" + mergeBy + "']");
        if(mergeByBg.text() === mergeByCur.text()){
            rowsp++;
            $.each(mergeNameList, function (ind, name) {
                $(tr).children("[aria-describedby='"+gridId+"_" + name + "']").hide();
            })
        }else{
            $.each(mergeNameList, function (ind, name) {
                $(mergeByBg).parent().children("[aria-describedby='"+gridId+"_" + name + "']").attr("rowspan", rowsp)//.css("background", "#fff");
            })
            mergeByBg = mergeByCur;
            rowsp = 1;
        }
        $.each(mergeNameList, function (ind, name) {
            $(mergeByBg).parent().children("[aria-describedby='"+gridId+"_" + name + "']").attr("rowspan", rowsp);
        })
    });
}

function OnFilter(txtObj,listId) {
    var listObj = $("select[id$='" + listId + "']");
    if (listObj) {
        var optionList = listObj.find("option");
        for (var i = 0; i < optionList.length; i++) {
            var option = $(optionList[i]);
            option.removeAttr("selected");
            var optionP = option.parent("span");
            
            var strs = option.text().toLowerCase().split(/\s|[(]|[（]/g);
            var flag = true;
            if(strs.length==0){
            	if(strs.indexOf(txtObj.value.toLowerCase())==0){
                    flag = false;
            	}
            }else{
            	for (var j = 0; j < strs.length; j++) {
     				if(strs[j].indexOf(txtObj.value.toLowerCase())==0){
     					flag = false;
     				}
     			}
            }
            if(flag){
            	if (!optionP.size()) {
                    option.wrap("<span style='display:none'></span>");
                }  
            }else{
            	if (optionP.size()) {
                    optionP.children().clone().replaceAll(optionP);
                }
            }
           
            /*if (option.text().toLowerCase().indexOf(txtObj.value.toLowerCase()) == -1) {
                if (!optionP.size()) {
                    option.wrap("<span style='display:none'></span>");
                }                
            }else {
                if (optionP.size()) {
                    optionP.children().clone().replaceAll(optionP);
                }
            }*/
        }
    }
    return false;
}

function setImportTemplate(dbType){
    
    openDialog({
        url: contextPath + "/pages/common/importTemplate/importTemplateList.jsp?dbType="+dbType,
        dialogWidth:700,
        dialogHeight:500,
        dialogCallBack: function (returnVal) {
            if (returnVal != null) {
            }
        }
    })
}

function downImportTemplate(dbType, fileName){
    ajaxSubmit({
        url: contextPath + "/system/importTemplate/getImportTemplateList.do",
        data: {
            dbType: dbType
        },
        success: function (result) {
            if (result.isOk == "Y") {
                if(result.data.importTemplateList == null || result.data.importTemplateList.length ==0){
                    alertError("未设置导入模板")
                    return;
                }
                var colList = [];
                for(var i = 0 ; i < result.data.importTemplateList.length; i++){
                    colList.push({
                        colTitle: result.data.importTemplateList[i].text,
                        colWidth: "120"
                    })
                }
                outDtExcel({
                    fileName:fileName,
                    titleList:JSON.stringify(colList)
                });
            } 
       }
    });
}
