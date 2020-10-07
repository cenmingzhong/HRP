/**
* ===========================================================================
* 版权所有 2014 广州市辉海计算机科技有限公司，并保留所有权利。
* ----------------------------------------------------------------------------
* 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
* ----------------------------------------------------------------------------
* 创 建 者：梁海成
* 创建日期：2017-06-27
* ----------------------------------------------------------------------------
* 修改人       修改日期        修改内容
*                           
* ===========================================================================
*/
package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.RoleMenu;
import com.gzhh.hrp.tools.CommonTools;

@Repository
public class RoleMenuDao extends BaseDao<RoleMenu>{

    
    @SuppressWarnings("rawtypes")
    public List<Map> getRoleModuleMenuList(String sysRoleCode) {
        HashMap<String,Object> map = CommonTools.newHashMap("sysRoleCode", sysRoleCode);
        return getMapList("RoleMenu.getRoleModuleMenuList",map);
    }

    public List<RoleMenu> getOneRoleMenu(HashMap<String, Object> map) {
        return getList("RoleMenu.getOneRoleMenu",map);
    }
    public int deleteByMenuCode(String sysUserCode){
        return delete("RoleMenu.deleteByMenuCode",sysUserCode);
    }

}