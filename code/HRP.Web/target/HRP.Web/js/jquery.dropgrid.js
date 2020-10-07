
(function ($) {
    $.fn.refer = function (options) {
        
        var settings = {
            referClick: null,
            inputBlur: null
        }
        settings = $.extend(settings, options);

        $(this).bind("focus.refer", function () {
            var inputObj = this;
            $(inputObj).prop("oldValue",$(inputObj).val());
            
            if(($(inputObj).attr("isInput") != null && $(inputObj).attr("isInput") != "true") 
                || ($(inputObj).attr("isEditable")!= null && $(inputObj).attr("isEditable")!="true")){
                return;
            }
            var id = new Date().getTime();
            
            var inputLeft = $(inputObj).offset().left + $(inputObj).outerWidth() - 26;
            var inputTop = $(inputObj).offset().top + parseInt($(inputObj).css('border-top-width'));
           
            if($(inputObj).attr("referBtnId")!=null){
                $("#"+$(inputObj).attr("referBtnId")).remove();
                $(inputObj).removeAttr("referBtnId");
            }
            var btn = $("<input type='button' value='..' id='" + id + "' style='width:26px;height:"+($(inputObj).outerHeight()-2)+"px;border:1px solid #aaa;border-top-width:0px;border-bottom-width:0px;position:absolute;left:" + inputLeft + "px;top:" + inputTop + "px; z-index:9999'/>")

            $(inputObj).attr("referBtnId", id);
            $(inputObj).attr("autocomplete", "off");
            btn.appendTo("body");

            btn.bind("click", function () {
                if (typeof(settings.referClick) == "function"){
                    settings.referClick(inputObj);
                }
                btn.remove();
            });

            $(inputObj).unbind("blur.refer");
            $(inputObj).bind("blur.refer", function () {
                window.setTimeout(function () {
                    if (!$(inputObj).is(":focus") && !btn.is(":focus") && !$("#dropgridblock").is(":focus") && !$("#dropgridblock").find("*").is(":focus")) {
                        btn.remove();
                    }
                }, 1)
            });

            $(inputObj).unbind("change.refer");
            $(inputObj).bind("change.refer", function () {
                window.setTimeout(function () {
                    if (!$(inputObj).is(":focus") && !btn.is(":focus") && !$("#dropgridblock").is(":focus") && !$("#dropgridblock").find("*").is(":focus")) {
                        if (typeof(settings.inputBlur) == "function"){
                            settings.inputBlur(inputObj);
                        } 
                    }
                }, 1)
            });
        })
        return this;
    };
})(jQuery);

