package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
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
import com.gzhh.hrp.common.service.MonthCloseService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class MonthCloseServiceImpl extends BaseService implements MonthCloseService {

    @Resource
    private MonthCloseDao monthCloseDao;
    @Resource
    public AccountPeriodDao accountPeriodDao;
    @Resource
    public AppActivateDao appActivateDao;

    @Override
    public boolean isInCloseMonth(String yearMonth, String appKey, String vouchProp) {
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("vouchProp", vouchProp);
        map.put("appKey", appKey);
        List<MonthClose> monthList = monthCloseDao.getListByFilter(map);
        monthList = monthList.stream().filter(t->t.getIsClose()==true).collect(Collectors.toList());
        List<MonthClose> sortedMonthList = new ArrayList<MonthClose>();
        if (CollectionTools.isNotEmpty(monthList)){
            for(MonthClose closeMonth:monthList){
                if(StringTools.equals(String.valueOf(closeMonth.getYearMonth()), yearMonth)){
                    sortedMonthList.add(closeMonth);
                }
            }
            if (CollectionTools.isEmpty(sortedMonthList)){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }
    //获取最后一个已经结账的会计期间
    public ResultView getLastAccountPeriod(AccountPeriod currentAccountPeriod) {
        ResultView result = new ResultView();

        HashMap<String,Object> map= new HashMap<String,Object>();
        int month = currentAccountPeriod.getMonth()-1;
        int year = currentAccountPeriod.getYear();
        if(month==0){
            year = year-1;
            month = 12;
        }
        map.put("month", month);
        map.put("year", year);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        if(monthCloseList.size()>0){
            MonthClose currentMonthClose = monthCloseList.get(0);
            AccountPeriod accountPeriod = accountPeriodDao.getPeriodByYearMonth(currentMonthClose.getYearMonth());
            result.putData("accountPeriod", accountPeriod);
        } 
        return result;

    }
    @Override// 获取当前会计期间
    public ResultView getCurrentAccountPeriod(String appKey) {
        ResultView result = new ResultView();

        AppActivate appActivate = appActivateDao.get(appKey);
        if (appActivate == null){
            throw new ValidateException("模块["+appKey+"]不存在");
        }

        if (!appActivate.getIsActivate()){
            throw new ValidateException("模块(" + appActivate.getAppName() + "[" + appActivate.getAppKey() + "])未启用");
        }

        HashMap<String,Object> map= new HashMap<String,Object>();
        map.put("isClose", false);
        map.put("appKey", appKey);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        if (CollectionTools.isEmpty(monthCloseList)){
            throw new ValidateException("未设置开账会计期间");
        }

        monthCloseList.sort(new Comparator<MonthClose>() {
            public int compare(MonthClose o1, MonthClose o2) {   
                return o1.getYearMonth()-o2.getYearMonth() ;
            }
        });
        MonthClose currentMonthClose = monthCloseList.get(0);
        AccountPeriod accountPeriod = accountPeriodDao.getPeriodByYearMonth(currentMonthClose.getYearMonth());
        if (accountPeriod == null){
            throw new ValidateException("未定义[" + currentMonthClose.getYearMonth() + "]对应的会计期间");
        }
        result.putData("accountPeriod", accountPeriod);

        return result;
    }

    @Override// 判断是否已结账
    public boolean isCloseMonth(String appKey, int yearMonth) {
        HashMap<String,Object> map = new HashMap<String,Object>();

        AppActivate appActivate = appActivateDao.get(appKey);
        if (appActivate == null){
            throw new ValidateException("模块[" + appKey + "]不存在");
        }

        if (!appActivate.getIsActivate()){
            throw new ValidateException("模块(" + appActivate.getAppName() + "[" + appActivate.getAppKey() + "])未启用");
        }

        map.put("appKey", appKey);
        map.put("yearMonth", yearMonth);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        if (monthCloseList.isEmpty()){
            throw new ValidateException("开账会计期间["+yearMonth+"]不存在");
        }
        return monthCloseList.get(0).getIsClose();
    }

    @Override//获取结账月份列表
    public ResultView getMonthCloseList(String appKey) {
        ResultView result =  getCurrentAccountPeriod(appKey);

        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("isClose", true);
        map.put("appKey", appKey);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        monthCloseList = monthCloseList.stream().sorted(Comparator.comparing(MonthClose::getYearMonth)).collect(Collectors.toList());
        result.putData("monthCloseList",monthCloseList);  // .reversed()

        return result;
    }

    @Override// 月末结账
    public ResultView closeMonth(String appKey, int yearMonth) {
        ResultView result = new ResultView();

        AppActivate appActivate = appActivateDao.get(appKey);
        if (appActivate == null){
            throw new ValidateException("模块[" + appKey + "]不存在");
        }

        if (!appActivate.getIsActivate()){
            throw new ValidateException("模块(" + appActivate.getAppName() + "[" + appActivate.getAppKey() + "])未启用");
        }

        //获取当前模块会计期间
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("appKey", appKey);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        if (monthCloseList.size()==0){
            throw new ValidateException("未设置当前模块会计期间");
        }

        //获取当前会计期间
        List<MonthClose> tempList = monthCloseList.stream().filter(MonthClose -> MonthClose.getYearMonth().intValue()==yearMonth).collect(Collectors.toList());      
        if (tempList.size()==0){
            throw new ValidateException("未设置当前会计期间["+yearMonth+"]");
        }
        //获取小于当前的未结账会计期间
        List<MonthClose> tempList2 = monthCloseList.stream().filter(MonthClose ->MonthClose.getIsClose()==false&&MonthClose.getYearMonth().intValue()<yearMonth).collect(Collectors.toList());
        if (!tempList2.isEmpty()){
            throw new ValidateException("会计期间[" + tempList2.get(0).getYearMonth()+ "]未结账");
        }

        MonthClose currentMonthClose = tempList.get(0);
        //判断是否已结账
        if (currentMonthClose.getIsClose()){
            throw new ValidateException("会计期间[" + yearMonth + "]已结账");
        }
        currentMonthClose.setCloser(getLoginUser().getSysUserName()) ;
        currentMonthClose.setCloseTime(new Date());
        currentMonthClose.setIsClose(true);

        monthCloseDao.update(currentMonthClose);
        return result;
    }

    @Override//月末反结账
    public ResultView unCloseMonth(String appKey, int yearMonth) {
        ResultView result = new ResultView();

        AppActivate appActivate = appActivateDao.get(appKey);
        if (appActivate == null){
            throw new ValidateException("模块[" + appKey + "]不存在");
        }

        if (!appActivate.getIsActivate()){
            throw new ValidateException("模块(" + appActivate.getAppName() + "[" + appActivate.getAppKey() + "])未启用");
        }

        //获取当前模块会计期间
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("appKey", appKey);
        List<MonthClose> monthCloseList = monthCloseDao.getListByFilter(map);
        if (monthCloseList.isEmpty()){
            throw new ValidateException("未设置当前模块会计期间");
        }

        //获取当前会计期间
        List<MonthClose> tempList = monthCloseList.stream().filter(m -> m.getYearMonth().intValue()==yearMonth).collect(Collectors.toList());
        if (tempList.isEmpty()){
            throw new ValidateException("未设置当前会计期间[" + yearMonth + "]");
        }
        //获取小于当前的未反结账会计期间
        List<MonthClose> tempList2 = monthCloseList.stream().filter(m -> m.getIsClose()==true&&m.getYearMonth()>yearMonth).collect(Collectors.toList());
        if (!tempList2.isEmpty()){
            throw new ValidateException("会计期间[" + tempList2.get(0).getYearMonth() + "]未反结账");
        }
        MonthClose currentMonthClose = tempList.get(0);
        //判断是否已结账
        if (!currentMonthClose.getIsClose()){
            throw new ValidateException("会计期间[" + yearMonth + "]未结账");
        }

        currentMonthClose.setCloser(null);
        currentMonthClose.setCloseTime(null);
        currentMonthClose.setIsClose(false);
        monthCloseDao.update(currentMonthClose);

        return result;
    }

}