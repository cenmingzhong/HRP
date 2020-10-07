/**
* ===========================================================================
* 版权所有 2014 广州市辉海计算机科技有限公司，并保留所有权利。
* ----------------------------------------------------------------------------
* 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
* ----------------------------------------------------------------------------
* 创 建 者：梁海成
* 创建日期：2017-06-12
* ----------------------------------------------------------------------------
* 修改人       修改日期        修改内容
*                           
* ===========================================================================
*/
package com.gzhh.hrp.common.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.AccountPeriod;

@Repository
public class AccountPeriodDao extends BaseDao<AccountPeriod>{

    public AccountPeriod getPeriodByDate(Date newDate) {
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("endDate", newDate);
        return (AccountPeriod) getListByFilter(map).get(0);
    }

    public AccountPeriod getPeriodByYearMonth(int yearMonth) {
        return get("Sys_AccountPeriod.getPeriodByYearMonth", Integer.toString(yearMonth));
    }

    @SuppressWarnings("rawtypes")
	public List<Map> getAccountYearList(){
        return getMapList("Sys_AccountPeriod.getAccountYearList",null);
    }
}