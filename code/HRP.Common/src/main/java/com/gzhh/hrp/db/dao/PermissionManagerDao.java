package com.gzhh.hrp.db.dao;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-14-下午 21:32
 */
@Repository
public class PermissionManagerDao extends BaseDao{
    public List<Map> getPermissionUserList(HashMap<String,Object> filter){
        List<Map> list = getMapList("DB_User.getPermissionUserList", filter);
        return list;
    }


}
