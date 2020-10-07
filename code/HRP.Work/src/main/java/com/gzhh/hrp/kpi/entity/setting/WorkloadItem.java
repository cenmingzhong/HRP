package com.gzhh.hrp.kpi.entity.setting;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_workload_item")
@Title("工作量项目")
public class WorkloadItem extends BaseEntity{

	@Id
    private String id;
	
	@Column(name="item_code")
	@Title("项目编码")
	private String itemCode;
    
    @Column(name="item_name")
    @Title("项目名称")
    private String itemName;
    
    @Column(name="year")
    @Title("年份")
    private Integer year;
    
    @Column(name="type_id")
    @Title("类型id")
    private String typeId;
    
    @Column(name="score")
    @Title("绩点")
    private BigDecimal score;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public BigDecimal getScore() {
		return score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}
	
}
