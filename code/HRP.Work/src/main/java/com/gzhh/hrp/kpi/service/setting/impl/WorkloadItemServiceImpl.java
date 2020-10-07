package com.gzhh.hrp.kpi.service.setting.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.dao.setting.WorkloadItemDao;
import com.gzhh.hrp.kpi.entity.setting.WorkloadItem;
import com.gzhh.hrp.kpi.service.setting.WorkloadItemService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class WorkloadItemServiceImpl  extends BaseService  implements WorkloadItemService{
	
	@Resource
	private WorkloadItemDao workloadItemDao;
	
	@Override
	public ResultView getList(HashMap<String,Object> filter){
		ResultView result = new ResultView();
		if(filter == null) {
			filter = new HashMap<String,Object>();
		}
		filter.put("year", StringTools.getYear(getLoginDate()));
		List<Map> workloadItemList = workloadItemDao.getListByOther(filter);
		result.putData("workloadItemList", workloadItemList);
		return result;
	}
	
	@Override
	public ResultView getInfo(String id) {
		ResultView result = new ResultView();
		List<Map> workloadItemList = workloadItemDao.getListByOther(CommonTools.newHashMap("id", id));
		Map workloadItem = new HashMap<>();
		if(CollectionTools.isNotEmpty(workloadItemList)) {
			workloadItem = workloadItemList.get(0);
		}
		result.putData("workloadItem", workloadItem);
		return result;
	}
	
	@Override
	public ResultView save(WorkloadItem workloadItem) {
		ResultView result = new ResultView();
		if(StringTools.isNotEmpty(workloadItem.getId())) {
			update(workloadItem);
		}else {
			add(workloadItem);
		}
		return result;
	};
	
	public void add(WorkloadItem workloadItem){
		workloadItem.setId(getNewId());
		workloadItem.setYear(StringTools.getYear(getLoginDate()));
		workloadItemDao.insert(workloadItem);
	}
	
	public void update(WorkloadItem workloadItem){
		WorkloadItem existsWorkloadItem = workloadItemDao.get(workloadItem.getId());
		if(existsWorkloadItem==null) {
			throw new ValidateException("该工作量不存在或者已删除");
		}
		workloadItemDao.update(workloadItem);
	}
	
	public ResultView delete(String id){
		ResultView result = new ResultView();
		WorkloadItem workloadItem = workloadItemDao.get(id);
		if(workloadItem != null){
			workloadItemDao.delete(workloadItem);
		}
		return result;
	}
}