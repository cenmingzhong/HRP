package com.gzhh.hrp.kpi.dao.setting;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.setting.Appointment;

@Repository
public class AppointmentDao extends BaseDao<Appointment> {
	public List<Appointment> getListForRefer(HashMap<String,Object> filter){
		return getList("KPI_Appointment.getListForRefer",filter);
	}
}
