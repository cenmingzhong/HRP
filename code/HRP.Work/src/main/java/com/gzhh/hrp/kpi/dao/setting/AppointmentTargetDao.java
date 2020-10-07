package com.gzhh.hrp.kpi.dao.setting;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.setting.AppointmentTarget;

@Repository
public class AppointmentTargetDao extends BaseDao<AppointmentTarget> {

	public List<Map> getListByOther(HashMap<String, Object> filter) {
		return getMapList("KPI_appointment_target.getListByOther", filter);
	}

}
