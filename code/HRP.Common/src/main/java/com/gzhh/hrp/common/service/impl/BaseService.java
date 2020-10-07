package com.gzhh.hrp.common.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.IdGenerator;
import com.gzhh.hrp.common.LoginState;
import com.gzhh.hrp.common.LoginUser;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.RefTableDao;
import com.gzhh.hrp.common.dao.SysPropertyDao;
import com.gzhh.hrp.common.dao.SysPropertyDetailDao;
import com.gzhh.hrp.common.dao.SysUserAccountDao;
import com.gzhh.hrp.common.dao.SysUserDao;
import com.gzhh.hrp.common.entity.SysKey;
import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.common.entity.SysPropertyDetail;
import com.gzhh.hrp.common.entity.format.CodeFormat;
import com.gzhh.hrp.common.entity.format.CodeFormatAccording;
import com.gzhh.hrp.common.service.SysKeyService;
import com.gzhh.hrp.common.service.format.CodeFormatService;
import com.gzhh.hrp.tools.AppConst;
import com.gzhh.hrp.tools.StringTools;

@Service
public class BaseService {

    @Resource
    public SysPropertyDao sysPropertyDao;
    @Resource
    public SysUserDao sysUserDao;
    @Resource
    private SysKeyService sysKeyService;
    @Resource
    private RefTableDao refTableDao;
    @Resource
    private CodeFormatService codeFormatService;
    @Resource
    private SysPropertyDetailDao sysPropertyDetailDao;
    @Resource 
    private SysUserAccountDao sysUserAccountDao;
    
    protected static final Logger logger = LoggerFactory.getLogger(BaseService.class);

    public String getNewId(){
        return String.valueOf(IdGenerator.getNewId());
    }
    
    public String getKey(String keyType, boolean isUpdate){
        return sysKeyService.getKey(keyType, isUpdate);
    }

    private String getKey(SysKey sysKey, boolean isUpdate){
        return sysKeyService.getKey(sysKey, isUpdate);
    }
    
    public SysProperty getSysProperty(String appKey, String propName){
        return sysPropertyDao.getByPropName(appKey, propName);
    }
    
    public SysProperty getSysProperty(String propName){
        return getSysProperty("SYS", propName);
    }
    
    public  String getSysPropertyValue(String propName)
    {
        SysProperty prop = getSysProperty(propName);
        if (prop == null)
        {
            return null;
        }
        else{
            return prop.getPropValue();
        }
    }

    public String getSysPropertyValue(String appKey, String propName)
    {
        SysProperty prop = getSysProperty(appKey, propName);
        
        if (prop == null)
        {
            return null;
        }
        else{
            return prop.getPropValue();
        }
    }
    
    public List<SysPropertyDetail> getSysPropertyListValue(String appKey, String propName)
    {
        SysProperty sysProp = sysPropertyDao.getByPropName(appKey, propName);

        if (sysProp.getPropValue().equals("[Detail]"))
        {
            HashMap<String, Object> detailHt = new HashMap<String, Object>();
            detailHt.put("mid", sysProp.getId());
            return sysPropertyDetailDao.getListByFilter(detailHt);
        }
        return null;
    }
    
    private LoginState getLoginState(){
        String currentSessionId = HRPSession.getSessionId();
        LoginState loginState = HRPSession.getLoginStateBySessionId(currentSessionId);
        if(loginState == null){
            throw new ValidateException("登录超时");
        }
        
        return loginState;
    }
    
    protected LoginUser getLoginUser(){
        return getLoginState().getLoginUser();
    }
    
    protected Date getLoginDate(){
        return getLoginState().getLoginDate();
    }
    
    protected int getAccYear(Date date){
        Calendar cal = Calendar.getInstance();  
        cal.setTime( date);  
        return cal.get(Calendar.YEAR);
    }
    
    protected int getAccMonth(Date date){
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        return cal.get(Calendar.MONTH)+1;
    }
    
