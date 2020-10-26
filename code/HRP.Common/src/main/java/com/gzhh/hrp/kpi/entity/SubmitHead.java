package com.gzhh.hrp.kpi.entity;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author cenmingzhong
 * @create 2020-10-19-下午 15:03
 */
@Entity
@Table(name="KPI_SubmitHead")
@Title("表头")
public class SubmitHead extends BaseEntity {

    @Id
    @Column(name="Submit_Number")
    @Title("申报编号")
    private String submitNumber;

    @Column(name="Teacher_Number")
    @Title("教师编号")
    private String teacherNumber;

    @Column(name="Submit_Time")
    @Title("申请时间")
    private String submitTime;

    @Column(name="Submit_Year")
    @Title("申请年度")
    private String submitYear;

    @Column(name="WorkloadTypeNumber")
    @Title("工作量类型编号")
    private String workloadTypeNumber;

    public String getSubmitNumber() {
        return submitNumber;
    }

    public void setSubmitNumber(String submitNumber) {
        this.submitNumber = submitNumber;
    }

    public String getTeacherNumber() {
        return teacherNumber;
    }

    public void setTeacherNumber(String teacherNumber) {
        this.teacherNumber = teacherNumber;
    }

    public String getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(String submitTime) {
        this.submitTime = submitTime;
    }

    public String getSubmitYear() {
        return submitYear;
    }

    public void setSubmitYear(String submitYear) {
        this.submitYear = submitYear;
    }

    public String getWorkloadTypeNumber() {
        return workloadTypeNumber;
    }

    public void setWorkloadTypeNumber(String workloadTypeNumber) {
        this.workloadTypeNumber = workloadTypeNumber;
    }

    public SubmitHead() {
    }

    @Override
    public String toString() {
        return "SubmitHead{" +
                "submitNumber='" + submitNumber + '\'' +
                ", teacherNumber='" + teacherNumber + '\'' +
                ", submitTime='" + submitTime + '\'' +
                ", submitYear='" + submitYear + '\'' +
                ", workloadTypeNumber='" + workloadTypeNumber + '\'' +
                '}';
    }
}
