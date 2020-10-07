package com.gzhh.hrp.common.action;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.service.OperationAuthService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/auth/operAuth/")
public class OperationAuthAction extends BaseAction{
    
    @Resource
    private OperationAuthService operationAuthService;
    
    @ResponseBody
    @RequestMapping("saveOperationList")
    public ResultView saveOperationList(String sysRoleCode,String pathUrl,List<String> operIds){
        operationAuthService.saveOperationAuthList(sysRoleCode, pathUrl, operIds);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping("getOperationAuthList")
    public ResultView getOperationAuthList(String sysRoleCode, String pathUrl){
        ResultView result = operationAuthService.getOperationAuthList(sysRoleCode, pathUrl);
        return result;
    }

    @ResponseBody
    @RequestMapping("getCurUserOperAuthList")
    public ResultView getCurUserOperAuthList(String pathUrl)
    {
        return operationAuthService.getCurUserOperAuthList(pathUrl);
    }
    
    @ResponseBody
    @RequestMapping("getAllOperationAuthList")
    public ResultView getAllOperationAuthList(HashMap<String, Object> filter){
        ResultView result = operationAuthService.getAllOperationAuthList(filter);
        return result;
    }
}
