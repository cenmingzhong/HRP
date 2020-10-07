package com.gzhh.hrp.kpi.action.setting;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.entity.setting.AppointmentTarget;
import com.gzhh.hrp.kpi.service.setting.AppointmentTargetService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/kpi/setting/appointmentTarget/")
public class AppointmentTargetAction extends BaseAction{
	@Resource
	private AppointmentTargetService appointmentTargetService;
	

	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(HashMap<String, Object> filter){
		return appointmentTargetService.getList(filter);
	}
	
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(String id){
		appointmentTargetService.delete(id);
		return outSuccess("删除成功");
	}
	
	@ResponseBody
	@RequestMapping("deleteList")
	public ResultView deleteList(List<String> ids){
		appointmentTargetService.deleteList(ids);
		return outSuccess("删除成功");
	}
	
	@ResponseBody
	@RequestMapping("save")
	public ResultView save(List<AppointmentTarget> appointmentTargetList){
		appointmentTargetService.save(appointmentTargetList);
		return outSuccess("修改成功");
	}
	
}
