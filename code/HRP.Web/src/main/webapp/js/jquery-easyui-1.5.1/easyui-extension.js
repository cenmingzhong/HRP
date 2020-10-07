$.extend($.fn.datagrid.methods, {
    statistics: function (jq, params) {
        var opt=$(jq).datagrid('options').columns;
        var frozenColumns=$(jq).datagrid('options').frozenColumns;
        var rows = $(jq).datagrid("getRows");
        
        if(params != null){
            if(params.IsSelected){
                rows = $(jq).datagrid("getSelections");
            }
        }


        var footer = new Array();
        footer['sum'] = "";
        footer['avg'] = "";
        footer['max'] = "";
        footer['min'] = "";
        var idx = opt.length-1;
        for(var i=0; i<opt[idx].length; i++){
            if(opt[idx][i].sum){
                footer['sum'] = footer['sum'] + sum(opt[idx][i].field)+ ',';
            }
            if(opt[idx][i].avg){
                footer['avg'] = footer['avg'] + avg(opt[idx][i].field)+ ',';
            }
            if(opt[idx][i].max){
                footer['max'] = footer['max'] + max(opt[idx][i].field)+ ',';
            }
            if(opt[idx][i].min){
                footer['min'] = footer['min'] + min(opt[idx][i].field)+ ',';
            }
        }
 
        var footerObj = new Array();
         
        if(footer['sum'] != ""){
            var tmp = '{' + footer['sum'].substring(0,footer['sum'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');
            
            if(frozenColumns != null &&frozenColumns.length!=0){
                if(obj[frozenColumns[0][0].field] == undefined){
                    footer['sum'] += '"' + frozenColumns[0][0].field + '":"合计"';
                    obj = eval('({' + footer['sum'] + '})');
                }else{
                    obj[frozenColumns[0][0].field] = "合计" + obj[frozenColumns[0][0].field];
                }
            }else{

                if(obj[opt[idx][1].field] == undefined){
                    footer['sum'] += '"' + opt[idx][1].field + '":"合计"';
                    obj = eval('({' + footer['sum'] + '})');
                }else{
                    obj[opt[idx][1].field] = "合计" + obj[opt[idx][1].field];
                }
            }
            footerObj.push(obj);
        }
         
        if(footer['avg'] != ""){
            var tmp = '{' + footer['avg'].substring(0,footer['avg'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');
            if(obj[opt[0][0].field] == undefined){
                footer['avg'] += '"' + opt[0][0].field + '":"<b>当页均值:</b>"';
                obj = eval('({' + footer['avg'] + '})');
            }else{
                obj[opt[0][0].field] = "<b>当页均值:</b>" + obj[opt[0][0].field];
            }
            footerObj.push(obj);
        }
         
        if(footer['max'] != ""){
            var tmp = '{' + footer['max'].substring(0,footer['max'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');
             
            if(obj[opt[0][0].field] == undefined){
                footer['max'] += '"' + opt[0][0].field + '":"<b>当页最大值:</b>"';
                obj = eval('({' + footer['max'] + '})');
            }else{
                obj[opt[0][0].field] = "<b>当页最大值:</b>" + obj[opt[0][0].field];
            }
            footerObj.push(obj);
        }
         
        if(footer['min'] != ""){
            var tmp = '{' + footer['min'].substring(0,footer['min'].length - 1) + "}";
            var obj = eval('(' + tmp + ')');
             
            if(obj[opt[0][0].field] == undefined){
                footer['min'] += '"' + opt[0][0].field + '":"<b>当页最小值:</b>"';
                obj = eval('({' + footer['min'] + '})');
            }else{
                obj[opt[0][0].field] = "<b>当页最小值:</b>" + obj[opt[0][0].field];
            }
            footerObj.push(obj);
        }
         
         
         
        if(footerObj.length > 0){
            for(var i =0 ; i < footerObj.length;i++){
                footerObj[i].IsFooter = true;
            }
            $(jq).datagrid('reloadFooter',footerObj); 
        }
         
         
        function sum(filed){
            var sumNum = 0;
            for(var i=0;i<rows.length;i++){
                sumNum += Number(rows[i][filed]);
            }
            return '"' + filed + '":"' + sumNum.toFixed(2) +'"';
        };
         
        function avg(filed){
            var sumNum = 0;
            for(var i=0;i<rows.length;i++){
                sumNum += Number(rows[i][filed]);
            }
            return '"' + filed + '":"'+ (sumNum/rows.length).toFixed(2) +'"';
        }
 
        function max(filed){
            var max = 0;
            for(var i=0;i<rows.length;i++){
                if(i==0){
                    max = Number(rows[i][filed]);
                }else{
                    max = Math.max(max,Number(rows[i][filed]));
                }
            }
            return '"' + filed + '":"'+ max +'"';
        }
         
        function min(filed){
            var min = 0;
            for(var i=0;i<rows.length;i++){
                if(i==0){
                    min = Number(rows[i][filed]);
                }else{
                    min = Math.min(min,Number(rows[i][filed]));
                }
            }
            return '"' + filed + '":"'+ min +'"';
        }
    }
});

$.extend($.fn.datagrid.methods, {
    getCheckedRows: function (jq) {
        var rr = [];
        var rows = jq.datagrid('getRows');
        jq.datagrid('getPanel').find('div.datagrid-cell-check input[type=checkbox]:checked').each(function () {
            var index = $(this).parents('tr:first').attr('datagrid-row-index');
            rows[index].checked = false;
            rr.push(rows[index]);
        });
        return rr;
    }
});

//虚拟删除行
$.extend($.fn.datagrid.methods, {
    virtualDeleteRow: function (jq, deledRow) {
        if($(jq).datagrid('options').deleteRows==null){
            $(jq).datagrid('options').deleteRows = [];
        }
        deledRow.IsDelete = true;
        $(jq).datagrid('options').deleteRows.push(deledRow);
        $(jq).datagrid('deleteRow', $(jq).datagrid('getRowIndex', deledRow));
    }
});

//清空虚拟删除行
$.extend($.fn.datagrid.methods, {
    clearDeletedRows: function (jq, deledRow) {
        $(jq).datagrid('options').deleteRows=null;
    }
});
//获取所有行
$.extend($.fn.datagrid.methods, {
    getAllRows: function (jq) {
        var allRows = [];
        var data = jq.datagrid('getData');
        if(data.firstRows!=null){
            for(var i = 0 ; i < data.firstRows.length; i++){
                allRows.push(data.firstRows[i]);
            }
        }else{
            for(var i = 0 ; i < data.rows.length; i++){
                allRows.push(data.rows[i]);
            }
        }
        if($(jq).datagrid('options').deleteRows != null){
            for(var i = 0 ; i < $(jq).datagrid('options').deleteRows.length; i++){
                allRows.push($(jq).datagrid('options').deleteRows[i]);
            }
        }
        return allRows;
    }
});

var isbind = false;
$.extend($.fn.datagrid.methods, {
    keyCtr: function (jq) {
        return jq.each(function () {
            var grid = $(this);
            if (!isbind) {
                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                    switch (e.keyCode) {
                        case 38: // up
                            var selected = grid.datagrid('getSelected');
                            if (selected) {
                                var index = grid.datagrid('getRowIndex', selected);
                                grid.datagrid('unselectRow', index);
                                grid.datagrid('selectRow', index - 1);
                            } else {
                                var rows = grid.datagrid('getRows');
                                grid.datagrid('selectRow', rows.length - 1);
                            }
                            break;
                        case 40: // down
                            var selected = grid.datagrid('getSelected');
                            if (selected) {
                                var index = grid.datagrid('getRowIndex', selected);
                                grid.datagrid('unselectRow', index);
                                grid.datagrid('selectRow', index + 1);
                            } else {
                                grid.datagrid('selectRow', 0);
                            }
                            break;
                    }
                });
                isbind = true;
            }
        });
    }
});

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

(function ($) {
    function init(target) {
        var opt = $.data(target, "toolbar").options;

        $.each($(target).children(), function () {
            var itemOpt = parseOptions($(this));
            opt.items.push(itemOpt);
        });
        if (!opt.items)
            return;

        $(target).empty();

        if (opt.randerTo) {
            $(target).appendTo(opt.randerTo);
        }

        var bgColor= opt.backgournd?opt.backgournd:'#f8f8f8';
        if(opt.direct=="bottom"){
            $(target).css({
                background: bgColor,
                padding: '2px 3px',
                borderTop: "1px #E1E1E1 solid",
                textAlign:"right"
            });
        }else{
            $(target).css({
                background: bgColor,
                padding: '2px 3px',
                borderBottom: "1px #E1E1E1 solid"
            });
        }

        $.each(opt.items, function () {
            var items = this;
            if (items == "-") {
                $('<span/>').appendTo(target).css({
                    height: 24,
                    borderLeft: '1px solid #aaa',
                    borderRight: '1px solid white',
                    margin: '2px 1px'
                });
            } else if(items.type=="html"){
                $(items.html).appendTo(target).css({
                    margin: '2px 1px 0px 0px'
                });
            }else {
                items.type = items.type || 'button';
                items = $.extend(items, { plain: true });
                var btn = $("<a/>");
                if (!items.href) {
                    items.href = "javascript:void(0)";
                }
                if (items.style) {
                    btn.attr('style', items.style);
                }
                //btn.attr("href", "javascript:void(0)");

                if (items.onclick) {
                    items.href = "javascript:void(0)";
                    btn.unbind('click');
                    btn.click(items.onclick);
                } else if (items.handler && typeof items.handler === 'function') {
                    btn.unbind('click');
                    btn.click(items.handler);
                }

                btn.appendTo(target);

                if (items.type == 'button') {
                    btn.linkbutton(items);
                } else if (items.type == 'menubutton') {
                    btn.menubutton(items);
                } 
//                else if (items.type == 'pagination') {
//                    btn.pagination({
//                        displayMsg: '',
//                        total:11,
//                        pageSize:1,
//                        layout:['first','prev','next','last']
//                    });
//                }
                else if (items.type == 'splitbutton') {
                   // if(items.menuList != null && items.menuList.length!=0){                        
                        var menuPanel = $("<div id='menu_"+items.id+"'/>");
                        menuPanel.appendTo(target);
                        items.menu = menuPanel
                        items.duration = 500;
                        btn.splitbutton(items);

                        if(items.menuList != null){
                            for(var i =0 ; i < items.menuList.length ;i++){
                            
                                menuPanel.menu('appendItem', {
                                    text: items.menuList[i].text,
                                    iconCls: items.menuList[i].iconCls,
                                    onclick: items.menuList[i].handler,
                                    id: items.menuList[i].id
                                });
                            }
                        }
                        items.menu = menuPanel

                    //}else{
                     //   btn.splitbutton(items);
                   // }
                }
            }
        });

        //$(target).children().css("float","left");

        function parseOptions(t) {
            var opt = {
                id: t.attr("id"),
                disabled: (t.attr("disabled") ? true : undefined),
                plain: true,
                text: $.trim(t.html()),
                iconCls: (t.attr("icon") || t.attr("iconCls")),
                type: 'button',
                href: t.attr("href"),
                onclick: t.attr("onclick")
            };
            if (t.attr("type") && t.attr("type") != 'button' || t.attr("menu")) {
                opt = $.extend(opt, {
                    menu: t.attr("menu"),
                    duration: t.attr("duration"),
                    type: 'menubutton'
                });
            }
            return opt;
        }
    }

    $.fn.toolbar = function (options, params, params2) {
        if (typeof options === 'string') {
            return $(this).toolbar.methods[options].call(this, params, params2);
        }

        options = options || {};
        return this.each(function () {
            var opt = $.data(this, "toolbar");
            if (opt) {
                $.extend(opt.options, options);
            } else {
                $.data(this, "toolbar", {
                    options: $.extend({}, $.fn.toolbar.defaults, options)
                });
                init(this);
            }
        });
    };

    $.fn.toolbar.methods = {
        options: function () {
            return this.data().toolbar.options;
        },
        disabledAll: function () {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-") {
                        if (v.type == 'menubutton') {
                            ld.menubutton('disable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('disable');
                        } else {
                            ld.linkbutton('disable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                        }
                    }
                })
            });
        },
        enableAll: function () {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-") {
                        if (v.type == 'menubutton') {
                            ld.menubutton('enable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('enable');
                        } else {
                            ld.linkbutton('enable');
                        }

                        if (v.handler) {
                            ld.unbind('click');
                            ld.click(v.handler);
                        }
                    }
                })
            });
        },
        disabled: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.menubutton('disable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('disable');
                        }else {
                            ld.linkbutton('disable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                        }
                    }
                })
            });
        },
        enable: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.menubutton('enable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('enable');
                        } else {
                            ld.linkbutton('enable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                            ld.click(v.handler);
                        }
                    }
                })
            });
        },
        disableItem: function (id, menuId) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        if(v.type == 'splitbutton'){
                            var itemEl = $('#'+menuId)[0];
                            var item = $('#menu_'+v.id).menu('getItem', itemEl);
                            $('#menu_'+v.id).menu('disableItem', item.target);
                        }
                    }
                })
            });
        },
        enableItem: function (id, menuId) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        if(v.type == 'splitbutton'){
                            var itemEl = $('#'+menuId)[0];
                            var item = $('#menu_'+v.id).menu('getItem', itemEl);
                            $('#menu_'+v.id).menu('enableItem', item.target);
                        }
                    }
                })
            });
        },
        hide: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.hide()
                        } else {
                            ld.hide()
                        }
                    }
                })
            });
        },
        hideAll: function () {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-") {
                        if (v.type == 'menubutton') {
                            ld.hide()
                        } else {
                            ld.hide()
                        }
                    }
                })
            });

        },
        show: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.show();
                        } else {
                            ld.show();
                        }
                    }
                })
            });
        },
        getAllItem: function () {
            return $(this).data().toolbar.options.items;
        },
        updateStatus: function () {
            var self =this;
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-" && typeof (v.enable) == "function") {
                        var status = v.enable()?"enable":"disable"
                        if (v.type == 'menubutton') {
                            ld.menubutton(status);
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton(status);
                        } else {
                            ld.linkbutton(status);
                        }
                        if (v.handler) {
                            if(status =="enable"){
                                ld.unbind('click');
                                ld.click(v.handler);
                            }else{
                                ld.unbind('click');
                            }
                        }
                    }
                    if(v != "-" && v.type == 'splitbutton'){
                        if(v.menuList != null){
                            for(var i =0 ; i < v.menuList.length ;i++){
                               if (v.menuList[i] != "-" && typeof (v.menuList[i].enable) == "function"){
                                   var itemStatus = v.menuList[i].enable();
                                   if(itemStatus){
                                       target.toolbar("enableItem",v.id,v.menuList[i].id)
                                   }else{
                                       target.toolbar("disableItem",v.id,v.menuList[i].id)
                                   }
                               }
                                
                            }
                        }
                    }
                })
            });
        }
    };

    $.fn.toolbar.defaults = {
        randerTo: null,
        items: []
    };

    if ($.parser) {
        $.parser.plugins.push('toolbar');
    }
})(jQuery);


