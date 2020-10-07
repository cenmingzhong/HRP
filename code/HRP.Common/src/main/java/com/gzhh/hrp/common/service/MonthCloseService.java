package com.gzhh.hrp.common.service;

import com.gzhh.hrp.common.entity.AccountPeriod;
import com.gzhh.hrp.tools.ResultView;

public interface MonthCloseService {

    public boolean isInCloseMonth(String newYearMonth, String appKeyRd, String vouchProp);

    public ResultView getCurrentAccountPeriod(String appKey);
    
    public ResultView getLastAccountPeriod(AccountPeriod currentAccountPeriod);

    public boolean isCloseMonth(String aPPKEY, int yearMonth);

    public ResultView getMonthCloseList(String appKey);

    public ResultView closeMonth(String aPP_KEY, int yearMonth);

    public ResultView unCloseMonth(String aPP_KEY, int yearMonth);

    
}