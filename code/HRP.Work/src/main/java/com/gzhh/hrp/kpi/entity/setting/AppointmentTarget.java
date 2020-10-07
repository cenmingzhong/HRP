package com.gzhh.hrp.kpi.entity.setting;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="KPI_appointment_target")
@Title("岗位目标设置")
public class AppointmentTarget extends BaseEntity{

	@Id
    private String id;
    
    @Column(name="appointment_id")
    @Title("岗位")
    private String appointmentId;
    
    @Column(name="workload_item_id")
    @Title("工作量")
    private String workloadItemId;
    
    @Column(name="target")
    @Title("目标")
    private BigDecimal target;
    
    @Column(name="year")
    @Title("年份")
    private Integer year;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getWorkloadItemId() {
		return workloadItemId;
	}

	public void setWorkloadItemId(String workloadItemId) {
		this.workloadItemId = workloadItemId;
	}

	public BigDecimal getTarget() {
		return target;
	}

	public void setTarget(BigDecimal target) {
		this.target = target;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
    
}
