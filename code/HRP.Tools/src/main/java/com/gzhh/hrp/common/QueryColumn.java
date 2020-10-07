package com.gzhh.hrp.common;

import java.io.Serializable;

public class QueryColumn  implements Serializable {

    private static final long serialVersionUID = 1L;

    private String colName;
    private String fieldName;
    
    public String getColName() {
        return colName;
    }
    public void setColName(String colName) {
        this.colName = colName;
    }
    public String getFieldName() {
        return fieldName;
    }
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
}
