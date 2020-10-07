package com.gzhh.hrp.tools;

import java.util.List;

public class ConfigInfo {

    private int factoryId;
    private int collType;
    private int oltCollMode;
    private int onuCollMode;
    private int sendLength;
    private List<ConfigInfo> config;
    
    public int getFactoryId() {
        return factoryId;
    }
    public void setFactoryId(int factoryId) {
        this.factoryId = factoryId;
    }
    public int getCollType() {
        return collType;
    }
    public void setCollType(int collType) {
        this.collType = collType;
    }
    public int getOltCollMode() {
        return oltCollMode;
    }
    public void setOltCollMode(int oltCollMode) {
        this.oltCollMode = oltCollMode;
    }
    
    public int getOnuCollMode() {
        return onuCollMode;
    }
    public void setOnuCollMode(int onuCollMode) {
        this.onuCollMode = onuCollMode;
    }
    public int getSendLength() {
        return sendLength;
    }
    public void setSendLength(int sendLength) {
        this.sendLength = sendLength;
    }
    public List<ConfigInfo> getConfig() {
        return config;
    }
    public void setConfig(List<ConfigInfo> config) {
        this.config = config;
    }
}
