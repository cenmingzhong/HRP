package com.gzhh.hrp.kpi.action.setting;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.service.setting.AppointmentTypeService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/kpi/setting/appointmentType/")
public class AppointmentTypeAction extends BaseAction{
	@Resource
	private AppointmentTypeService appointmentTypeService;
	
	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(){
		return appointmentTypeService.getList();
	}
	
}
