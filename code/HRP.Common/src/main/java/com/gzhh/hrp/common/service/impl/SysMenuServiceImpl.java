package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.dao.RoleMenuDao;
import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.dao.SysUserRoleDao;
import com.gzhh.hrp.common.entity.AppConfig;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.SysUserRole;
import com.gzhh.hrp.common.service.SysMenuService;
import com.gzhh.hrp.common.service.SysRoleService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class SysMenuServiceImpl extends BaseService implements SysMenuService {

    @Resource
    private SysMenuDao sysMenuDao;
    @Resource
    SysRoleService sysRoleService; 
    @Resource
    private SysUserRoleDao sysUserRoleDao;
    @Resource
    private RoleMenuDao roleMenuDao;
    
    @Override
    public ResultView getModuleList(){
        ResultView result = new ResultView();
        
        List<SysMenu> moduleList = sysMenuDao.getListByFilter(CommonTools.newHashMap("sysMenuType", "module"));
        moduleList.sort(Comparator.comparing(SysMenu::getSysMenuOrder));
        result.putData("moduleList", moduleList);
        
        return result;
    }
    
    public ResultView saveModule(SysMenu module) {
        ResultView result = new ResultView();
        
        if(module.getIsNew()){
            if(StringTools.isEmpty(module.getSysMenuCode())){
                module.setSysMenuCode(getNewId());
            }
            module.setSysMenuType("module");
            module.setSysMenuLevel(1);
            module.setSysMenuOrder(sysMenuDao.getMaxOrder("module", null, null)+1);
            
            sysMenuDao.insert(module);
        }else{
            SysMenu existModule = sysMenuDao.get(module.getSysMenuCode());
            
            existModule.setSysMenuName(module.getSysMenuName());
            existModule.setSysMenuDesc(module.getSysMenuDesc());
            existModule.setSysMenuVisible(module.getSysMenuVisible());
            existModule.setSysMenuEnable(module.getSysMenuEnable());
                     
            sysMenuDao.update(existModule);
        }
        result.putData("sysMenuCode", module.getSysMenuCode());
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }

    public ResultView saveMenu(SysMenu menu) 
    {
        ResultView result = new ResultView();

        if (menu.getIsNew()){
            if(StringTools.isEmpty(menu.getSysMenuCode())){
                menu.setSysMenuCode(getNewId());
            }
            menu.setSysMenuType("menu");
            if (StringTools.isEmpty(menu.getSysMenuParent())){
                menu.setSysMenuLevel(1);
            }
            else{
                SysMenu parentMenu = sysMenuDao.get(menu.getSysMenuParent());
                menu.setSysMenuLevel(parentMenu.getSysMenuLevel()+1);
            }
            menu.setSysMenuOrder(sysMenuDao.getMaxOrder("menu", menu.getSysMenuModule(), menu.getSysMenuParent())+1);
            
            sysMenuDao.insert(menu);
        }
        else
        {
            SysMenu existMenu = sysMenuDao.get(menu.getSysMenuCode());

            existMenu.setSysMenuName(menu.getSysMenuName());
            existMenu.setSysMenuUrl(menu.getSysMenuUrl());
            existMenu.setSysMenuVisible(menu.getSysMenuVisible());
            existMenu.setSysMenuEnable(menu.getSysMenuEnable());
            existMenu.setSysMenuDesc(menu.getSysMenuDesc()); 

            sysMenuDao.update(existMenu);
        }
        result.putData("sysMenuCode", menu.getSysMenuCode());
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }
    
    public ResultView getMenuListByModule(String sysMenuModule) {
        ResultView result = new ResultView();
        
        List<SysMenu> menuList = sysMenuDao.getListByFilter(CommonTools.newHashMap("sysMenuModule", sysMenuModule));
        menuList = menuList.stream().sorted(Comparator.comparing(SysMenu::getSysMenuOrder)).collect(Collectors.toList());
        
        List<SysMenu> treeMenuList = new ArrayList<SysMenu>();  
        for (SysMenu menu : menuList) {  
            if (StringTools.isEmpty(menu.getSysMenuParent())) {  
                treeMenuList.add(findChildren(menu,menuList));  
            }  
        } 
        
        result.putData("treeMenuList", treeMenuList);
        return result;
    }
    
    /** 
     * 递归查找子节点 
     * @param treeNodes 
     * @return 
     */  
    public SysMenu findChildren(SysMenu sysMenu,List<SysMenu> sysMenuList) {  
        for (SysMenu it : sysMenuList) {  
            if(sysMenu.getSysMenuCode().equals(it.getSysMenuParent())) {  
                if (sysMenu.getChildren() == null) {  
                    sysMenu.setChildren(new ArrayList<SysMenu>());  
                }  
                sysMenu.getChildren().add(findChildren(it,sysMenuList));  
            }  
        }  
        return sysMenu;  
    }
    
    public ResultView getCurMenuList(){
        ResultView result = new ResultView();
        
        List<SysMenu> moduleList = new ArrayList<SysMenu>();
        
        List<String> roleCodeList = new ArrayList<String>();
        if(!StringTools.equals(getLoginUser().getSysUserAccount(),AppConfig.getAdminAccount())){
            List<SysUserRole> userRoleList = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysUserCode", getLoginUser().getSysUserCode()));
//            if(userRoleList.size()==0){
//                throw new ValidateException("当前用户还未设置用户角色！");
//            }
            for(SysUserRole sysUserRole:userRoleList){
                roleCodeList.add(sysUserRole.getSysRoleCode());
            }
        }
        
        String roleCodes = StringTools.listToString(roleCodeList, "','");
        moduleList = sysMenuDao.getRoleModuleList(roleCodes);

        for (SysMenu module : moduleList){
            
            List<SysMenu> menuList = sysMenuDao.getRoleMenuList(roleCodes,module.getSysMenuCode());
            menuList = menuList.stream().sorted(Comparator.comparing(SysMenu::getSysMenuOrder)).collect(Collectors.toList());
            
            List<SysMenu> treeMenuList = new ArrayList<SysMenu>();  
            for (SysMenu menu : menuList) {  
                if (StringTools.isEmpty(menu.getSysMenuParent())) {  
                    treeMenuList.add(findChildren(menu,menuList));  
                }  
            }
            module.setSysMenuList(treeMenuList);
        }

        result.putData("roleMenuList", moduleList);
        return result;


        /*List<SysMenu> moduleList = sysMenuDao.getListByFilter(CommonTools.newHashMap("sysMenuType", "module"));

        for (SysMenu module : moduleList)
        {
            List<SysMenu> menuList = sysMenuDao.getListByFilter(CommonTools.newHashMap("sysMenuModule", module.getSysMenuCode()));

            module.setSysMenuList(menuList);
        }

        result.putData("roleMenuList", moduleList);
        return result;*/
    }
    
    public ResultView getCurMenuTree(){
        ResultView result = new ResultView();
        
        String sysUserCode = null;
        
        if(!StringTools.equals(getLoginUser().getSysUserAccount(),AppConfig.getAdminAccount())){
            sysUserCode = getLoginUser().getSysUserCode();
        }
        
        List<SysMenu> menuTree = sysMenuDao.getMenuTreeByUser(sysUserCode);

        result.putData("menuTree", menuTree);
        return result;
    }
    
    @Override
    public ResultView dragMenu(String beforeSysMenuCode, String afterSysMenuCode, String moveType)
    {
        //当移动到成为别人子节点时
        if (StringTools.equals(moveType, "inner"))
        {
            SysMenu beforeMenu = sysMenuDao.get(beforeSysMenuCode);
            //更新原来的菜单的兄弟节点顺序
            sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), null, beforeMenu.getSysMenuOrder(), -1);

            if (StringTools.equals(afterSysMenuCode, ""))
            {
                beforeMenu.setSysMenuParent("");
                beforeMenu.setSysMenuLevel(1);
                beforeMenu.setSysMenuOrder(sysMenuDao.getMaxOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent())+1);
            }
            else
            {
                SysMenu targetMenu = sysMenuDao.get(afterSysMenuCode);

                beforeMenu.setSysMenuParent(afterSysMenuCode);
                beforeMenu.setSysMenuLevel(targetMenu.getSysMenuLevel() + 1);
                beforeMenu.setSysMenuOrder(sysMenuDao.getMaxOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent()) + 1);
            }
            sysMenuDao.update(beforeMenu);
            updateChildMenuLevel(beforeMenu);
        }
        else
        {
            SysMenu beforeMenu = sysMenuDao.get(beforeSysMenuCode);
            SysMenu targetMenu = sysMenuDao.get(afterSysMenuCode);

            //同级别移动
            if (StringTools.equals(beforeMenu.getSysMenuParent(), targetMenu.getSysMenuParent()))
            {
                int maxOrder = 0;
                int minOrder = 0;
                //后面移动前面
                if (beforeMenu.getSysMenuOrder() > targetMenu.getSysMenuOrder())
                {
                    if (StringTools.equals(moveType, "prev"))
                    {
                        //IList<Menu> childMenuList = menuDAL.GetChildMenuList(beforeMenu);
                        //foreach (Menu childMenu in childMenuList)
                        //{
                        //    if (childMenu.SysMenuOrder >= targetMenu.SysMenuOrder && childMenu.SysMenuOrder < beforeMenu.SysMenuOrder)
                        //    {
                        //        childMenu.SysMenuOrder = childMenu.SysMenuOrder + 1;
                        //        menuDAL.Update(childMenu);
                        //    }
                        //}
                        maxOrder = beforeMenu.getSysMenuOrder();
                        minOrder = targetMenu.getSysMenuOrder() - 1;
                        sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), maxOrder, minOrder, 1);

                        beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder());
                        sysMenuDao.update(beforeMenu);
                    }
                    else if (StringTools.equals(moveType, "next"))
                    {
                        //IList<Menu> childMenuList = menuDAL.GetChildMenuList(beforeMenu);
                        //foreach (Menu childMenu in childMenuList)
                        //{
                        //    if (childMenu.SysMenuOrder > targetMenu.SysMenuOrder && childMenu.SysMenuOrder < beforeMenu.SysMenuOrder)
                        //    {
                        //        childMenu.SysMenuOrder = childMenu.SysMenuOrder + 1;
                        //        menuDAL.Update(childMenu);
                        //    }
                        //}
                        maxOrder = beforeMenu.getSysMenuOrder();
                        minOrder = targetMenu.getSysMenuOrder();
                        sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), maxOrder, minOrder, 1);

                        beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder() + 1);
                        sysMenuDao.update(beforeMenu);
                    }
                }
                //前面移动后面
                else
                {
                    if (StringTools.equals(moveType, "prev"))
                    {
                        //IList<Menu> childMenuList = menuDAL.GetChildMenuList(beforeMenu);
                        //foreach (Menu childMenu in childMenuList)
                        //{
                        //    if (childMenu.SysMenuOrder > beforeMenu.SysMenuOrder && childMenu.SysMenuOrder < targetMenu.SysMenuOrder)
                        //    {
                        //        childMenu.SysMenuOrder = childMenu.SysMenuOrder - 1;
                        //        menuDAL.Update(childMenu);
                        //    }
                        //}
                        maxOrder = targetMenu.getSysMenuOrder();
                        minOrder = beforeMenu.getSysMenuOrder();
                        sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), maxOrder, minOrder, -1);

                        beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder() - 1);
                        sysMenuDao.update(beforeMenu);

                    }
                    else if (StringTools.equals(moveType, "next"))
                    {
                        //IList<Menu> childMenuList = menuDAL.GetChildMenuList(beforeMenu);
                        //foreach (Menu childMenu in childMenuList)
                        //{
                        //    if (childMenu.SysMenuOrder > beforeMenu.SysMenuOrder && childMenu.SysMenuOrder <= targetMenu.SysMenuOrder)
                        //    {
                        //        childMenu.SysMenuOrder = childMenu.SysMenuOrder - 1;
                        //        menuDAL.Update(childMenu);
                        //    }
                        //}
                        maxOrder = targetMenu.getSysMenuOrder() + 1;
                        minOrder = beforeMenu.getSysMenuOrder();
                        sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), maxOrder, minOrder, -1);

                        beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder());
                        sysMenuDao.update(beforeMenu);
                    }
                }
            }
            //不同级别移动
            else
            {
                Integer maxOrder = 0;
                Integer minOrder = 0;

                if (StringTools.equals(moveType, "prev"))
                {
                    maxOrder = null;
                    minOrder = targetMenu.getSysMenuOrder() - 1;
                    sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), targetMenu.getSysMenuParent(), maxOrder, minOrder, 1);
                    sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), null, beforeMenu.getSysMenuOrder(), -1);
                    
                    beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder());
                    beforeMenu.setSysMenuParent(targetMenu.getSysMenuParent());
                    beforeMenu.setSysMenuLevel(targetMenu.getSysMenuLevel());
                    sysMenuDao.update(beforeMenu);
                }
                else if (StringTools.equals(moveType, "next"))
                {
                    maxOrder = null;
                    minOrder = targetMenu.getSysMenuOrder();
                    sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), targetMenu.getSysMenuParent(), maxOrder, minOrder, 1);
                    sysMenuDao.updateOrder(beforeMenu.getSysMenuType(), beforeMenu.getSysMenuModule(), beforeMenu.getSysMenuParent(), null, beforeMenu.getSysMenuOrder(), -1);

                    beforeMenu.setSysMenuOrder(targetMenu.getSysMenuOrder() + 1);
                    beforeMenu.setSysMenuParent(targetMenu.getSysMenuParent());
                    beforeMenu.setSysMenuLevel(targetMenu.getSysMenuLevel());
                    sysMenuDao.update(beforeMenu);
                }
                //更新所有子节点level
                updateChildMenuLevel(beforeMenu);
            }

        }

        return new ResultView();
    }
    
    public void updateChildMenuLevel(SysMenu parentMenu)
    {
        List<SysMenu> childMenuList = sysMenuDao.getChildMenuList(parentMenu);
        if (CollectionTools.isNotEmpty(childMenuList))
        {
            for (SysMenu childMenu: childMenuList)
            {
                childMenu.setSysMenuLevel(parentMenu.getSysMenuLevel() + 1);
                sysMenuDao.update(childMenu);

                updateChildMenuLevel(childMenu);
            }
        }
    }

    @Override
    public ResultView getMenu(String sysMenuCode) {
        ResultView result = new ResultView();
        SysMenu menu = sysMenuDao.get(sysMenuCode);
        result.putData("menu", menu);
        return result;
    }

    @Override
    public ResultView deleteMenu(String sysMenuCode) {
        ResultView result = new ResultView();
        SysMenu sysMenu = sysMenuDao.get(sysMenuCode);
        if(sysMenu==null){
            return result;
        }
        sysMenuDao.delete(sysMenu);
        roleMenuDao.deleteByMenuCode(sysMenu.getSysMenuCode());
        List<SysMenu> list = sysMenuDao.getChildMenuList(sysMenu);
        if(list.size()!=0){
            for(SysMenu mune:list){
                deleteMenu(mune.getSysMenuCode());
            }
        }
        return result;
    }

    @Override
    public ResultView getAllModuleMenu() {
        ResultView result = new ResultView();

        List<SysMenu> menuList = sysMenuDao.getAllModuleMenu();
        result.putData("menuList", menuList);

        return result;
    }
    
    @Override
    public ResultView getMenuList(HashMap<String, Object> filter) {
    	ResultView result = new ResultView();

        List<SysMenu> menuList = sysMenuDao.getMenuList(filter);
        result.putData("menuList", menuList);

        return result;
    }
    
}
