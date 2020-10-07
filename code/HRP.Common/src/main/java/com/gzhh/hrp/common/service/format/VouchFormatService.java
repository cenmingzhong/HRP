package com.gzhh.hrp.common.service.format;

import com.gzhh.hrp.common.entity.format.VouchFormat;
import com.gzhh.hrp.tools.ResultView;

public interface VouchFormatService {

    ResultView getVouchTypeTree();
    ResultView save(VouchFormat vouchFormat);
    ResultView getVouchFormat(String vouchType);
    ResultView getVouchFormat4Design(String vouchType);
    ResultView getVouchFormat4Filter(String vouchType);
	ResultView getVouchTypeList();
}