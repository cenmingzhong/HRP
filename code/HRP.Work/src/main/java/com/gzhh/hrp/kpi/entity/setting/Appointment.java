package com.gzhh.hrp.kpi.entity.setting;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_Appointment")
@Title("岗位")
public class Appointment extends BaseEntity{

	@Id
	@Column(name="ID",length=50)
	@Title("岗位代码")
	private String id;
	
	@Column(name="Appointment_Name",length=50)
	@Title("岗位名称")
	private String appointmentName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAppointmentName() {
		return appointmentName;
	}

	public void setAppointmentName(String appointmentName) {
		this.appointmentName = appointmentName;
	}
}
