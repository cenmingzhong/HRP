package com.gzhh.hrp.common.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.AccountStatus;

@Repository
public class AccountStatusDao extends BaseDao<AccountStatus>{
	public Boolean getAccountStatus(Date yearMonth) {
		return (Boolean) getObject("sys_account_state.getAccountStatus", yearMonth);
	}
	
	public void updateAccountStatus(Date yearMonth, Boolean status) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("yearMonth", yearMonth);
		map.put("status", status);
		update("sys_account_state.updateAccountStatus", map);
	}
	
}
