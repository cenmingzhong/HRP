package com.gzhh.hrp.common.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.AccountPeriodDao;
import com.gzhh.hrp.common.dao.AppActivateDao;
import com.gzhh.hrp.common.dao.MonthCloseDao;
import com.gzhh.hrp.common.entity.AccountPeriod;
import com.gzhh.hrp.common.entity.AppActivate;
import com.gzhh.hrp.common.entity.MonthClose;
import com.gzhh.hrp.common.service.AppActivateService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;

@Service
public class AppActivateServiceImpl extends BaseService implements AppActivateService {

    @Resource
    private AppActivateDao appActivateDao;
    @Resource
    private AccountPeriodDao accountPeriodDao;
    @Resource
    private MonthCloseDao monthCloseDao;
    
    public ResultView getAppList()
    {
        ResultView result = new ResultView();

        List<AppActivate> appList = appActivateDao.getListByFilter(null);
        result.putData("appList", appList);

        return result;
    }

    public ResultView activateApp(String appKey, int yearMonth)
    {
        ResultView result = new ResultView();

        List<AccountPeriod> accountPeriodList = accountPeriodDao.getListByFilter(CommonTools.newHashMap("yearMonth", yearMonth));
        if (CollectionTools.isEmpty(accountPeriodList))
        {
            throw new ValidateException("不存在会计期间["+yearMonth+"]");
        }
        accountPeriodList = accountPeriodDao.getListByFilter(null);
        
        accountPeriodList = accountPeriodList.stream().filter(t -> t.getYearMonth() >= yearMonth).collect(Collectors.toList());
        for (AccountPeriod period : accountPeriodList)
        {
            MonthClose monthClose = new MonthClose();
            
            monthClose.setId(getNewId());
            monthClose.setAppKey(appKey);
            monthClose.setYear(period.getYear());
            monthClose.setMonth(period.getMonth());
            monthClose.setYearMonth(period.getYearMonth());
            monthClose.setIsClose(false);

            monthCloseDao.insert(monthClose);
        }

        AppActivate appActivate = appActivateDao.get(appKey);
        
        appActivate.setIsActivate(true);
        appActivate.setActivatePeriod(yearMonth);

        appActivateDao.update(appActivate);

        return result;
    }

    public ResultView unActivateApp(String appKey)
    {
        ResultView result = new ResultView();

        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(CommonTools.newHashMap("appKey", appKey));
        monthCloseList.sort(new Comparator<MonthClose>() {
            @Override
            public int compare(MonthClose o1, MonthClose o2) {
                return o1.getYearMonth()>o2.getYearMonth()?-1:1;
            }
        });
        for (MonthClose monthClose : monthCloseList)
        {
            if (monthClose.getIsClose())
            {
                throw new ValidateException("该模块会计期间["+monthClose.getYearMonth()+"]已结账，不能取消启用");
            }
            monthCloseDao.delete(monthClose.getId());
        }
        AppActivate appActivate = appActivateDao.get(appKey);
        appActivate.setIsActivate(false);
        appActivate.setActivatePeriod(null);
        appActivateDao.update(appActivate);
        
        return result;
    }
    
    @Override
    public ResultView save(AppActivate appActivate){
        ResultView result = new ResultView();
        
        appActivateDao.update(appActivate);
        
        return result;
    }
}
