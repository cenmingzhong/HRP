package com.gzhh.hrp.common.filter;

public class LongValueHandler extends AbstractValueHandler {

     private static LongValueHandler longConditionDealer = new LongValueHandler();
     private LongValueHandler(){
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
        return Long.valueOf(value.toString());
    }

    public static IValueHandler getInstance() {
        return longConditionDealer;
    }
}
