package com.gzhh.hrp.extension.hibernate;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.HibernateException;
import org.hibernate.transform.ResultTransformer;

import com.opensymphony.xwork2.ognl.OgnlUtil;
import com.opensymphony.xwork2.util.reflection.ReflectionContextState;

import ognl.Ognl;

/**
 * 此版本运行在xwork-core-2.1.6.jar
 * 支持属性为自定义对象的结果集转换的部份属性查询
 */
public class AliasToBean implements ResultTransformer {
    private static final long serialVersionUID = 1L;
    private static final OgnlUtil ognlUntil = new OgnlUtil();
    private static final Map<String,Boolean> context = new HashMap<String,Boolean>(1);
    static{
        context.put(ReflectionContextState.CREATE_NULL_OBJECTS, true);
    }
    
    /** POJO的class */
    private final Class<?> resultClass;
    
    public AliasToBean(Class<?> pojoClass) {
        if(pojoClass==null) throw new IllegalArgumentException("resultClass cannot be null");
        this.resultClass = pojoClass;
    }

    @SuppressWarnings("rawtypes")
    @Override
    public List transformList(List collection) {
        return collection;
    }

    /**
     * 结果集转换
     * 2009-4-7
     * @author 苍鹰
     * @param tuple 属性值集合
     * @param aliases 属性名集合
     * @return 单个POJO实例--查询结果
     */
    @Override
    public Object transformTuple(Object[] tuple, String[] aliases) {
        try {
            Object root = resultClass.newInstance();
            for (int i = 0; i < aliases.length; i++) {
                if(aliases[i]!=null && !aliases[i].equals(""))
                {
                    if(aliases[i].contains(".")){
                        setField(aliases[i], root);
                    }
                    Ognl.setValue(ognlUntil.compile(aliases[i]), context, root, tuple[i]);
                }
            }
            return root;
        } catch (Exception e) {
            throw new HibernateException(e.getMessage(),e);
        }
    }
    
    public static void setField(String expression, Object obj) throws IllegalArgumentException, IllegalAccessException, InstantiationException, NoSuchFieldException, SecurityException, InvocationTargetException, NoSuchMethodException{
        String property = expression.split("\\.")[0];
        
        Object fieldObj = PropertyUtils.getProperty(obj, property);
        if(PropertyUtils.getProperty(obj, property)== null){
            Field field = obj.getClass().getDeclaredField(property);
            field.setAccessible(true);
            fieldObj = field.getType().newInstance();
            field.set(obj, fieldObj);
        }
        
        if(expression.split("\\.")[1].contains(".")){
            setField(expression.split("\\.")[1], fieldObj);
        }
    }
}
