package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.UploadFile;

@Repository
public class UploadFileDao extends BaseDao<UploadFile>{
    public List<UploadFile> getUploadFileList(String appKey, String vouchType, String vouchNo){
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("appKey", appKey);
        map.put("vouchType", vouchType);
        map.put("vouchNo", vouchNo);

        return getListByFilter(map);
    }

    public void clearUploadFile(String appKey, String vouchType, String vouchNo) {
        HashMap<String,Object> ht = new  HashMap<String,Object>();

        ht.put("appKey", appKey);
        ht.put("vouchType", vouchType);
        ht.put("vouchNo", vouchNo);

         delete("SYS_UploadFile.clearUploadFile", ht);
    }
    
}
