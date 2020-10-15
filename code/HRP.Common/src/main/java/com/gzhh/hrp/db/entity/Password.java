package com.gzhh.hrp.db.entity;

import com.gzhh.hrp.common.entity.BaseEntity;

import javax.persistence.*;
import java.util.Date;

/**
 * @author cenmingzhong
 * @create 2020-10-12-上午 11:08
 */
@Entity
@Table(name = "DB_Password")
public class Password extends BaseEntity{

    @Id
    @Column(name="Teacher_Number")
    private String teacherNumber;


    @Column(name = "Teacher_Name")
    private String teacherName;

    @Column(name = "Teacher_Account")
    private String teacherAccount;

    @Column(name = "Teacher_Password")
    private String teacherPassword;

    @Column(name = "Create_Time")
    private Date createTime;

    public String getTeacherNumber() {
        return teacherNumber;
    }

    public void setTeacherNumber(String teacherNumber) {
        this.teacherNumber = teacherNumber;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherAccount() {
        return teacherAccount;
    }

    public void setTeacherAccount(String teacherAccount) {
        this.teacherAccount = teacherAccount;
    }

    public String getTeacherPassword() {
        return teacherPassword;
    }

    public void setTeacherPassword(String teacherPassword) {
        this.teacherPassword = teacherPassword;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Password{" +
                "teacherNumber=" + teacherNumber +
                ", teacherName='" + teacherName + '\'' +
                ", teacherAccount='" + teacherAccount + '\'' +
                ", teacherPassword='" + teacherPassword + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
