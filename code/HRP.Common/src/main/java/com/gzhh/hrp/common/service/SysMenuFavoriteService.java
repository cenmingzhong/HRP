package com.gzhh.hrp.common.service;

import java.util.List;

import com.gzhh.hrp.common.entity.SysMenuFavorite;
import com.gzhh.hrp.tools.ResultView;

public interface SysMenuFavoriteService {

    ResultView save(List<SysMenuFavorite> menuFavoriteList);

    ResultView getMenuFavoriteList();

}