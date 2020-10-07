package com.gzhh.hrp.common.service;

import com.gzhh.hrp.tools.ResultView;

public interface SystemInitService {

    ResultView initLoginUser(String sessionId);
    ResultView getUserInit(String sessionId);
	ResultView getMainSetting();
}