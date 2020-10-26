package com.gzhh.hrp.kpi.dao;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.kpi.entity.SubmitHead;
import com.gzhh.hrp.kpi.entity.SubmitTail;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

/**
 * @author cenmingzhong
 * @create 2020-10-19-下午 15:50
 */
@Repository
public class GradeSubmitManagerDao extends BaseDao {

    public List getSubmitHeadList(HashMap<String, Object> filters) {
        List submitHeadList = getList("KPI_SubmitHead.getSubmitHeadList", filters);
        return submitHeadList;
    }

    public List getSubmitHeadAndTailList(String submitNumber) {
        List list = getList("KPI_SubmitHead.getSubmitHeadAndTail", submitNumber);
        return list;
    }
}
