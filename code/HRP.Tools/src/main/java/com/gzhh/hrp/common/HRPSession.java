package com.gzhh.hrp.common;

import java.util.Date;
import java.util.Hashtable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gzhh.hrp.tools.JsonTools;
import com.gzhh.hrp.tools.StringTools;

public class HRPSession {

    private static Logger logger = LoggerFactory.getLogger(HRPSession.class);
    
    @SuppressWarnings("rawtypes")
    private static final ThreadLocal SESSION_MAP = new ThreadLocal();
    @SuppressWarnings("unchecked")
    public static void putSessionId(String sessionId) {
        SESSION_MAP.set(sessionId);
    }

    public static String getSessionId() {
        Object obj = SESSION_MAP.get();
        if(obj == null){
            return null;
        }else{
            return String.valueOf(obj);
        }
    }
    
    private Hashtable<String, Object> ht;

    private static HRPSession instance = null;

    private HRPSession() {
        ht = new Hashtable<String, Object>();
    }
    public synchronized static HRPSession getInstance()
    {
        if (instance == null)
        {
            instance = new HRPSession();
        }
        return instance;
    }
    
    public static void addLoginSession(String sysUserCode,String loginDate, String sessionId)
    {
        logger.debug("新增登陆信息：session="+sessionId+", sysUserCode="+sysUserCode);
        HRPSession session = HRPSession.getInstance();
        Date nowTime = new Date();

        if (session.getHt().get(sessionId) == null)
        {
            LoginState loginState = new LoginState();

            loginState.setSysUserCode(sysUserCode) ;
            loginState.setLastActiveTime(nowTime);
            loginState.setLoginTime(nowTime);
            loginState.setSessionId(sessionId);
            loginState.setLoginDate(StringTools.getDate(loginDate));

            session.ht.put(sessionId, loginState);
        }
        else
        {
            LoginState currentLoginState = (LoginState)session.getHt().get(sessionId);

            currentLoginState.setSysUserCode(sysUserCode) ;
            currentLoginState.setLastActiveTime(nowTime);
            currentLoginState.setLoginTime(nowTime);
            currentLoginState.setLoginDate(StringTools.getDate(loginDate));
        }
    }
    
    public static LoginState getLoginStateBySessionId(String sessionId)
    {
        HRPSession sessionObj = HRPSession.getInstance();

        if (sessionObj.getHt().get(sessionId)== null)
        {
            logger.debug("获取session信息失败：sessionId="+sessionId);
            try {
                logger.debug("当前session记录="+JsonTools.serialize(sessionObj.getHt()));
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return null;
        }

        return (LoginState)sessionObj.getHt().get(sessionId);
    }
    
    public static void RemoveSession()
    {
        String sessionId = getSessionId();
        if(StringTools.isNotEmpty(sessionId)){
            HRPSession session = HRPSession.getInstance();
            try {
                logger.debug("删除session信息：sessionId="+sessionId+",登陆信息："+JsonTools.serialize(session.getHt().get(sessionId)));
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
            session.ht.remove(sessionId);
        }
    }
    
    public static void removeSession(String sessionId)
    {
        HRPSession session = HRPSession.getInstance();
        if(StringTools.isNotEmpty(sessionId) && session.getHt().containsKey(sessionId)){
            try {
                logger.debug("删除session信息：sessionId="+sessionId+",登陆信息："+JsonTools.serialize(session.getHt().get(sessionId)));
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
            session.ht.remove(sessionId);
        }
    }
    
    public Hashtable<String, Object> getHt() {
        return ht;
    }
    public void setHt(Hashtable<String, Object> ht) {
        this.ht = ht;
    }
}
