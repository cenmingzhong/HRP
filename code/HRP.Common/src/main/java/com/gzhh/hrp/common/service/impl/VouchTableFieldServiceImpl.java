package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.VouchTableFieldDao;
import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.common.service.VouchTableFieldService;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class VouchTableFieldServiceImpl extends BaseService implements VouchTableFieldService {

    @Resource
    private VouchTableFieldDao vouchTableFieldDao;

    public ResultView save(VouchTableField vouchTableField) {
        if(StringTools.isEmpty(vouchTableField.getId())){
            return add(vouchTableField);
        }else{
            return update(vouchTableField);
        }
    }

    public ResultView add(VouchTableField vouchTableField) {
        ResultView resultView = new ResultView();
        vouchTableField.setId(getKey("Sys_Vouch_Table_Field", true));

        vouchTableFieldDao.insert(vouchTableField);
        return resultView;
    }

    public ResultView update(VouchTableField vouchTableField) {
        ResultView resultView = new ResultView();

        vouchTableFieldDao.update(vouchTableField);
        return resultView;
    }

    public ResultView getList(HashMap<String, Object> params) {
        ResultView resultView = new ResultView();

        List<VouchTableField> vouchTableFieldList = vouchTableFieldDao.getFilterByCode(params);
        resultView.putData("vouchTableFieldList", vouchTableFieldList);
        return resultView;
    }

    public ResultView getInfo(String id) {
        ResultView resultView = new ResultView();

        VouchTableField vouchTableField = vouchTableFieldDao.get(id);
        resultView.putData("vouchTableField", vouchTableField);
        return resultView;
    }

    public ResultView delete(String id) {
        ResultView resultView = new ResultView();

        VouchTableField vouchTableField = vouchTableFieldDao.get(id);
        if(vouchTableField!=null)
        {
          vouchTableFieldDao.delete(vouchTableField);
        }
        return resultView;
    }


    
}