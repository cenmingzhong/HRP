package com.gzhh.hrp.common.entity.inf.nc;

import java.lang.reflect.Field;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlValue;

public class SubjFreeValue {

    public SubjFreeValue(){
        for(Field field: this.getClass().getDeclaredFields()){
            if(field.getType()==String.class){
                try {
                    field.set(this, "");
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
    }
    @XmlAttribute(name="name")
    private String name;
    
    @XmlValue
    private String value;
    
    @XmlTransient
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    @XmlTransient
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    
}
