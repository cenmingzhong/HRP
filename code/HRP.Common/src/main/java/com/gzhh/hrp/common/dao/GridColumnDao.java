package com.gzhh.hrp.common.dao;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.GridColumn;
@Repository
public class GridColumnDao extends BaseDao<GridColumn>{
    
    public void deleteByGridId(HashMap<String,Object> map){
        getObject("Sys_GridColumn.deleteByGridId", map);
    }
    
}
