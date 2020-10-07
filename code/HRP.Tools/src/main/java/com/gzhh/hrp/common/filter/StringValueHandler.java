package com.gzhh.hrp.common.filter;

public class StringValueHandler extends AbstractValueHandler {

    private static StringValueHandler stringConditionDealer = new StringValueHandler();
    private StringValueHandler(){
        super();
    }
    
    @Override
    public Class<?> getHandleType() {
        return Double.class;
    }
    
    @Override
    public Object getValue(Object value) {
        if(value==null){
            return null ;
        }
        return value.toString();
    }

    public static IValueHandler getInstance() {
        return stringConditionDealer;
    }
}
