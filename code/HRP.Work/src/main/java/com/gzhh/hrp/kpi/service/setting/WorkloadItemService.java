package com.gzhh.hrp.kpi.service.setting;

import java.util.HashMap;

import com.gzhh.hrp.kpi.entity.setting.WorkloadItem;
import com.gzhh.hrp.tools.ResultView;

public interface WorkloadItemService {
	public ResultView getList(HashMap<String,Object> filter);
	public ResultView save(WorkloadItem workloadItem);
	public ResultView delete(String id);
	public ResultView getInfo(String id);
}

