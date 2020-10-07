package com.gzhh.hrp.db.dao;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.entity.PersonType;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-09-14-上午 11:35
 */
@Repository
public class PersonTypeDao extends BaseDao<PersonType> {
    public List<PersonType> getPersonTypeList(HashMap<String,Object> filter){
        return getList("DB_Person_Type.getPersonTypeList",filter);
    }

}
