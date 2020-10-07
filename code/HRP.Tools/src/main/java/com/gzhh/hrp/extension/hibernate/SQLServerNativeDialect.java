package com.gzhh.hrp.extension.hibernate;

import java.sql.Types;

import org.hibernate.HibernateException;
import org.hibernate.dialect.SQLServer2008Dialect;

public class SQLServerNativeDialect extends SQLServer2008Dialect  {
    public SQLServerNativeDialect() {  
        super();
        registerColumnType( Types.VARCHAR, 8000, "nvarchar($l)" );
        registerColumnType(Types.CLOB, "nvarchar(max)");  
        registerColumnType( Types.NUMERIC, "decimal($p,$s)" );
        registerColumnType( Types.DATE, "datetime" );
        registerColumnType( Types.TIMESTAMP, "datetime" );
    }  
    public String getTypeName(int code, int length, int precision, int scale) throws HibernateException {  
        if(code != 2005) {  
            return super.getTypeName(code, length, precision, scale);  
        } else {  
            return "ntext";  
        }  
    } 
}
