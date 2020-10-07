package com.gzhh.hrp.common.service;

import java.util.HashMap;

import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.common.entity.MessageRemind;


public interface MessageRemindService {

    public ResultView save(MessageRemind messageRemind);
    public ResultView getList(HashMap<String, Object> params);
    public ResultView getInfo(String id);
    public ResultView delete(String id);
    public ResultView setMessageRemindResult(String messageName, String psnCode, String vouchCode, boolean isNoDeal, String dealResult);
    public boolean isRemind(String appKeyRd, String string);
    public ResultView saveMessageRemind(String messageType, String messageName, String messageContent, String vouchUrl, String psnCode, String vouchCode);
    public ResultView deleteByVouchCode(HashMap<String, Object> map);

    
}