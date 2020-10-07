package com.gzhh.hrp.common.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.entity.AccountPeriod;
import com.gzhh.hrp.common.service.AccountPeriodService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/accountPeriod/")
public class AccountPeriodAction extends BaseAction {

    @Resource
    private AccountPeriodService accountPeriodService;
    
    @ResponseBody
    @RequestMapping("getNewAccountYear")
    public ResultView getNewAccountYear(){
        return accountPeriodService.getNewAccountYear();
    }
    
    @ResponseBody
    @RequestMapping("updateEndDate")
    public ResultView updateEndDate(AccountPeriod accountPeriod){
        return accountPeriodService.updateEndDate(accountPeriod);
    }
    
    @ResponseBody
    @RequestMapping("createYearPeriod")
    public ResultView createYearPeriod(int year){
        return accountPeriodService.createYearPeriod(year);
    }

    @ResponseBody
    @RequestMapping("deleteYearPeriod")
    public ResultView deleteYearPeriod(int year){
        return accountPeriodService.deleteYearPeriod(year);
    }

    @ResponseBody
    @RequestMapping("getAccountYearList")
    public ResultView getAccountYearList(){
        return accountPeriodService.getAccountYearList();
    }

    @ResponseBody
    @RequestMapping("getAccountPeriodList")
    public ResultView getAccountPeriodList(int year){
        return accountPeriodService.getAccountPeriodList(year);
    }
    
    @RequestMapping("toAccountPeriodRefer")
    public String toAccountPeriodRefer(int year){
        return "common/refer/accountPeriod/accountPeriodRefer";
    }
}
