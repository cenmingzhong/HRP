package com.gzhh.hrp.db.action;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.PersonType;
import com.gzhh.hrp.db.service.PersonService;
import com.gzhh.hrp.db.service.PersonTypeService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * @author cenmingzhong
 * @create 2020-09-14-上午 11:37
 */
@Controller
@RequestMapping("/db/personType/")
public class PersonTypeAction extends BaseAction {
    @Resource
    private PersonTypeService personTypeService;

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String,Object> filter){
        ResultView result = new ResultView();
        result = personTypeService.getList(filter);
        return null;
    }
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(PersonType personType){
        ResultView result = new ResultView();
        personTypeService.save(personType);
        result.setMessage("保存成功");
        return result;
    }


}
