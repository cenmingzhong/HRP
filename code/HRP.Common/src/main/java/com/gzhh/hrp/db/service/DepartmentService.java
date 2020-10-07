package com.gzhh.hrp.db.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.db.entity.Department;
import com.gzhh.hrp.db.entity.DepartmentLink;
import com.gzhh.hrp.tools.ResultView;

public interface DepartmentService {
	public ResultView getDeptCode(String deptParent);
	public ResultView save(Department dept,List<DepartmentLink> deptLinkList) ;
	public ResultView getList(HashMap<String, Object> params);
	public ResultView getListNoOrgan(HashMap<String, Object> params);
	public ResultView getInfo(String deptCode);
	public ResultView delete(String deptCode);
	public ResultView importDept(UploadFile uploadFile) throws IOException ;
    public ResultView exportDept(HashMap map, List list,HttpServletResponse res);
    ResultView getListForRefer(HashMap<String, Object> filter);
    ResultView getDepartment(String code);
    public ResultView saveManageDept(Department mangeDept);
	public ResultView getPersonCodeByUseDept(String id);
}