(function ($) {
    function init(target) {
        var opt = $.data(target, "menubar").options;

        $.each($(target).children(), function () {
            var itemOpt = parseOptions($(this));
            opt.items.push(itemOpt);
        });
        if (!opt.items)
            return;

        $(target).empty();
        $(target).menu();
        
        if (opt.randerTo) {
            $(target).appendTo(opt.randerTo);
        }
        
        $.each(opt.items, function () {
            var item = this;
            
            if(item=="-"){
                $(target).append('<div class="menu-sep"></div>')
            }else{
                $(target).menu('appendItem', {
                    text: item.text,
                    iconCls: item.iconCls,
                    onclick: item.handler,
                    id: item.id
                });
            }
        });

        //$(target).children().css("float","left");

        function parseOptions(t) {
            var opt = {
                id: t.attr("id"),
                disabled: (t.attr("disabled") ? true : undefined),
                plain: true,
                text: $.trim(t.html()),
                iconCls: (t.attr("icon") || t.attr("iconCls")),
                type: 'button',
                href: t.attr("href"),
                onclick: t.attr("onclick")
            };
            if (t.attr("type") && t.attr("type") != 'button' || t.attr("menu")) {
                opt = $.extend(opt, {
                    menu: t.attr("menu"),
                    duration: t.attr("duration"),
                    type: 'menubutton'
                });
            }
            return opt;
        }
    }

    $.fn.menubar = function (options, params, params2) {
        if (typeof options === 'string') {
            return $(this).menubar.methods[options].call(this, params, params2);
        }

        options = options || {};
        return this.each(function () {
            var opt = $.data(this, "menubar");
            if (opt) {
                $.extend(opt.options, options);
            } else {
                $.data(this, "menubar", {
                    options: $.extend({}, $.fn.menubar.defaults, options)
                });
                init(this);
            }
        });
    };

    $.fn.menubar.methods = {
        options: function () {
            return this.data().toolbar.options;
        },
        showMenu: function (target, dataObj) {
            return this.each(function () {
                var menuObj = $(this);
                var items = $(this).data().menubar.options.items;
                
                $(menuObj).menu('show', {
                    left: $(target).offset().left,
                    top: $(target).offset().top+$(target).outerHeight()+1
                });
//                
//                $.each(items, function (i, v) {
//                    var menuItem =  $(menuObj).menu('getItem', $('#'+v.id)[0]);
//                });
            });
        },
        updateStatus: function () {
            var self =this;
            return this.each(function () {
                var items = $(this).data().menubar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-" && typeof (v.enable) == "function"){
                        var itemStatus = v.enable();
                        
                        if(itemStatus){
                            var menuItem =  $(target).menu('getItem', $('#'+v.id)[0]);
                            $(target).menu('enableItem', menuItem.target);
                        }else{
                            var menuItem =  $(target).menu('getItem', $('#'+v.id)[0]);
                            $(target).menu('disableItem', menuItem.target);
                        }
                    }
                })
            });
        },
        disabledAll: function () {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-") {
                        if (v.type == 'menubutton') {
                            ld.menubutton('disable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('disable');
                        } else {
                            ld.linkbutton('disable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                        }
                    }
                })
            });
        },
        enableAll: function () {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    var ld = target.children().eq(i);
                    if (v != "-") {
                        if (v.type == 'menubutton') {
                            ld.menubutton('enable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('enable');
                        } else {
                            ld.linkbutton('enable');
                        }

                        if (v.handler) {
                            ld.unbind('click');
                            ld.click(v.handler);
                        }
                    }
                })
            });
        },
        disabled: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.menubutton('disable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('disable');
                        }else {
                            ld.linkbutton('disable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                        }
                    }
                })
            });
        },
        enable: function (id) {
            return this.each(function () {
                var items = $(this).data().toolbar.options.items;
                var target = $(this);
                $.each(items, function (i, v) {
                    if (v.id == id) {
                        var ld = target.children().eq(i);
                        if (v.type == 'menubutton') {
                            ld.menubutton('enable');
                        } else if(v.type == 'splitbutton'){
                            ld.splitbutton('enable');
                        } else {
                            ld.linkbutton('enable');
                        }
                        if (v.handler) {
                            ld.unbind('click');
                            ld.click(v.handler);
                        }
                    }
                })
            });
        }
    };

    $.fn.menubar.defaults = {
        randerTo: null,
        items: []
    };

    if ($.parser) {
        $.parser.plugins.push('menubar');
    }
})(jQuery);

function getToolBareItem(toolBarId, itemId){

    var items = $("#"+toolBarId).data().toolbar.options.items;

    var itemObj = null;

    for(var i = 0 ; i < items.length; i++){
        if(items[i].id == itemId){
            itemObj = $("#"+toolBarId).children().eq(i)
            break;
        }
    }
    return itemObj;
}