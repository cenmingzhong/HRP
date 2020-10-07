package com.gzhh.hrp.db.service.impl;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.PersonDao;
import com.gzhh.hrp.db.dao.PersonTypeDao;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.entity.PersonType;
import com.gzhh.hrp.db.service.PersonService;
import com.gzhh.hrp.db.service.PersonTypeService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author cenmingzhong
 * @create 2020-09-14-上午 11:40
 */
@Service
public class PersonTypeServiceImpl extends BaseService implements PersonTypeService {
    @Resource
    private PersonTypeDao personTypeDao;

    @Override
    public ResultView getList(HashMap<String, Object> filter) {
        ResultView result = new ResultView();
        List<PersonType> personTypeList= personTypeDao.getPersonTypeList(filter);
        result.putData("personTypeList",personTypeList);
        return result;
    }

    @Override
    public void save(PersonType personType) {
        if (personType.getIsNew()){
            add(personType);
        }else{
            update(personType);
        }
    }

    private void add(PersonType personType) {
//        personType.setCreateTime(new Date());
//        personType.setCreator(getLoginUser().getSysUserName());
        HashMap<String,Object> filter = new HashMap<String,Object>();
        //filter.put("personTypeCode",personType.getPersonTypeCode());
        List<PersonType> existPersonTypeList = personTypeDao.getListByFilter(filter);
        if (existPersonTypeList.size()>0){
            throw new ValidateException("人员类别编码已重复");
        }
        personTypeDao.insert(personType);
    }
    private void update(PersonType personType) {

//        personType.setCreateTime(new Date());
//        personType.setCreator(getLoginUser().getSysUserName());
        HashMap<String,Object> filter = new HashMap<String,Object>();
        //filter.put("personTypeCode",personType.getPersonTypeCode());
        List<PersonType> existPersonTypeList = personTypeDao.getListByFilter(filter);
        if (existPersonTypeList.size()>0){
            throw new ValidateException("人员类别编码已重复");
        }
        personTypeDao.update(personType);
    }

    public ResultView deletes(List<String> ids){
        ResultView result = new ResultView();
        for (String id : ids) {
            PersonType personType = personTypeDao.get(id);
            if (personType!=null){
                personTypeDao.delete(personType);
            }

        }
        return result;

    }

}
