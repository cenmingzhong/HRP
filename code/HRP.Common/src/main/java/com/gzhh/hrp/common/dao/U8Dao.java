package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.tools.StringTools;

@Repository
public class U8Dao extends BaseDao<Object>{
    
    public int checkDbName(String dbName){
        int dbCount = getInt("U8.checkDbName", dbName);
        return dbCount;// ==0 ? false:true;
    }

    public List getItemClass(String dbName) {
        return getMapList("U8.getItemClass", dbName);
    }

    public List getSrcDefine(String dbName) {
        return getMapList("U8.getSrcDefine", dbName);
    }
    
    /**
     * 获取U8凭证列表
     * @param dbName
     * @return
     */
    public List<Map> getSignList(String dbName) {
        return getMapList("U8.getSignList",dbName);
    }

    public List<Map> getSubjList(Map<String,Object> params) {
        return getMapList("U8.getSubjList",params);
    }
    
    public List<Map> getItemList(Map<String, Object> params) {
        return getMapList("U8.getItemList",params);
    }

    public List<Map> getDeptItemTree(Map<String, Object> params) {
        return getMapList("U8.getDeptItemTree",params);
    }
    
    public List<Map> getItemClassList(Map<String, Object> params) {
        return getMapList("U8.getItemClassList",params);
    }

    public List<Map> getFundSrcList(Map filter) {
        return getMapList("U8.getFundSrcList",filter);
    }
    
    public Map getFitem(Map filter) {
        List fitemList = getMapList("U8.getFitem", filter);
        if(StringTools.isNotEmpty(fitemList)&&fitemList.size()>0) {
            return (Map) fitemList.get(0);
        }
        return null;
    }
    public Map getItemInfo(Map<String, Object> filter) {
        return getMap("U8.getItemInfo", filter);
    }

    public List getOtherItemDefineStructure(Map filter) {
        // TODO Auto-generated method stub
        return getMapList("U8.getOtherItemDefineStructure", filter);
    }

    public List getItemDeptListByCode(Map filter) {
        // TODO Auto-generated method stub
        return getMapList("U8.getItemDeptListByCode", filter);
    }

    public List getItemCostReport(Map filter) {
        // TODO Auto-generated method stub
        return getMapList("U8.getItemCostReport", filter);
    }
    
    public List<Map> getUserByU8(Map<String,Object> filter) {
        return getMapList("U8.getUserByU8", filter);
    }

    public List<Map> getItemDefineStructure(Map filter) {
        return getMapList("U8.getItemDefineStructure", filter);
    }

    public boolean checkItemCodeExist(Map<String,Object> filter) {
        return getInt("U8.checkItemCodeExist", filter)==0? false: true;
    }

    public boolean checkItemCcodeExist(Map<String,Object> filter) {
        return getInt("U8.checkItemCcodeExist", filter)==0? false: true;
    }

    public boolean checkItemName(Map filter) {
        return getInt("U8.checkItemName", filter)==0? false: true;
    }

    public void insertItem(Map filter) {
        insert("U8.insertItem", filter);
    }
    
    public List getItemAllCname(Map filter) {
        return getMapList("U8.getItemAllCname", filter);
    }
    
    public void updateItem(Map filter) {
        // TODO Auto-generated method stub
        insert("U8.updateItem", filter);
    }
    
    public String getGLXmUsed(HashMap<String, Object> filter){
        getObject("U8.getGLXmUsed", filter);
        if(StringTools.isNotEmpty(filter.get("cRetValue"))) {
            return filter.get("cRetValue").toString();
        }
        return null;
    }

    public void deleteItem(Map filter) {
        delete("U8.deleteItem",filter);
    }

    public List<Map> getPsnListForUser(HashMap<String, Object> filter) {
        return getMapList("U8.getPsnListForUser", filter);
    }

    public List getDeptListByUserId(Map filter) {
        // TODO Auto-generated method stub
        return getMapList("U8.getDeptListByUserId", filter);
    }

    public List getClassTree(Map filter) {
        // TODO Auto-generated method stub
        return getMapList("U8.getClassTree", filter);
    } 
    
    
    public Map getRdStyle(Map filter) {
        List<Map> list = getMapList("U8.getRdStyle",filter);
        if(StringTools.isNotEmpty(list)&&list.size()>0) {
            return list.get(0);
        }
        return null;
    }

    public List getItemCostByItemClass(Map<String, Object> filter) {
        return getMapList("U8.getItemCostByItemClass", filter);
    }
    
    public Map getU8DepartmentByUserCode(Map<String,Object> filter) {
        List<Map> list = getMapList("U8.getU8DepartmentByUserCode", filter);
        if(StringTools.isNotEmpty(list)&&list.size()>0) {
            return list.get(0);
        }
        return null;
    }
    

    public List<Map> getU8DeptRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8DeptRefer", filter);
    }
    public List<Map> getU8ItemSortRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8ItemSortRefer", filter);
    }
    public List<Map> getU8ItemRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8ItemRefer", filter);
    }
    public List<Map> getU8InvClsListForRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8InvClsListForRefer", filter);
    }
    public List<Map> getU8InvListForRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8InvListForRefer", filter);
    }
    public List<Map> getU8SubjListForRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8SubjListForRefer", filter);
    }
    public void createMaterialAppVouch(HashMap<String, Object> headMap, List<HashMap<String, Object>> bodyMapList){
        headMap.put("bodyMapList", bodyMapList);
        update("U8.createMaterialAppVouch", headMap);
    }
    public List<Map> getU8VendorRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8VendorRefer", filter);
    }
    public List<Map> getU8PsnForRefer(HashMap<String, Object> filter) {
        return getMapList("U8.getU8PsnForRefer", filter);
    }

	public List<Map> getU8VendorClassRefer(HashMap<String, Object> filter) {
		return getMapList("U8.getU8VendorClassRefer", filter);
	}

	public List<Map> checkCHandler(HashMap<String, Object> filter) {
		return getMapList("U8.checkCHandler", filter);
	}

	public void deleteMaterialAppVouch(HashMap<String, Object> filter) {
		delete("U8.deleteMaterialAppVouch", filter);
	}

	public List<Map> getU8PsnForNum(HashMap<String, Object> filter) {
		return getMapList("U8.getU8PsnForNum", filter);
	}
}
