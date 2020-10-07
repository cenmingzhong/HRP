package com.gzhh.hrp.db.service;

import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.entity.PersonType;
import com.gzhh.hrp.tools.ResultView;

import java.util.HashMap;

/**
 * @author cenmingzhong
 * @create 2020-09-14-上午 11:39
 */
public interface PersonTypeService {
    public void save(PersonType personType);
    public ResultView getList(HashMap<String,Object> filter);

}
