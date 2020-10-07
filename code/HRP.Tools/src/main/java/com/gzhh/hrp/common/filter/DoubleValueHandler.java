package com.gzhh.hrp.common.filter;

public class DoubleValueHandler extends AbstractValueHandler {

    private static DoubleValueHandler doubleConditionDealer = new DoubleValueHandler();

    private DoubleValueHandler(){
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
        return Double.valueOf(value.toString());
    }

    public static IValueHandler getInstance() {
        return doubleConditionDealer;
    }

}
