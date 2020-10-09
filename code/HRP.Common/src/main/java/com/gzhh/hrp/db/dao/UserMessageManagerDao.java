package com.gzhh.hrp.db.dao;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-08-上午 10:42
 */
@Repository
public class UserMessageManagerDao extends BaseDao<User> {
    public List<Map> getUserList(HashMap<String, Object> filters){
        return getMapList("DB_User.getUserList", filters);
}

}
