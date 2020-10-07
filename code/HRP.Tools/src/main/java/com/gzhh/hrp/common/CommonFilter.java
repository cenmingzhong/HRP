package com.gzhh.hrp.common;

import java.io.Serializable;

import com.gzhh.hrp.common.filter.StandardFilterProcessor;

public class CommonFilter  implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    public CommonFilter() {
        this.id = IdGenerator.getNewId();
        this.value = null;
        this.name = null;
        this.operator = null;
    }
    public CommonFilter(String property, Object value, String operator) {
        this.id = IdGenerator.getNewId();
        this.name = property;
        this.value = value;
        this.operator = operator;
    }
    
    public CommonFilter(String property, Object value) {
        this.id = IdGenerator.getNewId();
        this.name = property;
        this.value = value;
        this.operator = StandardFilterProcessor.EQ;
    }

    private String id;
    private String name;
    private Object value;
    private String operator;
    private boolean multiSel;
    private String dataType;
    
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object getValue() {
        return value;
    }
    public void setValue(Object value) {
        this.value = value;
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    @Override
    public String toString() {
        return name + " " + operator + " " + value;
    }
    public boolean getMultiSel() {
        return multiSel;
    }
    public void setMultiSel(boolean multiSel) {
        this.multiSel = multiSel;
    }
    public String getDataType() {
        return dataType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    
}
