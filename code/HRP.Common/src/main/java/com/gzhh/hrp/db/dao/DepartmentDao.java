package com.gzhh.hrp.db.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.Department;

@Repository
public class DepartmentDao extends BaseDao<Department> {

	public String getMaxDeptCode(HashMap<String, Object> ht) {
        return (String) getObject("DB_Department.getMaxDeptCode",ht);
    }
    
    public List<Map> getDepartmentList(HashMap<String, Object> ht){
        return getMapList("DB_Department.getDepartmentList",ht);
    }
    
    public List<Map> getListForRefer(HashMap<String, Object> ht){
        return getMapList("DB_Department.getListForRefer",ht);
    }
    
    public List<Map> getDepartmentFilterOrgCode(HashMap<String,Object> filter){
        return getMapList("DB_Department.getDepartmentFilterOrgCode",filter);
    }
    
	public List<Department> getDeptListBySpdDate(Map<String, Object> map) {
		return getList("DB_Department.getDeptListBySpdDate", map);
	}
	public List<Map> getPersonCodeByUseDept(String id){
	    return getMapList("DB_Department.getPersonCodeByUseDept",id);
	}

	public List<Map> getDepartmentList4App(HashMap<String, Object> filter) {
		return getMapList("DB_Department.getDepartmentList4App",filter);
	}
	
	public List<Map> getDeptIsUse(String deptCode) {
        return getMapList("DB_Department.getDeptIsUse",deptCode);
    }
    
}
