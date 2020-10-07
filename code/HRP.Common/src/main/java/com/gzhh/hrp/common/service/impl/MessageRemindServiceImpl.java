package com.gzhh.hrp.common.service.impl;

import java.util.Date;
import java.util.HashMap;

import java.util.List;

import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.gzhh.hrp.common.dao.MessageRemindDao;
import com.gzhh.hrp.common.entity.MessageRemind;
import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.common.service.MessageRemindService;

@Service
public class MessageRemindServiceImpl extends BaseService implements MessageRemindService {

    @Resource
    private MessageRemindDao messageRemindDao;

    public ResultView save(MessageRemind messageRemind) {
        if(StringTools.isEmpty(messageRemind.getId())){
            return add(messageRemind);
        }else{
            return update(messageRemind);
        }
    }

    public ResultView add(MessageRemind messageRemind) {
        ResultView resultView = new ResultView();
        messageRemind.setId(getNewId());

        messageRemindDao.insert(messageRemind);
        return resultView;
    }

    public ResultView update(MessageRemind messageRemind) {
        ResultView resultView = new ResultView();

        messageRemindDao.update(messageRemind);
        return resultView;
    }

    public ResultView getList(HashMap<String, Object> params) {
        ResultView resultView = new ResultView();

        //List<MessageRemind> messageRemindList = messageRemindDao.getList(params);
        //resultView.putData("messageRemindList", messageRemindList);
        return resultView;
    }

    public ResultView getInfo(String id) {
        ResultView resultView = new ResultView();

        MessageRemind messageRemind = messageRemindDao.get(id);
        resultView.putData("messageRemind", messageRemind);
        return resultView;
    }

    public ResultView delete(String id) {
        ResultView resultView = new ResultView();

        MessageRemind messageRemind = messageRemindDao.get(id);
        if(messageRemind!=null)
        {
          messageRemindDao.delete(messageRemind);
        }
        return resultView;
    }

    @Override
    public ResultView setMessageRemindResult(String messageName, String psnCode, String vouchCode, boolean isNoDeal, String dealResult) {
        ResultView result = new ResultView();
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("messageName", messageName);
        map.put("psnCode", psnCode);
        map.put("vouchCode", vouchCode);
        map.put("isNoDeal", isNoDeal);
        map.put("DdealResult", dealResult);
        setCheckDealResult(map);
        return result;
        
    }
    public ResultView setCheckDealResult(HashMap<String,Object> map ){
        ResultView result = new ResultView();
        List<MessageRemind> messageRemindList = messageRemindDao.getListByFilter(map);
        if (CollectionTools.isNotEmpty(messageRemindList)) {
            for (MessageRemind messageRemind : messageRemindList){
                messageRemind.setDealResult(map.get("DealResult").toString()); 
                messageRemind.setDealPsn(getLoginUser().getSysUserName());
                messageRemind.setDealTime(new Date());
                messageRemindDao.update(messageRemind);
            }
        }
        return result;
    }
    public boolean isRemind(String appKey, String isType){
        SysProperty sysProperty = sysPropertyDao.getByPropName(appKey, isType);
        if (sysProperty != null && sysProperty.getPropValue() == "Y"){
            return true;
        }
        return false;
    }

 
    public ResultView saveMessageRemind(String messageType, String messageName, String messageContent, String vouchUrl, String psnCode, String vouchCode){
        ResultView result = new ResultView();
        MessageRemind messageRemind = new MessageRemind();
        messageRemind.setMessageType(messageType);
        messageRemind.setMessageName(messageName);
        messageRemind.setMessageContent(messageContent);
        messageRemind.setVouchUrl(vouchUrl);
        messageRemind.setPsnCode(psnCode);
        messageRemind.setVouchCode(vouchCode);
        save(messageRemind);
        return result;
    }

    @Override
    public ResultView deleteByVouchCode(HashMap<String, Object> map) {
        ResultView result = new ResultView();
        messageRemindDao.deleteByVouchCode(map);
        return result;
    }

    
}