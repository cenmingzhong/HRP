package com.gzhh.hrp.db.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="DB_Person")
@Title("人员档案")
public class Person extends BaseEntity{

	@Id
    @Column(name="Person_Code",length=50)
    @Title("人员编码")
    private String personCode;
    
    @Column(name="Person_Name",length=50)
    @Title("人员名称")
    private String personName;
    
    @Column(name="Dept_Code")
    @Title("部门编码")
    private String deptCode;
    
    @Column(name="Dept_Name")
    @Title("部门名称")
    private String deptName;
    
    @Column(name="Creator",length=50)
    @Title("创建人")
    private String creator;
    
    @Column(name="Create_Time")
    @Title("创建时间")
    private Date createTime;
    
    @Column(name="Editor",length=50)
    @Title("编辑人")
    private String editor;
    
    @Column(name="Eidt_Time")
    @Title("编辑时间")
    private Date eidtTime;
    
    @Column(name="post_code")
    @Title("岗位编码")
    private String postCode;
    
    @Column(name="post_name")
    @Title("岗位名称")
    private String postName;
    
    @Column(name="post_type_code")
    @Title("岗位类别编码")
    private String postTypeCode;
    
    @Column(name="post_type_name")
    @Title("岗位类别名称")
    private String postTypeName;
    
    public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}

	public String getPostTypeCode() {
		return postTypeCode;
	}

	public void setPostTypeCode(String postTypeCode) {
		this.postTypeCode = postTypeCode;
	}

	public String getPostTypeName() {
		return postTypeName;
	}

	public void setPostTypeName(String postTypeName) {
		this.postTypeName = postTypeName;
	}

	public String getPersonCode() {
        return personCode;
    }

    public void setPersonCode(String personCode) {
        this.personCode = personCode;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
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

    public Date getEidtTime() {
        return eidtTime;
    }

    public void setEidtTime(Date eidtTime) {
        this.eidtTime = eidtTime;
    }
}
