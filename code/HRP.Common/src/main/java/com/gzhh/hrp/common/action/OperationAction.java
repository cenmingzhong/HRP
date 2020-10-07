package com.gzhh.hrp.common.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.Operation;
import com.gzhh.hrp.common.service.OperationService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/auth/operation/")
public class OperationAction extends BaseAction{
    
    @Resource
    private OperationService operationService;
    

    // 保存功能操作列表
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(String pathUrl, List<Operation> operationList){
        operationService.save(pathUrl, operationList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }


    // 获取功能操作列表
    @ResponseBody
    @RequestMapping("getOperationList")
    public ResultView getOperationList(String pathUrl){
        ResultView result = operationService.getOperationList(pathUrl);
        return result;
    }
    
    // 保存全部功能操作列表
    @ResponseBody
    @RequestMapping("saveAll")
    public ResultView saveAll(List<Operation> operationList){
        operationService.saveAll(operationList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
}
