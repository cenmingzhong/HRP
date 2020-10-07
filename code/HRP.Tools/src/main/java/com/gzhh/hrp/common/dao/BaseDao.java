package com.gzhh.hrp.common.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import com.gzhh.hrp.common.CommonFilter;
import com.gzhh.hrp.common.filter.DetachedCriteriaUtil;
import com.gzhh.hrp.common.filter.StandardFilterProcessor;
import com.gzhh.hrp.common.page.PageRowBound;
import com.gzhh.hrp.tools.ClassTools;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.PageInfo;
import com.gzhh.hrp.tools.StringTools;

public class BaseDao<T> extends HibernateDaoSupport {

    private Class<T> persistentClass;  
    
    @Resource
    private SqlSessionTemplate sqlSessionTemplate;
    
    @SuppressWarnings("unchecked")  
    public BaseDao()  
    {  
        // 获取持久化对象的类型  
        Type t = getClass().getGenericSuperclass();
        if (t instanceof ParameterizedType) {
            Type[] p = ((ParameterizedType) t).getActualTypeArguments();
            this.persistentClass = (Class<T>) p[0];
        }
    }  
  
    protected Class<T> getPersistentClass()  
    {  
        return persistentClass;  
    } 
    
    @Resource  
    private void setSuperSessionFactory(SessionFactory sessionFactory){  
        super.setSessionFactory(sessionFactory);  
    }
    
    public void insert(T t){
        getHibernateTemplate().save(t);
        getHibernateTemplate().getSessionFactory().getCurrentSession().flush();
    }
    
    @SuppressWarnings("unchecked")
    public void batchInsert(List<T> tlist){
        getHibernateTemplate().execute(new HibernateCallback() {
            @Override
            public Object doInHibernate(Session session) throws HibernateException {
                
                for (int i = 0; i < tlist.size(); i++) {  
                    session.save(tlist.get(i));
                    if (i % 1000 == 0) {  
                        session.flush();  
                        session.clear();  
                    }  
                }
                session.flush();  
                session.clear();  
                return null;
            }  
        });
    }
    
    @SuppressWarnings("unchecked")
    public void update(T entity)  
    {  
        entity = (T)getHibernateTemplate().getSessionFactory().getCurrentSession().merge(entity);
        this.getHibernateTemplate().saveOrUpdate(entity);  
        getHibernateTemplate().getSessionFactory().getCurrentSession().flush();
    } 
    
    @SuppressWarnings("unchecked")
    public void batchUpdate(List<T> tlist){
        if(CollectionTools.isNotEmpty(tlist)){
            getHibernateTemplate().execute(new HibernateCallback() {
                @Override
                public Object doInHibernate(Session session) throws HibernateException {

                    session.clear();  
                    for (int i = 0; i < tlist.size(); i++) {
                        session.update(tlist.get(i));
                        if (i % 500 == 0) {  
                            session.flush();  
                            session.clear();  
                        }  
                    }
                    session.flush();
                    session.clear();    
                    return null;
                }  
            });
        }
    }
    
    @SuppressWarnings("unchecked")
    public void batchDelete(List<T> tlist){
        getHibernateTemplate().execute(new HibernateCallback() {
            @Override
            public Object doInHibernate(Session session) throws HibernateException {
                
                for (int i = 0; i < tlist.size(); i++) {
                    T entity = tlist.get(i);
                    entity = (T)getHibernateTemplate().getSessionFactory().getCurrentSession().merge(entity);
                    session.delete(entity);
                    if (i % 1000 == 0) {  
                        session.flush();  
                        session.clear();  
                    }  
                }
                session.flush();  
                session.clear();  
                return null;
            }  
        });
    }
    
    @SuppressWarnings("unchecked")
    public List<T> getListByFilter(HashMap<String, Object> filter) {
        DetachedCriteria dc = createCreteria();
        setDetachedCriteria(dc, filter);
        return (List<T>) this.getHibernateTemplate().findByCriteria(dc);
    }
    
    public DetachedCriteria createCreteria(){
        return DetachedCriteria.forClass(getPersistentClass());
    }
    
    @SuppressWarnings("unchecked")
    public List<T> getListByCriteria(DetachedCriteria criteria){
        return (List<T>)this.getHibernateTemplate().findByCriteria(criteria);
    }
    
