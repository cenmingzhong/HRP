package com.gzhh.hrp.kpi.dao.setting;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.setting.AppointmentLevel;

@Repository
public class AppointmentLevelDao extends BaseDao<AppointmentLevel> {
	public List<AppointmentLevel> getListForRefer(HashMap<String,Object> filter){
		return getList("KPI_Appointment_Level.getListForRefer",filter);
	}
}
