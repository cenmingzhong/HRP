package com.gzhh.hrp.common.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.OperationDao;
import com.gzhh.hrp.common.entity.Operation;
import com.gzhh.hrp.common.service.OperationService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service()
public class OperationServiceImpl extends BaseService implements OperationService{
    
    @Resource
    private OperationDao operationDao;
    
    @Override
    public ResultView save(String pathUrl, List<Operation> operationList) {
        ResultView result = new ResultView();

        if (StringTools.isEmpty(pathUrl)){
            throw new ValidateException("请选择菜单");
        }
        operationDao.deleteByPathUrl(pathUrl);

        if (CollectionTools.isNotEmpty(operationList)){
            for (Operation oper : operationList){
                if (StringTools.isEmpty(oper.getOperCode())){
                    throw new ValidateException("第"+(operationList.indexOf(oper)+1)+"行功能编码不能为空");
                }
                oper.setId(getNewId());
                oper.setPathUrl(pathUrl);

                operationDao.insert(oper);
            }
        }
        return result;
    }
    
    @Override
    public ResultView getOperationList(String pathUrl) {
  
        ResultView result = new ResultView();
        List<Operation> operList = operationDao.getListByFilter(CommonTools.newHashMap("pathUrl", pathUrl));
        result.putData("operationList", operList);

        return result;
   
    }
    
    @Override
    public ResultView saveAll(List<Operation> operationList) {
    	ResultView result = new ResultView();

    	List<Operation> allList = operationDao.getListByFilter(null);
    	operationDao.batchDelete(allList);
        if (CollectionTools.isNotEmpty(operationList)){
            for (Operation operation : operationList) {
            	operation.setId(getNewId());
			}
            operationDao.batchInsert(operationList);
        }
        
        
        return result;
    }
    

}
