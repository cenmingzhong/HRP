package com.gzhh.hrp.common.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

public abstract class BaseAction {

    protected static final Logger logger = LoggerFactory.getLogger(BaseAction.class);
    protected String listPage;
    protected String infoPage;
    
    protected final HttpServletRequest getRequest() {
        return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
    }
    
    protected final HttpServletResponse getResponse() {
        return ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getResponse();
    }

    protected final HttpSession getSession() {
        return getRequest().getSession();
    }

    @RequestMapping("toList")
    public String toList() {
        if(StringTools.isEmpty(listPage)){
            HttpServletRequest request = getRequest();
            String path = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/")).replaceFirst(request.getContextPath()+"/", "");
            if(path.indexOf("/")!= -1){
                return path+path.substring(path.lastIndexOf("/"), path.length())+"List";
            }
        }
        return listPage;
    }
    
    @RequestMapping("toInfo")
    public String toInfo() {
        if(StringTools.isEmpty(listPage)){
            HttpServletRequest request = getRequest();
            String path = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/")).replaceFirst(request.getContextPath()+"/", "");
            if(path.indexOf("/")!= -1){
                return path+path.substring(path.lastIndexOf("/"), path.length())+"Info";
            }
        }
        return infoPage;
    }
    
    @ExceptionHandler
    @ResponseBody
    public ResultView  handleAndReturnData(HttpServletRequest request, HttpServletResponse response, Exception ex) {

        logger.error("请求处理错误：",ex);
        ex.printStackTrace();
        ResultView result = new ResultView();
        result.setIsOk("N");
        
        String errorMsg = ex.getMessage();
        if(ex instanceof NullPointerException){
            errorMsg = "空指针异常";
        }
        else if(ex.getCause() != null){
            errorMsg = ex.getCause().getMessage();
        }
        result.setMessage(errorMsg);
        
        return result;
    }
    
    public ResultView outSuccess(String message){
        
        ResultView result = new ResultView();
        result.setIsOk("Y");
        result.setMessage(message);
        return result;
    }
    public ResultView outError(String errorMsg){
        ResultView result = new ResultView();
        result.setIsOk("N");
        result.setMessage(errorMsg);
        return result;
    }
}