(function ($) {
    var isIE = navigator.userAgent.indexOf('MSIE') != -1;
    var isIE6 = navigator.userAgent.indexOf('MSIE 6.0') != -1;

    function getDulyOffset(target, w, h) {
        var pos = target.offset();
        var height = target.outerHeight();
        var newpos = { left: pos.left, top: pos.top + height-1 ,height:h }
        var bw = document.documentElement.clientWidth;
        var bh = document.documentElement.clientHeight;


        if ((newpos.left + w) >= bw) {
            newpos.left = bw - w - 2;
        }
        if(pos.top > bh-newpos.top){
            if ((newpos.top + h) >= bh) {
                newpos.top = pos.top - h - 2;
            }
        }
        if(newpos.top<0){
            newpos.top = 0;
            if(newpos.height > pos.top){
                newpos.height = pos.top-1;
            }
        }else{
            if(newpos.top + newpos.height > bh){
                newpos.height = bh - newpos.top;
            }
        }
        return newpos;
    }

    $.fn.dropgrid = function (params) {
        var options = $.extend({
            delay:300,
            dropHeight:250,
            dropWidth: 600,
            singleSelect:true,
            lockScreen: true,
            paramName: "",
            resultName: "",
            resultList: "",
            onConfirm: null,
            dataGridUrl:null,
            data: {},
            dynamicData:null
        }, params)
        var me = $(this);
        var self = this;

        var d = null;
        var timeoutId = null;
        var dropgrid = null;
        var ajaxReq = null;
        var oldValue = "";
        
        $(me).unbind("keyup.dropgrid");
        $(me).bind("keyup.dropgrid", function(event){
            var keyCode = event.keyCode;
            if($(me).attr("readonly")){
            	return ;
            }
            if(event.keyCode !=18 && keyCode !=13 && keyCode!=40 && keyCode !=38){
                loadData();
            }
        });
        $(me).unbind("paste.dropgrid");
        //鼠标点击输入法框选择数据时触发
        $(me).bind("compositionend",function(){
        	window.setTimeout(function(){
                loadData();
            },30)
         }),
        $(me).bind("paste.dropgrid", function(){
            window.setTimeout(function(){
                loadData();
            },30)
        });
        $(me).unbind("keydown.dropgrid");
        me.bind("keydown.dropgrid", function(event){
            if(dropgrid ==null){
                return ;
            }
            oldValue = $(me).val();
            var keyCode = event.keyCode;
            //回车事件
            //有选中行时，回车，则返回选中行，
            //如果没有选中行时，回车，则重新加载数据
            if(keyCode ==13){
                if(me.val() != ""){
                    if(dropgrid == null){
                        loadData();
                    }else{
                        var selRows = dropgrid.datagrid("getSelections");
                        if(selRows.length >0){
                            selectRow();
                        }else{
                            loadData();
                        }
                    }
                    
                }
            }else if(keyCode==40){
                var rowLen = dropgrid.datagrid("getRows").length;
                if(rowLen==0){
                    return;
                }
                var selRows = dropgrid.datagrid("getSelections");
                if(selRows.length ==0){
                    dropgrid.datagrid("selectRow",0);
                }else if(selRows.length ==1){
                    var selIdx = dropgrid.datagrid("getRowIndex",selRows[0]);
                    if(selIdx==rowLen -1){
                        return;
                    }else{
                        dropgrid.datagrid("unselectRow",selIdx);
                        dropgrid.datagrid("selectRow",selIdx+1);
                    }
                }
            }else if(keyCode==38){
                var rowLen = dropgrid.datagrid("getRows").length;
                if(rowLen==0){
                    return;
                }
                var selRows = dropgrid.datagrid("getSelections");
                if(selRows.length ==0){
                    return;
                }else if(selRows.length ==1){
                    var selIdx = dropgrid.datagrid("getRowIndex",selRows[0]);
                    if(selIdx==0){
                        return;
                    }else{
                        dropgrid.datagrid("unselectRow",selIdx);
                        dropgrid.datagrid("selectRow",selIdx-1);
                    }
                }
            }
        })

        var loadData = function(){
            if(timeoutId != null){
                clearTimeout(timeoutId); 
            }
            if ($.trim($(me).val()) == "") {
                removeDropGrid();
                return;
            }
            timeoutId = window.setTimeout(function(){
                if(d==null){
                    $("#dropgridblock").remove();
                    
                    if(!$(me).is(":focus")){
                        return;
                    }
                    d = $("<div id='dropgridblock' tabindex='-1'><table id='dropgrid'></table></div>").css({ 
                        "position": "absolute", 
                        "z-index": "999", 
                        "overflow": "auto",
                        "width": options.dropWidth + "px",
                        "top": "20px",
                        "display": "",
                        "backgournd":"#efefef"
                    })
                    .click(function (event) {
                        event.stopPropagation();
                        event.cancelBubble = true;
                    }).appendTo($("body"));

                    var pos = getDulyOffset(me, options.dropWidth, options.dropHeight);

                    $(me).attr("isRefer",true)
                    d.css(pos);
                    d.show();

                   var gridToolBar =[{
                        text:'确定',
                        id:"save",
                        iconCls:'icon-save',
                        handler:function(){
                            selectRow();
                        }
                    },{
                        text:'关闭',
                        id:"close",
                        iconCls:'icon-cancel',
                        handler:function(){
                            removeDropGrid();
                            $(me).focus();
                        }
                    }]
                    if(options.dataGridUrl != null){
                        gridToolBar.push('-')
                        gridToolBar.push({
                            id:"dropGridColSet",
                            text: "栏目",
                            iconCls: "icon-colSet",
                            handler: function () {
                                setDataGridCol("dropgrid", options.dataGridUrl)
                            }
                        })
                    }
                    dropgrid = $("#dropgrid").datagrid({
                        locale: "zh_CN",
                        nowrap: true,
                        singleSelect: options.singleSelect,
                        striped: false, //使用分隔行
                        border: true,
                        sortOrder: 'desc',
                        height:pos.height,
                        width:options.dropWidth,
                        collapsible: false, //是否可折叠的  
                        remoteSort: false, //设置页面排序
                        data: [],
                        columns: [options.columns],
                        pagination: false,
                        rownumbers: true,
                        pageSize: 100,
                        view: scrollview,
                        fitColumns: false,
                        onClickRow: function (rowIndex, rowData) {
                            if(options.singleSelect){
                                $(this).datagrid('clearSelections')
                                $(this).datagrid('clearChecked')
                                $(this).datagrid('selectRow', rowIndex);
                                $(this).datagrid('checkRow', rowIndex);
                            }
                        },
                        onDblClickRow: function (rowIndex, rowData) {
                            $(this).datagrid("unselectAll");
                            $(this).datagrid("selectRow",rowIndex);
                            selectRow();
                        },
                        toolbar:gridToolBar,
                        onLoadSuccess: function (data) {
                            if(data.rows.length>0 && options.singleSelect){
                                $(dropgrid).datagrid("selectRow",0);
                            }
                            
                        }
                    });
                    if(options.dataGridUrl != null){
                        showDataGridCol("dropgrid", options.dataGridUrl );
                    }
                    $(document).unbind("click.dropgrid");
                    $(document).bind("click.dropgrid",function(){
                        window.setTimeout(function () {
                            if(d != null){
                                if (!me.is(":focus") && !d.is(":focus") && !d.find("*").is(":focus")) {
                                	var btnId = $(me).attr("referbtnid");
                                	$("#"+btnId).remove();
                                    removeDropGrid();
                                }
                            }
                        }, 0)
                    });

                    d.find("*").bind("keydown", function(eve){
                        var keyCode = eve.keyCode;
                        //回车事件
                        //有选中行时，回车，则返回选中行，
                        //如果没有选中行时，回车，则重新加载数据
                        if(keyCode ==13){
                            if(dropgrid == null){
                                loadData();
                            }else{
                                var selRows = dropgrid.datagrid("getSelections");
                                if(selRows.length >0){
                                    selectRow();
                                }else{
                                    loadData();
                                }
                            }
                        }
                    })
                    $(me).unbind("blur.refer2");
                    $(me).bind("blur.refer2", function () {
                        window.setTimeout(function () {
                            if(d != null){
                                if (!d.is(":focus") && !d.find("*").is(":focus")) {
                                    removeDropGrid();
                                    if(ajaxReq !=null){
                                        ajaxReq.abort();
                                    }
                                }else{
                                    $(me).unbind("blur.refer2");
                                    d.find("*").bind("blur.refer2", function(){
                                        window.setTimeout(function () {
                                            if (!me.is(":focus") && !d.is(":focus") && !d.find("*").is(":focus")) {
                                                removeDropGrid();
                                            }
                                        }, 1)
                                    });
                                }
                            }
                        }, 1);
                    });
                }

                window.setTimeout(function () {
                    var data = $.extend({},options.data);
                    if (data == null) {
                        data = {};
                    }
                    if ($.trim(me.val()) == "") {
                        return;
                    }
                    if(options.dynamicData != null){
                        for(var dataKey in options.dynamicData){
                            data[dataKey]  = eval(options.dynamicData[dataKey]);
                        }
                    }
                    data[options.paramName] = $.trim(me.val());
                    data["dropgridRefer"] = "Y";

                    if (dropgrid != null) {
                        
                        dropgrid.datagrid("loading");
                        if(ajaxReq !=null){
                            ajaxReq.abort();
                        }
                        ajaxReq = ajaxSubmit({
                            url: options.url,
                            lockScreen: options.lockScreen,
                            data: {
                                filter: JSON.stringify(data)
                            },
                            success: function (result) {
                                if (result.isOk == "Y") {
                                    if (me.is(":focus") || ( d != null && (d.is(":focus") || !d.find("*").is(":focus")))    ) {
                                        if(dropgrid != null){
                                            dropgrid.datagrid('loadData', result.data[options.resultName]);
                                        }
                                    }
                                } 
                                if(dropgrid != null){
                                    dropgrid.datagrid("loaded");
                                }
                            }
                        });
                    }
                },1);
            },options.delay);
        }

        var removeDropGrid =function(){
            
            if(d != null){
                d.remove(); 
                d = null;
                dropgrid = null;
                window.setTimeout(function(){
                    $(me).attr("isRefer",false);
                },100);
                if(timeoutId != null){
                    clearTimeout(timeoutId); 
                }
            }
        }

        var selectRow = function(){
            if(dropgrid != null){
                if(options.onSelectData != null){
                    if(options.singleSelect){
                        options.onSelectData(dropgrid.datagrid("getSelected"))
                    }else{
                        options.onSelectData(dropgrid.datagrid("getSelections"))
                    }
                    $(me).focus();
                }
                $(me).attr("onChange",true);
                removeDropGrid();
                window.setTimeout(function(){
                    $(me).removeAttr("onChange");
                },100);
            }
        }

        return me;
    }
})(jQuery);
