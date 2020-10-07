package com.gzhh.hrp.common.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sys_account_state")
public class AccountStatus extends BaseEntity{
	 @Id
     @Column(name="account_state_id")
     private String accountStateId;

	 @Column(name="year_month")
	 private Date yearMonth;
	 
	 @Column(name="status")
	 private Boolean status;

	public String getAccountStateId() {
		return accountStateId;
	}

	public void setAccountStateId(String accountStateId) {
		this.accountStateId = accountStateId;
	}

	public Date getYearMonth() {
		return yearMonth;
	}

	public void setYearMonth(Date yearMonth) {
		this.yearMonth = yearMonth;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	 
}
