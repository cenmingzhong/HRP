package com.gzhh.hrp.common.filter;

import java.math.BigDecimal;

public class BigDecimalValueHandler extends AbstractValueHandler {

    private static BigDecimalValueHandler bigDecimalConditionDealer = new BigDecimalValueHandler();

    private BigDecimalValueHandler(){
        super();
    }
    public static IValueHandler getInstance() {
        return bigDecimalConditionDealer;
    }
    
    public Class<?> getHandleType() {
        return BigDecimal.class;
    }
    
    @Override
    public Object getValue(Object value) {
        if(value == null){
            return null;
        }
        return new BigDecimal(value.toString());
    }
}
