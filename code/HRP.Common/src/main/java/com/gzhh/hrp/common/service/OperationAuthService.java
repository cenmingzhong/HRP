package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.tools.ResultView;

public interface OperationAuthService {

    ResultView saveOperationAuthList(String sysRoleCode, String pathUrl, List<String> operIds);

    ResultView getOperationAuthList(String sysRoleCode, String pathUrl);

    ResultView getCurUserOperAuthList(String pathUrl);

	ResultView getAllOperationAuthList(HashMap<String, Object> filter);

}
