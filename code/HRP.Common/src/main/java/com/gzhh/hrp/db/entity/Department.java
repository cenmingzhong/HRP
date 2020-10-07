package com.gzhh.hrp.db.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;
import com.gzhh.hrp.tools.AppConst;

@Entity
@Table(name="DB_Department")
@Title(value="部门档案",appKey="SYS",isCodeRule=true,ruleKey=AppConst.OBJECT_KEY_DB_DEPARTMENT,ruleValue="2222")
public class Department extends BaseEntity{

	@Id
    @Column(name="Dept_Code",length=50)
    @Title("部门编码")
    private String deptCode;
    
    @Column(name="Dept_Name",length=50)
    @Title("部门名称")
    private String deptName;
    
    @Column(name="Dept_Alias",length=50)
    @Title("部门别名")
    private String deptAlias;

    @Column(name="Dept_Parent",length=50)
    @Title("上级部门")
    private String deptParent;

    @Column(name="Dept_Prop",length=50)
    @Title("部门属性")
    private String deptProp;

    @Column(name="Dept_Type",length=50)
    @Title("部门类型")
    private String deptType;

    @Column(name="Dept_Grade")
    @Title("部门级别")
    private int deptGrade;

    @Column(name="Is_End")
    @Title("是否末级")
    private boolean isEnd;

    @Column(name="Input_Code",length=50)
    @Title("拼音简拼")
    private String inputCode;

    @Column(name="Dept_Person",nullable=true)
    @Title("部门负责人")
    private String deptPerson;

    @Column(name="Dept_Mgr",nullable=true)
    @Title("分管领导")
    private String deptMgr;

    @Column(name="Dept_Email",length=50)
    @Title("部门邮箱")
    private String deptEmail;

    @Column(name="Dept_Phone",length=50)
    @Title("部门电话")
    private String deptPhone;

    @Column(name="Start_Time")
    @Title("开始日期")
    private Date startTime;

    @Column(name="End_Time")
    @Title("停用日期")
    private Date endTime;

    @Column(name="Dept_State",length=50)
    @Title("部门状态")
    private String deptState;

    @Column(name="Dept_Memo",length=50)
    @Title("备注")
    private String deptMemo;

    @Column(name="Creator",length=50)
    @Title("创建人")
    private String creator;

    @Column(name="Create_Time")
    @Title("创建时间")
    private Date createTime;

    @Column(name="Editor",length=50)
    @Title("修改人")
    private String editor;

    @Column(name="Edit_Time")
    @Title("修改时间")
    private Date editTime;
    
    @Column(name="sel_deptFlag",length=50)
    @Title("核算类型")
    private String selDeptFlag;
    
    @Column(name="manage_type",length=50)
    @Title("管理类型")
    private String manageType;
    
    @Column(name="Dept_Order",length=50)
    @Title("部门序号")
    private String deptOrder;
    
    @Column(name="Is_Choose_Dept_Person")
    @Title("")
    private Boolean isChooseDeptPerson;
    
    @Column(name="deptFlag_Level")
    @Title("核算次级")
    private String deptFlagLevel;
    
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

    public String getDeptAlias() {
        return deptAlias;
    }

    public void setDeptAlias(String deptAlias) {
        this.deptAlias = deptAlias;
    }

    public String getDeptParent() {
        return deptParent;
    }

    public void setDeptParent(String deptParent) {
        this.deptParent = deptParent;
    }

    public String getDeptProp() {
        return deptProp;
    }

    public void setDeptProp(String deptProp) {
        this.deptProp = deptProp;
    }

    public String getDeptType() {
        return deptType;
    }

    public void setDeptType(String deptType) {
        this.deptType = deptType;
    }

    public int getDeptGrade() {
        return deptGrade;
    }

    public void setDeptGrade(int deptGrade) {
        this.deptGrade = deptGrade;
    }

    public boolean getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(boolean isEnd) {
        this.isEnd = isEnd;
    }

    public String getInputCode() {
        return inputCode;
    }

    public void setInputCode(String inputCode) {
        this.inputCode = inputCode;
    }
    
    public String getDeptPerson() {
        return deptPerson;
    }

    public void setDeptPerson(String deptPerson) {
        this.deptPerson = deptPerson;
    }

    public String getDeptMgr() {
        return deptMgr;
    }

    public void setDeptMgr(String deptMgr) {
        this.deptMgr = deptMgr;
    }

    public String getDeptEmail() {
        return deptEmail;
    }

    public void setDeptEmail(String deptEmail) {
        this.deptEmail = deptEmail;
    }

    public String getDeptPhone() {
        return deptPhone;
    }

    public void setDeptPhone(String deptPhone) {
        this.deptPhone = deptPhone;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getDeptState() {
        return deptState;
    }

    public void setDeptState(String deptState) {
        this.deptState = deptState;
    }

    public String getDeptMemo() {
        return deptMemo;
    }

    public void setDeptMemo(String deptMemo) {
        this.deptMemo = deptMemo;
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

  

    public String getManageType() {
        return manageType;
    }

    public void setManageType(String manageType) {
        this.manageType = manageType;
    }

    public String getSelDeptFlag() {
        return selDeptFlag;
    }

    public void setSelDeptFlag(String selDeptFlag) {
        this.selDeptFlag = selDeptFlag;
    }

	public String getDeptOrder() {
		return deptOrder;
	}

	public void setDeptOrder(String deptOrder) {
		this.deptOrder = deptOrder;
	}

	public Boolean getIsChooseDeptPerson() {
		return isChooseDeptPerson;
	}

	public void setIsChooseDeptPerson(Boolean isChooseDeptPerson) {
		this.isChooseDeptPerson = isChooseDeptPerson;
	}

    public String getDeptFlagLevel() {
        return deptFlagLevel;
    }

    public void setDeptFlagLevel(String deptFlagLevel) {
        this.deptFlagLevel = deptFlagLevel;
    }
}
