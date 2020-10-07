package com.gzhh.hrp.kpi.service.setting.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.dao.setting.WorkloadItemDao;
import com.gzhh.hrp.kpi.dao.setting.WorkloadTypeDao;
import com.gzhh.hrp.kpi.entity.setting.WorkloadItem;
import com.gzhh.hrp.kpi.entity.setting.WorkloadType;
import com.gzhh.hrp.kpi.service.setting.WorkloadTypeService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class WorkloadTypeServiceImpl  extends BaseService  implements WorkloadTypeService{
	
	@Resource
	private WorkloadTypeDao workloadTypeDao;
	@Resource
	private WorkloadItemDao workloadItemDao;
	
	@Override
	public ResultView getList(HashMap<String,Object> filter){
		ResultView result = new ResultView();
		if(filter == null) {
			filter = new HashMap<String,Object>();
		}
		filter.put("year", StringTools.getYear(getLoginDate()));
		List<WorkloadType> workloadTypeList = workloadTypeDao.getListByFilter(new HashMap<String,Object>());
		result.putData("workloadTypeList", workloadTypeList);
		return result;
	}
	
	@Override
	public ResultView getInfo(String id) {
		ResultView result = new ResultView();
		WorkloadType workloadType = workloadTypeDao.get(id);
		result.putData("workloadType", workloadType);
		return result;
	}
	
	@Override
	public ResultView save(WorkloadType workloadType) {
		
		ResultView result = new ResultView();
		if(StringTools.isNotEmpty(workloadType.getId())) {
			update(workloadType);
		}else {
			add(workloadType);
		}
		return result;
		
	};
	
	public void add(WorkloadType workloadType){
		workloadType.setId(getNewId());
		workloadType.setYear(StringTools.getYear(getLoginDate()));
		if(StringTools.isNotEmpty(workloadType.getParent())) {
			WorkloadType parent = workloadTypeDao.get(workloadType.getParent());
			if(parent!=null) {
				parent.setIsEnd(false);
				workloadTypeDao.update(parent);
				workloadType.setGrade(parent.getGrade()+1);
			}else {
				workloadType.setGrade(1);
			}
		}else {
			workloadType.setGrade(1);
		}
		workloadType.setIsEnd(true);
		workloadTypeDao.insert(workloadType);
	}
	
	public void update(WorkloadType workloadType){
		WorkloadType existsWorkloadType = workloadTypeDao.get(workloadType.getId());
		if(existsWorkloadType==null) {
			throw new ValidateException("该工作量类型不存在或者已删除");
		}
		existsWorkloadType.setName(workloadType.getName());
		workloadTypeDao.update(existsWorkloadType);
	}
	
	public ResultView delete(String id){
		ResultView result = new ResultView();
		WorkloadType workloadType = workloadTypeDao.get(id);
		if(workloadType != null){
			List<WorkloadType> childrenList = workloadTypeDao.getListByFilter(CommonTools.newHashMap("parent", id));
			if(CollectionTools.isNotEmpty(childrenList)) {
				throw new ValidateException("请先删除下级工作量");
			}
			List<WorkloadItem> itemList = workloadItemDao.getListByFilter(CommonTools.newHashMap("typeId", id));
			if(CollectionTools.isNotEmpty(itemList)) {
				throw new ValidateException("请先删除该类型下的工作量");
			}
			
			if(StringTools.isNotEmpty(workloadType.getParent())) {
				WorkloadType parent = workloadTypeDao.get(workloadType.getParent());
				if(parent!=null) {
					List<WorkloadType> parentChildrenList = workloadTypeDao.getListByFilter(CommonTools.newHashMap("parent", workloadType.getParent()));
					if(CollectionTools.isNotEmpty(parentChildrenList)&&parentChildrenList.size()==1) {
						parent.setIsEnd(true);
						workloadTypeDao.update(parent);
					}
				}
			}
		
			workloadTypeDao.delete(workloadType);
		}
		return result;
	}

	@Override
	public ResultView getListForRefer(HashMap<String, Object> filter) {
		ResultView result = new ResultView();
		if(filter == null) {
			filter = new HashMap<String,Object>();
		}
		filter.put("year", StringTools.getYear(getLoginDate()));
		List<Map> workloadTypeList = workloadTypeDao.getListForRefer(filter);
		result.putData("workloadTypeList", workloadTypeList);
		return result;
	}
	
	
}