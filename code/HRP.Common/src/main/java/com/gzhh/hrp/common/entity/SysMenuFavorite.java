package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.gzhh.hrp.tools.StringTools;

@Entity
@Table(name="Sys_Menu_Favorite")
public class SysMenuFavorite extends BaseEntity {

    @Id
    @Column(name="id")
    private String id;
    
    @Column(name="SYS_User_Code")
    private String sysUserCode;
    
    @ManyToOne
    @JoinColumn(name="SYS_Menu_Code")
    private SysMenu sysMenu;
    
    @Column(name="menu_order")
    private int menuOrder;
    
    @Column(name="icon_Url")
    private String iconUrl;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getSysUserCode() {
        return sysUserCode;
    }
    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }
    public SysMenu getSysMenu() {
        return sysMenu;
    }
    public void setSysMenu(SysMenu sysMenu) {
        this.sysMenu = sysMenu;
    }
    public int getMenuOrder() {
        return menuOrder;
    }
    public void setMenuOrder(int menuOrder) {
        this.menuOrder = menuOrder;
    }
    public String getIconUrl() {
        return StringTools.isEmpty(iconUrl)?"images/menuIcon/bill.png":iconUrl;
    }
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
    
}