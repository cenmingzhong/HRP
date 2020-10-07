package com.gzhh.hrp.common.filter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.FetchMode;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;

import com.gzhh.hrp.extension.hibernate.AliasToBean;
import com.gzhh.hrp.tools.CollectionTools;


/**
 * 拼装Hibernate条件
 */
public class DetachedCriteriaUtil {
    
    private static final String POINT = ".";
    
    private DetachedCriteriaUtil(){
    }    
    /**
     * 该方法提供DetachedCriteria对查询字段的封装，可支持无限级联取部分字段，如取如下字段 
     * user.organization.parentOrganization.parentOrganization.orgName
     * 但请注意1点 ,连接采用内联，级联越多，结果集可能就越少；
     * @param columnNames
     *            字符串数组，以数据的形式接收要查询的字段属性，如String[] column={"属性1","属性2","属性3"};
     * @param pojoClass
     *            实体类的Class,如Mobile.class;
     * @param aials
     *            为要查询的POJO对象指定一个别名
     * @return DetachedCriteria 的一个对象，如果需要查询条件，在些对象后追加查询条件。
     * 
     * @param forJoinTable 是否多表连接查询
     */
    public static void selectColumn(DetachedCriteria criteria, List<String> columnNames,
            Class<?> pojoClass,boolean forJoinTable) {
        if (CollectionTools.isEmpty(columnNames)) {
            return;
        }
    
        //使用这个临时变量集合，是因为dinstinct关键字要放在最前面，而distinct关键字要在下面才决定放不放，
        List<Projection> tempProjectionList = new ArrayList<Projection>();
        
        Set<String> aliases = new HashSet<String>();
        boolean hasJoniTable = false;
        String rootAlias = criteria.getAlias();
        for (String property : columnNames) {
            if(property.contains(POINT)){
                String[] propertyChain = property.split("\\.");
                createAlias(criteria,rootAlias,aliases,propertyChain,0);
                tempProjectionList.add(Projections.property(getAliasFromPropertyChainString(property)).as(property));
                hasJoniTable = true;
            }else{
                tempProjectionList.add(Projections.property(rootAlias + POINT + property).as(property));
            }
        }
        
        ProjectionList projectionList = Projections.projectionList();
        for (Projection proj : tempProjectionList) {
            projectionList.add(proj);
        }
        
        criteria.setProjection(projectionList);
        
        if(!hasJoniTable){
            criteria.setResultTransformer(Transformers.aliasToBean(pojoClass));
        }else{//下面这个是自定义的结果转换器
            criteria.setResultTransformer(new AliasToBean(pojoClass));
        }
    }
    
    /**
     * 创建别名
     * @param criteria
     * @param rootAlais
     * @param aliases
     * @param columns
     * @param currentStep
     */
    private static void createAlias(DetachedCriteria criteria, String rootAlais, Set<String> aliases,String[] columns,int currentStep){
        if(currentStep<columns.length-1){
            if(!aliases.contains(converArrayToAlias(columns, currentStep))){
                if(currentStep>0){
                    criteria.createAlias(converArrayToAlias(columns, currentStep-1) + POINT +columns[currentStep], converArrayToAlias(columns, currentStep),JoinType.LEFT_OUTER_JOIN).setFetchMode(columns[currentStep], FetchMode.JOIN);
                }else{
                    criteria.createAlias(rootAlais + POINT +columns[currentStep], converArrayToAlias(columns, currentStep),JoinType.LEFT_OUTER_JOIN).setFetchMode(columns[currentStep], FetchMode.JOIN);
                }
                aliases.add(converArrayToAlias(columns, currentStep));
            }
            currentStep++;
            createAlias(criteria, rootAlais, aliases, columns, currentStep);
        }
    }
    
    
    /**
     * 从"organization.parentOrganization.parentOrganization.parentOrganization.id" 得到 
     * "organization_parentOrganization_parentOrganization_parentOrganization.id"
     * @param property
     * @return
     */
    public static String getAliasFromPropertyChainString(String property){
        if(property.contains(".")){
            return property.substring(0, property.lastIndexOf(POINT)).replaceAll("\\.", "_") + property.substring(property.lastIndexOf(POINT));
        }
        return property;
    }
    
    /**
     * 从数组中创建ALIAS
     * @param columns
     * @param currentStep
     * @return
     */
    private static String converArrayToAlias(String[] columns,int currentStep){
        StringBuilder alias = new StringBuilder();
        for (int i = 0; i <= currentStep; i++) {
            if(alias.length()>0){
                alias.append("_");
            }
            alias.append(columns[i]);
        }
        return alias.toString();
    }
}
