package com.gzhh.hrp.common.filter;

/**
 * 拼条件基类
 * 
 * @author 苍鹰
 */
public abstract class AbstractValueHandler implements IValueHandler {
    
    protected int getYearFromDateString(String dateString){
        return Integer.valueOf(dateString.substring(0,4));
    }
    protected int getMonthFromDateString(String dateString){
        return Integer.valueOf(dateString.substring(4,6));
    }
    protected int getDayFromDateString(String dateString){
        return Integer.valueOf(dateString.substring(6,8));
    }
}
