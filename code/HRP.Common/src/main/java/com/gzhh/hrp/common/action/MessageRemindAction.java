package com.gzhh.hrp.common.action;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.tools.ResultView;

import com.gzhh.hrp.common.entity.MessageRemind;
import com.gzhh.hrp.common.service.MessageRemindService;

@Controller
@RequestMapping("/system/")
public class MessageRemindAction extends BaseAction {

    @Autowired
    private MessageRemindService messageRemindService;

    @ResponseBody
    @RequestMapping("save")
    public ResultView save(MessageRemind messageRemind){
        messageRemindService.save(messageRemind);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filters){
        ResultView result = messageRemindService.getList(filters);
        return result;
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String id) {
        return messageRemindService.getInfo(id);
    }

    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String id) {
        messageRemindService.delete(id);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }

}