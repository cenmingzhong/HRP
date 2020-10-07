package com.gzhh.hrp.common.action;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.common.service.VouchTableFieldService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/vouchTableField/")
public class VouchTableFieldAction extends BaseAction {

    @Autowired
    private VouchTableFieldService vouchTableFieldService;

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(VouchTableField vouchTableField){
        vouchTableFieldService.save(vouchTableField);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filters){
        ResultView result = vouchTableFieldService.getList(filters);
        return result;
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String id) {
        return vouchTableFieldService.getInfo(id);
    }

    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String id) {
        vouchTableFieldService.delete(id);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }

}