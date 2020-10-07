package com.gzhh.hrp.extension.spring;

import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.gzhh.hrp.tools.StringTools;

public class CustomDateFormat extends SimpleDateFormat {

    private static final long serialVersionUID = 1L;

    @Override
    public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition fieldPosition) {
        StringBuffer sb = new StringBuffer();
        if(date != null){
            String dateStr = StringTools.getDateString(date, "yyyy-MM-dd HH:mm:ss");
            if (dateStr.endsWith(" 00:00:00")) {  
                dateStr = dateStr.substring(0, 10);  
            }
            sb.append(dateStr);
        }
        return sb;
    }

    @Override
    public Date parse(String source, ParsePosition pos) {
        Date date = null;  
        try {  
            if (source == null || source.length() == 0) {  
                date = null;  
            } else if (source.length() == 10) {  
                date = StringTools.getDate(source);  
            } else if (source.length() == 19) {  
                date = StringTools.getDate(source,"yyyy-MM-dd HH:mm:ss");
            } else {  
                throw new IllegalArgumentException("日期长度不符合要求!");  
            }  
        } catch (Exception e) {  
            throw new IllegalArgumentException("日期转换失败!");  
        }  
        return date; 
    }

}
