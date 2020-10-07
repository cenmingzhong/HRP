package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.OperationAuth;
import com.gzhh.hrp.tools.CommonTools;

@Repository
public class OperationAuthDao extends BaseDao<OperationAuth>{

    public int deleteByRoleAndPathUrl(String sysRoleCode, String pathUrl) {
        HashMap<String,Object> map = CommonTools.newHashMap("sysRoleCode", sysRoleCode);
        map.put("pathUrl", pathUrl);
        return delete("Sys_OperationAuth.deleteByRoleAndPathUrl", map);
    }

    public List<OperationAuth> getListByFilter(String sysRoleCode, String pathUrl) {
        DetachedCriteria dc = createCreteria();
        dc.add(Restrictions.eq("sysRoleCode", sysRoleCode));
        dc.add(Restrictions.sqlRestriction("Oper_Id in(select id from sys_operation where path_url = '"+pathUrl+"')"));
        
        return getListByCriteria(dc);
    }
}
