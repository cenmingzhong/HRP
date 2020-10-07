package com.gzhh.hrp.common.page;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.MappedStatement.Builder;
import org.apache.ibatis.mapping.ResultSetType;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

@Intercepts({@Signature(type= Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})}) 
public class OffsetLimitInterceptor implements Interceptor{ 
    
    private static int MAPPED_STATEMENT_INDEX    = 0; 
   
    public Object intercept(Invocation invocation) throws Throwable { 
        processIntercept(invocation.getArgs()); 
        return invocation.proceed(); 
    } 

    private void processIntercept(final Object[] queryArgs) { 
        MappedStatement ms = (MappedStatement)queryArgs[MAPPED_STATEMENT_INDEX]; 
        MappedStatement newMs = copyFromMappedStatement(ms, ms.getSqlSource()); 
        queryArgs[MAPPED_STATEMENT_INDEX] = newMs; 
    } 
   
    //see: MapperBuilderAssistant 
    private MappedStatement copyFromMappedStatement(MappedStatement ms,SqlSource newSqlSource) { 
        Builder builder = new MappedStatement.Builder(ms.getConfiguration(),ms.getId(),newSqlSource,ms.getSqlCommandType()); 
       
        builder.resource(ms.getResource()); 
        builder.fetchSize(ms.getFetchSize()); 
        builder.statementType(ms.getStatementType()); 
        builder.keyGenerator(ms.getKeyGenerator()); 
       
        //setStatementTimeout() 
        builder.timeout(ms.getTimeout()); 
       
        //setStatementResultMap() 
        builder.parameterMap(ms.getParameterMap()); 
       
        //setStatementResultMap() 
        builder.resultMaps(ms.getResultMaps()); 
        builder.resultSetType(ResultSetType.SCROLL_INSENSITIVE); 
       
        //setStatementCache() 
        builder.cache(ms.getCache()); 
        builder.flushCacheRequired(ms.isFlushCacheRequired()); 
        builder.useCache(ms.isUseCache()); 
       
        return builder.build(); 
    } 

    public Object plugin(Object target) { 
        return Plugin.wrap(target, this); 
    }

    @Override
    public void setProperties(Properties properties) {
        
    } 
   
} 