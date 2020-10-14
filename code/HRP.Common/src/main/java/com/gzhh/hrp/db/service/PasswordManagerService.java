package com.gzhh.hrp.db.service;

import com.gzhh.hrp.db.entity.Password;
import com.gzhh.hrp.tools.ResultView;

import java.util.HashMap;

/**
 * @author cenmingzhong
 * @create 2020-10-12-上午 11:27
 */
public interface PasswordManagerService {
    public void save(Password password);

    public ResultView getList(HashMap<String, Object> filter);

    public ResultView getInfo(Integer teacherNumber);
}
