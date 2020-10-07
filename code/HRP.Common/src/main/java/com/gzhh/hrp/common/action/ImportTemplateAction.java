package com.gzhh.hrp.common.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.common.service.ImportTemplateService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/importTemplate")
public class ImportTemplateAction {

    @Resource
    private ImportTemplateService importTemplateService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(String dbType, List<ImportTemplate> importTemplateList){
        return importTemplateService.save(dbType, importTemplateList);
    }

    @ResponseBody
    @RequestMapping("getImportTemplateList")
    public ResultView getImportTemplateList(String dbType){
        return importTemplateService.getImportTemplateList(dbType);
    }
}
