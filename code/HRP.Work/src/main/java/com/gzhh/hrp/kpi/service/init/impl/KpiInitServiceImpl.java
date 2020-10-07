package com.gzhh.hrp.kpi.service.init.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.dao.init.KpiInitControlDao;
import com.gzhh.hrp.kpi.entity.init.KpiInitControl;
import com.gzhh.hrp.kpi.service.init.KpiInitService;
@Service
public class KpiInitServiceImpl extends BaseService{
	
	@Resource
	private KpiInitControlDao kpiInitControlDao;
	@Resource
	private KpiInitService kpiInitService;
	
	@PostConstruct
	public void initPersistentObj() {
		KpiInitControl control = kpiInitControlDao.get("control");
		if(control == null) {
			execute();
			control = new KpiInitControl("control");
			List<KpiInitControl> instance = new ArrayList<KpiInitControl>();
			instance.add(control);
			kpiInitControlDao.batchInsert(instance);
		} else if(control.getIsOpen()) {
			execute();
			control.setIsOpen(false);//限制写入一次
			List<KpiInitControl> instance = new ArrayList<KpiInitControl>();
			instance.add(control);
			kpiInitControlDao.batchUpdate(instance);
		}
	}
	
	private void execute() {
		//启动时把内容写进数据库中
		try {
			kpiInitService.initPersistentObj();
		} catch (Exception e) {
			e.printStackTrace();
			errorLog("基础数据写入失败：{0}",e);//实际上可能写入了一部分
		}
	}
}
