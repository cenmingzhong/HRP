package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gzhh.hrp.common.entity.VouchTable;
import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.tools.ResultView;

public interface VouchTableService {

    public ResultView save(VouchTable vouchTable, List<VouchTableField> vouchTableHeadList, 
    		List<VouchTableField> vouchTableBodyList, List<VouchTableField> vouchTableWorkFlowList
    		, List<VouchTableField> vouchTableAccVoucherList);
    public ResultView getVouchTableList(HashMap<String, Object> params);
    public ResultView getVouchTableInfo(String id);
    public ResultView delete(String id);
    public ResultView deleteList(List<String> ids);
	public void setInitTemplate(List<Map<String, Object>> vouchList);
    

    
}