    protected int getMaxLoginErrorCount(){
        SysProperty maxLoginErrorCountProp = getSysProperty("MaxLoginErrorCount");

        if (maxLoginErrorCountProp == null)
        {
            maxLoginErrorCountProp = new SysProperty();

            maxLoginErrorCountProp.setId(StringTools.getGuid());
            maxLoginErrorCountProp.setAppKey(AppConst.APP_KEY_SYS);
            maxLoginErrorCountProp.setPropName("MaxLoginErrorCount");
            maxLoginErrorCountProp.setPropValue("5");
            
            sysPropertyDao.insert(maxLoginErrorCountProp);
        }
        return Integer.parseInt(maxLoginErrorCountProp.getPropValue());
    }
    

    /// <summary>
    /// 上一张、下一张、第一张、最后一张
    /// </summary>
    /// <param name="tableName">表名</param>
    /// <param name="columnName">列名</param>
    /// <param name="Id">列值</param>
    /// <param name="type">类型 上一张：P、下一张：N、第一张：F、最后一张：L</param>
    /// <returns></returns>
    public String getIdByType(String tableName, String columnName, Object id, String type, String extSql)
    {
        if ((!StringTools.equals(type, "F") && !StringTools.equals(type, "P") && !StringTools.equals(type, "N") && !StringTools.equals(type, "L")) 
                || ((id == null || StringTools.isEmpty(String.valueOf(id))) && !StringTools.equals(type, "F")))
        {
            type = "L";
        }
        HashMap<String, Object> ht = new HashMap<String, Object>();
        ht.put("tableName", tableName);
        ht.put("pkColumn", columnName);
        ht.put("orderColumn", columnName);
        ht.put("id", id);
        ht.put(type, type);
        ht.put("extSql", extSql);
        return refTableDao.getIdByType(ht);
    }
    /// <summary>
    /// 上一张、下一张、第一张、最后一张
    /// </summary>
    /// <param name="tableName">表名</param>
    /// <param name="columnName">列名</param>
    /// <param name="Id">列值</param>
    /// <param name="type">类型 上一张：P、下一张：N、第一张：F、最后一张：L</param>
    /// <returns></returns>
    public String getIdByType(String tableName, String pkColumn, String orderColumn, Object id, String type, String extSql)
    {
        if ((!StringTools.equals(type, "F") && !StringTools.equals(type, "P") && !StringTools.equals(type, "N") && !StringTools.equals(type, "L")) 
                || ((id == null || StringTools.isEmpty(String.valueOf(id))) && !StringTools.equals(type, "F")))
        {
            type = "L";
        }
        HashMap<String, Object> ht = new HashMap<String, Object>();
        ht.put("tableName", tableName);
        ht.put("pkColumn", pkColumn);
        ht.put("orderColumn", orderColumn);
        ht.put("id", id);
        ht.put(type, type);
        ht.put("extSql", extSql);
        return refTableDao.getIdByType(ht);
    }
    /**
     * 获取最大值
     * @param tableName
     * @param columnName
     * @param filterSql
     * @return
     */
    public String getColMaxValue(String tableName, String columnName, String filterSql)
    {
        HashMap<String, Object> ht = new HashMap<String, Object>();
        ht.put("tableName", tableName);
        ht.put("columnName", columnName);
        ht.put("extSql", filterSql);
        return refTableDao.getColMaxValue(ht);
    }
    
    public int getQuantityPrecison(){
        String propValue = getSysPropertyValue("RD", "QuantityPrecision");
        if(StringTools.isEmpty(propValue)){
            return 2;
        }else{
            return Integer.parseInt(propValue);
        }
    }
    
    public int getPricePrecison(){
        String propValue = getSysPropertyValue("RD", "PricePrecision");
        if(StringTools.isEmpty(propValue)){
            return 2;
        }else{
            return Integer.parseInt(propValue);
        }
    }
    
