package com.gzhh.hrp.kpi.dao.setting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.setting.WorkloadType;

@Repository
public class WorkloadTypeDao extends BaseDao<WorkloadType> {

	public List<Map> getListForRefer(HashMap<String, Object> filter) {
		return getMapList("KPI_workload_type.getListForRefer", filter);
	}
	
}
