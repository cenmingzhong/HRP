package com.gzhh.hrp.common.service;

import java.util.HashMap;

import javax.xml.bind.ValidationException;

import com.gzhh.hrp.common.entity.PrintTemplateClass;
import com.gzhh.hrp.tools.ResultView;

public interface PrintTemplateClassService {

    public ResultView save(PrintTemplateClass printTemplateClass) throws ValidationException;
    public ResultView getList(HashMap<String, Object> params);
    public ResultView getInfo(String id);
    public ResultView delete(String id);

    
}
