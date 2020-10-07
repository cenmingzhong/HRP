package com.gzhh.hrp.common.action;

import java.util.HashMap;

import javax.xml.bind.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.PrintTemplateClass;
import com.gzhh.hrp.common.service.PrintTemplateClassService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/printCls/")
public class PrintTemplateClassAction extends BaseAction {

    @Autowired
    private PrintTemplateClassService printTemplateClassService;

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(PrintTemplateClass printTemplateClass) throws ValidationException{
        printTemplateClassService.save(printTemplateClass);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }

    @ResponseBody
    @RequestMapping("getTemplateClsList")
    public ResultView getTemplateClsList(HashMap<String, Object> filters){
        ResultView result = printTemplateClassService.getList(filters);
        return result;
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String id) {
        return printTemplateClassService.getInfo(id);
    }

    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String tempClsCode) {
        printTemplateClassService.delete(tempClsCode);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }

}
