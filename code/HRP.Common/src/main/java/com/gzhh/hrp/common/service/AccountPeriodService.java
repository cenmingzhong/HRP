package com.gzhh.hrp.common.service;

import java.util.Date;

import com.gzhh.hrp.common.entity.AccountPeriod;
import com.gzhh.hrp.tools.ResultView;

public interface AccountPeriodService {

    ResultView createYearPeriod(int year);
    
    ResultView updateEndDate(AccountPeriod accountPeriod);

    ResultView deleteYearPeriod(int year);

    ResultView getAccountYearList();

    ResultView getAccountPeriodList(int year);

    ResultView getNewAccountYear();
    
    ResultView getAccountPeriodByDate(Date date);

}