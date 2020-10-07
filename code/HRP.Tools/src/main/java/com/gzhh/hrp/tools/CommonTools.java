package com.gzhh.hrp.tools;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

public class CommonTools {
    
    /// <summary>
    /// 验证编码是否编码规则
    /// </summary>
    /// <param name="code"></param>
    /// <param name="codeRule"></param>
    /// <returns></returns>
    public static Boolean ValidateCodeRule(String code, String codeRule)
    {
        int len = code.length();
        int codeRuleLen = 0;
        for (int i = 0; i < codeRule.length(); i++)
        {  
            codeRuleLen = codeRuleLen + Integer.parseInt(codeRule.substring(i, i+1));

            if (codeRuleLen == len)
            {
                return true;
            }
            else if (codeRuleLen > len)
            {
                return false;
            }
        }
        return false;
    }
    
    /// <summary>
    /// 根据编码和编码规则得到该编码的上级编码
    /// </summary>
    /// <param name="code">需查询的编码</param>
    /// <param name="codeRule">编码规则</param>
    /// <returns>返回空，表示该编码为第一级</returns>
    public static String getParent(String code, String codeRule)
    {
//        char[] codeRuleArray = codeRule.toCharArray();

        int len = code.length();
        int codeRuleLen = 0;
        int parentLen = 0;
        for (int i = 0; i < codeRule.length(); i++)
        {
            codeRuleLen = codeRuleLen + Integer.parseInt(codeRule.substring(i, i+1));

            if (codeRuleLen == len)
            {
                break;
            }
            else if (codeRuleLen < len)
            {
                parentLen = codeRuleLen;
            }
        }
        return code.substring(0, parentLen);
    }
    
    public static HashMap<String, Object> newHashMap(String key, String value){
        HashMap<String, Object> hashMap = new HashMap<String, Object>();
        hashMap.put(key, value);
        return hashMap;
    }
    
    public static HashMap<String, Object> newHashMap(String key, Object value){
        HashMap<String, Object> hashMap = new HashMap<String, Object>();
        hashMap.put(key, value);
        return hashMap;
    }

    
    //弹下载框
    private static void download(String path, HttpServletResponse response) {  
        try {  
            // path是指欲下载的文件的路径。  
            File file = new File(path);  
            // 取得文件名。 
            String filename = file.getName();  
            // 以流的形式下载文件。  
           InputStream fis = new BufferedInputStream(new FileInputStream(file));
            //InputStream fis  =  this.getClass().getResourceAsStream("/XX文件名")
            byte[] buffer = new byte[fis.available()];  
            fis.read(buffer);  
            fis.close();  
            // 清空response  
            response.reset();  
            // 设置response的Header  
            response.setCharacterEncoding("utf-8");
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));  
            response.addHeader("Content-Length", "" + file.length());  
            OutputStream toClient = new BufferedOutputStream(  response.getOutputStream());  
            response.setContentType("application/vnd.ms-excel;charset=gb2312");  
            toClient.write(buffer);  
            toClient.flush();  
            toClient.close();  
        } catch (IOException ex) {  
            ex.printStackTrace();  
        }  
    }
    public static List<HashMap> execleDs(String filePath, String fileName, String sheetName){

        /*DataSet ds = new DataSet();
        String strConn = "Provider=Microsoft.Jet.OleDb.4.0;" + "data source=" + filePath + ";Extended Properties='Excel 8.0; HDR=YES; IMEX=1'";
        using (OleDbConnection conn = new OleDbConnection(strConn)){
            conn.Open();
            //DataTable dt = conn.GetOleDbSchemaTable(System.Data.OleDb.OleDbSchemaGuid.Tables, null);
            OleDbDataAdapter odda = new OleDbDataAdapter("select * from [" + sheetName + "$]", conn);
            odda.Fill(ds, fileName);
            conn.Close();
        }
        return ds.Tables[0];*/
        return null;

    }
    public static BigDecimal toDecimal(String s){
        try{
            return new BigDecimal(s);
        }catch (Exception e) {
           return new BigDecimal(0); 
        }
    }
    public static int toInt(Integer value, int defValue){
        if(value == null){
            return defValue;
        }
        return value.intValue();
    }
    
    public static int compareDate(Date date1, Date date2){
        if(date1 == null){
            return -1;
        }
        
        if(date2 ==  null){
            return 1;
        }
        return date1.compareTo(date2);
    }
}