    @SuppressWarnings("unchecked")
    public List<T> getListByCriteria(DetachedCriteria criteria,PageInfo page){
        Criteria c = criteria.getExecutableCriteria(getHibernateTemplate().getSessionFactory().getCurrentSession());
        
        int pageSize = page.getPageSize();
        int pageNo = page.getCurPage();
        
        return (List<T>)c.setProjection(null).setFirstResult((pageNo-1)* pageSize).setMaxResults(pageSize).list();
    }
    
    public List<T> getListByFilter(List<String> columnList, List<CommonFilter> filterList){
        DetachedCriteria dc = createCreteria();
        
        if(CollectionTools.isNotEmpty(columnList)){
            DetachedCriteriaUtil.selectColumn(dc,columnList,getPersistentClass(),true);
        }
        setDetachedCriteria(dc, filterList);
        return getListByCriteria(dc);
    }
    
    protected void setDetachedCriteria(DetachedCriteria dc, HashMap<String, Object> params) {
        if(params != null){
            for (Map.Entry<String, Object> iter : params.entrySet()) {
                if(ClassTools.isPropertyInClass(getPersistentClass(), iter.getKey()) && StringTools.isNotEmpty(iter.getValue())){
                    dc.add(Restrictions.eq(iter.getKey(), iter.getValue()));
                }
            }
        }
    }
    
    protected void setDetachedCriteria(DetachedCriteria dc, List<CommonFilter> filterList) {
        if(CollectionTools.isNotEmpty(filterList)){
            StandardFilterProcessor processor = new StandardFilterProcessor();
            for (CommonFilter filter: filterList) {
                if(StringTools.isNotEmpty(filter.getName()) && ClassTools.isPropertyInClass(getPersistentClass(), filter.getName()))
                processor.parseToCriterion(dc, filter, getPersistentClass());
            }
        }
    }
    
    public T get(Serializable key) {
        T obj = this.getHibernateTemplate().get(getPersistentClass(), key);
        getHibernateTemplate().clear();
        return obj;
    }
    public void delete(Serializable id){
        getHibernateTemplate().delete(get(id));
        getHibernateTemplate().getSessionFactory().getCurrentSession().flush();
    }
    public void delete(T t){
        getHibernateTemplate().delete(t);
        getHibernateTemplate().getSessionFactory().getCurrentSession().flush();
    }
        
    public int getInt(String statement, Object parameter) {
        return (Integer)getObject(statement, parameter);
    }

    public Object getObject(String statement, Object parameter) {
        return this.sqlSessionTemplate.selectOne(statement, parameter);
    }

    public Map<String, Object> getMap(String statement, Object parameter) {
        return this.sqlSessionTemplate.selectOne(statement, parameter);
    }

    public T get(String statement, Object parameter) {
        return this.sqlSessionTemplate.selectOne(statement, parameter);
    }
    
    protected List<T> getList(String statement, HashMap<String, Object> filters){
        return this.sqlSessionTemplate.selectList(statement, filters);
    }
    
    protected List<T> getList(String statement, Object parameter){
        return this.sqlSessionTemplate.selectList(statement, parameter);
    }
    
    protected <E> List<E> getEntityList(String statement, Object parameter){
        return this.sqlSessionTemplate.selectList(statement, parameter);
    }

    @SuppressWarnings("rawtypes")
    protected List<Map> getMapList(String statement, HashMap<String, Object> filters){
        return this.sqlSessionTemplate.selectList(statement, filters);
    }
    @SuppressWarnings("rawtypes")
    protected List<Map> getMapList(String statement, HashMap<String, Object> filters, PageInfo page){
        PageRowBound rowBounds = new PageRowBound(page.getCurPage()-1, page.getPageSize());
        List<Map> resultList = this.sqlSessionTemplate.selectList(statement, filters, rowBounds);
        
        page.setTotalCount(rowBounds.getRowCount());
        return resultList;
    }

    @SuppressWarnings("rawtypes")
    protected List<Map> getMapList(String statement, Object param){
        return this.sqlSessionTemplate.selectList(statement, param);
    }

    protected int update(String statement, Object parameter){
        return this.sqlSessionTemplate.update(statement, parameter);
    }
    
    protected int delete(String statement, Object parameter){
        return this.sqlSessionTemplate.delete(statement, parameter);
    }
    
    protected int insert(String statement, Object parameter){
        return this.sqlSessionTemplate.insert(statement, parameter);
    }
}
