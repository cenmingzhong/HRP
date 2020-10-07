package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.PrintTemplateUserDefDao;
import com.gzhh.hrp.common.entity.PrintTemplateUserDef;
import com.gzhh.hrp.common.service.PrintTemplateUserDefService;
import com.gzhh.hrp.tools.ResultView;

@Service
public class PrintTemplateUserDefServiceImpl extends BaseService implements PrintTemplateUserDefService {

    @Resource
    private PrintTemplateUserDefDao printTemplateUserDefDao;

    //保存用户打印默认设置
    public ResultView savePrintTemplateUserDefault(PrintTemplateUserDef printTemplateUserDef) {
        ResultView resultView = new ResultView();
        printTemplateUserDef.setUserCode(getLoginUser().getSysUserCode());
        HashMap<String,Object>ht=new HashMap<String,Object>();
        ht.put("userCode", printTemplateUserDef.getUserCode());
        ht.put("templateClsCode", printTemplateUserDef.getTemplateClsCode());
        List<PrintTemplateUserDef> list=printTemplateUserDefDao.getListByFilter(ht);
        if(list.size()==0){
            printTemplateUserDefDao.insert(printTemplateUserDef);
        }else{
            printTemplateUserDefDao.deleteByCode(ht);
            printTemplateUserDefDao.insert(printTemplateUserDef);
        }
        return resultView;
    }
}
