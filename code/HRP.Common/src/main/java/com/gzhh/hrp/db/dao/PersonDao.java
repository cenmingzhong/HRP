package com.gzhh.hrp.db.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.Person;

@Repository
public class PersonDao extends BaseDao<Person> {

    public void LoadPsnFromLocal(HashMap<String, Object> filters){
        update("DB_Person.LoadPsnFromLocal", filters);
    }
    //重写父类方法
    public List<Map> getPersonList(HashMap<String, Object> filters){
        return getMapList("DB_Person.getPersonList", filters);
    }
    public List<Map> getInfo(String personCode) {
        
        return getMapList("DB_Person.getInfo",personCode);
    }
	public List<Person> getPersonListByRole(String roleCode){
	    return getList("DB_Person.getPersonListByRole",roleCode);
	}
   public List<Person> getPersonListByDept(String deptCode){
        return getList("DB_Person.getPersonListByDept",deptCode);
    }
   public List<Map> getPersonList4App(HashMap<String, Object> filter) {
       return getMapList("DB_Person.getPersonList4App",filter);
   }
}
