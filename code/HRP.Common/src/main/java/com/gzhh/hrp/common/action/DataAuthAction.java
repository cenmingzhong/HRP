package com.gzhh.hrp.common.action;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.DataAuth;
import com.gzhh.hrp.common.service.DataAuthService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/auth/dataAuth/")
public class DataAuthAction extends BaseAction {

    @Resource
    private DataAuthService dataAuthService;
    /**
     * 获取权限树
     */
    @RequestMapping("getDataAuthTree")
    @ResponseBody
    public ResultView getDataAuthTree()
    {
        return dataAuthService.getDataAuthTree();
    }

    /**
     * 获取数据权限列表
     * @param authType
     * @param authCode
     */
    @RequestMapping("getDataAuthList")
    @ResponseBody
    public ResultView getDataAuthList(String authType, String authCode)
    {
        return dataAuthService.getDataAuthList(authType, authCode);
    }
    /**
     * 保存数据权限列表
     * @param authType
     * @param authCode
     * @param authList
     * @return
     */
    @RequestMapping("saveDataAuth")
    @ResponseBody
    public ResultView saveDataAuth(String authType, String authCode, HashMap<String, List<DataAuth>> authList)
    {
        dataAuthService.saveDataAuth(authType, authCode, authList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
}
