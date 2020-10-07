package com.gzhh.hrp.db.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.ImportTemplateDao;
import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.DepartmentDao;
import com.gzhh.hrp.db.dao.PersonDao;
import com.gzhh.hrp.db.entity.Department;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.service.PersonService;
import com.gzhh.hrp.tools.ClassTools;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ExcelTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class PersonServiceImpl extends BaseService implements PersonService {
	@Resource
	private PersonDao personDao;
	@Resource
	private DepartmentDao deptDao;
	@Resource
	private ImportTemplateDao importTemplateDao;
	
	
	@Transactional
	public void save(Person person) {
	    if (person.getIsNew())
        {
            add(person);
        }
        else{
            update(person);
        }
	}
	
	public void add(Person person){
	   
	    if(personDao.get(person.getPersonCode())!=null){
	        throw new ValidateException(String.format("人员编码%S已存在，保存失败", person.getPersonCode()));
	    }
	    person.setCreateTime(new Date());
	    person.setCreator("admin");
	  
	    personDao.insert(person);
	}
	
	public void update(Person person){
        person.setCreateTime(new Date());
        person.setCreator("admin");
	    personDao.update(person);
	}
	
    @SuppressWarnings("rawtypes" )
	public ResultView getList(HashMap<String, Object> filter){
        ResultView result = new ResultView();
		List<Map> personList = personDao.getPersonList(filter);
       
        result.putData("personList", personList);
        return result;
    }
    
    public ResultView getInfo(String personCode) {
        ResultView result = new ResultView();
        
        Person person = personDao.get(personCode);
        result.putData("person", person);
        return result;
    }

	public ResultView delete(List<String> personCodes){
		ResultView result = new ResultView();
		for (String personCode : personCodes) {
		    Person person = personDao.get(personCode);
		    personDao.delete(person);
		}
		return result;
	}
	
	@Override
	public ResultView getPersonListByRole(String roleCode) {
	    ResultView result = new ResultView();
	    List<Person> personList = personDao.getPersonListByRole(roleCode);
	    StringBuilder codeStr = new StringBuilder();
	    for(int i=0;i<personList.size();i++) {
	        if(i == 0) {
	            codeStr.append(personList.get(i).getPersonCode());
	        }else {
	            codeStr.append(","+personList.get(i).getPersonCode());
	        }
	    }
	    result.putData("codeStr", codeStr);
	    return result;
	}
	
   @Override
    public ResultView getPersonCode4ArgPerson() {
        ResultView result = new ResultView();
        String deptCode = getSysPropertyValue("FA","argDept");
        List<Person> personList = new ArrayList<Person>();
        if(StringTools.isNotEmpty(deptCode)) {
            Department department = deptDao.get(deptCode);
            personList = personDao.getListByFilter(CommonTools.newHashMap("department", department));
        }else {
            personList = personDao.getListByFilter(null);
        }
        Set<String> personCodeSet = new HashSet<String>();
        for(Person person : personList) {
            personCodeSet.add(person.getPersonCode());
        }
        String personCode = StringUtils.join(personCodeSet.toArray(), ",");
        result.putData("personCode", personCode);
        return result;
    }
    
    private boolean validateImportData(String data, ImportTemplate temp, StringBuffer errorSb, int rowIdx) {
        if (temp.getIsRequired() && StringTools.isEmpty(data)) {
            errorSb.append("第" + rowIdx + "行[" + temp.getText() + "]必填项，不能为空<br/>");
            return false;
        }
        return true;
    }
    
    @Override
    public ResultView importPerson(UploadFile file) {
        ResultView result = new ResultView();

        List<ImportTemplate> importTemplateList = importTemplateDao
                .getListByFilter(CommonTools.newHashMap("dbType", "person"));
        if (CollectionTools.isEmpty(importTemplateList)) {
            throw new ValidateException("未找到下载模板。");
        }
        List<Map<String, String>> dataList = null;
        try {
            dataList = ExcelTools.readExcelWithTitle(file.getFilePath(), "Sheet1");
        } catch (Exception e) {
            e.printStackTrace();
            errorLog("读取Excel失败", e);
            throw new ValidateException("读取Excel数据失败：" + StringTools.getExceptionMsg(e));
        }
        StringBuffer errorSb = new StringBuffer();
        List<Person> personList = new ArrayList<Person>();

        if (dataList != null) {
            int rowIdx = 1;
            for (Map<String, String> data : dataList) {
                Person person = new Person();
                person.setCreator(getLoginUser().getSysUserName());
                person.setCreateTime(getLoginDate());
                rowIdx++;
                for (ImportTemplate temp : importTemplateList) {
                    String fieldData = data.get(temp.getText());

                    if (!validateImportData(fieldData, temp, errorSb, rowIdx)) {
                        continue;
                    }

                    switch (temp.getCode()) {
                        default: {
                        	Class<?> fieldType = ClassTools.getPropertyType(Person.class, temp.getCode());
                            if (fieldType.isAssignableFrom(Boolean.class)) {
                                ClassTools.setPropertyValue(person, temp.getCode(), StringTools.isTrueOrFalse(fieldData));
                            } else if (fieldType.isAssignableFrom(boolean.class)) {
                                Boolean value = StringTools.isTrueOrFalse(fieldData);
                                ClassTools.setPropertyValue(person, temp.getCode(), value == null ? false : value);
                            } else if (fieldType.isAssignableFrom(BigDecimal.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(person, temp.getCode(), new BigDecimal(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(Integer.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(person, temp.getCode(), new Integer(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(int.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(person, temp.getCode(), Integer.parseInt(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(Date.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(person, temp.getCode(), StringTools.getDate(fieldData));
                                }
                            } else {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(person, temp.getCode(), fieldData);
                                }
                            }
                        }
                    }
                }
                personList.add(person);
            }
            if (errorSb.length() > 0) {
                throw new ValidateException(errorSb.toString());
            }
            personDao.batchInsert(personList);
            
            result.setMessage("导入成功");
        }
        return result;
    }
}
