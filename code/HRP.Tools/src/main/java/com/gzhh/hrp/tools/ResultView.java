package com.gzhh.hrp.tools;

import java.util.Dictionary;
import java.util.Hashtable;

public class ResultView {

    private String isOk;
    private String message;
    private Dictionary<String, Object> data;
    private Object entity;
    
    public ResultView() {
        this.isOk="Y";
        this.data = new Hashtable<String, Object>();
    }
    
    public void putData(String key, Object value) {
        if(value != null){
            data.put(key, value);
        }
    }
    
    public Object getData(String key) {
        return data.get(key);
    }
    
    public String getIsOk() {
        return isOk;
    }
    public void setIsOk(String isOk) {
        this.isOk = isOk;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public Object getEntity() {
        return entity;
    }

    public void setEntity(Object entity) {
        this.entity = entity;
    }

    public Dictionary<String, Object> getData() {
        return data;
    }

    public void setData(Dictionary<String, Object> data) {
        this.data = data;
    }
}
