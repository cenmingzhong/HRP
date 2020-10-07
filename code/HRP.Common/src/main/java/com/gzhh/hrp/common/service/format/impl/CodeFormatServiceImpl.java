package com.gzhh.hrp.common.service.format.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.format.CodeFormatDao;
import com.gzhh.hrp.common.entity.format.CodeFormat;
import com.gzhh.hrp.common.service.format.CodeFormatService;
import com.gzhh.hrp.tools.ResultView;

@Service
public class CodeFormatServiceImpl implements CodeFormatService {

    @Resource
    private CodeFormatDao codeFormatDao;
    
    /**
     * 保存编号格式
     * @param codeFormat
     * @return
     */
    public ResultView save(CodeFormat codeFormat){
        ResultView result = new ResultView();
        
        codeFormatDao.update(codeFormat);
        
        return result;
    }
    
    /**
     * 获取编号格式
     * @param vouchType
     * @return
     */
    public ResultView getCodeFormat(String vouchType){
        ResultView result = new ResultView();
        
        CodeFormat codeFormat = codeFormatDao.get(vouchType);
        result.putData("codeFormat", codeFormat);
        
        return result;
    }
}
