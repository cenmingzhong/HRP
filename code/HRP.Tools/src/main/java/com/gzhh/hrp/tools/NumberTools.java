package com.gzhh.hrp.tools;

import java.math.BigDecimal;

import com.gzhh.hrp.common.ValidateException;

public class NumberTools {
    
    public static BigDecimal toDecimal(String value){
        if(StringTools.isEmpty(value)){
            return BigDecimal.ZERO;
        }
        return new BigDecimal(value);
    }
    
    public static BigDecimal toDecimal(Object value){
        if(StringTools.isEmpty(value)){
            return BigDecimal.ZERO;
        }
        return new BigDecimal(String.valueOf(value));
    }
    
    public static int toInt(String value){
        if(StringTools.isEmpty(value)){
            return 0;
        }
        return Integer.parseInt(value);
    }
    
    public static BigDecimal toDecimal(BigDecimal value){
        if(value == null){
            value = BigDecimal.ZERO;
        }
        return value;
    }

    public static BigDecimal addDecimal(BigDecimal value1, BigDecimal value2){
        if(value1 ==null){
            value1 = BigDecimal.ZERO;
        }
        if(value2 == null){
            value2 = BigDecimal.ZERO;
        }
        
        return value1.add(value2);
    }

    public static BigDecimal reduceDecimal(BigDecimal value1, BigDecimal value2){
        if(value1 ==null){
            value1 = BigDecimal.ZERO;
        }
        if(value2 == null){
            value2 = BigDecimal.ZERO;
        }
        
        return value1.subtract(value2);
    }

    public static BigDecimal mulDecimal(BigDecimal value1, BigDecimal value2){
        if(value1 ==null){
            value1 = BigDecimal.ZERO;
        }
        if(value2 == null){
            value2 = BigDecimal.ZERO;
        }
        
        return value1.multiply(value2);
    }

    public static BigDecimal mulDecimal(BigDecimal value1, BigDecimal value2, int scale){
        BigDecimal result = mulDecimal(value1, value2);
        
        return result.setScale(scale,BigDecimal.ROUND_HALF_UP);
    }

    public static BigDecimal divDecimal(BigDecimal value1, BigDecimal value2, int scale){
        if(value1 ==null){
            value1 = BigDecimal.ZERO;
        }
        if(value2 == null){
            value2 = BigDecimal.ZERO;
        }
        
        return value1.divide(value2,scale,BigDecimal.ROUND_HALF_UP);
    }
    
    public static BigDecimal divDecimal(BigDecimal value1, BigDecimal value2){
        if(value1 ==null){
            value1 = BigDecimal.ZERO;
        }
        if(value2 == null){
            value2 = BigDecimal.ZERO;
        }
        return value1.divide(value2);
    }
    
    public static BigDecimal min(BigDecimal value1, BigDecimal value2){
        value1 = toDecimal(value1);
        value2 = toDecimal(value2);
        
        if(value1.compareTo(value2)>0){
            return value2;
        }else{
            return value1;
        }
    }
    
    public static BigDecimal scale(BigDecimal value,int scale){
        value = toDecimal(value);
        return value.setScale(scale,BigDecimal.ROUND_HALF_UP);
    }

    public static BigDecimal abs(BigDecimal value){
        if(value == null){
            value = BigDecimal.ZERO;
        }
        return value.abs();
    }
    
    //取余运算
    public static BigDecimal residue(BigDecimal value1, BigDecimal value2) {
        if(value2== null){
            throw new ValidateException("取余运算除数不能为0或者空");
        }
        return toDecimal(value1).remainder(toDecimal(value2));
    }
    
    //取余运算
    public static BigDecimal mod(BigDecimal value1, BigDecimal value2) {
        if(value2== null){
            throw new ValidateException("整除运算除数不能为0或者空");
        }
        return toDecimal(value1).divideAndRemainder(toDecimal(value2))[0];
    }
    
}
