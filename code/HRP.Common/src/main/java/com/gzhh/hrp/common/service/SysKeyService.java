package com.gzhh.hrp.common.service;

import com.gzhh.hrp.common.entity.SysKey;

public interface SysKeyService {

    public String getKey(SysKey key, boolean isUpdate);
    public String getKey(String keyType, boolean isUpdate);

}