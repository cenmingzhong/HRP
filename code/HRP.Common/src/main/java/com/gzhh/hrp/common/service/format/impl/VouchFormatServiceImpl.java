package com.gzhh.hrp.common.service.format.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.dao.format.VouchBodyFieldDao;
import com.gzhh.hrp.common.dao.format.VouchFootFieldDao;
import com.gzhh.hrp.common.dao.format.VouchHeadFieldDao;
import com.gzhh.hrp.common.entity.AppConfig;
import com.gzhh.hrp.common.entity.AppVouch;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.VouchBodyField;
import com.gzhh.hrp.common.entity.VouchFootField;
import com.gzhh.hrp.common.entity.VouchGeneral;
import com.gzhh.hrp.common.entity.VouchHeadField;
import com.gzhh.hrp.common.entity.format.VouchFormat;
import com.gzhh.hrp.common.service.format.VouchFormatService;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class VouchFormatServiceImpl extends BaseService implements VouchFormatService {

    @Resource
    private VouchHeadFieldDao vouchHeadFieldDao;
    @Resource
    private VouchBodyFieldDao vouchBodyFieldDao;
    @Resource
    private VouchFootFieldDao vouchFootFieldDao;
    @Resource
    private SysMenuDao sysMenuDao;
    
    
    public ResultView getVouchTypeTree(){
        ResultView result = new ResultView();
        
        AppVouch appVouch = AppConfig.getAppVouch();
        
        HashMap<String, VouchGeneral> appVouchMap = appVouch.getVouchList();
        
        List<String> appNameList = new ArrayList<String>();
        List<VouchGeneral> vouchList = new ArrayList<VouchGeneral>();
        
        List<HashMap<String, Object>> appVouchTree = new ArrayList<HashMap<String, Object>>();
        
        for (Map.Entry<String, VouchGeneral> entry : appVouchMap.entrySet()) {  
            if(!appNameList.contains(entry.getValue().getAppName())){
                appNameList.add(entry.getValue().getAppName());
            }
            vouchList.add(entry.getValue());
        }
        
        List<SysMenu> listByFilter = sysMenuDao.getListByFilter(null);
        List<SysMenu> collect = listByFilter.stream().filter(m->m.getSysMenuLevel() == 1)
        		.sorted(Comparator.comparing(SysMenu::getSysMenuOrder)).collect(Collectors.toList());
        Map<String, List<SysMenu>> collect2 = listByFilter.stream()
        		.filter(m->m.getSysMenuLevel() != 1&&StringTools.isNotEmpty(m.getVouchType()))
        		.collect(Collectors.groupingBy(SysMenu::getSysMenuModule));
        for (SysMenu sysMenu : collect) {
			
		}
        
        for(String appName : appNameList){
            HashMap<String, Object> treeNode = new HashMap<String, Object>();
            
            treeNode.put("name", appName);
            List<HashMap<String, String>> chidren = new ArrayList<HashMap<String, String>>();
            
            List<VouchGeneral> tempList = vouchList.stream().filter(a -> StringTools.equals(a.getAppName(), appName)).collect(Collectors.toList());
            for(VouchGeneral vouch :tempList){
                HashMap<String, String> child = new HashMap<String, String>();
                
                child.put("code", vouch.getCode());
                child.put("name", vouch.getName());
                
                chidren.add(child);
            }
            treeNode.put("children", chidren);
            
            appVouchTree.add(treeNode);
        }
        
        /*for (HashMap<String, Object> hashMap : appVouchTree) {
			System.out.println(hashMap);
		}*/
        result.putData("vouchTypeTree", appVouchTree);
        
        return result;
    }
    /**
     * 保存单据格式
     * @param codeFormat
     * @return
     */
    public ResultView save(VouchFormat vouchFormat){
        ResultView result = new ResultView();
        
        String vouchType = vouchFormat.getVouchType();
        List<VouchHeadField> headList = vouchFormat.getHeadList();
        List<VouchBodyField> bodyList = vouchFormat.getBodyList();
        List<VouchFootField> footList = vouchFormat.getFootList();
        
        vouchHeadFieldDao.deleteByVouchType(vouchType);
        if(CollectionTools.isNotEmpty(headList)){
            for (VouchHeadField vouchHeadField : headList) {
                vouchHeadField.setId(StringTools.getGuid());
                vouchHeadField.setVouchType(vouchType);
                vouchHeadField.setFieldOrder(headList.indexOf(vouchHeadField));
                
                vouchHeadFieldDao.insert(vouchHeadField);
            }
        }
        
        vouchBodyFieldDao.deleteByVouchType(vouchType);
        if(CollectionTools.isNotEmpty(bodyList)){
            for (VouchBodyField vouchBodyField : bodyList) {
                vouchBodyField.setId(StringTools.getGuid());
                vouchBodyField.setVouchType(vouchType);
                vouchBodyField.setFieldOrder(bodyList.indexOf(vouchBodyField));
                
                vouchBodyFieldDao.insert(vouchBodyField);
            }
        }
        
        vouchFootFieldDao.deleteByVouchType(vouchType);
        if(CollectionTools.isNotEmpty(footList)){
            for (VouchFootField vouchFootField : footList) {
                vouchFootField.setId(StringTools.getGuid());
                vouchFootField.setVouchType(vouchType);
                vouchFootField.setFieldOrder(footList.indexOf(vouchFootField));
                
                vouchFootFieldDao.insert(vouchFootField);
            }
        }
        
        return result;
    }
    
    /**
     * 获取单据格式
     * @param vouchType
     * @return
     */
    public ResultView getVouchFormat(String vouchType){
        ResultView result = new ResultView();
        
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("vouchType", vouchType);
        List<VouchHeadField> headList = vouchHeadFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchHeadField::getFieldOrder)).collect(Collectors.toList());
        List<VouchBodyField> bodyList = vouchBodyFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchBodyField::getFieldOrder)).collect(Collectors.toList());
        List<VouchFootField> footList = vouchFootFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchFootField::getFieldOrder)).collect(Collectors.toList());
        if(CollectionTools.isEmpty(headList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getHeadList())){
                headList = vouchGeneral.getHeadList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }
        if(CollectionTools.isEmpty(bodyList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getBodyList())){
                bodyList = vouchGeneral.getBodyList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }
        if(CollectionTools.isEmpty(footList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getFootList())){
                footList = vouchGeneral.getFootList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }

        result.putData("headFieldList", headList);
        result.putData("bodyFieldList", bodyList);
        result.putData("footFieldList", footList);
        
        return result;
    }
    
    public ResultView getVouchFormat4Design(String vouchType){
        ResultView result  = new ResultView();
        
        VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
        
        List<VouchHeadField> defHeadList = vouchGeneral.getHeadList();
        List<VouchBodyField> defBodyList = vouchGeneral.getBodyList();
        List<VouchFootField> defFootList = vouchGeneral.getFootList();
        
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("vouchType", vouchType);
        List<VouchHeadField> headList = vouchHeadFieldDao.getListByFilter(params).stream().sorted(Comparator.comparing(VouchHeadField::getFieldOrder)).collect(Collectors.toList());
        List<VouchBodyField> bodyList = vouchBodyFieldDao.getListByFilter(params).stream().sorted(Comparator.comparing(VouchBodyField::getFieldOrder)).collect(Collectors.toList());
        List<VouchFootField> footList = vouchFootFieldDao.getListByFilter(params).stream().sorted(Comparator.comparing(VouchFootField::getFieldOrder)).collect(Collectors.toList());
        
        if(CollectionTools.isNotEmpty(defHeadList)){
            if(CollectionTools.isEmpty(headList)){
                headList = defHeadList;
            }else{
                for(VouchHeadField defHead : defHeadList){
                    boolean isExist = false;
                    for(VouchHeadField head : headList){
                        if(StringTools.equals(defHead.getCode(), head.getCode())){
                            head.setFieldHtml(defHead.getFieldHtml());
                            isExist = true;
                        }
                    }
                    if(!isExist){
                        defHead.setIsShow(false);
                        headList.add(defHead);
                    }
                }
            }
        }

        if(CollectionTools.isNotEmpty(defBodyList)){
            if(CollectionTools.isEmpty(bodyList)){
                bodyList = defBodyList;
            }else{
                for(VouchBodyField defBody : defBodyList){
                    boolean isExist = false;
                    for(VouchBodyField body : bodyList){
                        if(StringTools.equals(defBody.getCode(), body.getCode())){
                            isExist = true;
                        }
                    }
                    if(!isExist){
                        defBody.setIsShow(false);
                        bodyList.add(defBody);
                    }
                }
            }
        }

        if(CollectionTools.isNotEmpty(defFootList)){
            if(CollectionTools.isEmpty(footList)){
                footList = defFootList;
            }else{
                for(VouchFootField defFoot : defFootList){
                    boolean isExist = false;
                    for(VouchFootField foot : footList){
                        if(StringTools.equals(defFoot.getCode(), foot.getCode())){
                            foot.setFieldHtml(defFoot.getFieldHtml());
                            isExist = true;
                        }
                    }
                    if(!isExist){
                        defFoot.setIsShow(false);
                        footList.add(defFoot);
                    }
                }
            }
        }
        result.putData("headFieldList", headList);
        result.putData("bodyFieldList", bodyList);
        result.putData("footFieldList", footList);
        
        return result;
    }
    /**
     * 获取单据格式 For 查询方案
     * @param vouchType
     * @return
     */
    public ResultView getVouchFormat4Filter(String vouchType){
        ResultView result = new ResultView();
        
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("vouchType", vouchType);
        List<VouchHeadField> headList = vouchHeadFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchHeadField::getFieldOrder)).collect(Collectors.toList());
        List<VouchBodyField> bodyList = vouchBodyFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchBodyField::getFieldOrder)).collect(Collectors.toList());
        List<VouchFootField> footList = vouchFootFieldDao.getListByFilter(params).stream().filter(a -> a.getIsShow()).sorted(Comparator.comparing(VouchFootField::getFieldOrder)).collect(Collectors.toList());
        
        if(CollectionTools.isEmpty(headList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getHeadList())){
                headList = vouchGeneral.getHeadList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }else{
            List<VouchHeadField>  defHeadList = AppConfig.getVouchGeneral(vouchType).getHeadList();
            for(VouchHeadField headField : headList){
                List<VouchHeadField> tempList = defHeadList.stream().filter(a->StringTools.equals(a.getCode(), headField.getCode())).collect(Collectors.toList());
                if(CollectionTools.isNotEmpty(tempList)){
                    if(StringTools.isEmpty(headField.getColumnField())){
                        headField.setColumnField(tempList.get(0).getColumnField());
                    }
                    if(StringTools.isEmpty(headField.getDataType())){
                        headField.setDataType(tempList.get(0).getDataType());
                    }
                }
            }
        }
        if(CollectionTools.isEmpty(bodyList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getBodyList())){
                bodyList = vouchGeneral.getBodyList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }else{
            List<VouchBodyField>  defBodyList = AppConfig.getVouchGeneral(vouchType).getBodyList();
            for(VouchBodyField bodyField : bodyList){
                List<VouchBodyField> tempList = defBodyList.stream().filter(a->StringTools.equals(a.getCode(), bodyField.getCode())).collect(Collectors.toList());
                if(CollectionTools.isNotEmpty(tempList)){
                    if(StringTools.isEmpty(bodyField.getColumnField())){
                        bodyField.setColumnField(tempList.get(0).getColumnField());
                    }
                    if(StringTools.isEmpty(bodyField.getDataType())){
                        bodyField.setDataType(tempList.get(0).getDataType());
                    }
                }
            }
        }
        if(CollectionTools.isEmpty(footList)){
            VouchGeneral vouchGeneral = AppConfig.getVouchGeneral(vouchType);
            if(CollectionTools.isNotEmpty(vouchGeneral.getFootList())){
                footList = vouchGeneral.getFootList().stream().filter(a -> a.getIsShow()).collect(Collectors.toList());
            }
        }else{
            List<VouchFootField>  defFootList = AppConfig.getVouchGeneral(vouchType).getFootList();
            for(VouchFootField footField : footList){
                List<VouchFootField> tempList = defFootList.stream().filter(a->StringTools.equals(a.getCode(), footField.getCode())).collect(Collectors.toList());
                if(CollectionTools.isNotEmpty(tempList)){
                    if(StringTools.isEmpty(footField.getColumnField())){
                        footField.setColumnField(tempList.get(0).getColumnField());
                    }
                    if(StringTools.isEmpty(footField.getDataType())){
                        footField.setDataType(tempList.get(0).getDataType());
                    }
                }
            }
        }
        
        result.putData("headFieldList", headList);
        result.putData("bodyFieldList", bodyList);
        result.putData("footFieldList", footList);
        
        return result;
    }
	@Override
	public ResultView getVouchTypeList() {
		ResultView resultView=new ResultView();
		AppVouch appVouch = AppConfig.getAppVouch();
		HashMap<String, VouchGeneral> appVouchMap = appVouch.getVouchList();
		
		List<String> appNameList = new ArrayList<String>();
        List<VouchGeneral> vouchList = new ArrayList<VouchGeneral>();
        
		for (Map.Entry<String, VouchGeneral> entry : appVouchMap.entrySet()) {  
            if(!appNameList.contains(entry.getValue().getAppName())){
                appNameList.add(entry.getValue().getAppName());
            }
            vouchList.add(entry.getValue());
        }
        resultView.putData("vouchList", vouchList);
        return resultView;
	}
}
