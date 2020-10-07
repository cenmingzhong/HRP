package com.gzhh.hrp.common.action.format;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.format.VouchFormat;
import com.gzhh.hrp.common.service.format.VouchFormatService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/format/vouchFormat/")
public class VouchFormatAction extends BaseAction {

    @Resource
    private VouchFormatService vouchFormatService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(VouchFormat vouchFormat){
        vouchFormatService.save(vouchFormat);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping("getVouchTypeTree")
    public ResultView getVouchTypeTree(){
        return vouchFormatService.getVouchTypeTree();
    }
    
    @ResponseBody
    @RequestMapping("getVouchFormat4Design")
    public ResultView getVouchFormat4Design(String vouchType){
        return vouchFormatService.getVouchFormat4Design(vouchType);
    }
    
    @ResponseBody
    @RequestMapping("getVouchFormat4Filter")
    public ResultView getVouchFormat4Filter(String vouchType){
        return vouchFormatService.getVouchFormat4Filter(vouchType);
    }
    @ResponseBody
    @RequestMapping("getVouchTypeList")
    public ResultView getVouchTypeList(){
    	return vouchFormatService.getVouchTypeList();
    }
    @RequestMapping("toVouchTypeList")
    public String toVouchTypeList(){
    	return "system/format/vouchType/vouchTypeList";
    }
}
