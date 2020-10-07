package com.gzhh.hrp.common.filter;

import com.gzhh.hrp.tools.StringTools;

public class BoolValueHandler extends AbstractValueHandler {

    private static BoolValueHandler booleanConditionDealer = new BoolValueHandler();
    
    private BoolValueHandler(){
        super();
    }

    @Override
    public Class<?> getHandleType() {
        return boolean.class;
    }
    @Override
    public Object getValue(Object value) {
        if(value ==null || StringTools.isEmpty(value.toString())){
            return null;
        }
        //是否真
        boolean result = isTrue(value.toString());
        if(!result){//不是真
            //是否假
            result = isFalse(value.toString());
            if(!result){//不是假
                return null;
            }else{//是假
                result = false;
            }
        }
        return result;
    }
    
    private boolean isTrue(String src){
        return ("是".equals(src)|| src.contains("有") || "true".equalsIgnoreCase(src)
                || "y".equalsIgnoreCase(src) || "yes".equalsIgnoreCase(src));
    }
    
    private boolean isFalse(String src){
        return ("否".equals(src) || src.contains("无") || "false".equalsIgnoreCase(src)
                || "n".equalsIgnoreCase(src) || "no".equalsIgnoreCase(src)
                || src.contains("不")) || "not".equalsIgnoreCase(src);
    }

    public static IValueHandler getInstance() {
        return booleanConditionDealer;
    }
    
}
