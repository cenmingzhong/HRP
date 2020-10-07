/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：梁海成
 * 创建日期：2017-06-27 10:31:56
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;

import org.apache.ibatis.type.Alias;
import javax.persistence.Table;

import com.gzhh.hrp.common.entity.BaseEntity;


@Entity
@Table(name="Sys_Role_Menu")
@Alias("RoleMenu")
public class RoleMenu extends BaseEntity{
    
    public RoleMenu(){}
    public RoleMenu(String id, String sysRoleCode, String sysMenuCode) {
        this.id = id;
        this.sysRoleCode = sysRoleCode;
        this.sysMenuCode = sysMenuCode;
    }

    @Id    
    @Column(name="Id")   
    private String id;

    @Column(name="Sys_Role_Code")    
    private String sysRoleCode;

    @Column(name="Sys_Menu_Code")    
    private String sysMenuCode;

    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /*获取*/
    public String getSysRoleCode() {
        return this.sysRoleCode;
    }
        
    /*设置*/
    public void setSysRoleCode(String sysRoleCode){
        this.sysRoleCode = sysRoleCode;
    }
        
    /*获取*/
    public String getSysMenuCode() {
        return this.sysMenuCode;
    }
        
    /*设置*/
    public void setSysMenuCode(String sysMenuCode){
        this.sysMenuCode = sysMenuCode;
    }
    
}