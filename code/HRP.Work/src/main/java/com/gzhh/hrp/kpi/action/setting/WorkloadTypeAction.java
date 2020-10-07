package com.gzhh.hrp.kpi.action.setting;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.entity.setting.WorkloadType;
import com.gzhh.hrp.kpi.service.setting.WorkloadTypeService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/kpi/setting/workloadType/")
public class WorkloadTypeAction extends BaseAction{
	@Resource
	private WorkloadTypeService workloadTypeService;
	
	@ResponseBody
	@RequestMapping("getInfo")
	public ResultView getInfo(String id){
		return workloadTypeService.getInfo(id);
	}

	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(HashMap<String, Object> filter){
		return workloadTypeService.getList(filter);
	}
	
	@ResponseBody
	@RequestMapping("save")
	public ResultView save(WorkloadType workloadType){
		return workloadTypeService.save(workloadType);
	}
	
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(String id){
		workloadTypeService.delete(id);
		return outSuccess("删除成功");
	}
	
	@ResponseBody
	@RequestMapping("getListForRefer")
	public ResultView getListForRefer(HashMap<String,Object> filter){
		return workloadTypeService.getListForRefer(filter);
	}
	
	@RequestMapping("toRefer")
	public String toRefer(){
		return "common/refer/kpi/workloadTypeRefer";
	}
}
