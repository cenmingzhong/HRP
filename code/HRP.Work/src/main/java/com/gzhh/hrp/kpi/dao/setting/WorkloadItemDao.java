package com.gzhh.hrp.kpi.dao.setting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.setting.WorkloadItem;

@Repository
public class WorkloadItemDao extends BaseDao<WorkloadItem> {

	public List<Map> getListByOther(HashMap<String, Object> filter) {
		return getMapList("KPI_workload_item.getListByOther", filter);
	}
	
}
