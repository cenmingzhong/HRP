package com.gzhh.hrp.common;

import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.gzhh.hrp.tools.JsonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	private static Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String sessionId = request.getSession().getId();
        
        LoginState loginState = HRPSession.getLoginStateBySessionId(sessionId);
        String queryString = request.getQueryString();
        logger.debug("参数queryString:"+queryString);
        logger.debug("当前sessionId:"+sessionId);
        logger.debug("请求URI:"+request.getRequestURI());
        
        if(loginState == null){
        	logger.debug("登陆超时,sessionId="+sessionId);
            if(isAjaxRequest(request)){
                ResultView result = new ResultView();
                result.setIsOk("N");
                result.setMessage("登陆超时,请重新登陆");
                result.setEntity("TimeOut");
                
                response.setCharacterEncoding("UTF-8");  
                //告知客户端用UTF-8进行解码  
                response.setContentType("text/html;charset=UTF-8");  
                PrintWriter out = response.getWriter();//HttpServletResponse的实例由Tomcat服务器提供，Tomcat6.x默认查ISO-8859-1编码；Tomcat8.x默认编码为UTF-8  
                out.write(JsonTools.serialize(result));  
            }else{
                String contextPath = request.getContextPath()=="/"?"":request.getContextPath();
                response.sendRedirect(contextPath+"/timeout.htm");
            }
            return false;
        }else{
        	logger.debug("当前登陆账号：account:"+loginState.getLoginUser().getSysUserAccount());
            loginState.setLastActiveTime(new Date());
            HRPSession.putSessionId(sessionId);
        }
        return true;
    }

    public Boolean isAjaxRequest(HttpServletRequest request)
    {
        String requestedWith = request.getHeader("X-Requested-With"); 
        return requestedWith != null && StringTools.equals(requestedWith, "XMLHttpRequest");
    }
}
