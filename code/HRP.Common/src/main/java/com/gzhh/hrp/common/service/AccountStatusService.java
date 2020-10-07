package com.gzhh.hrp.common.service;

import java.util.Date;

import com.gzhh.hrp.tools.ResultView;

public interface AccountStatusService {
	/**
	 * 检查是否需要强制关账
	 * @param yearMonth		要关账的月份
	 * @return				ResultView（包含要强制关账的用户名单）
	 */
	ResultView checkAccountStatus(Date yearMonth);
	
	/**
	 * 是否已关账
	 * @param yearMonth		年月
	 * @return				账目状态
	 */
	boolean isAccountClose(Date yearMonth);
	
	/**
	 * 更新某月份账目的状态
	 * @param yearMonth		年月
	 * @param status		状态
	 * @return
	 */
	ResultView updateAccountStatus(Date yearMonth, Boolean status);

	/**
	 *  开账
	 * @param yearMonth		年月
	 * @param password		用户密码
	 * @return
	 */
	ResultView openAccount(Date yearMonth, String password);

}
