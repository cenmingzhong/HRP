package com.gzhh.hrp.common.action.system;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.service.SysMenuService;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Controller
@RequestMapping("/system/menu/")
public class SysMenuAction extends BaseAction {

    @Resource
    private SysMenuService sysMenuService;
    
    @ResponseBody
    @RequestMapping(value="getMenuListByModule")
    public ResultView getMenuListByModule(String sysMenuModule){
        return sysMenuService.getMenuListByModule(sysMenuModule);
    }
    
    @ResponseBody
    @RequestMapping(value="getModuleList")
    public ResultView getModuleList(){
        return sysMenuService.getModuleList();
    }
    
    @ResponseBody
    @RequestMapping(value="dragMenu")
    public ResultView dragMenu(String beforeSysMenuCode, String afterSysMenuCode, String moveType) {
        sysMenuService.dragMenu(beforeSysMenuCode, afterSysMenuCode, moveType);
        return outSuccess("更新成功");
    }
    
    @RequestMapping(value="sysMenuInfo")
    public String sysMenuInfo(HashMap<String, Object> params) {
        HttpServletRequest request = getRequest();
        request.setAttribute("params",params);
        return "../pages/system/menu/menuInfo";
    }
    
    @ResponseBody
    @RequestMapping(value="getMenu")
    public ResultView getMenu(String sysMenuCode) {
        return sysMenuService.getMenu(sysMenuCode);
    }
    
    @ResponseBody
    @RequestMapping(value="saveMenu")
    public ResultView saveMenu(SysMenu sysMenu) {
        if(StringTools.isEmpty(sysMenu.getSysMenuCode()))  {
            sysMenu.setIsNew(true);
        }
        return sysMenuService.saveMenu(sysMenu);
    }
    
    @ResponseBody
    @RequestMapping(value="saveModule")
    public ResultView saveModule(SysMenu sysMenu) {
        if(StringTools.isEmpty(sysMenu.getSysMenuCode())) {
            sysMenu.setIsNew(true);
        }
        return sysMenuService.saveModule(sysMenu);
    }
    
    /**
     * 删除菜单项
     * @param sysMenuCode
     * @return
     */
    
    @ResponseBody
    @RequestMapping(value="deleteMemu")
    public ResultView deleteMemu(String sysMenuCode) {
        sysMenuService.deleteMenu(sysMenuCode);
        return outSuccess("删除成功");
    }
    @ResponseBody
    @RequestMapping(value="getAllModuleMenu")
    public ResultView getAllModuleMenu() {
        return sysMenuService.getAllModuleMenu();
    }
    
    @ResponseBody
    @RequestMapping("getCurMenuTree")
    public ResultView getCurMenuTree(){
        return sysMenuService.getCurMenuTree();
    }

    @RequestMapping("toSetRoleMenu")
    public String toSetRoleMenu(){
        return "system/menu/setRoleMenu";
    }
   //michael加的
    @RequestMapping("menu")
    public String menu(String menuCls) {
        return "system/menu/menuList";
    }
    
    @RequestMapping("toMenuInfo")
    public String toMenuInfo(){
        return "system/menu/menuInfo";
    }
    
    @ResponseBody
    @RequestMapping("getMenuList")
    public ResultView getMenuList(HashMap<String, Object> filter){
        return sysMenuService.getMenuList(filter);
    }
}
