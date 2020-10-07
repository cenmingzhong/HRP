package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.CommonFilter;
import com.gzhh.hrp.common.dao.GridColumnDao;
import com.gzhh.hrp.common.entity.GridColumn;
import com.gzhh.hrp.common.filter.StandardFilterProcessor;
import com.gzhh.hrp.common.service.GridColumnService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;
@Service
public class GridColumnServiceImpl extends BaseService implements GridColumnService{
    @Resource
    private GridColumnDao gridColumnDao;
    @Override
    public ResultView save(String pathUrl, String gridId, List<GridColumn> colList) {
        
        ResultView result = new ResultView();
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("pathUrl", pathUrl);
        map.put("gridId", gridId);

        //是否个人修改表格列
        String gridColByUser = getSysPropertyValue("gridColumnByUser");
        if (StringTools.equals(gridColByUser, "Y")){
            map.put("sysUserCode", getLoginUser().getSysUserCode());
        }
        gridColumnDao.deleteByGridId(map);
        
        for(GridColumn gridCol:colList){
            gridCol.setId(getNewId());//获取当前元素的下标值加1
            gridCol.setPathUrl(pathUrl);
            gridCol.setGridId(gridId);
            gridCol.setColOrder(colList.indexOf(gridCol) + 1);
            if (StringTools.equals("Y", gridColByUser)){
                gridCol.setSysUserCode(getLoginUser().getSysUserCode());
            }
            gridColumnDao.insert(gridCol);
        }
        return result;
    }

    @Override
    public ResultView getGridColumnList(String pathUrl, String gridId) {
        
        ResultView result = new ResultView();
        
        List<GridColumn> colList = null;
        
        String gridColByUser = getSysPropertyValue("gridColumnByUser");
        if (StringTools.equals(gridColByUser, "Y")){
            
            List<CommonFilter> filter = new ArrayList<CommonFilter>();
            filter.add(new CommonFilter("pathUrl",pathUrl));
            filter.add(new CommonFilter("gridId", gridId));
            filter.add(new CommonFilter("sysUserCode",getLoginUser().getSysUserCode()));
            
            colList = gridColumnDao.getListByFilter(null, filter);
        }
        if (CollectionTools.isEmpty(colList)){
            List<CommonFilter> filter = new ArrayList<CommonFilter>();
            filter.add(new CommonFilter("pathUrl",pathUrl));
            filter.add(new CommonFilter("gridId", gridId));
            filter.add(new CommonFilter("sysUserCode","NULL",StandardFilterProcessor.ISNU));
            
            colList = gridColumnDao.getListByFilter(null, filter);
        }
        
        if(CollectionTools.isNotEmpty(colList)){
            colList = colList.stream().sorted(Comparator.comparing(GridColumn::getId)).collect(Collectors.toList());
        }
        result.putData("colList", colList);
        return result;
    }

    @Override
    public ResultView saveGridColumnWidth(String pathUrl, String gridId, String colId, int width) {
        
        ResultView result = new ResultView();
        
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("pathUrl", pathUrl);
        map.put("gridId", gridId);
        
        String gridColByUser = getSysPropertyValue("gridColumnByUser");
        if (StringTools.equals(gridColByUser, "Y")){
            map.put("sysUserCode",getLoginUser().getSysUserCode());
        }else{
            map.put("sysUserCode",null);
        }

        List<GridColumn> colList = gridColumnDao.getListByFilter(map);
        if (StringTools.equals(gridColByUser, "Y") && CollectionTools.isEmpty(colList)){
            map.put("sysUserCode",null);
            colList = gridColumnDao.getListByFilter(map);
        }
        if(CollectionTools.isNotEmpty(colList)){
            colList = colList.stream().filter(t -> StringTools.equals(t.getColId(), colId)).collect(Collectors.toList());
            
            if(CollectionTools.isNotEmpty(colList)){
                GridColumn  col = colList.get(0);
                col.setColWidth(String.valueOf(width));
                gridColumnDao.update(col);
            }
        }
        return result;
    }

}
