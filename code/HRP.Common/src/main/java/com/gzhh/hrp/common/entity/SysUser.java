package com.gzhh.hrp.common.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_User", uniqueConstraints={@UniqueConstraint(columnNames="Sys_User_Account")})
public class SysUser extends BaseEntity{

    @Id
    @Column(name="Sys_User_Code",length=50)
    private String sysUserCode;
    
    @Column(name="Sys_User_Name",length=100)
    private String sysUserName;
    
    @Column(name="Sys_User_Account",length=50)
    private String sysUserAccount;

    @Column(name="Sys_User_Password",length=50)
    private String sysUserPassword;
    
    @Column(name="Sys_User_Desc",length=100)
    private String sysUserDesc;
    
    @Column(name="Sys_Dept_Code")
    private String sysDeptCode;
    
    @Column(name="Sys_Dept_Name")
    private String sysDeptName;
    
    @Column(name="Sys_User_Phone",length=50)
    private String sysUserPhone;

    @Column(name="Sys_User_Status",length=50)
    private String sysUserStatus;

    @Column(name="Sys_User_Email",length=50)
    private String sysUserEmail;
    
    @Column(name="Sys_User_Sex")
    private Integer sysUserSex;
    
    @Column(name="Sys_Role_Code")
    private Integer sysRoleCode;
    
    @Column(name="Sys_Title_Code")
    private Integer sysTitleCode;
    
    @Column(name="fileRole")
    @Title("文件权限，0个人，1部门，2全部")
    private Integer fileRole;

    @Column(name="Creator",length=50)
    @Title("创建人")
    private String creator;

    @Column(name="Create_Time")
    @Title("创建时间")
    private Date createTime;

    @Column(name="Editor",length=50)
    @Title("修改人")
    private String editor;
    
    @Transient
    private String sysRoleName;
    @Transient
    private String sysTitleName;

	public Integer getSysRoleCode() {
		return sysRoleCode;
	}

	public void setSysRoleCode(Integer sysRoleCode) {
		this.sysRoleCode = sysRoleCode;
	}

	public Integer getSysTitleCode() {
		return sysTitleCode;
	}

	public void setSysTitleCode(Integer sysTitleCode) {
		this.sysTitleCode = sysTitleCode;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public Date getEditTime() {
		return editTime;
	}

	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}

	@Column(name="Edit_Time")
    @Title("修改时间")
    private Date editTime;
    @Transient
    private List<SysUserProj> userProjList;
    
    public List<SysUserProj> getUserProjList() {
		return userProjList;
	}

	public void setUserProjList(List<SysUserProj> userProjList) {
		this.userProjList = userProjList;
	}


	public String getSysUserCode() {
        return sysUserCode;
    }

    public String getSysUserName() {
        return sysUserName;
    }

    public void setSysUserName(String sysUserName) {
        this.sysUserName = sysUserName;
    }

    public String getSysUserAccount() {
        return sysUserAccount;
    }

    public void setSysUserAccount(String sysUserAccount) {
        this.sysUserAccount = sysUserAccount;
    }

    public String getSysUserPassword() {
        return sysUserPassword;
    }

    public void setSysUserPassword(String sysUserPassword) {
        this.sysUserPassword = sysUserPassword;
    }

    public String getSysUserDesc() {
        return sysUserDesc;
    }

    public void setSysUserDesc(String sysUserDesc) {
        this.sysUserDesc = sysUserDesc;
    }

    public String getSysUserPhone() {
        return sysUserPhone;
    }

    public void setSysUserPhone(String sysUserPhone) {
        this.sysUserPhone = sysUserPhone;
    }


    public String getSysUserStatus() {
        return sysUserStatus;
    }

    public void setSysUserStatus(String sysUserStatus) {
        this.sysUserStatus = sysUserStatus;
    }

    public String getSysUserEmail() {
        return sysUserEmail;
    }

    public void setSysUserEmail(String sysUserEmail) {
        this.sysUserEmail = sysUserEmail;
    }


    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }

    public String getSysDeptCode() {
        return sysDeptCode;
    }

    public void setSysDeptCode(String sysDeptCode) {
        this.sysDeptCode = sysDeptCode;
    }

    public String getSysDeptName() {
        return sysDeptName;
    }

    public void setSysDeptName(String sysDeptName) {
        this.sysDeptName = sysDeptName;
    }

	public Integer getSysUserSex() {
		return sysUserSex;
	}

	public void setSysUserSex(Integer sysUserSex) {
		this.sysUserSex = sysUserSex;
	}

	public String getSysRoleName() {
		return sysRoleName;
	}

	public void setSysRoleName(String sysRoleName) {
		this.sysRoleName = sysRoleName;
	}

	public String getSysTitleName() {
		return sysTitleName;
	}

	public void setSysTitleName(String sysTitleName) {
		this.sysTitleName = sysTitleName;
	}

	public Integer getFileRole() {
		return fileRole;
	}

	public void setFileRole(Integer fileRole) {
		this.fileRole = fileRole;
	}
	
}
