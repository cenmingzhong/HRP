package com.gzhh.hrp.kpi.action.setting;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.entity.setting.WorkloadItem;
import com.gzhh.hrp.kpi.service.setting.WorkloadItemService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/kpi/setting/workloadItem/")
public class WorkloadItemAction extends BaseAction{
	@Resource
	private WorkloadItemService workloadItemService;
	
	@ResponseBody
	@RequestMapping("getInfo")
	public ResultView getInfo(String id){
		return workloadItemService.getInfo(id);
	}

	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(HashMap<String, Object> filter){
		return workloadItemService.getList(filter);
	}
	
	@ResponseBody
	@RequestMapping("save")
	public ResultView save(WorkloadItem workloadItem){
		return workloadItemService.save(workloadItem);
	}
	
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(String id){
		workloadItemService.delete(id);
		return outSuccess("删除成功");
	}
	
	@RequestMapping("toRefer")
	public String toRefer(){
		return "common/refer/kpi/workloadItemRefer";
	}
}
