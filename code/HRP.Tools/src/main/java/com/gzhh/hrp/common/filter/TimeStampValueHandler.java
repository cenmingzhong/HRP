package com.gzhh.hrp.common.filter;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.tools.StringTools;

public class TimeStampValueHandler extends AbstractValueHandler {
    private static String CURRECT_DATE_FORMATE = " 正确的格式有：年-2009、 年月-200903、 年月日-20090328、年月日时分秒-20090328232359";
    private static TimeStampValueHandler stringConditionBuilder = new TimeStampValueHandler();

    private TimeStampValueHandler() {
        super();
    }

    public static TimeStampValueHandler getInstance() {
        return stringConditionBuilder;
    }

    @Override
    public Object getValue(Object value) {
        if(value == null){
            return null;
        }
        Timestamp date = null;
        // 去除分隔符，前一个冒号是全角，后一个是半角
        String valueStr = cutChars(value.toString());
        if(StringTools.isEmpty(valueStr)){
            return null;
        }
        int dateLength = valueStr.length();
        switch (dateLength) {
        case 14://精确到秒，直接取当秒的0毫秒0微秒
            date = new Timestamp(convertStringToDate("yyyyMMddHHmmss", valueStr).getTime());
            break;
        case 8://精确到天，取当天0时0分0秒
            date = new Timestamp(convertStringToDate("yyyyMMdd", valueStr).getTime());
            break;
        case 6://精确到月，取当前1号0时0分0秒
            date = new Timestamp(new GregorianCalendar(getYearFromDateString(valueStr),getMonthFromDateString(valueStr) - 1, 1).getTimeInMillis());
            break;
        case 4://精确到年，取当年1月1号0时，0分0秒
            date = new Timestamp(new GregorianCalendar(getYearFromDateString(valueStr), 0, 1).getTimeInMillis());
            break;
        default:
            throw new ValidateException("您输入的时间："+valueStr+"，格式不对"+CURRECT_DATE_FORMATE);
        }
        return date;
    }
    
    /**
     * This method generates a string representation of a date/time in the
     * format you specify on input
     * 
     * @param aMask
     *            the date pattern the string is in
     * @param strDate
     *            a string representation of a date
     * @return a converted Date object
     * @see java.text.SimpleDateFormat
     * @throws ParseException
     */
    private static final Date convertStringToDate(String aMask, String strDate) {
        SimpleDateFormat df = null;
        Date date = null;
        df = new SimpleDateFormat(aMask);
        try {
            date = df.parse(strDate);
        } catch (ParseException pe) {
            throw new ValidateException("日期转换出现异常,"+pe.getMessage(), pe);
        }

        return (date);
    }

    private String cutChars(String src) {
        return src.replaceAll(":", "").replaceAll("-", "").replaceAll("：", "")
                .replaceAll("/", "").replaceAll(" ", "").replaceAll("\\\\", "");
    }

    @Override
    public Class<Timestamp> getHandleType() {
        return Timestamp.class;
    }
}
