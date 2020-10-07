package com.gzhh.hrp.db.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.ImportTemplateDao;
import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.DepartmentDao;
import com.gzhh.hrp.db.dao.DepartmentLinkDao;
import com.gzhh.hrp.db.dao.PersonDao;
import com.gzhh.hrp.db.entity.Department;
import com.gzhh.hrp.db.entity.DepartmentLink;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.service.CodeRuleService;
import com.gzhh.hrp.db.service.DepartmentService;
import com.gzhh.hrp.tools.AppConst;
import com.gzhh.hrp.tools.ClassTools;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ExcelTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class DepartmentServiceImpl extends BaseService implements DepartmentService {
	@Resource
    private DepartmentDao departmentDao;
	@Resource
	private DepartmentLinkDao departmentLinkDao;
	@Resource
	private PersonDao personDao;
    @Resource
    private CodeRuleService codeRuleService;
    @Resource
    private ImportTemplateDao importTemplateDao;
    
    public ResultView save(Department dept,List<DepartmentLink> deptLinkList) {
        if (dept.getIsNew())
        {
            return add(dept, deptLinkList);
        }
        else{
            return update(dept,deptLinkList);
        }
    }
    public ResultView add(Department dept,List<DepartmentLink> deptLinkList){
        ResultView result = new ResultView();
        
        String codeRule = codeRuleService.getCodeRule(AppConst.OBJECT_KEY_DB_DEPARTMENT);

        if (departmentDao.get(dept.getDeptCode()) != null)
        {
            throw new ValidateException(String.format("已存在部门编码%S", dept.getDeptCode()));
        }
        if(!CommonTools.ValidateCodeRule(dept.getDeptCode(), codeRule)){
            throw new ValidateException(String.format("部门编码%S不符合编码规则", dept.getDeptCode()));
        }
        String parentCode = CommonTools.getParent(dept.getDeptCode(), codeRule);//底层切割出父级id
        Department deptParent = departmentDao.get(parentCode);

        if (!StringTools.isEmpty(parentCode)&&deptParent==null)//父级id不空，父级对象为空，则抛此异常
        {
            throw new ValidateException(String.format("部门编码%S不存在上级机构%S", dept.getDeptCode(), parentCode));
        }

        dept.setDeptState("A");
        dept.setCreator(getLoginUser().getSysUserName());
        dept.setCreateTime(new Date());
        
        if (deptParent == null){
            dept.setDeptGrade(1);
            dept.setIsEnd(true);
            dept.setDeptParent(null);
            departmentDao.insert(dept);
        }else{
            dept.setDeptGrade(deptParent.getDeptGrade() + 1);
            dept.setIsEnd(true);
            dept.setDeptParent(deptParent.getDeptCode());
            departmentDao.insert(dept);

            if (deptParent.getIsEnd()){
                deptParent.setIsEnd(false);
                departmentDao.update(deptParent);
            }
        }
        if (CollectionTools.isNotEmpty(deptLinkList)){
            for(DepartmentLink deptLink:deptLinkList){
                deptLink.setId(getNewId());
                deptLink.setDeptCode(dept.getDeptCode());
                departmentLinkDao.insert(deptLink);
            }
        }
        return result;
    }
    
    public ResultView update(Department dept,List<DepartmentLink> deptLinkList) {
        ResultView result = new ResultView();

        Department existDept = departmentDao.get(dept.getDeptCode());
        if (existDept == null){
            throw new ValidateException("该部门已被删除");
        }
        
        /*获取系统选项设置：【使用过的部门名称是否可改】属性，如果没有设置过则默认为是，
        如果为否则判断是否修改了名称和编码，如果修改则进行提示不可修改*/
        String prop = getSysPropertyValue("SYS","deptChange");
        if(prop == null) {
            prop = "Y";
        }
        if(StringTools.equals("N",prop)) {
            List<Map> isUse = departmentDao.getDeptIsUse(dept.getDeptCode());
            if(!StringTools.equals(existDept.getDeptCode(), dept.getDeptCode())) {
                if(CollectionTools.isNotEmpty(isUse)) {
                    throw new ValidateException("该部门正在使用中，无法修改编码");
                }
            }
            if(!StringTools.equals(existDept.getDeptName(), dept.getDeptName())) {
                if(CollectionTools.isNotEmpty(isUse)) {
                    throw new ValidateException("该部门正在使用中，无法修改名称");
                } 
            }
        }

        if(dept.getEndTime()==null){
            dept.setDeptState(AppConst.STATE_ACTIVE);
        }else{
            dept.setDeptState(AppConst.STATE_DELETE);
        }
        dept.setEditor(getLoginUser().getSysUserName());
        dept.setEditTime(new Date());
        departmentDao.update(dept);
        
        List<DepartmentLink> linkList = departmentLinkDao.getListByFilter(CommonTools.newHashMap("deptCode", dept.getDeptCode()));
        if (CollectionTools.isNotEmpty(linkList))
        {
            for(DepartmentLink link : linkList){
                departmentLinkDao.delete(link.getId());
            }
        }

        if (CollectionTools.isNotEmpty(deptLinkList))
        {
            for(DepartmentLink link : deptLinkList){
                link.setId(getNewId());
                link.setDeptCode(dept.getDeptCode());
                departmentLinkDao.insert(link);
            }
        }
        return result;
    }
    
    public ResultView getList(HashMap<String, Object> filter){
        ResultView result = new ResultView();
        if(filter != null && StringTools.isNotEmpty(filter.get("orgCode"))) {
            result.putData("deptList", departmentDao.getDepartmentFilterOrgCode(filter));
        }else {
            result.putData("deptList", departmentDao.getDepartmentList(filter));
        }
        return result;
    }
    
    public ResultView getListNoOrgan(HashMap<String, Object> filter){
        ResultView result = new ResultView();
        
        result.putData("deptList", departmentDao.getDepartmentList(filter));

        return result;
    }
    
    @Override
    public ResultView getListForRefer(HashMap<String, Object> filter){
        ResultView result = new ResultView();
        result.putData("deptList", departmentDao.getListForRefer(filter));
        return result;
    }
    
    public ResultView getInfo(String deptCode) {
        ResultView result = new ResultView();
        HashMap<String, Object> map = new HashMap<String,Object>();
        map.put("deptCode", deptCode);
        List<Map> dept = departmentDao.getDepartmentList(map);
        List<DepartmentLink> deptLinkList = departmentLinkDao.getListByFilter(CommonTools.newHashMap("deptCode", deptCode));
        result.putData("dept", dept);
        result.putData("deptLinkList", deptLinkList);
        return result;
    }

    public ResultView delete(String deptCode) {
        ResultView result = new ResultView();
        
        Department dept = departmentDao.get(deptCode);
        if(dept == null){
            throw new ValidateException(MessageFormat.format("部门编码({0})不存在", deptCode));
        }
        if(!dept.getIsEnd()){
            throw new ValidateException(MessageFormat.format("部门编码({0})不是末级，不能删除", deptCode));
        }
        
        try {
        	departmentDao.delete(deptCode);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ValidateException("部门已使用,无法删除");
		}
        
        if(StringTools.isNotEmpty(dept.getDeptParent())){
            List<Department> childListOfParent = departmentDao.getListByFilter(CommonTools.newHashMap("deptParent", dept.getDeptParent()));
            if(CollectionTools.isEmpty(childListOfParent)){
                Department deptParent = departmentDao.get(dept.getDeptParent());
                if(deptParent != null){
                    deptParent.setIsEnd(true);
                    departmentDao.update(deptParent);
                }
            }
        }
        return result;
    }
    
    public ResultView getDeptCode(String deptParent) 
    {
        ResultView result = new ResultView();
        
        String nextInvClsCode = GetNextDeptCode(deptParent);
        result.putData("deptCode", nextInvClsCode);
        return result;
    }
    
    public String GetNextDeptCode(String deptParent) 
    {
        String codeRule = codeRuleService.getCodeRule("DB_Department");

        int deptGrade = 0;
        if (StringTools.isEmpty(deptParent)){
            deptGrade = 1;
        }
        else{
            Department parentDept = departmentDao.get(deptParent);
            if(parentDept == null){
                throw new ValidateException(MessageFormat.format("上级部门({0})不存在", deptParent));
            }
            deptGrade = parentDept.getDeptGrade() + 1;
        }

        HashMap<String, Object> ht = new HashMap<String, Object>();
        ht.put("deptParent", deptParent);
        ht.put("deptGrade", deptGrade);
        
        String maxDeptCode = departmentDao.getMaxDeptCode(ht);
        
        return StringTools.getNextCode(codeRule, deptGrade, deptParent, maxDeptCode);
    }
    
    private boolean validateImportData(String data, ImportTemplate temp, StringBuffer errorSb, int rowIdx) {
        if (temp.getIsRequired() && StringTools.isEmpty(data)) {
            errorSb.append("第" + rowIdx + "行[" + temp.getText() + "]必填项，不能为空<br/>");
            return false;
        }
        return true;
    }

    public ResultView importDept(UploadFile file) throws IOException   {
        ResultView result = new ResultView();
        List<ImportTemplate> importTemplateList = importTemplateDao
                .getListByFilter(CommonTools.newHashMap("dbType", "department"));
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
        List<Department> deptList = new ArrayList<Department>();

        if (dataList != null) {
            int rowIdx = 1;
            for (Map<String, String> data : dataList) {
                Department dept = new Department();
                dept.setCreator(getLoginUser().getSysUserName());
                dept.setCreateTime(getLoginDate());
                rowIdx++;
                for (ImportTemplate temp : importTemplateList) {
                    String fieldData = data.get(temp.getText());

                    if (!validateImportData(fieldData, temp, errorSb, rowIdx)) {
                        continue;
                    }

                    switch (temp.getCode()) {
                        default: {
                        	Class<?> fieldType = ClassTools.getPropertyType(Department.class, temp.getCode());
                            if (fieldType.isAssignableFrom(Boolean.class)) {
                                ClassTools.setPropertyValue(dept, temp.getCode(), StringTools.isTrueOrFalse(fieldData));
                            } else if (fieldType.isAssignableFrom(boolean.class)) {
                                Boolean value = StringTools.isTrueOrFalse(fieldData);
                                ClassTools.setPropertyValue(dept, temp.getCode(), value == null ? false : value);
                            } else if (fieldType.isAssignableFrom(BigDecimal.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(dept, temp.getCode(), new BigDecimal(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(Integer.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(dept, temp.getCode(), new Integer(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(int.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(dept, temp.getCode(), Integer.parseInt(fieldData));
                                }
                            } else if (fieldType.isAssignableFrom(Date.class)) {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(dept, temp.getCode(), StringTools.getDate(fieldData));
                                }
                            } else {
                                if (StringTools.isNotEmpty(fieldData)) {
                                    ClassTools.setPropertyValue(dept, temp.getCode(), fieldData);
                                }
                            }
                        }
                    }
                }
                deptList.add(dept);
            }
            if (errorSb.length() > 0) {
                throw new ValidateException(errorSb.toString());
            }
            departmentDao.batchInsert(deptList);
            
            result.setMessage("导入成功");
        }
        return result;
    }
    
    public ResultView exportDept(HashMap map, List list,HttpServletResponse res) {
        ResultView result = new ResultView(); 
        
        return result;
    }
    
    @Override
    public ResultView getDepartment(String code) {
    	ResultView result = new ResultView();
    	
    	Department dept = departmentDao.get(code);
    	
    	result.putData("dept", dept);
    	return result;
    }
    @Override
    public ResultView saveManageDept(Department manageDept) {
       String deptCode =manageDept.getDeptCode();
       if(StringTools.isNotEmpty(deptCode)){
          Department department = departmentDao.get(deptCode);
          if(department==null){
              throw new ValidateException("该部门已不存在");
          }
          department.setManageType(manageDept.getManageType());
          departmentDao.update(department);
       }
        ResultView resultView=new ResultView();
        resultView.setMessage(MessageSource.SAVE_SUCCESS);
        resultView.setIsOk("Y");
        return resultView;
    }
	
	@Override
	public ResultView getPersonCodeByUseDept(String id) {
	    ResultView result = new ResultView();
	    List<Map> deptCodeList = departmentDao.getPersonCodeByUseDept(id);
	    Set<String> personCodeSet = new HashSet<String>();
	    for(Map map: deptCodeList) {
	        String deptCode = map.get("dept_Code").toString();
	        List<Person> personList1 = personDao.getPersonListByDept(deptCode);
            for(Person person:personList1) {
                personCodeSet.add(person.getPersonCode());
            }
	        for(int i=0;i<map.get("dept_Code").toString().length();i++) {
	            deptCode = deptCode.substring(0,deptCode.length() - 1);
	            if(StringTools.isNotEmpty(deptCode)) {
	                List<Person> personList2 = personDao.getPersonListByDept(deptCode);
	                for(Person person:personList2) {
	                    personCodeSet.add(person.getPersonCode());
	                }
	            }
	        }
	    }
	    String personCode = StringUtils.join(personCodeSet.toArray(), ",");
        result.putData("personCode", personCode);
	    return result;
	}
}
