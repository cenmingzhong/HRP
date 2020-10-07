package com.gzhh.hrp.tools;

import java.io.FileWriter;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;

import com.gzhh.hrp.common.ValidateException;

public class StringTools {

    public static boolean equals(String str1, String str2) {
        return StringUtils.equals(str1, str2);
    }
    public static boolean notEquals(String str1, String str2) {
        return !StringUtils.equals(str1, str2);
    }
    public static boolean equalsIgnoreCase(String str1, String str2) {
        return StringUtils.equalsIgnoreCase(str1, str2);
    }
    
    public static boolean isEmpty(String str) {
        return StringUtils.isEmpty(str);
    }
    
    public static boolean isNull(String str){
        return str==null;
    }
    
    public static boolean isNotEmpty(String str) {
        return !StringUtils.isEmpty(str);
    }
    
    public static boolean isNotEmpty(Object obj) {
        if(obj == null){
            return false;
        }
        return !StringUtils.isEmpty(String.valueOf(obj));
    }
    
    public static boolean isEmpty(Object obj) {
        if(obj == null){
            return true;
        }
        return StringUtils.isEmpty(String.valueOf(obj));
    }
    
    public static boolean isNotNull(String str){
        return !isNull(str);
    }
    
    public static String getGuid() {
        String id = UUID.randomUUID().toString();
        return id.replace("-", "").toUpperCase();
    }
    
    public static int toInt(String str) {
        if(isEmpty(str)){
            return 0;
        }else{
            return Integer.parseInt(str);
        }
    }
    
    public static Double toDouble(Object str) {
        if(isEmpty(str)){
            return 0.0;
        }else{
        	try {
	        	if(str instanceof String) {
	        		return Double.valueOf((String)str);
	        	}
	        	if(str instanceof BigDecimal) {
	        		return ((BigDecimal)str).doubleValue();
	        	}
				return Double.parseDouble(StringTools.toString(str));
			} catch (Exception e) {
				e.printStackTrace();
				return 0.0;
			}
        }
    }
    
    public static long toLong(String str) {
        if(isEmpty(str)){
            return 0;
        }else{
            return Long.parseLong(str);
        }
    }
    public static String toString(Object str) {
        if(isEmpty(str)){
            return "";
        }else{
            return str.toString();
        }
    }
    
    public static String padLeft(String str, int size, char padChar){
        return StringUtils.leftPad(str, size,padChar);
    }
    
    public static String padRight(String str, int size, char padChar){
    	return StringUtils.rightPad(str, size,padChar);
    }
    

    /// <summary>
    /// 将字符串首字母大写.
    /// </summary>
    /// <param name="word">待处理字符串</param>
    /// <returns>首字母大写的字符串</returns>
    public static String capFirstLetter(String word)
    {
        return replaceUnderlineAndfirstToUpper(word, "_", "");
    }

    public static String firstCharacterToUpper(String srcStr, boolean isFirstUpper)
    {
        if(isEmpty(srcStr)){
            return "";
        }
        if(isFirstUpper){
            return srcStr.substring(0, 1).toUpperCase() + srcStr.substring(1);
        }else{
            return srcStr.substring(0, 1).toLowerCase() + srcStr.substring(1);
        }
    }

    public static String replaceUnderlineAndfirstToUpper(String srcStr, String org, String ob)
    {
        String[] arr = srcStr.split(org);
        StringBuffer sb= new StringBuffer();
        for(int i = 0 ; i < arr.length; i++){
            if(i==0){
                sb.append(firstCharacterToUpper(arr[i], false));
            }else{
                sb.append(firstCharacterToUpper(arr[i], true));
            }
        }
        return sb.toString();
    }
    
    public static String getDateString(Date date, String format){
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(date);
    }
    
    public static Date getDate(String dateStr){
        return getDate(dateStr,"yyyy-MM-dd");
    }
    
    public static Date getDate(String dateStr, String format){
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        try {
            return formatter.parse(dateStr);
        } catch (ParseException e) {
            throw new ValidateException(dateStr+"转为日期型失败："+e.getMessage());
        }
    }
    
    public static String conertDateFormat(String dateStr, String oriFormat, String newFormat){
        Date date = getDate(dateStr, oriFormat);
        return getDateString(date, newFormat);
    }

    public static int getYear(Date date){
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        return cal.get(Calendar.YEAR);
    }
    
    public static int getYear(String dateStr, String format){
        return getYear(getDate(dateStr,format)); 
    }
    
    public static int getMonth(Date date){
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        return cal.get(Calendar.MONTH)+1;
    }
    
    public static int getMonth(String dateStr, String format){
        return getMonth(getDate(dateStr,format));  
    }
    
    public static int getDay(Date date){
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        return cal.get(Calendar.DATE);
    }
    
    public static int getDay(String dateStr, String format){
        return getDay(getDate(dateStr,format));  
    }
    
    public static String listToString(List<String> list, String separator)
    {
        if(list == null){
            return "";
        }
        return StringUtils.join(list.toArray(),separator);
    }
    //判断BigDecimal的值是否为空
    public static BigDecimal judgeDecimal(BigDecimal bigDecimal){
        if(bigDecimal == null){
            return BigDecimal.ZERO;
        }else{
            return bigDecimal;
        }
        
    }
    
    public static void saveStringToFile(String str, String fileName){
        
        try {
            FileWriter fw = new FileWriter(fileName);
            fw.write(str);
            fw.flush();
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new ValidateException("保存文件失败",e);
        }
    }
    
    public static String getExceptionMsg(Exception ex){
        if(ex.getCause() != null){
            return ex.getCause().getMessage();
        }else{
            return ex.getMessage();
        }
    }
    
    public static String getNextCode(String codeRule, int codeGrade, String parentCode, String maxCode){
        if(codeGrade <=0){
            throw new ValidateException("编码级别必须大于0");
        }
        int seqLen =Integer.parseInt(codeRule.substring(codeGrade - 1, codeGrade));

        int seq = 0;
        if (maxCode != null && maxCode.length()>0)
        {
            if (parentCode != null&& parentCode.length()>0)
            {
                seq = Integer.parseInt(maxCode.substring(parentCode.length(), parentCode.length()+(maxCode.length() - parentCode.length())));
            }
            else
            {
                seq = Integer.parseInt(maxCode);
            }
        }
        String seqString = String.valueOf(seq + 1);

        String nextCode = parentCode + StringTools.padLeft(seqString, seqLen, '0');
        
        if(!CommonTools.ValidateCodeRule(nextCode, codeRule)){
            nextCode ="";
        }
        return nextCode;
    }
    
    public static int getDiffDays(Date date1,Date date2) {
        int days = (int) ((date2.getTime() - date1.getTime()) / (1000*3600*24));
        return days;
    }
    
    public static Boolean isTrueOrFalse(String src){
        if ("是".equals(src)|| "true".equalsIgnoreCase(src)
                || "y".equalsIgnoreCase(src) || "yes".equalsIgnoreCase(src)
                || "1".equals("src")){
            return true;
        }else if("否".equals(src) || "不".equals(src) || "false".equalsIgnoreCase(src)
                || "n".equalsIgnoreCase(src) || "no".equalsIgnoreCase(src)
                || "not".equalsIgnoreCase(src) || "0".equals("src")){
            return false;
        }
        return null;
    }
}
