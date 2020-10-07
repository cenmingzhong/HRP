package com.gzhh.hrp.kpi.service.setting.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.dao.setting.AppointmentTargetDao;
import com.gzhh.hrp.kpi.entity.setting.AppointmentTarget;
import com.gzhh.hrp.kpi.service.setting.AppointmentTargetService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class AppointmentTargetServiceImpl  extends BaseService  implements AppointmentTargetService{
	
	@Resource
	private AppointmentTargetDao appointmentTargetDao;
	
	@Override
	public ResultView getList(HashMap<String, Object> filter){
		ResultView result = new ResultView();
		if(filter==null){
			filter = new HashMap<String, Object>();
		}
		filter.put("year", StringTools.toString(StringTools.getYear(getLoginDate())));
		List<Map> appointmentTargetList = appointmentTargetDao.getListByOther(filter);
		result.putData("appointmentTargetList", appointmentTargetList);
		return result;
	}
	
	@Override
	public ResultView delete(String id){
		ResultView result = new ResultView();
		
		return result;
	}

	@Override
	public ResultView deleteList(List<String> ids){
		ResultView result = new ResultView();
		
		return result;
	}
	
	@Override
	public ResultView save(List<AppointmentTarget> appointmentTargetList){
		ResultView result = new ResultView();
		if(CollectionTools.isNotEmpty(appointmentTargetList)){
			HashMap<String, Object> filter = new HashMap<String, Object>();
			filter.put("year", StringTools.getYear(getLoginDate()));
			filter.put("appointmentId", appointmentTargetList.get(0).getAppointmentId());
			List<AppointmentTarget> deleteList = appointmentTargetDao.getListByFilter(filter);
			if(CollectionTools.isNotEmpty(deleteList)){
				appointmentTargetDao.batchDelete(appointmentTargetList);
			}
			for (AppointmentTarget appointmentTarget : appointmentTargetList) {
				appointmentTarget.setYear(StringTools.getYear(getLoginDate()));
				appointmentTarget.setId(getNewId());
			}
			appointmentTargetDao.batchInsert(appointmentTargetList);
		}
		return result;
	}
}