package com.gzhh.hrp.kpi.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.UserMessageManagerDao;
import com.gzhh.hrp.kpi.dao.GradeSubmitManagerDao;
import com.gzhh.hrp.kpi.entity.SubmitHead;
import com.gzhh.hrp.kpi.entity.SubmitTail;
import com.gzhh.hrp.kpi.service.GradeSubmitManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @author cenmingzhong
 * @create 2020-10-19-下午 14:33
 */
@Service
public class GradeSubmitManagerServiceImpl extends BaseService implements GradeSubmitManagerService {

    @Autowired
    private GradeSubmitManagerDao gradeSubmitManagerDao;

    @Transactional
    @Override
    public ResultView save(HashMap mapss) {

        String submit = (String)mapss.get("SubmitHead");
        Gson gson = new Gson();
        Map<String, Object> maps = new HashMap<String, Object>();
        maps= gson.fromJson(submit, maps.getClass());






        ResultView resultView = new ResultView();
        SubmitHead submitHead = new SubmitHead();
        SubmitTail submitTail = new SubmitTail();


        for (Object map :maps.keySet()){
            if("submitNumber".equals(map)){
                String submitNumber = (String)maps.get(map);
                submitHead.setSubmitNumber(submitNumber);
                String headSubmitNumber = (String)maps.get(map);
                submitTail.setHeadSubmitNumber(headSubmitNumber);
            }
            if("teacherNumber".equals(map)){
                String teacherNumber = (String)maps.get(map);
                submitHead.setTeacherNumber(teacherNumber);
            }
            if("submitTime".equals(map)){
                String submitTime = (String)maps.get(map);
                submitHead.setSubmitTime(submitTime);
            }
            if("submitYear".equals(map)){
                String submitYear = (String)maps.get(map);
                submitHead.setSubmitYear(submitYear);
            }
            if("workloadTypeNumber".equals(map)){
                String workloadTypeNumber = (String)maps.get(map);
                submitHead.setWorkloadTypeNumber(workloadTypeNumber);
            }
            if("tailSubmitNumber".equals(map)){
                String tailSubmitNumber = (String)maps.get(map);
                submitTail.setTailSubmitNumber(tailSubmitNumber);
            }
//            if("headSubmitNumber".equals(map)){
//                String headSubmitNumber = (String)maps.get(map);
//                submitTail.setHeadSubmitNumber(headSubmitNumber);
//            }
            if("gradeTaskNumber".equals(map)){
                String gradeTaskNumber = (String)maps.get(map);
                submitTail.setGradeTaskNumber(gradeTaskNumber);
            }
            if("gradeScore".equals(map)){
                Integer gradeScore = Integer.valueOf((String)maps.get(map));
                submitTail.setGradeScore(gradeScore);
            }
            if("supportingMaterial".equals(map)){
                String supportingMaterial = (String)maps.get(map);
                submitTail.setSupportingMaterial(supportingMaterial);
            }



        }
        gradeSubmitManagerDao.insert(submitHead);
        gradeSubmitManagerDao.insert(submitTail);





//        Collection mapss = maps.values();
//        Iterator iterator = mapss.iterator();
//        while(iterator.hasNext()){
//            String next = (String)iterator.next();
//            System.out.println("next:"+next);
//
//            Gson gson = new Gson();
//            Map<String, Object> stringObjectHashMap = new HashMap<String, Object>();
//            stringObjectHashMap= gson.fromJson(next, stringObjectHashMap.getClass());
//
//
//
//
//
//        }
////        ObjectMapper mapper = new ObjectMapper();
////        mapper.reader(values[0],SubmitHead.class);


        return resultView;
    }






    @Override
    public ResultView getSubmitTailList(String submitNumber) {
        ResultView resultView = new ResultView();
        List submitHeadAndTailList = gradeSubmitManagerDao.getSubmitHeadAndTailList(submitNumber);
        resultView.putData("submitHeadAndTailList",submitHeadAndTailList);


        return resultView;
    }

    @Override
    public ResultView getSubmitHeadList(HashMap<String, Object> filters) {
        ResultView resultView = new ResultView();
        List<SubmitHead> submitHeadList = gradeSubmitManagerDao.getSubmitHeadList(filters);
//        for(String filter:filters.keySet()){
//            if("teacherNumber".equals(filter)){
//                Object o = filters.get(filter);
//                userMessageManagerDao.get(o);
//                submitHeadList.add(submitHeadList.size()+1,);
//            }
//        }
        resultView.putData("submitHeadList",submitHeadList);
        return resultView;
    }


}
