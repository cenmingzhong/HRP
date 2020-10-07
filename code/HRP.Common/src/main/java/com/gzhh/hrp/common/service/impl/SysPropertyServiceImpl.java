package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.SysPropertyDao;
import com.gzhh.hrp.common.dao.SysPropertyDetailDao;
import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.common.entity.SysPropertyDetail;
import com.gzhh.hrp.common.service.SysPropertyService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.JsonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class SysPropertyServiceImpl extends BaseService implements SysPropertyService{

    @Resource
    private SysPropertyDao sysPropertyDao;
    @Resource
    private SysPropertyDetailDao sysPropertyDetailDao;
    
    public ResultView save(HashMap<String, Object> sysPropList, HashMap<String, Object> sysPropDetailList, String appKey) {
        ResultView result = new ResultView();
        
        if (sysPropList != null)
        {
            for (Entry<String, Object> entry : sysPropList.entrySet())
            {
                String propName = entry.getKey();
                String propValue = String.valueOf(entry.getValue());

                SysProperty sysProp = getSysProperty(appKey, propName);
                if (sysProp == null)
                {
                    sysProp = new SysProperty();

                    sysProp.setId(getNewId());
                    sysProp.setAppKey(appKey);
                    sysProp.setPropName(propName);
                    sysProp.setPropValue(propValue);
                    sysProp.setPropVisible(true);
                    sysProp.setPropEnable (true);

                    sysPropertyDao.insert(sysProp);
                }
                else
                {
                    sysProp.setPropValue(propValue);

                    sysPropertyDao.update(sysProp);
                }
            }
        }
        if (sysPropDetailList != null)
        {
            for (Entry<String, Object> entry : sysPropList.entrySet())
            {
                String propName = entry.getKey();
                List<String> propDetailList = JsonTools.deSerializeList(String.valueOf(entry.getValue()), String.class);// JsonHelper.Deserialize(dictEntity.Value.ToString(), typeof(IList<string>)) as List<string>;

                SysProperty sysProp = getSysProperty(appKey, propName);
                if (sysProp == null){
                    sysProp = new SysProperty();

                    sysProp.setId(getNewId());
                    sysProp.setAppKey(appKey);
                    sysProp.setPropName(propName);
                    sysProp.setPropValue("[Detail]");
                    sysProp.setPropVisible(true);
                    sysProp.setPropEnable (true);

                    sysPropertyDao.insert(sysProp);
                }
                else{
                    sysPropertyDao.deleteByMid(sysProp.getId());
                }
                if (CollectionTools.isNotEmpty(propDetailList)){
                    for (String propValue : propDetailList)
                    {
                        SysPropertyDetail propDetail = new SysPropertyDetail();

                        propDetail.setId(getNewId());
                        propDetail.setMid(sysProp.getId());
                        propDetail.setPropValue(propValue);

                        sysPropertyDetailDao.insert(propDetail);
                    }
                }
            }
        }
        return result;
    }
    
    public ResultView getPropertyList(String appKey){
        ResultView result = new ResultView();

        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("appKey", appKey);
        List<SysProperty> sysPropertyList = sysPropertyDao.getListByFilter(param);

        Hashtable<String, Object> ht = new Hashtable<String, Object>();
        if (!sysPropertyList.isEmpty())
        {
            for (SysProperty sysProp : sysPropertyList) {
                if (sysProp.getPropValue() == "[Detail]")
                {
                    HashMap<String, Object> detailHt = new HashMap<String, Object>();
                    detailHt.put("mId", sysProp.getId());
                    List<SysPropertyDetail> propDetailList = sysPropertyDetailDao.getListByFilter(detailHt);

                    ht.put(sysProp.getPropName(), propDetailList);
                }
                else
                {
                    ht.put(sysProp.getPropName(), sysProp.getPropValue());
                }
            }
        }
        result.putData("sysProperty", ht);
        
        return result;
    }
    

    public ResultView getAppSetting()
    {
        ResultView result = new ResultView();

        List<SysProperty> sysPropertyList = sysPropertyDao.getSysPropList(null);

        Hashtable<String, Object> ht = new Hashtable<String, Object>();
        if (CollectionTools.isNotEmpty(sysPropertyList))
        {
            List<String> appKeyList = new ArrayList<String>();
            
            for (SysProperty sysProp : sysPropertyList) {
                if (!appKeyList.contains(sysProp.getAppKey()))
                {
                    appKeyList.add(sysProp.getAppKey());
                }
            }

            for (String appKey : appKeyList) {
                
                List<SysProperty> propertyList = sysPropertyList.stream().filter(prop -> StringTools.equals(prop.getAppKey(), appKey)).collect(Collectors.toList());

                Hashtable<String, Object> ht2 = new Hashtable<String, Object>();
                for (SysProperty sysProp : propertyList)
                {
                    if(sysProp.getPropValue() != null){
                        ht2.put(sysProp.getPropName(), sysProp.getPropValue());
                    }
                }
                ht.put(appKey, ht2);
            }
        }
        result.putData("appSetting", ht);

        return result;
    }
}
