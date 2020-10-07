package com.gzhh.hrp.common.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.IdGenerator;
import com.gzhh.hrp.common.LoginState;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.AccountStatusDao;
import com.gzhh.hrp.common.dao.SysUserDao;
import com.gzhh.hrp.common.entity.AccountStatus;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.service.AccountStatusService;
import com.gzhh.hrp.tools.MD5Util;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class AccountStatusServiceImpl implements AccountStatusService {

	@Resource
	private AccountStatusDao accountStatusDao;
	@Resource
	private SysUserDao sysUserDao;
	
	@Override
	public ResultView checkAccountStatus(Date yearMonth) {
		ResultView result = new ResultView();
		if (isAccountClose(yearMonth)) {
			result.putData("isAccountClose", true);
			return result;
		}
		
		List<String> userCodes = sysUserDao.getUserCodesByUploadTime(yearMonth);
		List<SysUser> sysUsers = sysUserDao.getListByFilter(null);
		List<SysUser> noInputSysUsers = new LinkedList<>();
		List<SysUser> inputSysUsers = new LinkedList<>();
		Map<String, String> userCodeMap = new HashMap<String, String>();
		for (String userCode : userCodes) {
			userCodeMap.put(userCode, userCode);
		}
		 
		String userCode;
		for (SysUser sysUser : sysUsers) {
			userCode = userCodeMap.get(sysUser.getSysUserCode());
			if (userCode == null) {
				noInputSysUsers.add(sysUser);
			}else {
				inputSysUsers.add(sysUser);
			}
		}
		
		result.putData("sysUserList", noInputSysUsers);
		result.putData("inSysUserList", inputSysUsers);
		
		return result;
	}

	@Override
	public ResultView updateAccountStatus(Date yearMonth, Boolean status) {
		Boolean isClose = getAccountStatus(yearMonth);
		if (isClose == null) {
			AccountStatus accountStatus = new AccountStatus();
			accountStatus.setAccountStateId(IdGenerator.getNewId());
			accountStatus.setStatus(status);
			accountStatus.setYearMonth(yearMonth);
			accountStatusDao.insert(accountStatus);
		} else {
			accountStatusDao.updateAccountStatus(yearMonth, status);
		}
		return new ResultView();
	}

	
	private Boolean getAccountStatus(Date yearMonth) {
		return accountStatusDao.getAccountStatus(yearMonth);
	}

	@Override
	public boolean isAccountClose(Date yearMonth) {
		Boolean isClose = getAccountStatus(yearMonth);
		return isClose==null ? false : isClose;
	}

	@Override
	public ResultView openAccount(Date yearMonth, String password) {
		LoginState state = HRPSession.getLoginStateBySessionId(HRPSession.getSessionId());
		SysUser sysUser = sysUserDao.get(state.getSysUserCode());
		if (sysUser == null || !StringTools.equalsIgnoreCase(sysUser.getSysUserPassword(), MD5Util.MD5Encode(password.trim(),"utf-8"))) {
			throw new ValidateException("密码错误");
		}
		
		updateAccountStatus(yearMonth, false);
		return new ResultView();
	}
}
