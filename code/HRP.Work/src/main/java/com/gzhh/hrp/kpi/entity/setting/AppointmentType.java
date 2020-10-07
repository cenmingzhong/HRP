package com.gzhh.hrp.kpi.entity.setting;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_Appointment_Type")
@Title("岗位类别")
public class AppointmentType extends BaseEntity{

	@Id
	@Column(name="ID",length=50)
	@Title("岗位类别代码")
	private String id;
	
	@Column(name="Appointment_Type_Name",length=50)
	@Title("岗位类别名称")
	private String appointmentTypeName;
	
	@Transient
    private List<AppointmentLevel> appointmentLevelList;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAppointmentTypeName() {
		return appointmentTypeName;
	}

	public void setAppointmentTypeName(String appointmentTypeName) {
		this.appointmentTypeName = appointmentTypeName;
	}

	public List<AppointmentLevel> getAppointmentLevelList() {
		return appointmentLevelList;
	}

	public void setAppointmentLevelList(List<AppointmentLevel> appointmentLevelList) {
		this.appointmentLevelList = appointmentLevelList;
	}
	
}
