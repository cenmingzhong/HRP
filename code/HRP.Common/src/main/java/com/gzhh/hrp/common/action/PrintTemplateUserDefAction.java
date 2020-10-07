package com.gzhh.hrp.common.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/system/printUserDef/")
public class PrintTemplateUserDefAction extends BaseAction {

//    @Resource
//    private PrintTemplateUserDefService printTemplateUserDefService;
//
//    @ResponseBody
//    @RequestMapping("save")
//    public ResultView save(PrintTemplateUserDef printTemplateUserDef){
//        printTemplateUserDefService.save(printTemplateUserDef);
//        return outSuccess(MessageSource.SAVE_SUCCESS);
//    }
//
//    @ResponseBody
//    @RequestMapping("getList")
//    public ResultView getList(HashMap<String, Object> filters){
//        ResultView result = printTemplateUserDefService.getList(filters);
//        return result;
//    }
//
//    @ResponseBody
//    @RequestMapping("getInfo")
//    public ResultView getInfo(String id) {
//        return printTemplateUserDefService.getInfo(id);
//    }
//
//    @ResponseBody
//    @RequestMapping("delete")
//    public ResultView delete(String id) {
//        printTemplateUserDefService.delete(id);
//        return outSuccess(MessageSource.DELETE_SUCCESS);
//    }

}