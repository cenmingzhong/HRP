package com.gzhh.hrp.kpi.action;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.kpi.entity.SubmitHead;
import com.gzhh.hrp.kpi.entity.SubmitTail;
import com.gzhh.hrp.kpi.service.GradeSubmitManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-19-上午 10:03
 */
@Controller
@RequestMapping("/kpi/gradeSubmitManager/")
public class GradeSubmitManagerAction extends BaseAction {

    @Autowired
    private  GradeSubmitManagerService gradeSubmitManagerService;

    @ResponseBody
    @RequestMapping(value ="/save")
    public ResultView save(@RequestParam HashMap map){

       return gradeSubmitManagerService.save(map);





    }

    @ResponseBody
    @RequestMapping("/getGradeSubmitManagerInfo")
    public ResultView getGradeSubmitManagerInfo(String submitNumber){

        return gradeSubmitManagerService.getSubmitTailList(submitNumber);
    }

    @ResponseBody
    @RequestMapping("/getGradeSubmitManagerList")
    public ResultView getGradeSubmitManagerList(HashMap<String,Object> filters){
        return gradeSubmitManagerService.getSubmitHeadList(filters);
    }


}
