package com.gzhh.hrp.tools;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gzhh.hrp.common.ValidateException;

public class HttpTools {
    protected static final Logger logger = LoggerFactory.getLogger(HttpTools.class);

    public static String doGet(String url){
        CloseableHttpClient httpCilent = HttpClients.createDefault();
        String result = null;
        try{
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = httpCilent.execute(httpGet);
            
            try{
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    result = EntityUtils.toString(entity);
                }
            }finally {
                response.close();
            }
        }catch (Exception e) {
            logger.error("HttpClient发送get请求时发生异常",e);
            throw new ValidateException("HttpClient发送get请求时发生异常", e);
        }finally{
            try {
                httpCilent.close();
            } catch (IOException e) {
                logger.error("关闭HttpClient时发生异常",e);
            }
        }
        return result;
    }
}
