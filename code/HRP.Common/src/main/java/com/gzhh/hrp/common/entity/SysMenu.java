package com.gzhh.hrp.common.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.Title;

@Entity
@XmlRootElement(name="sysMenu")
@Table(name="Sys_Menu")
@Title(value="系统菜单",appKey="SYS")
public class SysMenu extends BaseEntity {
    
    @Id
    @Column(name="Sys_Menu_Code")
    @XmlAttribute(name="menuCode")
    @Title("菜单编码")
    private String sysMenuCode;

    @Column(name="Sys_Menu_Name")
    @XmlAttribute(name="menuName")
    @Title("菜单名称")
    private String sysMenuName;

    @Column(name="Sys_Menu_Parent")
    @XmlAttribute(name="menuParent")
    @Title("上级菜单编码")
    private String sysMenuParent;

    @Column(name="Sys_Menu_Url")
    @XmlAttribute(name="menuUrl")
    private String sysMenuUrl;

    @Column(name="Sys_Menu_Module")
    @XmlAttribute(name="menuModule")
    private String sysMenuModule;

    @Column(name="Sys_Menu_Type")
    @XmlAttribute(name="menuType")
    private String sysMenuType;

    @Column(name="Sys_Menu_Level")
    @XmlAttribute(name="menuLevel")
    private int sysMenuLevel;

    @Column(name="Sys_Menu_Order")
    @XmlAttribute(name="menuOrder")
    private int sysMenuOrder;

    @Column(name="Sys_Menu_Visible")
    @XmlAttribute(name="menuVisible")
    private String sysMenuVisible;

    @Column(name="Sys_Menu_Enable")
    @XmlAttribute(name="menuEnable")
    private String sysMenuEnable;

    @Column(name="Sys_Menu_Icon")
    @XmlAttribute(name="menuIcon")
    private String sysMenuIcon;
    
    @Column(name="Sys_Menu_Icon_Open")
    @XmlAttribute(name="menuIconOpen")
    private String sysMenuIconOpen;
    
    @Column(name="Sys_Menu_Icon_Close")
    @XmlAttribute(name="menuIconClose")
    private String sysMenuIconClose;
    
    @Column(name="Sys_Menu_Desc")
    @XmlAttribute(name="menuDesc")
    private String sysMenuDesc;
    
    @Transient
    @XmlElement(name="sysMenu")
    private List<SysMenu> children;

    @XmlTransient
    @Transient
    private List<SysMenu> sysMenuList;
    
    @Column(name="vouch_type")
    @XmlAttribute(name="vouchType")
    @Title("单据编码(使用xml做单据头和表体时添加上跟xml中的code一致)")
    private String vouchType;

	@XmlTransient
    public String getVouchType() {
		return vouchType;
	}
	public void setVouchType(String vouchType) {
		this.vouchType = vouchType;
	}
	@XmlTransient
    public String getSysMenuCode() {
        return sysMenuCode;
    }
    public void setSysMenuCode(String sysMenuCode) {
        this.sysMenuCode = sysMenuCode;
    }
    @XmlTransient
    public String getSysMenuName() {
        return sysMenuName;
    }
    public void setSysMenuName(String sysMenuName) {
        this.sysMenuName = sysMenuName;
    }
    @XmlTransient
    public String getSysMenuParent() {
        return sysMenuParent;
    }
    public void setSysMenuParent(String sysMenuParent) {
        this.sysMenuParent = sysMenuParent;
    }
    @XmlTransient
    public String getSysMenuUrl() {
        return sysMenuUrl;
    }
    public void setSysMenuUrl(String sysMenuUrl) {
        this.sysMenuUrl = sysMenuUrl;
    }
    @XmlTransient
    public String getSysMenuModule() {
        return sysMenuModule;
    }
    public void setSysMenuModule(String sysMenuModule) {
        this.sysMenuModule = sysMenuModule;
    }
    @XmlTransient
    public String getSysMenuType() {
        return sysMenuType;
    }
    public void setSysMenuType(String sysMenuType) {
        this.sysMenuType = sysMenuType;
    }
    @XmlTransient
    public int getSysMenuLevel() {
        return sysMenuLevel;
    }
    public void setSysMenuLevel(int sysMenuLevel) {
        this.sysMenuLevel = sysMenuLevel;
    }
    @XmlTransient
    public int getSysMenuOrder() {
        return sysMenuOrder;
    }
    public void setSysMenuOrder(int sysMenuOrder) {
        this.sysMenuOrder = sysMenuOrder;
    }
    @XmlTransient
    public String getSysMenuVisible() {
        return sysMenuVisible;
    }
    public void setSysMenuVisible(String sysMenuVisible) {
        this.sysMenuVisible = sysMenuVisible;
    }
    @XmlTransient
    public String getSysMenuEnable() {
        return sysMenuEnable;
    }
    public void setSysMenuEnable(String sysMenuEnable) {
        this.sysMenuEnable = sysMenuEnable;
    }
    @XmlTransient
    public String getSysMenuIcon() {
        return sysMenuIcon;
    }
    public void setSysMenuIcon(String sysMenuIcon) {
        this.sysMenuIcon = sysMenuIcon;
    }
    @XmlTransient
    public String getSysMenuIconOpen() {
        return sysMenuIconOpen;
    }
    public void setSysMenuIconOpen(String sysMenuIconOpen) {
        this.sysMenuIconOpen = sysMenuIconOpen;
    }
    @XmlTransient
    public String getSysMenuIconClose() {
        return sysMenuIconClose;
    }
    public void setSysMenuIconClose(String sysMenuIconClose) {
        this.sysMenuIconClose = sysMenuIconClose;
    }
    @XmlTransient
    public String getSysMenuDesc() {
        return sysMenuDesc;
    }
    public void setSysMenuDesc(String sysMenuDesc) {
        this.sysMenuDesc = sysMenuDesc;
    }
    @XmlTransient
    public List<SysMenu> getChildren() {
        return children;
    }
    public void setChildren(List<SysMenu> children) {
        this.children = children;
    }
    @XmlTransient
    public List<SysMenu> getSysMenuList() {
        return sysMenuList;
    }
    public void setSysMenuList(List<SysMenu> sysMenuList) {
        this.sysMenuList = sysMenuList;
    }
}
