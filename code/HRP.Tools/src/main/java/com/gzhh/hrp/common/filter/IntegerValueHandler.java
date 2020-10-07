package com.gzhh.hrp.common.filter;

public class IntegerValueHandler extends AbstractValueHandler {

    private static IntegerValueHandler integerConditionDealer = new IntegerValueHandler();
    private IntegerValueHandler(){
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
        return Integer.valueOf(value.toString());
    }

    public static IValueHandler getInstance() {
        return integerConditionDealer;
    }
}
