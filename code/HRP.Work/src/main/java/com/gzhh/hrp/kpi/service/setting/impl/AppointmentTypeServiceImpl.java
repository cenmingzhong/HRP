package com.gzhh.hrp.kpi.service.setting.impl;


import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.xml.bind.JAXB;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.entity.VouchBodyField;
import com.gzhh.hrp.common.entity.VouchGeneral;
import com.gzhh.hrp.common.entity.VouchHeadField;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.dao.setting.AppointmentLevelDao;
import com.gzhh.hrp.kpi.dao.setting.AppointmentTypeDao;
import com.gzhh.hrp.kpi.entity.setting.AppointmentLevel;
import com.gzhh.hrp.kpi.entity.setting.AppointmentType;
import com.gzhh.hrp.kpi.service.init.KpiInitService;
import com.gzhh.hrp.kpi.service.setting.AppointmentTypeService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;

@Service
public class AppointmentTypeServiceImpl  extends BaseService  implements AppointmentTypeService,KpiInitService{
	@Resource
	private AppointmentTypeDao appointmentTypeDao;
	@Resource
	private AppointmentLevelDao appointmentLevelDao;

	@Override
	public void initPersistentObj() {
		InputStream file = this.getClass().getResourceAsStream("/init/KPI_GWLB.xml" );
		VouchGeneral entity = JAXB.unmarshal(file, VouchGeneral.class);
		
		List<VouchHeadField> headList = entity.getHeadList();
        List<VouchBodyField> bodyList = entity.getBodyList();
		if(CollectionTools.isNotEmpty(headList)){
			for(VouchHeadField vouchHeadField : headList){
				AppointmentType appointmentType = new AppointmentType();
				appointmentType.setId(vouchHeadField.getCode());
				appointmentType.setAppointmentTypeName(vouchHeadField.getName());
				appointmentTypeDao.insert(appointmentType);
			}
		}
		if(CollectionTools.isNotEmpty(bodyList)){
			for(VouchBodyField vouchBodyField : bodyList){
				AppointmentLevel appointmentLevel = new AppointmentLevel();
				appointmentLevel.setId(vouchBodyField.getCode());
				appointmentLevel.setAppointmentLevelName(vouchBodyField.getName());
				appointmentLevel.setTypeId(vouchBodyField.getReferTo());
				appointmentLevelDao.insert(appointmentLevel);
			}
		}
	}

	@Override
	public ResultView getList() {
		ResultView result = new ResultView();
		List<AppointmentType> appointmentTypeList = appointmentTypeDao.getListByFilter(null);
		if(CollectionTools.isNotEmpty(appointmentTypeList)){
			for(AppointmentType appointmentType : appointmentTypeList){
				List<AppointmentLevel> appointmentLevelList = appointmentLevelDao.getListByFilter(CommonTools.newHashMap("typeId", appointmentType.getId()));
				appointmentType.setAppointmentLevelList(appointmentLevelList);
			}
		}
		result.putData("appointmentTypeList", appointmentTypeList);
		return result;
	}
	
}