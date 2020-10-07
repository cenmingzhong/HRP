package com.gzhh.hrp.kpi.service.setting;

import java.util.HashMap;

import com.gzhh.hrp.kpi.entity.setting.WorkloadType;
import com.gzhh.hrp.tools.ResultView;

public interface WorkloadTypeService {
	public ResultView getList(HashMap<String,Object> filter);
	public ResultView save(WorkloadType workloadType);
	public ResultView delete(String id);
	public ResultView getListForRefer(HashMap<String,Object> filter);
	public ResultView getInfo(String id);
}

