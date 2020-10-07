package com.gzhh.hrp.common.action.system;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.SysMenuFavorite;
import com.gzhh.hrp.common.service.SysMenuFavoriteService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/menuFavorite/")
public class SysMenuFavoriteAction extends BaseAction {

    @Resource
    private SysMenuFavoriteService sysMenuFavoriteService;
    
    @RequestMapping("save")
    @ResponseBody
    public ResultView save(List<SysMenuFavorite> menuFavoriteList){
        sysMenuFavoriteService.save(menuFavoriteList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
//michael of 1
    @RequestMapping("menuFavorite")
    public String menuFavorite(String menuFavoriteCls) {
        return "system/menuFavorite/menuFavoriteList";
    }
    @RequestMapping("getMenuFavoriteList")
    @ResponseBody
    public ResultView getMenuFavoriteList(){
        return sysMenuFavoriteService.getMenuFavoriteList();
    }
}
