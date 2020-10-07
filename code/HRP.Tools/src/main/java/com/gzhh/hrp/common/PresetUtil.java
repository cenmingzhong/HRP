package com.gzhh.hrp.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.init.BasePresetEntity;
import com.gzhh.hrp.tools.CollectionTools;

public class PresetUtil {

	public static <T> void storePersistent(Class<T> clazz, BasePresetEntity<T> presetEntity, BaseDao<T> dao,
			String idColName) {
		List<T> list = dao.getListByFilter(null);
		storePersistent(clazz, presetEntity, dao, idColName, list);
	}
	
	public static <T> void storePersistent(Class<T> clazz, BasePresetEntity<T> presetEntity, BaseDao<T> dao,
			String idColName, List<T> entityList) {
		Map<String, T> map = CollectionTools.listToMap(clazz, entityList, idColName);
		List<T> newList = new ArrayList<>();
		List<T> insList = presetEntity.getInsList();
		for(T ins : insList) {
			Object id = ObjectTools.getField(ins, idColName);
			T t = map.get(id);
			if(t == null) {
				newList.add(ins);
			}
		}
		if(CollectionTools.isNotEmpty(newList)) {
			dao.batchInsert(newList);
		}
	}
	
	public static <T> Map<Object, List<T>> groupPreset(BasePresetEntity<T> presetEntity, String groupColName) {
		Map<Object, List<T>> result = new HashMap<>();
		List<T> insList = presetEntity.getInsList();
		for(T ins : insList) {
			Object group = ObjectTools.getField(ins, groupColName);
			List<T> insListForGroup = result.get(group);
			if(insListForGroup == null) {
				insListForGroup = new ArrayList<>();
				result.put(group, insListForGroup);
			}
			insListForGroup.add(ins);
		}
		return result;
	}
}
