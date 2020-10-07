package com.gzhh.hrp.common.service.impl;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.CommonFilter;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.AccountPeriodDao;
import com.gzhh.hrp.common.dao.AppActivateDao;
import com.gzhh.hrp.common.entity.AccountPeriod;
import com.gzhh.hrp.common.entity.AppActivate;
import com.gzhh.hrp.common.service.AccountPeriodService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class AccountPeriodServiceImpl extends BaseService implements AccountPeriodService {

    @Resource
    private AccountPeriodDao accountPeriodDao;
    @Resource
    private AppActivateDao appActivateDao;
    
    @Override
    public ResultView getNewAccountYear(){
        ResultView result = new ResultView();
        
        List<Map> yearList = accountPeriodDao.getAccountYearList();
        if(CollectionTools.isNotEmpty(yearList)){
            int currentYear = Integer.parseInt(yearList.get(yearList.size()-1).get("Year").toString());
            result.putData("newYear", currentYear+1);
        }
        return result;
    }
    public ResultView createYearPeriod(int year)
    {
        ResultView result = new ResultView();
        
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        
        String format = "yyyy-MM-dd";
        for (int i = 0; i < 12; i++)
        {
            calendar.set(Calendar.MONTH, i);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            
            Date firstDate = calendar.getTime();
            
            calendar.set(Calendar.MONTH, i+1);
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            
            Date lastDate = calendar.getTime();
            
            AccountPeriod period = new AccountPeriod();
            period.setId(getNewId());
            period.setYear(year);
            period.setMonth(i+1);
            period.setBeginDate(StringTools.getDate(StringTools.getDateString(firstDate, format), format));
            period.setEndDate(StringTools.getDate(StringTools.getDateString(lastDate, format), format));
            period.setYearMonth(year * 100 + i+1);
            accountPeriodDao.insert(period);
            
            calendar.add(Calendar.DATE, 1);
        }
        
        return result;
    }
    public ResultView updateEndDate(AccountPeriod accountPeriod){
        ResultView result = new ResultView();
        
        AccountPeriod existPeriod = accountPeriodDao.get(accountPeriod.getId());
        if(existPeriod== null){
            throw new ValidateException("该会计期间不存在或已被删除");
        }
        
        int year = accountPeriod.getYear();
        if(!accountPeriod.getBeginDate().before(accountPeriod.getEndDate())){
            throw new ValidateException("会计期间开始日期必须小于截止日期");
        }
        
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        
        Date yearLastDate = StringTools.getDate(year+"-12-31");
        
        int days = StringTools.getDiffDays(accountPeriod.getEndDate(),yearLastDate);
        if(days < 12-accountPeriod.getMonth()){
            throw new ValidateException("剩余的期间无法保证每个期间至少有一天");
        }
        accountPeriodDao.update(accountPeriod);
        
        List<AccountPeriod> periodList = accountPeriodDao.getListByFilter(CommonTools.newHashMap("year", year)).stream().sorted(Comparator.comparing(AccountPeriod::getMonth)).collect(Collectors.toList());
        
        AccountPeriod lastPeriod = accountPeriod;
        int index =1;
        for(int i = accountPeriod.getMonth()+1; i <=12; i++){
            
            calendar.setTime(lastPeriod.getEndDate());
            calendar.add(Calendar.DAY_OF_MONTH, 1);
            
            Date firstDate = calendar.getTime();
            
            calendar.setTime(accountPeriod.getEndDate());
            calendar.add(Calendar.MONTH, index++);
            
            Date lastDate = calendar.getTime();
            if(i==12){
                lastDate = yearLastDate;
            }
            if(StringTools.getDiffDays(lastDate,yearLastDate)<12-i){
                calendar.setTime(firstDate);
                calendar.add(Calendar.DAY_OF_MONTH, StringTools.getDiffDays(firstDate,yearLastDate)-(12-i));
                lastDate = calendar.getTime();
            }
            
            periodList.get(i-1).setBeginDate(firstDate);
            periodList.get(i-1).setEndDate(lastDate);
            
            accountPeriodDao.update(periodList.get(i-1));
            
            lastPeriod=periodList.get(i-1);
        }
        return result;
    }
    public ResultView deleteYearPeriod(int year)
    {
        ResultView result = new ResultView();
        
        List<Map> yearList = accountPeriodDao.getAccountYearList();
        if(CollectionTools.isNotEmpty(yearList)){
            int currentYear = Integer.parseInt(yearList.get(yearList.size()-1).get("Year").toString());
            if(year != currentYear){
                throw new ValidateException(MessageFormat.format("最新会计年度为{0}",String.valueOf(currentYear)));
            }
        }
        
        List<AccountPeriod> periodList = accountPeriodDao.getListByFilter(CommonTools.newHashMap("year", year));
        if(CollectionTools.isNotEmpty(periodList)){
            for(AccountPeriod period : periodList){
                List<AppActivate> appList = appActivateDao.getListByFilter(CommonTools.newHashMap("activatePeriod", period.getYearMonth()));
                if(CollectionTools.isNotEmpty(appList)){
                    appList.stream().filter(t->t.getIsActivate()).collect(Collectors.toList());
                    if(CollectionTools.isNotEmpty(appList)){
                        throw new ValidateException(MessageFormat.format("会计期间{0}已启用{1}模块", period.getYearMonth(), appList.get(0).getAppName()));
                    }
                }
                accountPeriodDao.delete(period);
            }
        }
        return result;
    }
    public ResultView getAccountYearList()
    {
        ResultView result = new ResultView();

        List<Map> yearList = accountPeriodDao.getAccountYearList();
        result.putData("accountYearList", yearList);
        
        return result;
    }
    public ResultView getAccountPeriodList(int year)
    {
        ResultView result = new ResultView();

        List<AccountPeriod> yearList = accountPeriodDao.getListByFilter(CommonTools.newHashMap("year", year));
        result.putData("accountYearList", yearList);
        
        return result;
    }
    
    public ResultView getAccountPeriodByDate(Date date){
        ResultView result = new ResultView();
        
        List<CommonFilter> filter = new ArrayList<CommonFilter>();
        filter.add(new CommonFilter("beginDate",date,"<="));
        filter.add(new CommonFilter("endDate",date,">="));
        
        AccountPeriod accountPeriod = null;
        List<AccountPeriod> periodList = accountPeriodDao.getListByFilter(null, filter);
        if(CollectionTools.isNotEmpty(periodList)){
            accountPeriod = periodList.get(0);
        }
        
        result.putData("accountPeriod", accountPeriod);
        return result;
    }
}
