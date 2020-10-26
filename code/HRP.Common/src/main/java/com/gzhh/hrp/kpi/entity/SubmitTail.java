package com.gzhh.hrp.kpi.entity;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author cenmingzhong
 * @create 2020-10-19-下午 15:19
 */
@Entity
@Table(name = "KPI_SubmitTail")
@Title("表尾")
public class SubmitTail extends BaseEntity {

    @Id
    @Column(name="Tail_Submit_Number")
    @Title("表尾申报编号")
    private String tailSubmitNumber;

    @Column(name = "Submit_Number")
    @Title("表头申报编号")
    private String headSubmitNumber;

    @Column(name="Grade_Task_Number")
    @Title("绩点任务编号")
    private String gradeTaskNumber;

    @Column(name="Grade_Score")
    @Title("绩点分数")
    private Integer gradeScore;

    @Column(name="Supporting_Material")
    @Title("佐证材料")
    private String supportingMaterial;

    public SubmitTail() {
    }

    public String getTailSubmitNumber() {
        return tailSubmitNumber;
    }

    public void setTailSubmitNumber(String tailSubmitNumber) {
        this.tailSubmitNumber = tailSubmitNumber;
    }

    public String getHeadSubmitNumber() {
        return headSubmitNumber;
    }

    public void setHeadSubmitNumber(String headSubmitNumber) {
        this.headSubmitNumber = headSubmitNumber;
    }

    public String getGradeTaskNumber() {
        return gradeTaskNumber;
    }

    public void setGradeTaskNumber(String gradeTaskNumber) {
        this.gradeTaskNumber = gradeTaskNumber;
    }

    public Integer getGradeScore() {
        return gradeScore;
    }

    public void setGradeScore(Integer gradeScore) {
        this.gradeScore = gradeScore;
    }

    public String getSupportingMaterial() {
        return supportingMaterial;
    }

    public void setSupportingMaterial(String supportingMaterial) {
        this.supportingMaterial = supportingMaterial;
    }

    @Override
    public String toString() {
        return "SubmitTail{" +
                "tailSubmitNumber='" + tailSubmitNumber + '\'' +
                ", headSubmitNumber='" + headSubmitNumber + '\'' +
                ", gradeTaskNumber='" + gradeTaskNumber + '\'' +
                ", gradeScore=" + gradeScore +
                ", supportingMaterial='" + supportingMaterial + '\'' +
                '}';
    }
}
