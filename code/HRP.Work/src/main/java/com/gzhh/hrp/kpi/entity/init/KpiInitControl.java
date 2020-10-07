package com.gzhh.hrp.kpi.entity.init;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity(name="Kpi_Init_Control")
@Table(name="Kpi_Init_Control")
@Title(value="基础写入控制")
public class KpiInitControl {

	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="is_open")
	@Title("是否开启")
	private Boolean isOpen = false;
	
	public KpiInitControl() {}
	public KpiInitControl(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}
}