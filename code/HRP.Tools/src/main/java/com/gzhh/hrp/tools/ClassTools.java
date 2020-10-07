package com.gzhh.hrp.tools;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.beanutils.expression.DefaultResolver;
import org.apache.commons.beanutils.expression.Resolver;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.type.TypeAliasRegistry;
import org.hibernate.MappingException;
import org.hibernate.property.ChainedPropertyAccessor;
import org.hibernate.property.PropertyAccessor;
import org.hibernate.property.PropertyAccessorFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.util.ClassUtils;

import com.gzhh.hrp.common.CommonFilter;
import com.gzhh.hrp.common.QueryColumn;
import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.filter.StandardFilterProcessor;
import com.gzhh.hrp.extension.spring.SpringContextUtil;

import ognl.Ognl;
import ognl.OgnlException;
import sun.reflect.generics.reflectiveObjects.ParameterizedTypeImpl;

public class ClassTools {

    private static final String RESOURCE_PATTERN = "/**/*.class";
    private static final String TITLE_ANNOTATION_NAME="com.gzhh.hrp.common.Title";
    private static final String TABLE_ANNOTATION_NAME="javax.persistence.Table";
    private static final String ENTITY_ANNOTATION_NAME="javax.persistence.Entity";
    
    public static Set<String> getEntityClassNames(String pkg) {
        
        ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        Set<String> entityClassNames = new TreeSet<String>();
        try {
            String pattern = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath(pkg) + RESOURCE_PATTERN;
            Resource[] resources = resourcePatternResolver.getResources(pattern);
            MetadataReaderFactory readerFactory = new CachingMetadataReaderFactory(resourcePatternResolver);
            for (Resource resource : resources) {
                if (resource.isReadable()) {
                    MetadataReader reader = readerFactory.getMetadataReader(resource);
                    String className = reader.getClassMetadata().getClassName();
                    
                    AnnotationMetadata metadata = reader.getAnnotationMetadata();
                    if(metadata.hasAnnotation(ENTITY_ANNOTATION_NAME)){
                        entityClassNames.add(className);
                    }
                }
            }
        }
        catch (IOException ex) {
            throw new MappingException("Failed to scan classpath for unlisted classes", ex);
        }
        return entityClassNames;
    }
    
    public static List<Field> getTitledField(Class clazz){
        List<Field> list = new ArrayList<Field>();
        
        for(; clazz != Object.class;clazz = clazz.getSuperclass()){
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {// 获取bean的属性和值
                if(field.isAnnotationPresent(Title.class)){
                    list.add(field);
                }
            }
        }
        return list;
    }
    
