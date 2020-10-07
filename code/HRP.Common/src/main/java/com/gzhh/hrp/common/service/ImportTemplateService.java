package com.gzhh.hrp.common.service;

import java.util.List;

import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.tools.ResultView;

public interface ImportTemplateService {

    ResultView save(String dbType, List<ImportTemplate> importTemplateList);

    ResultView getImportTemplateList(String dbType);
}