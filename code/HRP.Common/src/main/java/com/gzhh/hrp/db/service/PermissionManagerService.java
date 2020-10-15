package com.gzhh.hrp.db.service;

import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-14-下午 21:27
 */
public interface PermissionManagerService {
    ResultView getList(HashMap<String, Object> filter);

    ResultView getPermissionList(HashMap<String, Object> filter);

    ResultView save(HashMap permission);

    ResultView getInfo(String teacherNumber);
}
