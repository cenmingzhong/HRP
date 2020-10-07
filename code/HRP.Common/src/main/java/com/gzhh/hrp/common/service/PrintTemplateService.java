package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.common.entity.PrintTemplate;
import com.gzhh.hrp.tools.ResultView;

public interface PrintTemplateService {

    ResultView save(PrintTemplate printTemplate);
    ResultView delete(String templateCode);
    ResultView copyTemplate(PrintTemplate printTemplate, String copyTemplateCode);
    ResultView getTemplateTree();

    ResultView getPrintTemplateInfo(String templateCode);
    ResultView getPrintTemplate(String templateClsCode, String templateCode);
    ResultView savePrintTemplate(String templateCode, HashMap<String, Object> pageData, HashMap<String, Object> bodyData,
                                 HashMap<String, Object> workFlowData, HashMap<String, Object> accVoucherData, List<HashMap<String, Object>> headItemList, List<HashMap<String, Object>> bodyItemList,
                                 List<HashMap<String, Object>> workFlowItemList, List<HashMap<String, Object>> accVoucherItemList, List<HashMap<String, Object>> defineItemList);
    ResultView getPrintTemplateList(String templateClsCode);

    
}
