package com.gzhh.hrp.common.page;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.RowBounds;

@Intercepts( {@Signature(type = ResultSetHandler.class, method = "handleResultSets", args = {Statement.class})})
public class DiclectResultSetHandlerInterceptor implements Interceptor
{
    public Object intercept(Invocation invocation) throws Throwable
    {
        ResultSetHandler resultSetHandler = (ResultSetHandler)invocation.getTarget();

        RowBounds rowBounds = (RowBounds)ReflectUtil.getFieldValue(resultSetHandler,"rowBounds");
        if(rowBounds instanceof PageRowBound){
            Object[] args = invocation.getArgs();
            // 获取到当前的Statement
            Statement stmt =  (Statement) args[0];
            
            // 通过Statement获得当前结果集
            ResultSet resultSet = stmt.getResultSet();
            
            int rowCount = 0;    
            while(resultSet.next())    
            {    
                rowCount++;    
            }  
            resultSet.beforeFirst();
            ReflectUtil.setFieldValue(rowBounds, "rowCount", rowCount);
        }
        return invocation.proceed();
    }
   
    public Object plugin(Object target)
    {
        return Plugin.wrap(target, this);
    }
   
    public void setProperties(Properties properties)
    {
    }
}