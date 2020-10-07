package com.gzhh.hrp.common.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.service.AccountStatusService;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Controller
@RequestMapping("/system/accountStatus/")
public class AccountStatusAction extends BaseAction {
	@Resource
	private AccountStatusService accountStatusService;
	
	@ResponseBody
	@RequestMapping("checkAccountStatus")
	public ResultView checkAccountStatus(String yearMonth) {
		return accountStatusService.checkAccountStatus(StringTools.getDate(yearMonth, "yyyy-MM"));
	}
	
	@ResponseBody
	@RequestMapping("closeAccount")
	public ResultView closeAccount(String yearMonth) {
		return accountStatusService.updateAccountStatus((StringTools.getDate(yearMonth, "yyyy-MM")), true);
	}
	
	@ResponseBody
	@RequestMapping("openAccount")
	public ResultView openAccount(String yearMonth, String password) {
		return accountStatusService.openAccount((StringTools.getDate(yearMonth, "yyyy-MM")), password);
	}
	
}
