package com.gzhh.hrp.db.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.db.entity.Department;
import com.gzhh.hrp.db.entity.DepartmentLink;
import com.gzhh.hrp.db.service.DepartmentService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/db/dept/")
public class DepartmentAction extends BaseAction{

	@Resource
	private DepartmentService deptService;
	
	@ResponseBody
	@RequestMapping("save")
	public ResultView save(Department dept,List<DepartmentLink> deptLinkList) {
		deptService.save(dept,deptLinkList);
		return outSuccess("保存成功");
	}
	
	@ResponseBody
	@RequestMapping("getDeptCode")
	public ResultView getDeptCode(String deptParent){
	    ResultView result = deptService.getDeptCode(deptParent);
	    return result;
	}
	
	@ResponseBody
	@RequestMapping("getList")//查询功能
	public ResultView getList(HashMap<String, Object> filter){//data必须与js对象一致（重写父类方法）
	    
	    return deptService.getList(filter);
	}
	
    @ResponseBody
    @RequestMapping("getListNoOrgan")//查询功能,不考虑院过滤
    public ResultView getListNoOrgan(HashMap<String, Object> filter){//data必须与js对象一致（重写父类方法）
        
        return deptService.getListNoOrgan(filter);
    }
    
    @ResponseBody
    @RequestMapping("getListForRefer")
    public ResultView getListForRefer(HashMap<String, Object> filter){//data必须与js对象一致（重写父类方法）
        
        return deptService.getListForRefer(filter);
    }
	
	@ResponseBody
	@RequestMapping("getInfo")
	public ResultView getInfo(String deptCode){//获取部门联系记录
	        
	    ResultView result = deptService.getInfo(deptCode);
	    return result;
	}
	   
   
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(String deptCode){
		deptService.delete(deptCode);
		return outSuccess("删除成功");
	}

	@ResponseBody
    @RequestMapping("importDept")
	public ResultView importDept(UploadFile file) throws IOException{
	     
         ResultView result = deptService.importDept(file);
         return result;
     }
	//@ResponseBody
    @RequestMapping(value = "exportDept")
	public ResultView exportDept(HashMap map, List list,HttpServletResponse res) throws IOException{
	  
	    ResultView result = deptService.exportDept(map,list,res);
        return result;
	}
    @RequestMapping("toRefer")
    public String toRefer(){
        return "/common/refer/dept/deptRefer";
    }
	
    @RequestMapping("getDepartment")
    @ResponseBody
    public ResultView getDepartment(String deptCode) {
    	return deptService.getDepartment(deptCode);
    }
    
    @RequestMapping("getPersonCodeByUseDept")
    @ResponseBody
    public ResultView getPersonCodeByUseDept(String id) {
        return deptService.getPersonCodeByUseDept(id);
    }
}
