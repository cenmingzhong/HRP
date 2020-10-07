package com.gzhh.hrp.tools;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonTools {

    public static String serialize(Object value) throws JsonProcessingException{
        ObjectMapper objMapper = new ObjectMapper();
        
        return objMapper.writeValueAsString(value);
    }
    
    public static <T> T deSerialize(String jsonStr, Class<T> valueType) throws JsonParseException, JsonMappingException, IOException  {
//        ObjectMapper objMapper = new ObjectMapper();
//        objMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        objMapper.setDateFormat(dateFormat);
//        return objMapper.readValue(jsonStr, valueType);
        return JSON.parseObject(jsonStr, valueType);
    }

    
    public static <T> T deSerialize(String jsonStr, Type clazz) throws JsonParseException, JsonMappingException, IOException  {
//        ObjectMapper objMapper = new ObjectMapper();
//        objMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        objMapper.setDateFormat(dateFormat);
//        return objMapper.readValue(jsonStr, valueType);
        return JSON.parseObject(jsonStr, clazz);
        
    }
    
    public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException {
    }
    public static <T> List<T> deSerializeList(String jsonStr, Class<T> valueType){
        return JSON.parseArray(jsonStr, valueType);
    }

    public static <T> T deSerialize(Object obj, Class<T> valueType){
        JSONObject jsonObj = (JSONObject)obj;
        return jsonObj.toJavaObject(valueType);
    }
}
