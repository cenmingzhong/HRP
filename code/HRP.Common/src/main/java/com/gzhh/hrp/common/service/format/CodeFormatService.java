package com.gzhh.hrp.common.service.format;

import com.gzhh.hrp.common.entity.format.CodeFormat;
import com.gzhh.hrp.tools.ResultView;

public interface CodeFormatService {

    /**
     * 保存编号格式
     * @param codeFormat
     * @return
     */
    ResultView save(CodeFormat vouchFormat);

    /**
     * 获取编号格式
     * @param vouchType
     * @return
     */
    ResultView getCodeFormat(String vouchType);

}