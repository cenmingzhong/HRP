package com.gzhh.hrp.common.filter;

public class FloatValueHandler extends AbstractValueHandler {

    private static FloatValueHandler floatConditionDealer = new FloatValueHandler();
    private FloatValueHandler(){
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
        return Float.valueOf(value.toString());
    }

    public static IValueHandler getInstance() {
        return floatConditionDealer;
    }

}
