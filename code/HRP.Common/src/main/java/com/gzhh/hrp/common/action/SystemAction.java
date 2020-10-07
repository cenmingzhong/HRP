package com.gzhh.hrp.common.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.service.SysMenuFavoriteService;
import com.gzhh.hrp.common.service.SysMenuService;
import com.gzhh.hrp.common.service.SysUserService;
import com.gzhh.hrp.common.service.SystemInitService;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Controller
@RequestMapping("/")
public class SystemAction extends BaseAction{

    @Resource
    private SysMenuService sysMenuService;
    
    @Resource
    private SystemInitService SystemInitService;
    
    @Resource
    private SysUserService SysUserService;
    
    @Resource
    private SysMenuFavoriteService sysMenuFavoriteService;
    
    @RequestMapping("toLogin")
    public String toLogin() {
        HttpServletRequest request = getRequest();
        request.setAttribute("loginDate", StringTools.getDateString(new Date(),"yyyy-MM-dd"));
        return "../index";
    }
    
    @RequestMapping("toReLogin")
    public String toReLogin() {
        return "../reLogin";
    }
    
    @SuppressWarnings("unchecked")
    @RequestMapping("toMain")
    public String toMain() {
        HttpServletRequest request = getRequest();
        ResultView result = sysMenuService.getCurMenuList();
        request.setAttribute("moduleList", (List<SysMenu>)result.getData("roleMenuList"));
        ResultView mainSetting = SystemInitService.getMainSetting();
        request.setAttribute("mainSetting", mainSetting);
        return "../main";
    }
    
    @RequestMapping("toDesktop")
    public String toDesktop() {
        HttpServletRequest request = getRequest();
        ResultView result = sysMenuFavoriteService.getMenuFavoriteList();
        request.setAttribute("favoriteList", result.getData("favoriteList"));
        return "../desktop";
    }
    
    @RequestMapping("login")
    public String login(String userName, String password,String loginDate, RedirectAttributes redirectAttr) {
        ResultView result = SysUserService.userLogin(userName, password,loginDate);
        if(StringTools.equals(result.getIsOk(), "N")){
            redirectAttr.addFlashAttribute("errorMsg", result.getMessage());
            redirectAttr.addFlashAttribute("loginDate", loginDate);
            return "redirect:/toLogin.do";
        }else{
            SysUser user = (SysUser)result.getEntity();
            
            HRPSession.addLoginSession(user.getSysUserCode(),loginDate, getSession().getId());
            SystemInitService.initLoginUser(getSession().getId());
            
            return "redirect:toMain.do";
        }
    }
    
    @RequestMapping("singleLogin")
    public String singleLogin(String userName,String loginDate) {
        ResultView result = SysUserService.singleLogin(userName);
        SysUser user = (SysUser)result.getEntity();
        
        HRPSession.addLoginSession(user.getSysUserCode(),loginDate, getSession().getId());
        SystemInitService.initLoginUser(getSession().getId());

        return "redirect:/toMain.do";
    }

    @ResponseBody
    @RequestMapping("reLogin")
    public ResultView reLogin(String loginAccount, String loginPassword, String loginDate) {
        ResultView result = SysUserService.userLogin(loginAccount, loginPassword, loginDate);
        if(StringTools.equals(result.getIsOk(), "Y")){
            SysUser user = (SysUser)result.getEntity();
            
            HRPSession.addLoginSession(user.getSysUserCode(),loginDate, getSession().getId());
            SystemInitService.initLoginUser(getSession().getId());
            
        }
        result.setEntity(null);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getUserInit")
    public ResultView getUserInit(){
        return SystemInitService.getUserInit(getSession().getId());
    }
    
    @ResponseBody
    @RequestMapping("exit")
    public ResultView exit(){
        logger.debug("退出系统，session="+getSession().getId());
        HRPSession.removeSession(getSession().getId());
        return outSuccess(MessageSource.OPERATE_SUCCESS);
    }
}
