package com.gzhh.hrp.db.service;

import java.util.List;

import com.gzhh.hrp.db.entity.CodeRule;
import com.gzhh.hrp.tools.ResultView;

public interface CodeRuleService {
    
    public Boolean validateCodeRule(String objectKey, String code);
    public String getCodeRule(String objectKey);
    public ResultView createCodeRule(CodeRule codeRule);
    ResultView getCodeRuleList();
    ResultView save(List<CodeRule> codeRuleList);
    void saveInit(List<CodeRule> codeRuleList);
}