    public int getAmountPrecison(){
        String propValue = getSysPropertyValue("RD", "AmountPrecision");
        if(StringTools.isEmpty(propValue)){
            return 2;
        }else{
            return Integer.parseInt(propValue);
        }
    }
    
//    protected String getVouchCode(String vouchType, CodeFormatAccording according, boolean isSave) {
//        StringBuffer codePreSb = new StringBuffer();
//        StringBuffer accordingSb = new StringBuffer();
//        
//        accordingSb.append(vouchType);
//        CodeFormat format = (CodeFormat) codeFormatService.getCodeFormat(vouchType).getData("codeFormat");
//        
//        if(format == null){
//            format = new CodeFormat();
//            format.setSnLen(8);
//        }else{
//            String codePreValue1 = "";
//            if(StringTools.isNotEmpty(format.getCodePre1())){
//                codePreValue1 = getCodePreValue(format.getCodePre1(), format.getCodeContent1(), according);
//                codePreSb.append(codePreValue1);
//                
//                if(format.getIsAccording1() && StringTools.isNotEmpty(codePreValue1)){
//                    accordingSb.append("-").append(codePreValue1);
//                }
//            }
//    
//            String codePreValue2 = "";
//            if(StringTools.isNotEmpty(format.getCodePre2())){
//                codePreValue2 = getCodePreValue(format.getCodePre2(), format.getCodeContent2(), according);
//                codePreSb.append(codePreValue2);
//                
//                if(format.getIsAccording2() && StringTools.isNotEmpty(codePreValue2)){
//                    accordingSb.append("-").append(codePreValue2);
//                }
//            }
//    
//            String codePreValue3 = "";
//            if(StringTools.isNotEmpty(format.getCodePre2())){
//                codePreValue3 = getCodePreValue(format.getCodePre3(), format.getCodeContent3(), according);
//                codePreSb.append(codePreValue3);
//                
//                if(format.getIsAccording3() && StringTools.isNotEmpty(codePreValue3)){
//                    accordingSb.append("-").append(codePreValue3);
//                }
//            }
//        }
//        
//        SysKey sysKey = new SysKey();
//        sysKey.setKeyType(accordingSb.toString());
//        sysKey.setKeyLen(format.getSnLen());
//        return codePreSb+getKey(sysKey, isSave);
//    }
    
    protected String getVouchCode(String vouchType, CodeFormatAccording according, boolean isSave) {
        StringBuffer codePreSb = new StringBuffer();
        
        CodeFormat format = (CodeFormat) codeFormatService.getCodeFormat(vouchType).getData("codeFormat");
        
        if(format == null){
            format = new CodeFormat();
            format.setSnLen(8);
        }else{
            String codePreValue1 = "";
            if(StringTools.isNotEmpty(format.getCodePre1())){
                codePreValue1 = getCodePreValue(format.getCodePre1(), format.getCodeContent1(), according);
                codePreSb.append(codePreValue1);
            }
    
            String codePreValue2 = "";
            if(StringTools.isNotEmpty(format.getCodePre2())){
                codePreValue2 = getCodePreValue(format.getCodePre2(), format.getCodeContent2(), according);
                codePreSb.append(codePreValue2);
            }
    
            String codePreValue3 = "";
            if(StringTools.isNotEmpty(format.getCodePre2())){
                codePreValue3 = getCodePreValue(format.getCodePre3(), format.getCodeContent3(), according);
                codePreSb.append(codePreValue3);
            }
        }
        String accordingStr = getCodeAccordingStr(vouchType, format, according);
        
        SysKey sysKey = new SysKey();
        sysKey.setKeyType(accordingStr);
        sysKey.setKeyLen(format.getSnLen());
        return codePreSb+getKey(sysKey, isSave);
    }
    
