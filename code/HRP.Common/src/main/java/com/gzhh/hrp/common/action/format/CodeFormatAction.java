package com.gzhh.hrp.common.action.format;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.format.CodeFormat;
import com.gzhh.hrp.common.service.format.CodeFormatService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/format/codeFormat/")
public class CodeFormatAction extends BaseAction {

    @Resource
    private CodeFormatService codeFormatService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(CodeFormat codeFormat){
        codeFormatService.save(codeFormat);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping("getCodeFormat")
    public ResultView getCodeFormat(String vouchType){
        return codeFormatService.getCodeFormat(vouchType);
    }
}
