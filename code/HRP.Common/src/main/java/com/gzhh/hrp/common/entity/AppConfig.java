package com.gzhh.hrp.common.entity;

import java.util.HashMap;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="appSetting")
public class AppConfig {

    private static AppConfig instance = null;
    private AppConfig() {
    }
    @XmlElement(name="autoCreateMenu")
    private boolean autoCreateMenu;
    @XmlElement(name="adminAccount")
    private String adminAccount;
    @XmlElement(name="adminPassword")
    private String adminPassword;
    @XmlElement(name="versionNo")
    private String versionNo;
    @XmlElementWrapper(name="sysMenuList")
    @XmlElement(name="sysMenu")
    private List<SysMenu> sysMenuList;
    @XmlElementWrapper(name="appList")
    @XmlElement(name="app")
    private List<AppActivate> appList;
    private AppVouch appVouch;
    private HashMap<String, String> tableList;
    private HashMap<String, String> defectStateList;
    
    public synchronized static void createInstance(AppConfig model){
        if (instance == null){
            instance = model;
            instance.appVouch = new AppVouch();
        }
    }

    public static boolean getAutoCreateMenu(){
        return instance.autoCreateMenu;
    }
    
    public static String getAdminAccount(){
        return instance.adminAccount;
    }
    
    public static String getAdminPassword(){
        return instance.adminPassword;
    }
    
    public static String getVersionNo(){
        return instance.versionNo;
    }
    
    public static List<SysMenu> getSysMenuList(){
        return instance.sysMenuList;
    }
    
    public static List<AppActivate> getAppList(){
        return instance.appList;
    }
    
    public static AppVouch getAppVouch(){
        return instance.appVouch;
    }
    
    public static void cleanAdminPassword(){
        instance.adminPassword = null;
    }

    public static VouchGeneral getVouchGeneral(String vouchCode){
        return getAppVouch().getVouchList().get(vouchCode);
    }

    public static void saveTableList(HashMap<String, String> tableList){
        instance.tableList = tableList;
    }
    public static String getTableName(String tableCode){
        return instance.tableList.get(tableCode);
    }
    public static void saveDefectStateList(HashMap<String, String> defectStateList){
        instance.defectStateList = defectStateList;
    }
    public static HashMap<String, String> getDefectStateList(){
        return instance.defectStateList;
    }
}
