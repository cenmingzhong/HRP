package com.gzhh.hrp.db.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.entity.SysTableDict;
import com.gzhh.hrp.db.dao.CodeRuleDao;
import com.gzhh.hrp.db.entity.CodeRule;
import com.gzhh.hrp.db.service.CodeRuleService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class CodeRuleServiceImpl implements CodeRuleService{
    
    @Resource
    private CodeRuleDao codeRuleDao;
    
    public Boolean validateCodeRule(String objectKey, String code)
    {
        CodeRule codeRule = codeRuleDao.get(objectKey);
        if (codeRule == null)
        {
            throw new ValidateException("未定义编码规则");
        }

        return CommonTools.ValidateCodeRule(code, codeRule.getObjectRule());
    }
    
    public String getCodeRule(String objectKey)
    {
        CodeRule codeRule = codeRuleDao.get(objectKey);
        if (codeRule == null)
        {
            throw new ValidateException("未定义编码规则");
        }
        return codeRule.getObjectRule();
    }
    
    public ResultView createCodeRule(CodeRule codeRule){
        ResultView result = new ResultView();
        
        CodeRule existRule = codeRuleDao.get(codeRule.getObjectKey());
        if (existRule == null)
        {
            codeRuleDao.insert(codeRule);
        }
        
        return result;
    }
    
    @Override
    public ResultView getCodeRuleList(){
        ResultView result = new ResultView();
        
        List<CodeRule> codeRuleList = codeRuleDao.getListByFilter(null);
        result.putData("codeRuleList", codeRuleList);
        
        return result;
    }
    
    @Override
    public ResultView save(List<CodeRule> codeRuleList){
        ResultView result = new ResultView();
        
        if(CollectionTools.isNotEmpty(codeRuleList)){
            for(CodeRule codeRule : codeRuleList){
                codeRuleDao.update(codeRule);
            }
        }
        
        return result;
    }
    
    @Transactional
    public void saveInit(List<CodeRule> codeRuleList){
        ResultView reuslt=  new ResultView();
        if(CollectionTools.isNotEmpty(codeRuleList)){
        	for(CodeRule codeRule : codeRuleList){
        		CodeRule existRule = codeRuleDao.get(codeRule.getObjectKey());
        		if(existRule == null){
        			codeRuleDao.insert(codeRule);
        		}else{
        			existRule.setObjectName(codeRule.getObjectName());
        			existRule.setObjectRule(codeRule.getObjectRule());
        			codeRuleDao.update(existRule);
        		}
        	}
        }
    }
}
