package com.gzhh.hrp.db.action;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.service.PersonService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/db/person/")
public class PersonAction extends BaseAction{
	
	@Resource
	private PersonService personService;
	
	@ResponseBody
	@RequestMapping("save")
	public ResultView save(Person person) {
	    personService.save(person);
		return outSuccess("保存成功");
	}
	
	@ResponseBody
	@RequestMapping("getList")
	public ResultView getList(HashMap<String, Object> filter){
		return personService.getList(filter);
	}
	
   @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String personCode){
       
        ResultView result = personService.getInfo(personCode);
        return result;
    }
   
	@ResponseBody
	@RequestMapping("delete")
	public ResultView delete(List<String> personCodes){
	    personService.delete(personCodes);
	    return outSuccess("删除成功");
	}

    @RequestMapping("toRefer")
	public String toRefer(){
	    return "common/refer/person/personRefer";
	}
    
    @RequestMapping("getPersonListByRole")
    @ResponseBody
    public ResultView getPersonListByRole(String roleCode){
        return personService.getPersonListByRole(roleCode);
    }
    
    @RequestMapping("importPerson")
    @ResponseBody
    public ResultView importPerson(UploadFile file) {
        return personService.importPerson(file);
    }
    
    @RequestMapping("getPersonCode4ArgPerson")
    @ResponseBody
    public ResultView getPersonCode4ArgPerson(){
        return personService.getPersonCode4ArgPerson();
    }
}
