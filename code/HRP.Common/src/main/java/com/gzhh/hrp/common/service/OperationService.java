package com.gzhh.hrp.common.service;

import java.util.List;

import com.gzhh.hrp.common.entity.Operation;
import com.gzhh.hrp.tools.ResultView;

public interface OperationService {

    ResultView getOperationList(String pathUrl);

    ResultView save(String pathUrl, List<Operation> operationList);

    ResultView saveAll(List<Operation> operationList);

}
