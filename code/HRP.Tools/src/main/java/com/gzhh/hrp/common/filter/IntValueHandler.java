package com.gzhh.hrp.common.filter;

public class IntValueHandler extends AbstractValueHandler {

    private static IntValueHandler integerConditionDealer = new IntValueHandler();
    private IntValueHandler(){
        super();
    }

    @Override
    public Class<?> getHandleType() {
        return int.class;
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
