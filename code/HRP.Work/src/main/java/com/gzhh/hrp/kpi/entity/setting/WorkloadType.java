package com.gzhh.hrp.kpi.entity.setting;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_workload_type")
@Title("工作量类型")
public class WorkloadType extends BaseEntity{

	@Id
    private String id;
    
    @Column(name="name")
    @Title("类型名称")
    private String name;
    
    @Column(name="year")
    @Title("年份")
    private Integer year;
    
    @Column(name="grade")
    @Title("层数")
    private Integer grade;
    
    @Column(name="Is_End")
    @Title("是否末级")
    private Boolean isEnd;
    
    @Column(name="parent")
    @Title("上级类型")
    private String parent;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Boolean getIsEnd() {
		return isEnd;
	}

	public void setIsEnd(Boolean isEnd) {
		this.isEnd = isEnd;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
    
}
