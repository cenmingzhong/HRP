package com.gzhh.hrp.db.action;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.DataDict;
import com.gzhh.hrp.db.entity.DataDictDetail;
import com.gzhh.hrp.db.service.DataDictService;
import com.gzhh.hrp.tools.ResultView;
@Controller
@RequestMapping("/db/dataDict/")
public class DataDictAction extends BaseAction{

    @Autowired
    private DataDictService dataDictService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(DataDictDetail entity) {
        dataDictService.save(entity);
        return outSuccess("保存成功");
    }
    
    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(String dataTpyeCode){
        ResultView result = dataDictService.getList(dataTpyeCode);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getSearchList")
    public ResultView getSearchList(HashMap<String, Object> filter){
        ResultView result = dataDictService.getSearchList(filter);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String id){
        ResultView result = dataDictService.getInfo(id);
        return result;
    }
   
    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String id){
        dataDictService.delete(id);
        return outSuccess("删除成功");
    }
    
    @RequestMapping("toRefer")
    public String toRefer(){
        return "/common/refer/dataDict/dataDictRefer";
    }
    
    @RequestMapping("toDictTypeInfo")
    public String toDictTypeInfo(){
        return "/db/dataDict/dictTypeInfo";
    }
    
    @ResponseBody
    @RequestMapping("saveDictType")
    public ResultView saveDictType(DataDict dictType) {
        dataDictService.saveDictType(dictType);
        return outSuccess("保存成功");
    }
    
    @ResponseBody
    @RequestMapping("deleteDictType")
    public ResultView deleteDictType(String dictTypeCode){
        ResultView result = dataDictService.deleteDictType(dictTypeCode);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getDictTypeList")
    public ResultView getDictTypeList(){
        ResultView result = dataDictService.getDictTypeList();
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getDictType")
    public ResultView getDictType(String dictTypeCode){
        ResultView result = dataDictService.getDictType(dictTypeCode);
        return result;
    }
}
