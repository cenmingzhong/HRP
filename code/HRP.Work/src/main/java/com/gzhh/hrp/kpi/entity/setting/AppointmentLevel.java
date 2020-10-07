package com.gzhh.hrp.kpi.entity.setting;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_Appointment_Level")
@Title("岗位等级")
public class AppointmentLevel extends BaseEntity{

	@Id
	@Column(name="ID",length=50)
	@Title("岗位等级代码")
	private String id;
	
	@Column(name="Appointment_Level_Name",length=50)
	@Title("岗位等级名称")
	private String appointmentLevelName;
	
	@Column(name="Type_ID",length=50)
	@Title("岗位类别")
	private String typeId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAppointmentLevelName() {
		return appointmentLevelName;
	}

	public void setAppointmentLevelName(String appointmentLevelName) {
		this.appointmentLevelName = appointmentLevelName;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	
	
}
