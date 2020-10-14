package com.gzhh.hrp.db.dao;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.Password;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-12-下午 14:15
 */
@Repository
public class PasswordManagerDao extends BaseDao<Password> {

    public List<Map> getPasswordList(HashMap<String, Object> filter) {
        List<Map> list = getMapList("DB_Password.getList", filter);
        return list;
    }
}
