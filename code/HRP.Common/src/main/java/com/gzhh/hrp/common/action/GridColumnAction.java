package com.gzhh.hrp.common.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.GridColumn;
import com.gzhh.hrp.common.service.GridColumnService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/gridColumn/")
public class GridColumnAction extends BaseAction{
    @Resource
    private GridColumnService gridColumnService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(String pathUrl, String gridId, List<GridColumn> colList){
        gridColumnService.save(pathUrl, gridId, colList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    @ResponseBody
    @RequestMapping("getGridColumnList")
    public ResultView getGridColumnList(String pathUrl, String gridId){
        ResultView result = gridColumnService.getGridColumnList(pathUrl, gridId);
        return result;
    }

    @ResponseBody
    @RequestMapping("saveGridColumnWidth")
    public ResultView saveGridColumnWidth(String pathUrl, String gridId, String colId, int width){
        ResultView result = gridColumnService.saveGridColumnWidth(pathUrl, gridId,colId, width);
        return result;
    }
}
