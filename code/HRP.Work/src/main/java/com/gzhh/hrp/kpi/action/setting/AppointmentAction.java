package com.gzhh.hrp.kpi.action.setting;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.entity.setting.Appointment;
import com.gzhh.hrp.kpi.service.setting.AppointmentService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/kpi/setting/appointment/")
public class AppointmentAction extends BaseAction{
	@Resource
	private AppointmentService appointmentService;
	

	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(){
		return appointmentService.getList();
	}
	
	@ResponseBody
	@RequestMapping("add")
	public ResultView add(String appointmentName){
		appointmentService.add(appointmentName);
		return outSuccess("添加成功");
	}
	
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(String id){
		appointmentService.delete(id);
		return outSuccess("删除成功");
	}
	
	@ResponseBody
	@RequestMapping("update")
	public ResultView update(Appointment appointment){
		appointmentService.update(appointment);
		return outSuccess("修改成功");
	}
	
	@ResponseBody
	@RequestMapping("getListForRefer")
	public ResultView getListForRefer(HashMap<String,Object> filter){
		return appointmentService.getListForRefer(filter);
	}
}
