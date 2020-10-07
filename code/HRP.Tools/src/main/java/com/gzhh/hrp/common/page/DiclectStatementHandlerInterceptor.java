package com.gzhh.hrp.common.page;

import java.sql.Connection;
import java.util.Properties;

import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

@Intercepts( {@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})})
public class DiclectStatementHandlerInterceptor implements Interceptor
{
   
    public Object intercept(Invocation invocation) throws Throwable
    {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        
        //调用代码获取原始SQL并将其修改，参数值也
        BoundSql boundSql = statementHandler.getBoundSql();//原始sql对象

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