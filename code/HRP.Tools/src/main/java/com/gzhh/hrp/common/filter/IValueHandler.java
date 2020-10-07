package com.gzhh.hrp.common.filter;

/**
 * 条件处理器
 * 2008-10-15
 * @author 苍鹰
 */
public interface IValueHandler {
    
    Object getValue(Object value);
    
    /**
     * 获得本处理器能处理的属性类型
     * 2008-10-15
     * @author 苍鹰
     * @return 本处理器能处理的属性类型
     */
    Class<?> getHandleType();
}
