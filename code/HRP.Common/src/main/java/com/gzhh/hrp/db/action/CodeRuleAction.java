package com.gzhh.hrp.db.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.CodeRule;
import com.gzhh.hrp.db.service.CodeRuleService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/db/codeRule/")
public class CodeRuleAction extends BaseAction{
    @Resource
    private CodeRuleService codeRuleService;
    
    @ResponseBody
    @RequestMapping("getCodeRule")
    public ResultView getCodeRule(String objectKey)
    {
        ResultView result = new ResultView();
        result.putData("codeRule",codeRuleService.getCodeRule(objectKey));
        return result;
    }

    @ResponseBody
    @RequestMapping("getCodeRuleList")
    public ResultView getCodeRuleList(){
        return codeRuleService.getCodeRuleList();
    }

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(List<CodeRule> codeRuleList){
        return codeRuleService.save(codeRuleList);
    }
}
