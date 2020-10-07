package com.gzhh.hrp.extension.spring;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringContextUtil implements ApplicationContextAware {

    private static ApplicationContext ac = null;  
    private static SpringContextUtil springContextUtil = null;  
  
    public synchronized static SpringContextUtil init() {  
        if (springContextUtil == null) {  
            springContextUtil = new SpringContextUtil();  
        }  
        return springContextUtil;  
    }  
  
    public void setApplicationContext(ApplicationContext applicationContext)throws BeansException {  
        ac = applicationContext;  
    }  
  
    public static <T> T getBean(String beanName) {  
        if (null != ac) {  
            return (T) (ac.getBean(beanName));  
        }  
        return null;  
    }  
}
