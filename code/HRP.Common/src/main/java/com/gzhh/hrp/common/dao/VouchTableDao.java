/**
* ===========================================================================
* 版权所有 2014 广州市辉海计算机科技有限公司，并保留所有权利。
* ----------------------------------------------------------------------------
* 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
* ----------------------------------------------------------------------------
* 创 建 者：omo
* 创建日期：2017-06-08
* ----------------------------------------------------------------------------
* 修改人       修改日期        修改内容
*                           
* ===========================================================================
*/
package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.VouchTable;

@Repository
public class VouchTableDao extends BaseDao<VouchTable>{

    public List<VouchTable> getFilterByCode(HashMap<String, Object> params) {
        return getList("Sys_Vouch_Table.getFilterByCode", params);
    }
    
    public List<VouchTable> getVouchTableList(HashMap<String,Object> filter){
    	return getList("Sys_Vouch_Table.getVouchTableList",filter);
    }

}