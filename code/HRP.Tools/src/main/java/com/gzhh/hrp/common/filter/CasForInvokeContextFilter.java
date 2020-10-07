package com.gzhh.hrp.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CasForInvokeContextFilter implements Filter{

	private static Logger logger = LoggerFactory.getLogger(CasForInvokeContextFilter.class);
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest re =(HttpServletRequest) request;
		HttpSession session = (re).getSession();
		String queryString = re.getQueryString();
		logger.debug(queryString);
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
