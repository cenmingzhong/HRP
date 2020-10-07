package com.gzhh.hrp.common.action;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.PrintTemplate;
import com.gzhh.hrp.common.service.PrintTemplateService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/print/printTemplate/")
public class PrintTemplateAction extends BaseAction {

    @Autowired
    private PrintTemplateService printTemplateService;

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(PrintTemplate printTemplate){
        return printTemplateService.save(printTemplate);
        
    }
    @ResponseBody
    @RequestMapping("savePrintTemplate")
    public ResultView savePrintTemplate(String templateCode, HashMap<String, Object> pageData,
            HashMap<String, Object> bodyData, HashMap<String, Object> workFlowData, HashMap<String, Object> accVoucherData, 
            List< HashMap<String, Object>> headItemList, List< HashMap<String, Object>> bodyItemList,
            List< HashMap<String, Object>> workFlowItemList, List< HashMap<String, Object>> accVoucherItemList, List< HashMap<String, Object>> defineItemList) {
        return printTemplateService.savePrintTemplate(templateCode, pageData, bodyData, workFlowData, accVoucherData,
        		headItemList, bodyItemList, workFlowItemList, accVoucherItemList, defineItemList);
        
    }
    @ResponseBody
    @RequestMapping("getTemplateList")
    public ResultView getTemplateList(){
        ResultView result = printTemplateService.getTemplateTree();
        return result;
    }
   
    @ResponseBody
    @RequestMapping("getPrintTemplateInfo")
    public ResultView getPrintTemplateInfo(String templateCode) {
        return printTemplateService.getPrintTemplateInfo(templateCode);
    }
    @ResponseBody
    @RequestMapping("getPrintTemplate")
    public ResultView getPrintTemplate(String templateClsCode, String templateCode) {
        return printTemplateService.getPrintTemplate(templateClsCode,templateCode);
    }
    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String templateCode) {
        printTemplateService.delete(templateCode);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping("copyTemplate")
    public ResultView copyTemplate(PrintTemplate printTemplate, String  copyTemplateCode)
    {
        printTemplateService.copyTemplate(printTemplate, copyTemplateCode);
        return outSuccess(MessageSource.OPERATE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping("getPrintTemplateList")
    public ResultView getPrintTemplateList(String templateClsCode)
    {
        return printTemplateService.getPrintTemplateList(templateClsCode);
    }
}
