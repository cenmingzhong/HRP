package com.gzhh.hrp.db.entity;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author cenmingzhong
 * @create 2020-10-14-下午 22:13
 */
@Entity
@Table(name="DB_Permission")
@Title("权限等级")
public class Permission{

    @Id
    @Column(name="Permission_Number")
    @Title("权限编号")
    private Integer permissionNumber;

    @Column(name="Permission_Level")
    @Title("权限等级")
    private String permissionLevel;

    public Integer getPermissionNumber() {
        return permissionNumber;
    }

    public void setPermissionNumber(Integer permissionNumber) {
        this.permissionNumber = permissionNumber;
    }

    public String getPermissionLevel() {
        return permissionLevel;
    }

    public void setPermissionLevel(String permissionLevel) {
        this.permissionLevel = permissionLevel;
    }

    @Override
    public String toString() {
        return "Permission{" +
                "permissionNumber=" + permissionNumber +
                ", permissionLevel='" + permissionLevel + '\'' +
                '}';
    }
}