    private String getCodePreValue(String codePre, String codeContent, CodeFormatAccording according){
        String codePreValue = "";
        switch (codePre) {
            case "vouchType":
                codePreValue = codeContent;
                break;
            case "vouchDate":
                codePreValue = StringTools.getDateString(according.getVouchDate(), codeContent);
                break;
            case "warehouse":
                codePreValue = according.getWhCode();
                break;
            case "busType":
                codePreValue = according.getBusType();
                break;
            case "classCode":
                codePreValue = according.getClassCode();
                break;
    
            default:
                codePreValue="";
                break;
        }
        return codePreValue;
    }
    
//    public String getCodeAccordingStr(String vouchType, CodeFormatAccording according){
//        StringBuffer accordingSb = new StringBuffer();
//        
//        accordingSb.append(vouchType);
//        CodeFormat format = (CodeFormat) codeFormatService.getCodeFormat(vouchType).getData("codeFormat");
//        
//        if(format == null){
//            format = new CodeFormat();
//            format.setSnLen(8);
//        }else{
//            String codePreValue1 = "";
//            if(StringTools.isNotEmpty(format.getCodePre1())){
//                codePreValue1 = getCodePreValue(format.getCodePre1(), format.getCodeContent1(), according);
//                if(format.getIsAccording1() && StringTools.isNotEmpty(codePreValue1)){
//                    accordingSb.append("-").append(codePreValue1);
//                }
//            }
//    
//            String codePreValue2 = "";
//            if(StringTools.isNotEmpty(format.getCodePre2())){
//                codePreValue2 = getCodePreValue(format.getCodePre2(), format.getCodeContent2(), according);
//                if(format.getIsAccording2() && StringTools.isNotEmpty(codePreValue2)){
//                    accordingSb.append("-").append(codePreValue2);
//                }
//            }
//    
//            String codePreValue3 = "";
//            if(StringTools.isNotEmpty(format.getCodePre2())){
//                codePreValue3 = getCodePreValue(format.getCodePre3(), format.getCodeContent3(), according);
//                if(format.getIsAccording3() && StringTools.isNotEmpty(codePreValue3)){
//                    accordingSb.append("-").append(codePreValue3);
//                }
//            }
//        }
//        return accordingSb.toString();
//    }

    public String getCodeAccordingStr(String vouchType, CodeFormatAccording according){
        CodeFormat format = (CodeFormat) codeFormatService.getCodeFormat(vouchType).getData("codeFormat");
        return getCodeAccordingStr(vouchType, format, according);
    }
    
    public String getCodeAccordingStr(String vouchType, CodeFormat format, CodeFormatAccording according){
        StringBuffer accordingSb = new StringBuffer();
        
        accordingSb.append(vouchType);
        if(format == null){
            format = new CodeFormat();
            format.setSnLen(8);
        }else{
            String accordingValue1 = "";
            if(StringTools.isNotEmpty(format.getAccording1())){
                accordingValue1 = getCodePreValue(format.getAccording1(), format.getAccordingContent1(), according);
                accordingSb.append("-").append(accordingValue1);
            }
            
            String accordingValue2 = "";
            if(StringTools.isNotEmpty(format.getAccording2())){
                accordingValue2 = getCodePreValue(format.getAccording2(), format.getAccordingContent2(), according);
                accordingSb.append("-").append(accordingValue2);
            }
            
            String accordingValue3 = "";
            if(StringTools.isNotEmpty(format.getAccording3())){
                accordingValue3 = getCodePreValue(format.getAccording3(), format.getAccordingContent3(), according);
                accordingSb.append("-").append(accordingValue3);
            }
        }
        return accordingSb.toString();
    }
    
    public void errorLog(String msg){
        logger.error(msg);
    }
    public void errorLog(String msg, Exception e){
        logger.error(msg, e);
        e.printStackTrace();
    }

    public void debugLog(String msg){
    	logger.debug(msg);
    }
    public void debugLog(String msg, Exception e){
        logger.debug(msg, e);
        e.printStackTrace();
    }
}
