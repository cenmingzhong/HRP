package com.gzhh.hrp.extension.spring;

import java.lang.reflect.Type;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.gzhh.hrp.tools.JsonTools;
import com.gzhh.hrp.tools.StringTools;

public class JsonArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public Object resolveArgument(MethodParameter parameter,  
            ModelAndViewContainer mavContainer, NativeWebRequest webRequest,  
            WebDataBinderFactory binderFactory) throws Exception {
        String paraName = parameter.getParameterName(); 
        String paraValueStr = webRequest.getParameter(paraName);
        Type paraType = parameter.getGenericParameterType();

        if(paraValueStr == null){
            if(paraType == int.class){
                return 0;
            }else{
                return null;
            }
        }else{
            if(paraType ==int.class){
                return StringTools.toInt(paraValueStr);
            }else if(paraType== String.class){
                return paraValueStr;
            }
            return JsonTools.deSerialize(paraValueStr, paraType);
        }
    }

    @Override
    public boolean supportsParameter(MethodParameter arg0) {
        
        return true;
    }
}
