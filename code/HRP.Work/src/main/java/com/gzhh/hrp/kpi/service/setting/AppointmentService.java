package com.gzhh.hrp.kpi.service.setting;

import java.util.HashMap;

import com.gzhh.hrp.kpi.entity.setting.Appointment;
import com.gzhh.hrp.tools.ResultView;

public interface AppointmentService {
	public ResultView getList();
	public void add(String appointmentName);
	public void delete(String id);
	public void update(Appointment appointment);
	public ResultView getListForRefer(HashMap<String,Object> filter);
}

