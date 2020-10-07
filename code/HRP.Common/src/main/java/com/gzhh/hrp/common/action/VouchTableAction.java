package com.gzhh.hrp.common.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.VouchTable;
import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.common.service.VouchTableService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/vouchTable/")
public class VouchTableAction extends BaseAction {

    @Autowired
    private VouchTableService vouchTableService;

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(VouchTable vouchTable, List<VouchTableField> vouchTableHeadList, 
    		List<VouchTableField> vouchTableBodyList, List<VouchTableField> vouchTableWorkFlowList
    		, List<VouchTableField> vouchTableAccVoucherList){
        return  vouchTableService.save(vouchTable,vouchTableHeadList,vouchTableBodyList,vouchTableWorkFlowList,vouchTableAccVoucherList);
       
    }
    @ResponseBody
    @RequestMapping("setInitTemplate")
    public ResultView setInitTemplate(List<Map<String, Object>> vouchList){
    	vouchTableService.setInitTemplate(vouchList);
    	return outSuccess("添加成功");
    }

    @ResponseBody
    @RequestMapping("getVouchTableList")
    public ResultView getVouchTableList(HashMap<String, Object> filters){
        ResultView result = vouchTableService.getVouchTableList(filters);
        return result;
    }

    @ResponseBody
    @RequestMapping("getVouchTableInfo")
    public ResultView getVouchTableInfo(String vouchId) {
        return vouchTableService.getVouchTableInfo(vouchId);
    }

    @ResponseBody
    @RequestMapping("deleteList")
    public ResultView deleteList(List<String> ids) {
        vouchTableService.deleteList(ids);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }

}