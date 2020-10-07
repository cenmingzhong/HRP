package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.xml.bind.ValidationException;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.PrintTemplateClassDao;
import com.gzhh.hrp.common.dao.PrintTemplateDao;
import com.gzhh.hrp.common.entity.PrintTemplate;
import com.gzhh.hrp.common.entity.PrintTemplateClass;
import com.gzhh.hrp.common.service.PrintTemplateClassService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class PrintTemplateClassServiceImpl extends BaseService implements PrintTemplateClassService {

    @Resource
    private PrintTemplateClassDao printTemplateClassDao;
    @Resource
    private PrintTemplateDao printTemplateDao;

    public ResultView save(PrintTemplateClass printTemplateClass) throws ValidationException {
        ResultView result = new ResultView();
        if(printTemplateClass.getIsNew()){
            if(printTemplateClassDao.get(printTemplateClass.getTemplateClsCode())!=null){
                throw new ValidationException("该编号已存在不能重复插入", printTemplateClass.getTemplateClsCode());
            }
            printTemplateClassDao.insert(printTemplateClass);
        }else{
            printTemplateClassDao.update(printTemplateClass);
        }
        return result;
    }

    public ResultView getList(HashMap<String, Object> params) {
        ResultView resultView = new ResultView();

        List<PrintTemplateClass> tempLateClsList = printTemplateClassDao.selectListByFilter(params);
        resultView.putData("tempLateClsList", tempLateClsList);
        return resultView;
    }

   public ResultView getInfo(String tempClsCode) {
        ResultView resultView = new ResultView();

        PrintTemplateClass printTemplateClass = printTemplateClassDao.get(tempClsCode);
        resultView.putData("printTemplateClass", printTemplateClass);
        return resultView;
    }

    public ResultView delete(String tempClsCode) {
        ResultView resultView = new ResultView();
        if(StringTools.isEmpty(tempClsCode)){
           throw new ValidateException("单据类型编码不能为空！删除失败！");
        }
        List<PrintTemplate> templateList = printTemplateDao.getListByFilter(CommonTools.newHashMap("templateClsCode", tempClsCode));
        if(CollectionTools.isNotEmpty(templateList)){
            throw new ValidateException("该单据类型存在打印模板，不能删除");
        }
        printTemplateClassDao.delete(tempClsCode);
      
        return resultView;
    }
}