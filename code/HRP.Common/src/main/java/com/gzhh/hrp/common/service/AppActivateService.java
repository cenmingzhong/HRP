package com.gzhh.hrp.common.service;

import com.gzhh.hrp.common.entity.AppActivate;
import com.gzhh.hrp.tools.ResultView;

public interface AppActivateService {

    ResultView getAppList();

    ResultView activateApp(String appKey, int yearMonth);

    ResultView unActivateApp(String appKey);

    ResultView save(AppActivate appActivate);

}