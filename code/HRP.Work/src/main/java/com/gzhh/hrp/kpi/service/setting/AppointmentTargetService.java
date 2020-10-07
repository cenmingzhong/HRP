package com.gzhh.hrp.kpi.service.setting;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.kpi.entity.setting.AppointmentTarget;
import com.gzhh.hrp.tools.ResultView;

public interface AppointmentTargetService {
	public ResultView getList(HashMap<String, Object> filter);
	public ResultView delete(String id);
	public ResultView deleteList(List<String> ids);
	public ResultView save(List<AppointmentTarget> AppointmentTargetList);
}

