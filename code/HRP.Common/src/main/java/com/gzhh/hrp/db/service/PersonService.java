package com.gzhh.hrp.db.service;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.tools.ResultView;

public interface PersonService {
	public void save(Person person);
	public ResultView getList(HashMap<String, Object> params);
	public ResultView getInfo(String personCode);
	public ResultView delete(List<String> personCodes);
	public ResultView getPersonListByRole(String roleCode);
	public ResultView getPersonCode4ArgPerson();
	ResultView importPerson(UploadFile file);
}
