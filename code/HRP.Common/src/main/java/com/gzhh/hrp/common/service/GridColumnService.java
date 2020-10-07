package com.gzhh.hrp.common.service;

import java.util.List;

import com.gzhh.hrp.common.entity.GridColumn;
import com.gzhh.hrp.tools.ResultView;

public interface GridColumnService {
    ResultView save(String pathUrl, String gridId, List<GridColumn> colList);
    ResultView getGridColumnList(String pathUrl, String gridId);
    ResultView saveGridColumnWidth(String pathUrl, String gridId, String colId, int width);
}