    public static boolean isPropertyInClass(Class clazz, String propertyName){
        boolean isExist = false;
        for(; clazz != Object.class;clazz = clazz.getSuperclass()){
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                if(propertyName.indexOf(".") != -1){
                    String tempPropName = propertyName.split("\\.")[0];
                    if(field.getName().equals(tempPropName)){
                        isExist=isPropertyInClass(field.getType(), propertyName.split("\\.")[1]);
                        break;
                    }
                }else{
                    if(field.getName().equals(propertyName)){
                        isExist=true;
                        break;
                    }
                }
            }
        }
        return isExist;
    }
    
    
    public static Resource[] getXmlResources(String pkg) {
        ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = null;
        try {
            String pattern = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath(pkg) + "/**/*.xml";
            resources = resourcePatternResolver.getResources(pattern);
        }
        catch (IOException ex) {
            throw new MappingException("Failed to scan classpath for unlisted classes", ex);
        }
        return resources;
    }
    
    private static Type getPropertyGenericReturnType(Class<?> rootClass, String propertyName) {
        PropertyAccessor propertyAccessor = new ChainedPropertyAccessor(
            new PropertyAccessor[] {
                PropertyAccessorFactory.getPropertyAccessor(rootClass, null),
                PropertyAccessorFactory.getPropertyAccessor("field") 
        });
        return propertyAccessor.getGetter(rootClass, propertyName).getMethod()
                .getGenericReturnType();
    }

    private static Class<?> getPropertyType(Class<?> rootClass, String[] propertyNames, int index) {
        Class<?> result = null;
        if (index < propertyNames.length - 1) {
            Type genericType = getPropertyGenericReturnType(rootClass, propertyNames[index]);
            if (genericType instanceof ParameterizedTypeImpl) {
                result = getPropertyType((Class<?>) ((ParameterizedTypeImpl) genericType).getActualTypeArguments()[0], propertyNames,++index);
            } else {
                result = getPropertyType((Class<?>) genericType, propertyNames,++index);
            }
        } else {
            result = (Class<?>) getPropertyGenericReturnType(rootClass,propertyNames[index]);
        }
        return result;
    }
    
    public static Class<?> getPropertyType(Class<?> rootClass, String propertyName) {
        Type result = null;
        if (propertyName.contains(".")) {
            result = getPropertyType(rootClass, propertyName.split("\\."), 0);
        } else {
            result = getPropertyGenericReturnType(rootClass, propertyName);
        }
        if (result instanceof ParameterizedTypeImpl) {
            throw new ValidateException(MessageFormat.format("属性{0}未明确指定集合中元素的属性名，无法进行拼装条件", propertyName));
        }

        if (!(result instanceof Class)) {
            throw new ValidateException(MessageFormat.format("属性{0}为不合法的类型:{1}，无法进行拼装条件",propertyName, result));
        }
        return (Class<?>) result;
    }

    public static String getTableColumn(String tableAlias, String classAlias){
        SqlSessionTemplate sqlSessionTemplate = SpringContextUtil.getBean("sqlSessionTemplate");
        
        TypeAliasRegistry aliasRegistry = sqlSessionTemplate.getConfiguration().getTypeAliasRegistry();
        Class clazz = aliasRegistry.resolveAlias(classAlias);
        if(clazz==null){
            throw new ValidateException(MessageFormat.format("未找到{0}对应的实体类",classAlias));
        }
        
        List<String> colList = new ArrayList<String>();
        if(StringTools.isNotEmpty(tableAlias)){
            tableAlias = tableAlias + ".";
        }
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {// 获取bean的属性和值
            if(field.isAnnotationPresent(Column.class)){
                Column column = field.getAnnotation(Column.class);
                colList.add(tableAlias+column.name());
            }else if(field.isAnnotationPresent(JoinColumn.class)){
                JoinColumn column = field.getAnnotation(JoinColumn.class);
                colList.add(tableAlias+column.name());
            }
        }
        return StringTools.listToString(colList, ",");
    }
    
    public static String getSql(){
        SqlSessionTemplate sqlSessionTemplate = SpringContextUtil.getBean("sqlSessionTemplate");
        
        Collection<MappedStatement> statements = sqlSessionTemplate.getConfiguration().getMappedStatements();
        
        return "";
    }
    
    public static String createQueryColumn(String defAlias, List<QueryColumn> columnList){
        List<String> sqlList = new ArrayList<String>();
        
        if(CollectionTools.isNotEmpty(columnList)){
            for(QueryColumn col: columnList){
                if(StringTools.isNotEmpty(col.getColName())){
                    if(col.getColName().indexOf(".")==-1){
                        sqlList.add(defAlias+"."+col.getColName() +" as ["+ col.getFieldName()+"] ");
                    }else{
                        sqlList.add(col.getColName() +" as ["+ col.getFieldName()+"] ");
                    }
                }
            }
        }
        return StringTools.listToString(sqlList, ",");
    }
    
    public static String createQueryFilter(String defAlias, List<CommonFilter> filterList){
        List<String> sqlList = new ArrayList<String>();
        
        if(CollectionTools.isNotEmpty(filterList)){
            for(CommonFilter filter: filterList){
                if(StringTools.isNotEmpty(filter.getValue()) && StringTools.isNotEmpty(filter.getOperator())){
                    String name = filter.getName();
                    if(name.indexOf(".")==-1){
                        name = defAlias+"."+name;
                    }
                    if(StringTools.equalsIgnoreCase(filter.getDataType(), "date")){
                        name = "CONVERT(varchar(10),"+name+",23)";
                    }
                    if(filter.getMultiSel()){
                        String[] valueList = filter.getValue().toString().split(",");
                        List<String> tempList = new ArrayList<String>();
                        switch (filter.getOperator()) {
                            case StandardFilterProcessor.EQ:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " = '"+valueList[i]+"'" );
                                }
                                sqlList.add(" and("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            case StandardFilterProcessor.NE:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " = '"+valueList[i]+"'" );
                                }
                                sqlList.add(" and not("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            case StandardFilterProcessor.LIKE:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " like '%"+valueList[i]+"%'" );
                                }
                                sqlList.add(" and ("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            case StandardFilterProcessor.LLIKE:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " like '"+valueList[i]+"%'" );
                                }
                                sqlList.add(" and ("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            case StandardFilterProcessor.RLIKE:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " like '%"+valueList[i]+"'" );
                                }
                                sqlList.add(" and ("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            case StandardFilterProcessor.NLLIKE:
                                for(int i = 0 ; i < valueList.length; i++){
                                    tempList.add(name+ " like '"+valueList[i]+"%'" );
                                }
                                sqlList.add(" and not("+StringTools.listToString(tempList, " or ")+")");
                                break;
                            default:
                                throw new ValidateException(MessageFormat.format("系统未提供比较符({0})的操作", filter.getOperator()));
                        }
                    }else{
                        switch (filter.getOperator()) {
                            case StandardFilterProcessor.EQ:
                                sqlList.add(" and "+name+ " = #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.NE:
                                sqlList.add(" and "+name+ " <> #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.LIKE:
                                sqlList.add(" and "+name+ " like '%"+filter.getValue()+"%'" );
                                break;
                            case StandardFilterProcessor.LLIKE:
                                sqlList.add(" and "+name+ " like '"+filter.getValue()+"%'" );
                                break;
                            case StandardFilterProcessor.RLIKE:
                                sqlList.add(" and "+name+ " like '%"+filter.getValue()+"'" );
                                break;
                            case StandardFilterProcessor.GT:
                                sqlList.add(" and "+name+ " > #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.LT:
                                sqlList.add(" and "+name+ " < #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.GE:
                                sqlList.add(" and "+name+ " >= #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.LE:
                                sqlList.add(" and "+name+ " <= #{"+filter.getId()+"}" );
                                break;
                            case StandardFilterProcessor.IN:
                                sqlList.add(" and "+name+ " in('"+String.valueOf(filter.getValue()).replace(",", "','")+"')" );
                                break;
                            case StandardFilterProcessor.NI:
                                sqlList.add(" and "+name+ " not in('"+String.valueOf(filter.getValue()).replace(",", "','")+"')" );
                                break;
                            case StandardFilterProcessor.ISNU:
                                sqlList.add(" and "+name+ " is null " );
                                break;
                            case StandardFilterProcessor.ISNOTNU:
                                sqlList.add(" and "+name+ " is not null " );
                                break;
                            case StandardFilterProcessor.ISEMP:
                                sqlList.add(" and "+name+ " ='' " );
                                break;
                            case StandardFilterProcessor.ISNOTEMP:
                                sqlList.add(" and "+name+ " <>'' " );
                                break;
                            default:
                                throw new ValidateException(MessageFormat.format("系统未提供比较符({0})的操作", filter.getOperator()));
                        }
                    }
                    
                }
            }
        }
        return StringTools.listToString(sqlList, " ");
    }
    
    public static void setPropertyValue(Object obj, String propertyName, Object value){
        try {
            PropertyUtils.setProperty(obj, propertyName, value);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            e.printStackTrace();
            throw new ValidateException("设置属性值失败：",e);
        }
    }
    
    private static void makeAccessible(Field field) {
        if (!Modifier.isPublic(field.getModifiers()))
        {
            field.setAccessible(true);
        }
    }
   
   
    private static Field getDeclaredField(Object object, String fieldName)
    {
        for (Class<?> superClass = object.getClass(); superClass != Object.class; superClass = superClass.getSuperclass()){
            try {
                return superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException | SecurityException e) {
                e.printStackTrace();
                throw new ValidateException("读取属性["+fieldName+"]失败");
            }
        }
        return null;
    }
    
    public static Object getPropertyValue(Object obj, String propertyName){
        Field field = getDeclaredField(obj, propertyName);
        if (field == null)
            throw new IllegalArgumentException("Could not find field ["
                    + propertyName + "] on target [" + obj + "]");
       
        makeAccessible(field);
       
        Object result = null;
        try{
            result = field.get(obj);
        }catch (IllegalAccessException e){
            e.printStackTrace();
            throw new ValidateException("读取属性值失败：",e);
        }
       
        return result;
//        try {
//            PropertyUtils.getProperty(obj, propertyName);
//        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
//            e.printStackTrace();
//            throw new ValidateException("设置属性值失败：",e);
//        }
    }    
    
    public static void copyBeanValue(Object newObj, Object oldObj) {
        try{
            List<Field> fieldList = ClassTools.getTitledField(newObj.getClass());
            for(Field field : fieldList){
                String fieldName = field.getName();
                if(isPropertyInClass(newObj.getClass(), fieldName)){
                    Object value = getPropertyValue(oldObj, field.getName());
                    if(value != null){
                        setPropertyValue(newObj, field.getName(), value);
                    }
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
            throw new ValidateException("复制属性值失败：",e);
        }
    }
    
    public static Object getTreeFieldValue(Object obj, String treeNode){
        if(obj == null){
            throw new ValidateException("读取属性值失败：对象为空");
        }
        try {
            return Ognl.getValue(treeNode,obj );
        } catch (OgnlException e) {
            e.printStackTrace();
            throw new ValidateException("读取属性值失败："+StringTools.getExceptionMsg(e));
        }
    }
    
    public static void setNestedProperty(Object bean, String name, Object value) throws Exception{
        Resolver resolver = new DefaultResolver();
        
        Object oriBean = bean;
        String oriName = name;
        
        if (bean == null) {
            throw new IllegalArgumentException("No bean specified");
        }
        if (name == null) {
            throw new IllegalArgumentException("No name specified for bean class '" + bean.getClass() + "'");
        }
        // Resolve nested references
        while (resolver.hasNested(name)) {
            final String next = resolver.next(name);
            Object nestedBean = PropertyUtils.getSimpleProperty(bean, next);
            
            if (nestedBean == null) {
                Field field = bean.getClass().getDeclaredField(next);
                field.setAccessible(true);
                Object fieldObj = field.getType().newInstance();
                field.set(bean, fieldObj);
                
                nestedBean = PropertyUtils.getSimpleProperty(bean, next);
            }
            bean = nestedBean;
            name = resolver.remove(name);
        }
        PropertyUtils.setSimpleProperty(bean, name, value);
    }
    
    public static String convertInToLike(String colName, String inValues){
        List<String> sqlList = new ArrayList<String>();
        
        if(StringTools.isEmpty(inValues)){
            sqlList.add(" 1=1 ");
        }else{
            String[] inValueList = inValues.split(",");
            
            for(int i = 0 ; i < inValueList.length; i++){
                String value = inValueList[i].replace("'", "");
                if(StringTools.equals(value, "")){
                    sqlList.add(colName+" in ''");
                }else{

                    sqlList.add(colName+" like '"+value+"%'");
                }
            }
        }
        return "("+StringTools.listToString(sqlList, " or ")+")";
    }
    
}
