package com.gzhh.hrp.kpi.service.setting.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.DepartmentDao;
import com.gzhh.hrp.db.dao.PersonDao;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.kpi.dao.setting.AppointmentDao;
import com.gzhh.hrp.kpi.entity.setting.Appointment;
import com.gzhh.hrp.kpi.service.setting.AppointmentService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;

@Service
public class AppointmentServiceImpl  extends BaseService  implements AppointmentService{
	
	@Resource
	private AppointmentDao appointmentDao;
	@Resource
	private PersonDao personDao;
	@Resource
	private DepartmentDao departmentDao;
	
	public ResultView getList(){
		ResultView result = new ResultView();
		List<Appointment> appointmentList = appointmentDao.getListByFilter(new HashMap<String,Object>());
		result.putData("appointmentList", appointmentList);
		return result;
	}
	
	public void add(String appointmentName){
		Appointment appointment = new Appointment();
		appointment.setId(getNewId());
		appointment.setAppointmentName(appointmentName);
		appointmentDao.insert(appointment);
	}
	
	public void delete(String id){
		Appointment appointment = appointmentDao.get(id);
		List<Person> personList = personDao.getListByFilter(CommonTools.newHashMap("appointment", appointment));
		if(CollectionTools.isNotEmpty(personList)){
			throw new ValidateException("所选的岗位已在人员档案被调用，不允许删除！");
		}
		if(appointment != null){
			appointmentDao.delete(appointment);
		}
	}
	
	public void update(Appointment appointment){
		appointmentDao.update(appointment);
	}

	@Override
	public ResultView getListForRefer(HashMap<String, Object> filter) {
		ResultView result = new ResultView();
		List<Appointment> list = appointmentDao.getListForRefer(filter);
		result.putData("list", list);
		return result;
	}
	
	
}