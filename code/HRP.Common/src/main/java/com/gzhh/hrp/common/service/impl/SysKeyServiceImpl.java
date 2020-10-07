package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.gzhh.hrp.common.dao.SysKeyDao;
import com.gzhh.hrp.common.entity.SysKey;
import com.gzhh.hrp.common.service.SysKeyService;
import com.gzhh.hrp.tools.StringTools;

@Service
@Scope(scopeName="")
public class SysKeyServiceImpl extends BaseService implements SysKeyService {

    @Resource
    private PlatformTransactionManager txManager;
    
    @Resource
    private SysKeyDao sysKeyDao;
    
    /** 生成器锁 */
    @SuppressWarnings("unused")
    private final ReentrantLock lock = new ReentrantLock();
    /** 预生成流水号 */
    private HashMap<String,List<String>> prepIdMap = new HashMap<String,List<String>>();

    public void genPrepId(String keyType){
        
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);// 事物隔离级别，开启新事务
        TransactionStatus status = txManager.getTransaction(def);
        
        try{
            SysKey entity = sysKeyDao.get(keyType);
            
            if(entity == null){
                entity = new SysKey();
                entity.setKeyType(keyType);
                
                sysKeyDao.insert(entity);
            }
            
            if(null == prepIdMap.get(keyType)){
                prepIdMap.put(keyType, new ArrayList<String>());
            }
            
            int prepCount = 200;
            int keySeq = entity.getKeySeq();
            for(int i = 0 ; i < prepCount; i++){
                prepIdMap.get(keyType).add(String.valueOf(keySeq+i));
            }
            entity.setKeySeq(keySeq+prepCount);
            sysKeyDao.update(entity);
            
            txManager.commit(status);
        }catch(Exception e){
            txManager.rollback(status);
        }
    }
    
    public String getKey(SysKey key, boolean isUpdate){

//      lock.lock();
//      try{
//          //判断内存中是否还有序列号
//          if(null == prepIdMap.get(keyType) || prepIdMap.get(keyType).size() == 0){
//              genPrepId(keyType);
//          }
//          return prepIdMap.get(keyType).remove(0);
//      }finally {
//          lock.unlock();
//      }
      
      SysKey entity = sysKeyDao.get(key.getKeyType());
      
      if(entity == null){
          entity = key;
          sysKeyDao.insert(entity);
      }
      
      int keySeq = entity.getKeySeq();
      int keyLen = entity.getKeyLen();
      
      String keyPre = entity.getKeyPre() == null ? "" : entity.getKeyPre();
      String keySuf = entity.getKeySuf() == null ? "" : entity.getKeySuf();

      keySeq = keySeq + 1;

      if (isUpdate)
      {
          entity.setKeySeq(keySeq);
          sysKeyDao.update(entity);
      }

      String keySeqStr = String.valueOf(keySeq);

      if (keyLen != 0 && keySeqStr.length() < keyLen)
      {
          keySeqStr = StringTools.padLeft(keySeqStr, keyLen, '0');
      }
      return keyPre + keySeqStr + keySuf;
    }
    
    public String getKey(String keyType,boolean isUpdate){
        SysKey key = new SysKey();
        key.setKeyType(keyType);
        key.setKeyLen(4);
        
        return getKey(key, isUpdate);
    }
}
