package com.gzhh.hrp.common.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.SysMenuFavoriteDao;
import com.gzhh.hrp.common.entity.SysMenuFavorite;
import com.gzhh.hrp.common.service.SysMenuFavoriteService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;

@Service
public class SysMenuFavoriteServiceImpl extends BaseService implements SysMenuFavoriteService {

    @Resource
    private SysMenuFavoriteDao sysMenuFavoriteDao;
    
    public ResultView save(List<SysMenuFavorite> menuFavoriteList){
        ResultView result = new ResultView();
        
        List<SysMenuFavorite> favoriteList = sysMenuFavoriteDao.getListByFilter(CommonTools.newHashMap("sysUserCode", getLoginUser().getSysUserCode()));
        if(CollectionTools.isNotEmpty(favoriteList)){
            for(SysMenuFavorite favorite : favoriteList){
                sysMenuFavoriteDao.delete(favorite);
            }
        }
        
        if(CollectionTools.isNotEmpty(menuFavoriteList)){
            for(SysMenuFavorite favorite : menuFavoriteList){
                favorite.setId(getNewId());
                favorite.setSysUserCode(getLoginUser().getSysUserCode());
                favorite.setMenuOrder(menuFavoriteList.indexOf(favorite));
                
                sysMenuFavoriteDao.insert(favorite);
            }
        }
        
        return result;
    }
    
    public ResultView getMenuFavoriteList(){
        ResultView result = new ResultView();
        
        List<SysMenuFavorite> favoriteList = sysMenuFavoriteDao.getListByFilter(CommonTools.newHashMap("sysUserCode", getLoginUser().getSysUserCode()));
        favoriteList = favoriteList.stream().sorted(Comparator.comparing(SysMenuFavorite::getMenuOrder)).collect(Collectors.toList());
        result.putData("favoriteList", favoriteList);
        
        return result;
    }
}
